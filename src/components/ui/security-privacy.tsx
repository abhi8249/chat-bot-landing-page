import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const SecurityFeature = ({ icon: Icon, title, description, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card hover:shadow-primary transition-all duration-500 text-center"
    >
      <motion.div 
        className="bg-gradient-primary p-6 rounded-full shadow-primary mb-6 w-fit mx-auto"
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <Icon className="h-10 w-10 text-primary-foreground" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
};

const SecurityPrivacy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "All conversations are encrypted with military-grade security protocols, ensuring your data remains completely private and secure."
    },
    {
      icon: Lock,
      title: "Data Protection",
      description: "We follow strict data protection regulations and never store sensitive information longer than necessary for service delivery."
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Your conversations are not used for training or shared with third parties. What you say stays between you and our AI."
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Our servers are hosted in secure facilities with regular security audits and compliance with international standards."
    }
  ];

  return (
    <section className="py-32 bg-background-secondary relative overflow-hidden">
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
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Security & Privacy</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Your Data is{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Safe</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We take your privacy seriously. Our multilingual AI chatbot is built with 
            security and privacy as core principles, not afterthoughts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <SecurityFeature
              key={index}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Trusted & Compliant</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl px-6 py-4">
              <div className="font-bold text-foreground">GDPR</div>
              <div className="text-muted-foreground text-sm">Compliant</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl px-6 py-4">
              <div className="font-bold text-foreground">ISO 27001</div>
              <div className="text-muted-foreground text-sm">Certified</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl px-6 py-4">
              <div className="font-bold text-foreground">SOC 2</div>
              <div className="text-muted-foreground text-sm">Type II</div>
            </div>
            <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl px-6 py-4">
              <div className="font-bold text-foreground">HIPAA</div>
              <div className="text-muted-foreground text-sm">Ready</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityPrivacy;