import { Button } from "@/components/ui/button";
import { MessageCircle, Mic, Bot, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-lg border border-primary/20 rounded-full px-6 py-3 mb-8 animate-slide-up">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">Next-Generation AI Chatbot</span>
            <Globe className="h-5 w-5 text-accent" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Multilingual AI
            </span>
            <br />
            <span className="text-foreground">
              That Speaks Your Language
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-slide-up leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Experience the power of AI conversation in Hindi, English, and Odia.
            <br />
            Voice or text - we understand it all.
          </p>

          {/* Language Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* English/Hindi Card */}
            <div className="bg-gradient-card backdrop-blur-lg border border-primary/20 rounded-2xl p-8 shadow-card hover:shadow-primary transition-all duration-300 group">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-primary p-4 rounded-2xl shadow-primary group-hover:animate-glow">
                  <MessageCircle className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                English & Hindi
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Chat or call in English and Hindi for seamless business communication
              </p>
              
              <div className="space-y-4">
                <Button variant="hero" size="lg" className="w-full group/btn">
                  <MessageCircle className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Start Chat
                </Button>
                <Button variant="hero-outline" size="lg" className="w-full group/btn">
                  <Mic className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  Voice Call
                </Button>
              </div>
            </div>

            {/* Odia Card */}
            <div className="bg-gradient-card backdrop-blur-lg border border-accent/20 rounded-2xl p-8 shadow-card hover:shadow-accent transition-all duration-300 group">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-primary p-4 rounded-2xl shadow-accent group-hover:animate-glow">
                  <Globe className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ଓଡ଼ିଆ (Odia)
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Regional language support for authentic local conversations
              </p>
              
              <div className="space-y-4">
                <Button variant="hero-accent" size="lg" className="w-full group/btn">
                  <MessageCircle className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  ଚାଟ୍ ଆରମ୍ଭ କରନ୍ତୁ
                </Button>
                <Button variant="hero-accent-outline" size="lg" className="w-full group/btn">
                  <Mic className="h-5 w-5 mr-2 group-hover/btn:scale-110 transition-transform" />
                  ଭଏସ୍ କଲ୍
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-card/30 backdrop-blur-lg border border-border rounded-full px-4 py-2">
              <span className="text-muted-foreground text-sm">🎤 Voice Recognition</span>
            </div>
            <div className="bg-card/30 backdrop-blur-lg border border-border rounded-full px-4 py-2">
              <span className="text-muted-foreground text-sm">💬 Smart Chat</span>
            </div>
            <div className="bg-card/30 backdrop-blur-lg border border-border rounded-full px-4 py-2">
              <span className="text-muted-foreground text-sm">🌐 Multilingual</span>
            </div>
            <div className="bg-card/30 backdrop-blur-lg border border-border rounded-full px-4 py-2">
              <span className="text-muted-foreground text-sm">⚡ Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;