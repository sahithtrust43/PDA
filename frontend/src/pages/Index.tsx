// Import the Hero and Features components.
import Hero from "@/components/Hero";
import Features from "@/components/Features";

// The Index component represents the main landing page.
const Index = () => {
  return (
    // The main container for the page, with a minimum height of the screen.
    <div className="min-h-screen">
      {/* The Hero component is the main banner section of the page. */}
      <Hero />
      {/* The Features component displays the key features of the application. */}
      <Features />
    </div>
  );
};

// Export the Index component.
export default Index;
