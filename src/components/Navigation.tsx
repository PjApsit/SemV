import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, User, LogOut } from "lucide-react";

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isAuthenticated = false, onLogout }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-hover">
            <Eye className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-gradient">RetinaAI</span>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button 
                  variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                  className="text-sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={onLogout} className="text-sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="text-sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;