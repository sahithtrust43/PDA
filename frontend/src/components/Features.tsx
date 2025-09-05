// Import necessary components and libraries.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components.
import { FileText, Scale, Shield, Clock, ArrowRight, Sparkles, Gavel, FileCheck } from "lucide-react"; // Icons.

// Array of features to be displayed.
const features = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Contract Analysis",
    description: "AI-powered review of legal documents and agreements.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "Legal Risk Assessment",
    description: "Identify potential liabilities and legal exposures.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <FileCheck className="w-8 h-8" />,
    title: "Compliance Monitoring", 
    description: "Ensure adherence to current legal regulations.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <Gavel className="w-8 h-8" />,
    title: "Due Diligence",
    description: "Thorough document review for informed decisions.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  }
];

// The Features component displays the key features of the application.
const Features = () => {
  return (
    // The main section for the features.
    <section id="features" className="py-32 relative">
      {/* Legal background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle legal pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '40px 40px'
             }} 
        />
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Legal Technology</span>
          </div>
          
          {/* Section heading */}
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="text-foreground">Legal</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Intelligence</span>
          </h2>
          
          {/* Section subheading */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional legal document analysis tools
          </p>
        </div>

        {/* Grid of features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500 border-primary/10 bg-card/50 backdrop-blur-sm overflow-hidden animate-fade-in hover:border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
              
              <CardHeader className="relative z-10">
                <div className="mx-auto mb-6 p-4 bg-white/10 rounded-2xl w-20 h-20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Legal stats section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Law Firms Trust Us</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground">Legal Documents Analyzed</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-4xl font-bold text-primary mb-2">80%</div>
            <div className="text-muted-foreground">Faster Legal Review</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the Features component.
export default Features;
