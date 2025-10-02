import { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import PhotoUpload from "@/components/PhotoUpload";
import AnalysisResults from "@/components/AnalysisResults";
import { Eye, FileText, Calendar, TrendingUp } from "lucide-react";

// import { AuthContext } from "../AuthContext";

// const [currentUser, setCurrentUser]= useContext(AuthContext);
const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  // console.log(currentUser);
  
  const handlePhotoSelect = (file) => {
    setSelectedFile(file);
    setAnalysisResults(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Mock analysis - replace with actual AI model API call
    setTimeout(() => {
      const mockResults = {
        results: [
          {
            condition: "Diabetic Retinopathy",
            probability: 23,
            severity: 'low',
            description: "Early signs detected. Regular monitoring recommended."
          },
          {
            condition: "Macular Degeneration",
            probability: 12,
            severity: 'low',
            description: "Minimal indicators present. Continue routine eye exams."
          },
          {
            condition: "Glaucoma",
            probability: 8,
            severity: 'low',
            description: "Low probability detected. Maintain regular check-ups."
          },
          {
            condition: "Normal Retina",
            probability: 87,
            severity: 'low',
            description: "Retinal structure appears normal and healthy."
          }
        ],
        overallRisk: 'low',
        timestamp: new Date().toLocaleString()
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const recentAnalyses = [
    { id: 1, date: "2024-01-15", risk: "low", conditions: 2 },
    { id: 2, date: "2024-01-10", risk: "medium", conditions: 3 },
    { id: 3, date: "2024-01-05", risk: "low", conditions: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="container py-8">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-muted-foreground">
              Upload retina photos for AI-powered disease detection and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PhotoUpload
                onAnalyzeComplete={setAnalysisResults} // ← Pass results to parent state
                isAnalyzing={false}
              />
              
              {analysisResults && (
                <AnalysisResults
                  results={analysisResults.results}
                  overallRisk={analysisResults.overallRisk}
                  timestamp={analysisResults.timestamp}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary-light">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-sm text-muted-foreground">Total Analyses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-success-light">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-sm text-muted-foreground">Healthy Results</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Analyses */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Recent Analyses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-3 rounded-lg border hover-lift">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{analysis.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {analysis.conditions} conditions checked
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          analysis.risk === 'low' 
                            ? 'text-success border-success' 
                            : analysis.risk === 'medium' 
                            ? 'text-warning border-warning' 
                            : 'text-destructive border-destructive'
                        }
                      >
                        {analysis.risk}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;