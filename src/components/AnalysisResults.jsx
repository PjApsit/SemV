import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, AlertTriangle, CheckCircle, Info } from "lucide-react";

const AnalysisResults = ({ results, overallRisk, timestamp }) => {
  const getRiskStyle = (severity) => {
    switch (severity) {
      case 'low':
        return { bg: 'bg-success-light', text: 'text-success', border: 'border-success' };
      case 'medium':
        return { bg: 'bg-warning-light', text: 'text-warning', border: 'border-warning' };
      case 'high':
        return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive' };
      default:
        return { bg: '', text: '', border: '' };
    }
  };

  const getRiskIcon = (severity) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      case 'medium':
        return <Info className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const overallStyle = getRiskStyle(overallRisk);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Assessment */}
      <Card className={`medical-card border-2 ${overallStyle.border}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Analysis Complete</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`rounded-lg p-4 ${overallStyle.bg}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={overallStyle.text}>{getRiskIcon(overallRisk)}</span>
                <span className={`font-semibold ${overallStyle.text}`}>
                  Overall Risk: {overallRisk.charAt(0).toUpperCase() + overallRisk.slice(1)}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {timestamp}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on the analysis of your retina image, here are the detected conditions and their probabilities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Detected Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3 hover-lift">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{result.condition}</h4>
                <Badge
                  variant="outline"
                  className={`${getRiskStyle(result.severity).text} ${getRiskStyle(result.severity).border}`}
                >
                  {result.severity} risk
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Probability</span>
                  <span className="font-medium">{result.probability}%</span>
                </div>
                <Progress value={result.probability} className="h-2" />
              </div>

              <p className="text-sm text-muted-foreground">{result.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="medical-card border-2 border-muted">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-2">Important Medical Disclaimer</p>
              <p className="text-muted-foreground leading-relaxed">
                This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Please consult with a qualified ophthalmologist or healthcare provider for proper diagnosis and treatment. 
                Early detection and professional evaluation are crucial for eye health.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
