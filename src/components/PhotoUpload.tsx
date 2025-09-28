import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, X, Eye, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

const PhotoUpload = ({ onPhotoSelect, onAnalyze, isAnalyzing = false }: PhotoUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onPhotoSelect(file);
      toast({
        title: "Photo uploaded successfully",
        description: "Ready for analysis",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      {!selectedFile ? (
        <Card className="medical-card">
          <CardContent className="p-8">
            <div
              className={`upload-zone ${dragOver ? 'dragover' : ''} p-8 text-center transition-all duration-300`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Upload Retina Photo</h3>
                  <p className="text-muted-foreground text-sm">
                    Drag and drop your retina image or click to browse
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Browse Files</span>
                  </Button>
                  <Button
                    onClick={() => cameraInputRef.current?.click()}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Take Photo</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, WEBP (Max 20MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Selected Photo
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelection}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-muted max-w-md mx-auto">
                <img
                  src={previewUrl!}
                  alt="Selected retina photo"
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="bg-accent/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Before Analysis</p>
                    <p className="text-muted-foreground">
                      Ensure the image is clear, well-lit, and shows the retina properly. 
                      Our AI model will analyze it for potential diseases.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
    </div>
  );
};

export default PhotoUpload;