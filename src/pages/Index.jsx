import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Eye, Shield, Zap, Users, ChevronRight, Star } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze retinal images with medical-grade accuracy"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your medical data is encrypted and protected with enterprise-level security"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Results",
      description: "Get comprehensive analysis results within seconds of uploading your image"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Validated",
      description: "Our AI models are trained and validated by leading ophthalmologists worldwide"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Ophthalmologist",
      content: "RetinaAI has revolutionized how we screen for retinal diseases. The accuracy is remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Early detection through RetinaAI helped me get the treatment I needed. Truly life-changing.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="medical-hero text-primary-foreground py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                AI-Powered Retina Disease Detection
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Upload your retinal photos and get instant, accurate analysis for early disease detection
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 hover-lift">
                  Start Free Analysis
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>FDA Approved AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10k+ Patients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose RetinaAI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets medical expertise for the most accurate retinal analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="medical-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center text-primary mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple, fast, and accurate retinal analysis in three steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Image",
                description: "Take a photo or upload your retinal image using our secure platform"
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our advanced AI analyzes your image for signs of various retinal diseases"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive detailed analysis with probability scores and recommendations"
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Trusted by Professionals</h2>
            <p className="text-xl text-muted-foreground">
              See what medical professionals and patients say about RetinaAI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="medical-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Start Your Retinal Health Journey Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Early detection saves sight. Join thousands who trust RetinaAI for their eye health screening.
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 hover-lift">
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-hover">
                <Eye className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-gradient">RetinaAI</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 RetinaAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;