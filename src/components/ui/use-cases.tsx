import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Headphones, GraduationCap, Store, Heart } from 'lucide-react';

const UseCaseCard = ({ icon: Icon, title, description, color, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="group relative bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card hover:shadow-primary transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <motion.div 
          className="bg-gradient-primary p-4 rounded-2xl shadow-primary mb-6 w-fit"
          whileHover={{ scale: 1.1, rotate: 15 }}
        >
          <Icon className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const UseCases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const useCases = [
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Provide 24/7 multilingual customer support with instant responses and human-like conversation in Hindi, English, and Odia.",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Interactive learning assistant that explains concepts in local languages, making education accessible to students across different linguistic backgrounds.",
      color: "from-accent/20 to-primary/20"
    },
    {
      icon: Store,
      title: "Local Business",
      description: "Help local businesses connect with customers in their native language, providing product information and support in multiple regional languages.",
      color: "from-primary/20 to-accent/20"
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical information and appointment assistance in regional languages, making healthcare more accessible and reducing communication barriers.",
      color: "from-accent/20 to-primary/20"
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
            <Store className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Use Cases</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Perfect for{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Every Industry</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our multilingual AI chatbot adapts to various industries and use cases, 
            providing specialized support across different sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              {...useCase}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;