import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Crown, Zap } from 'lucide-react';
import { Button } from './button';

const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  popular, 
  buttonText, 
  delay = 0 
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className={`relative bg-gradient-card backdrop-blur-xl border rounded-3xl p-8 shadow-card transition-all duration-500 overflow-hidden ${
        popular 
          ? 'border-primary/50 shadow-primary scale-105' 
          : 'border-primary/20 hover:shadow-primary'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 hover:opacity-100 rounded-3xl transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-black text-foreground">${price}</span>
            <span className="text-muted-foreground ml-2">/{period}</span>
          </div>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={popular ? "default" : "outline"} 
          size="lg" 
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for trying out our AI chatbot",
      features: [
        "100 messages per month",
        "Basic chat support",
        "1 language (English)",
        "Standard response time",
        "Community support"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "29",
      period: "month",
      description: "Everything you need for professional use",
      features: [
        "Unlimited messages",
        "Voice & chat support",
        "All 3 languages (Hindi, English, Odia)",
        "Priority response time",
        "Advanced AI features",
        "Analytics dashboard",
        "API access",
        "24/7 priority support"
      ],
      buttonText: "Start Pro Trial",
      popular: true
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
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
            <span className="text-foreground font-semibold">Pricing Plans</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Choose Your{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Plan</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. Our pricing is transparent and designed 
            to scale with your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Have questions about pricing? 
            <span className="text-primary hover:underline cursor-pointer ml-2">
              Check our FAQ section
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;