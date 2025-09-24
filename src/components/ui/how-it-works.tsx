import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, MessageCircle, Zap } from 'lucide-react';
import ProfessionalAIBackground from './ProfessionalAIBackground';

const StepCard = ({ step, icon: Icon, title, description, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card hover:shadow-primary transition-all duration-500 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
        
        <div className="relative z-10">
          <motion.div 
            className="bg-gradient-primary p-6 rounded-full shadow-primary mb-6 w-fit mx-auto"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Icon className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          
          <div className="text-6xl font-black text-primary mb-4">{step}</div>
          <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      step: "01",
      icon: Globe,
      title: "Select Language",
      description: "Choose your preferred language from Hindi, English, or Odia for personalized communication."
    },
    {
      step: "02",
      icon: MessageCircle,
      title: "Chat or Voice",
      description: "Start your conversation through text chat or voice input - whatever feels more natural to you."
    },
    {
      step: "03",
      icon: Zap,
      title: "Instant AI Response",
      description: "Get immediate, intelligent responses powered by advanced AI technology in your chosen language."
    }
  ];

  return (
    <section className="py-32 bg-background-secondary relative overflow-hidden">
      <ProfessionalAIBackground/>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-card/20 backdrop-blur-xl border border-primary/30 rounded-full px-6 py-3 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Simple Process</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            How It{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Works</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get started with our multilingual AI chatbot in just three simple steps. 
            It's designed to be intuitive and accessible for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              {...step}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Connecting Lines */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <svg className="w-full h-4" viewBox="0 0 800 20" fill="none">
            <motion.path
              d="M 0 10 Q 200 10 300 10 Q 500 10 800 10"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="10,5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;