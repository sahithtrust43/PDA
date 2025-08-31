import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { ChevronRight, Scale, Shield, Clock, FileCheck, Gavel } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/auth");
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-modern rounded-full opacity-20 animate-float blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-modern rounded-full opacity-10 animate-float blur-3xl" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/5 rounded-full animate-glow-pulse blur-2xl" />
      </div>
      
      {/* Legal pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
             backgroundSize: '40px 40px'
           }} 
      />
      
      {/* Subtle legal icons background */}
      <div className="absolute inset-0 overflow-hidden">
        <Scale className="absolute top-20 right-40 w-32 h-32 text-primary/5 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
        <Gavel className="absolute bottom-40 left-40 w-24 h-24 text-primary/5 -rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        <FileCheck className="absolute top-60 left-20 w-20 h-20 text-primary/5 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Legal badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Legal Document Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Property
              </span>
              <br />
              <span className="text-foreground">Document</span>
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Analyser
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Streamline legal document review with AI precision. Analyze contracts, identify risks, 
              and ensure compliance with the power of modern legal technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-12 py-6 shadow-neon hover:shadow-glow transition-all duration-500 group"
                onClick={handleGetStarted}
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="hero-outline" 
                size="lg" 
                className="text-lg px-12 py-6 border-primary/30 hover:border-primary/60 backdrop-blur-sm"
                onClick={handleLearnMore}
              >
                Watch Demo
              </Button>
            </div>
            
            {/* Legal feature highlights */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Attorney-Client Privilege</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" />
                <span>Compliance Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                <span>Legal Grade Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;