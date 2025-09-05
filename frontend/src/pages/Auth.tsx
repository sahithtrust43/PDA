// Import necessary components and libraries.
import { useState } from "react"; // Hook for managing state.
import { Button } from "@/components/ui/button"; // Button component.
import { Input } from "@/components/ui/input"; // Input component.
import { Label } from "@/components/ui/label"; // Label component.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components.
import { useNavigate } from "react-router-dom"; // Hook for navigation.
import { useToast } from "@/hooks/use-toast"; // Hook for displaying toasts.
import { auth } from "../firebaseConfig"; // Import Firebase auth instance.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// The Auth component handles user authentication (login and signup).
const Auth = () => {
  // State to toggle between login and signup forms.
  const [isLogin, setIsLogin] = useState(true);
  // State for the email input.
  const [email, setEmail] = useState("");
  // State for the password input.
  const [password, setPassword] = useState("");
  // useNavigate hook for programmatic navigation.
  const navigate = useNavigate();
  // useToast hook for displaying notifications.
  const { toast } = useToast();

  // Handles the form submission for both login and signup.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted. isLogin:", isLogin);
    console.log("Email:", email);

    if (isLogin) {
      console.log("Attempting to sign in...");
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sign in successful:", userCredential.user);
        toast({
          title: "Login successful!",
          description: "Welcome to Property Document Analyser",
        });
        localStorage.setItem("isLoggedIn", "true");
        navigate("/upload");
      } catch (error: any) {
        console.error("Sign in failed:", error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      console.log("Attempting to sign up...");
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign up successful:", userCredential.user);
        toast({
          title: "Account created!",
          description: "Please login with your new credentials.",
        });
        setIsLogin(true);
        setEmail("");
        setPassword("");
      } catch (error: any) {
        console.error("Sign up failed:", error);
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
      }
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
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                setEmail("");
                setPassword("");
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Export the Auth component.
export default Auth;
