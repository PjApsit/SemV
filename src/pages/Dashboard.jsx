import { useContext, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import PhotoUpload from "@/components/PhotoUpload";
import AnalysisResults from "@/components/AnalysisResults";
import { Eye, FileText, Calendar, TrendingUp } from "lucide-react";

import { UserContext } from "@/components/UserContext";
import { query, orderBy, getDocs,collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.js"; // or your firebase config path

const Dashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults1, setAnalysisResults1] = useState(null);
  const [analysisResults2, setAnalysisResults2] = useState(null);
  
  const [totalScan, setTotalScan] = useState(0);
  const { user } = useContext(UserContext);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [processedScans, setProcessedScans] = useState([]);

  //maping recent analyses to get overall risk and medium/high conditions count
  useEffect(() => {
    const scans = recentAnalyses.map(scan => {
      const results = scan.results || [];

      // overallRisk comes directly from DB
      const overallRisk = scan.overallRisk || scan.risk || "unknown";

      // count medium/high conditions from severity field
      const mediumHighConditions = results.filter(
        r => r.severity === "high" || r.severity === "medium"
      ).length;

      const totalScans = results.length;

      return {
        id: scan.id,
        date: scan.date,
        overallRisk,
        mediumHighConditions,
        totalScans
      };
    });

  setProcessedScans(scans);
}, [recentAnalyses]);

useEffect(() => {
  setTotalScan(processedScans.length);
}, [processedScans]);

  // Fetch recent analyses from Firestore
  const fetchRecentAnalyses = async () => {
  if (!user?.user_id) return;

  const userPastRef = collection(db, "usercred", user.user_id, "userpast");
  const q = query(userPastRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const analyses = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    date: doc.data().timestamp?.toDate().toLocaleDateString(),
    conditions: Object.keys(doc.data().scores || {}).length,
    risk: doc.data().risk,
  }));
  setRecentAnalyses(analyses);
};

useEffect(() => {
  fetchRecentAnalyses();
}, [user]);


  //save to firebase
  const saveAnalysisToFirestore = async (userId, analysisData) => {
    if (!userId) return;

    const userPastRef = collection(db, "usercred", userId, "userpast");
    try {
      await addDoc(userPastRef, {
        ...analysisData,
        timestamp: serverTimestamp(),
      });
      console.log("Analysis saved to Firestore!");
      fetchRecentAnalyses();
    } catch (error) {
      console.error("Error saving analysis:", error);
    }
  };

 //set api for recent analyses
  const recentAnalys = [
    { id: 1, date: "2024-01-15", risk: "low", conditions: 2 },
    { id: 2, date: "2024-01-10", risk: "medium", conditions: 3 },
    { id: 3, date: "2024-01-05", risk: "low", conditions: 1 },
  ];
  // console.log(user)
 

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAuthenticated={true} />
      
      <div className="container py-8">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Welcome {user?.name || "Guest"}</h1>
            <p className="text-muted-foreground">
              Upload retina photos for AI-powered disease detection and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PhotoUpload
                onAnalyzeComplete1={(result) => {
                  setAnalysisResults1(result);
                  saveAnalysisToFirestore(user?.user_id, result);
                }}
                onAnalyzeComplete2={(result) => {
                  setAnalysisResults2(result);
                  saveAnalysisToFirestore(user?.user_id, result);
                }}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
              />
              
              {/* FOr model 1  */}
              {analysisResults1 && (
                <AnalysisResults
                  results={analysisResults1.results}
                  overallRisk={analysisResults1.overallRisk}
                  timestamp={analysisResults1.timestamp}
                />
              )}

              {/* For model 2 */}
              {analysisResults2 && (
                <AnalysisResults
                  results={analysisResults2.results}
                  overallRisk={analysisResults2.overallRisk}
                  timestamp={analysisResults2.timestamp}
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
                        <p className="text-2xl font-bold">{totalScan}</p>
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
                  {/* {recentAnalys.map((analysis) => (
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
                  ))} */}

                  {processedScans.map((scan) => (
                    console.log("Scan:", scan),
                    <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg border hover-lift">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{scan.date}</p>
                          <p className="text-xs text-muted-foreground">
                            {scan.mediumHighConditions} medium/high severity conditions
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          scan.overallRisk === "low"
                            ? "text-success border-success"
                            : scan.overallRisk === "medium"
                            ? "text-warning border-warning"
                            : "text-destructive border-destructive"
                        }
                      >
                        {scan.overallRisk}
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