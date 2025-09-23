import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, MessageCircle, Mic, Globe, Zap, Shield, Clock, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group relative bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-card hover:shadow-primary transition-all duration-500"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <motion.div 
          className="bg-gradient-primary p-4 rounded-xl shadow-primary mb-6 w-fit"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <Icon className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Intelligence",
      description: "Powered by state-of-the-art neural networks that understand context, emotion, and intent across multiple languages.",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: MessageCircle,
      title: "Natural Conversations",
      description: "Experience human-like conversations with our AI that remembers context and maintains engaging dialogue flows.",
      gradient: "from-accent/20 to-primary/20"
    },
    {
      icon: Mic,
      title: "Voice Recognition",
      description: "Crystal-clear voice processing with real-time speech-to-text conversion supporting regional accents and dialects.",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Seamlessly switch between Hindi, English, and Odia with cultural context understanding and localized responses.",
      gradient: "from-accent/20 to-primary/20"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized infrastructure delivering sub-second response times globally.",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption ensuring your conversations remain completely private.",
      gradient: "from-accent/20 to-primary/20"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Always available when you need it, providing consistent support across all time zones and regions.",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for teams with shared conversations, analytics, and seamless integration with your existing workflows.",
      gradient: "from-accent/20 to-primary/20"
    }
  ];

  return (
    <section className="py-32 bg-background-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
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
            <span className="text-foreground font-semibold">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Built for the{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Future</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the advanced capabilities that make our AI chatbot the most intelligent 
            and versatile multilingual assistant available today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-primary text-primary-foreground px-12 py-6 rounded-2xl text-xl font-bold shadow-intense hover:shadow-primary transition-all duration-300">
              Experience the Future Today
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;