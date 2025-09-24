import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { MessageCircle, Mic, Bot, Globe, Sparkles, Zap, Brain, Languages } from "lucide-react";
import RobotScene from './robot-scene';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Morphing Text Component
const MorphingText = ({ texts, className }: { texts: string[]; className?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <motion.span
      key={currentIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {texts[currentIndex]}
    </motion.span>
  );
};

// Interactive Button Component
const InteractiveButton = ({ children, variant, size, className, ...props }: any) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x / 4, y: y / 4 });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        {...props}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};

const EnhancedHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y1, springConfig);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div 
        className="absolute inset-0 bg-gradient-hero opacity-90"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
      
      {/* 3D Robot Scene */}
      <motion.div 
        style={{ y: ySpring, opacity }}
        className="absolute inset-0 z-10"
      >
        <RobotScene />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
        transition={{ delay: 1 }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-6 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-card/20 backdrop-blur-xl border border-primary/30 rounded-full px-8 py-4 mb-8 shadow-glow"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-foreground font-semibold text-lg">Next-Generation AI Assistant</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-6 w-6 text-accent" />
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight px-2"
          >
            <motion.span 
              className="block bg-gradient-text bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Multilingual AI
            </motion.span>
            <span className="block text-foreground mt-2 sm:mt-4">
              That{" "}
              <MorphingText 
                texts={["Understands", "Speaks", "Thinks", "Learns"]} 
                className="text-accent"
              />
            </span>
            <span className="block text-foreground">Your Language</span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12 px-4">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 leading-relaxed max-w-4xl mx-auto">
              Experience the future of AI conversation in{" "}
              <span className="text-primary font-semibold">Hindi</span>,{" "}
              <span className="text-primary font-semibold">English</span>, and{" "}
              <span className="text-accent font-semibold">Odia</span>
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter value={3} />
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm">Languages</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                  <AnimatedCounter value={99} suffix="%" />
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm">Accuracy</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter value={24} suffix="/7" />
                </span>
                <span className="text-muted-foreground text-xs sm:text-sm">Available</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Language Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16 px-4"
          >
            {/* English/Hindi Card */}
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="group relative bg-gradient-card backdrop-blur-xl border border-primary/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-intense hover:shadow-primary transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <motion.div 
                    className="bg-gradient-primary p-6 rounded-3xl shadow-primary"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Languages className="h-10 w-10 text-primary-foreground" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                  English & Hindi
                </h3>
                
                <p className="text-muted-foreground mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed">
                  Advanced AI conversations with natural language processing for seamless business communication
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <InteractiveButton variant="hero" size="lg" className="w-full text-sm sm:text-base md:text-lg font-semibold py-3 sm:py-4">
                    <MessageCircle className="h-4 w-4 sm:h-5 w-5 md:h-6 w-6 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">Start Intelligent Chat</span>
                    <span className="sm:hidden">Chat</span>
                    <Zap className="h-4 w-4 sm:h-5 w-5 ml-2 sm:ml-3" />
                  </InteractiveButton>
                  <InteractiveButton variant="hero-outline" size="lg" className="w-full text-sm sm:text-base md:text-lg font-semibold py-3 sm:py-4">
                    <Mic className="h-4 w-4 sm:h-5 w-5 md:h-6 w-6 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">Begin Voice Call</span>
                    <span className="sm:hidden">Voice</span>
                    <Brain className="h-4 w-4 sm:h-5 w-5 ml-2 sm:ml-3" />
                  </InteractiveButton>
                </div>
              </div>
            </motion.div>

            {/* Odia Card */}
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: -5 }}
              className="group relative bg-gradient-card backdrop-blur-xl border border-accent/30 rounded-3xl p-10 shadow-intense hover:shadow-accent transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <motion.div 
                    className="bg-gradient-primary p-6 rounded-3xl shadow-accent"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Globe className="h-10 w-10 text-primary-foreground" />
                  </motion.div>
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  ଓଡ଼ିଆ (Odia)
                </h3>
                
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                  Native regional language support with cultural context understanding for authentic local conversations
                </p>
                
                <div className="space-y-6">
                  <InteractiveButton variant="hero-accent" size="lg" className="w-full text-lg font-semibold">
                    <MessageCircle className="h-6 w-6 mr-3" />
                    ଚାଟ୍ ଆରମ୍ଭ କରନ୍ତୁ
                    <Sparkles className="h-5 w-5 ml-3" />
                  </InteractiveButton>
                  <InteractiveButton variant="hero-accent-outline" size="lg" className="w-full text-lg font-semibold">
                    <Mic className="h-6 w-6 mr-3" />
                    ଭଏସ୍ କଲ୍
                    <Brain className="h-5 w-5 ml-3" />
                  </InteractiveButton>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Feature Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: "🎤", text: "Advanced Voice AI", color: "primary" },
              { icon: "💬", text: "Smart Conversations", color: "accent" },
              { icon: "🌐", text: "Multilingual Support", color: "primary" },
              { icon: "⚡", text: "Real-time Processing", color: "accent" },
              { icon: "🧠", text: "Deep Learning", color: "primary" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-4 shadow-card hover:shadow-primary transition-all duration-300"
              >
                <span className="text-muted-foreground text-lg font-medium">
                  {feature.icon} {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-14 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-primary rounded-full mt-3"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;