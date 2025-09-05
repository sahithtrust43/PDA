// Import necessary components and libraries.
import { useState } from "react"; // Hook for managing state.
import { Button } from "@/components/ui/button"; // Button component.
import { Input } from "@/components/ui/input"; // Input component.
import { Label } from "@/components/ui/label"; // Label component.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components.
import { useNavigate } from "react-router-dom"; // Hook for navigation.
import { useToast } from "@/hooks/use-toast"; // Hook for displaying toasts.

// The Auth component handles user authentication (login and signup).
const Auth = () => {
  // State to toggle between login and signup forms.
  const [isLogin, setIsLogin] = useState(true);
  // State for the username input.
  const [username, setUsername] = useState("");
  // State for the password input.
  const [password, setPassword] = useState("");
  // useNavigate hook for programmatic navigation.
  const navigate = useNavigate();
  // useToast hook for displaying notifications.
  const { toast } = useToast();

  // Handles the form submission for both login and signup.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple hardcoded authentication for demonstration purposes.
      if (username === "admin" && password === "password") {
        toast({
          title: "Login successful!",
          description: "Welcome to Property Document Analyser",
        });
        // Store login state in localStorage for persistence across sessions.
        localStorage.setItem("isLoggedIn", "true");
        // Navigate to the document upload page upon successful login.
        navigate("/upload");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } else {
      // Simple signup simulation.
      toast({
        title: "Account created!",
        description: "Please login with your credentials",
      });
      // Switch to the login form after signup.
      setIsLogin(true);
      // Clear the input fields.
      setUsername("");
      setPassword("");
    }
  };

  return (
    // Main container for the authentication page.
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Sign In" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Create a new account to get started"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Display demo credentials only on the login form. */}
            {isLogin && (
              <p className="text-sm text-muted-foreground">
                Demo credentials: admin / password
              </p>
            )}

            <Button type="submit" className="w-full" variant="hero">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => {
                // Toggle between login and signup forms.
                setIsLogin(!isLogin);
                // Clear the input fields.
                setUsername("");
                setPassword("");
              }}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Export the Auth component.
export default Auth;
