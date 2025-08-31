import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogin = () => {
    navigate("/auth");
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };
  return <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHomeNavigation}>
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">PDA</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Property Document Analyser</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          
          
          
        </nav>

        {location.pathname !== "/auth" && location.pathname !== "/upload" && (
          <Button variant="hero" onClick={handleLogin}>
            Sign In
          </Button>
        )}
      </div>
    </header>;
};
export default Header;