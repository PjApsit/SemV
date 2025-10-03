import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, Image, Loader2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";

const PhotoUpload = ({ onAnalyzeComplete1,onAnalyzeComplete2, isAnalyzing, setIsAnalyzing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [eyeEnabled, setEyeEnabled] = useState(false);
  
  const formatModel2Response = (model2Data) => {
    const { predicted_class, confidence, scores } = model2Data;

    const results = Object.entries(scores).map(([condition, prob]) => {
      let severity = "low";
      if (prob > 0.7) severity = "high";
      else if (prob > 0.3) severity = "medium";

      return {
        condition: condition.charAt(0).toUpperCase() + condition.slice(1),
        probability: Math.round(prob * 100),
        severity,
        description: `Probability of ${condition}: ${(prob * 100).toFixed(2)}%`,
      };
    });

    let overallRisk = "low";
    if (confidence > 0.7) overallRisk = "high";
    else if (confidence > 0.3) overallRisk = "medium";

    return {
      results,
      overallRisk,
      timestamp: new Date().toLocaleString(),
    };
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    console.log("File changed:");
    
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Helper to map score to severity
  const getSeverity = (score) => {
    if (score < 0.5) return "low";
    if (score < 0.8) return "medium";
    return "high";
  };

  const handleAnalyzeClick = async () => {
    console.log("Analyzing file:", selectedFile);
    if (!selectedFile) return alert("Please select an image first!");
    if (!onAnalyzeComplete1) return;
    if(!eyeEnabled){
      try {
        setIsAnalyzing = true;
        console.log("Starting analysis...");
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

        const data = await response.json();
        console.log("Prediction result of model 1:", data);

        // Format data for AnalysisResults
        const scores = data.result?.scores; // <-- get nested scores safely
        if (!scores) throw new Error("No scores returned from backend");
        const results = Object.entries(scores).map(([condition, score]) => ({
          condition,
          probability: +(score * 100).toFixed(2),
          severity: getSeverity(score),
          description: `AI model predicts ${condition} with ${(score * 100).toFixed(2)}% confidence.`,
        }));

        const overallScore = Math.max(...Object.values(scores));


        const overallRisk = getSeverity(overallScore);
        setIsAnalyzing = false;
        // Pass the formatted data to parent
        onAnalyzeComplete1({
          results,
          overallRisk,
          timestamp: new Date().toLocaleString(),
        });
      } catch (err) {
        alert("Error analyzing image: " + err.message);
        console.error(err);
      }
    }else{
      console.log("Eye model is enabled");
      try {
        setIsAnalyzing = true;
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch("http://127.0.0.1:8001/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Raw Model2 Response:", data);

        const formatted = formatModel2Response(data);
        // setFormattedPrediction(formatted);
        // console.log("Formatted Model2 Response:", formatted);
        // console.log(formatted.results)
        // console.log(formatted.overallRisk)
        // console.log(formatted.timestamp)
        setIsAnalyzing = false;
        onAnalyzeComplete2(formatted);
      } catch (err) {
        alert("Error: " + err.message);
      } 
    }
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image className="h-5 w-5 mr-2" />
          Upload Retina Photo
        </CardTitle>
        <CardDescription>
          Upload a retinal fundus photograph for AI-powered disease detection analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
          />
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl}
                alt="Selected retina photo"
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop your retina photo here</p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
          

        <div className="flex flex-col sm:flex-row gap-4">
            
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            disabled={isAnalyzing}
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>

          <Button
            className="flex-1 hover-lift"
            onClick={handleAnalyzeClick}
            disabled={!selectedFile || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Photo"
            )}
          </Button>

           <div className="flex items-center gap-3 px-4 py-2 rounded-lg border bg-card">
            <span className="text-sm font-medium whitespace-nowrap">
              Eye {eyeEnabled ? "On" : "Off"}
            </span>
            <Switch
              checked={eyeEnabled}
              onCheckedChange={setEyeEnabled}
              disabled={isAnalyzing}
            />
          </div>
        </div>

        {/* File Requirements */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Supported formats: JPG, PNG, GIF</p>
          <p>• Maximum file size: 10MB</p>
          <p>• For best results, use high-quality fundus photographs</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
