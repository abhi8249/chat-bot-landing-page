import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play, MessageCircle, Mic, Bot } from 'lucide-react';

const DemoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
            <Play className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Interactive Demo</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            See It in{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Action</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience our multilingual AI chatbot firsthand with this interactive demo. 
            Try different languages and see the power of our technology.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Demo Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <motion.div 
                className="absolute inset-0 bg-gradient-mesh opacity-20"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div 
                  className="bg-gradient-primary p-8 rounded-full shadow-primary mb-6 mx-auto w-fit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-12 w-12 text-primary-foreground ml-1" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-foreground mb-4">Launch Interactive Demo</h3>
                <p className="text-muted-foreground text-lg">Click to experience our multilingual AI chatbot</p>
              </div>
            </div>

            {/* Feature Preview Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div 
                className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Text Chat</h4>
                <p className="text-muted-foreground text-sm">Type your questions in any supported language</p>
              </motion.div>
              
              <motion.div 
                className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Mic className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Voice Input</h4>
                <p className="text-muted-foreground text-sm">Speak naturally in Hindi, English, or Odia</p>
              </motion.div>
              
              <motion.div 
                className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">AI Responses</h4>
                <p className="text-muted-foreground text-sm">Get intelligent, contextual responses instantly</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;