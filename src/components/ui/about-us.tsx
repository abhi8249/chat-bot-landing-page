import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Globe, Lightbulb } from 'lucide-react';

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To break down language barriers and make AI accessible to everyone, regardless of their native language."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A diverse group of AI researchers, linguists, and engineers passionate about inclusive technology."
    },
    {
      icon: Globe,
      title: "Our Vision",
      description: "A world where technology speaks every language and serves every community with equal intelligence."
    },
    {
      icon: Lightbulb,
      title: "Our Innovation",
      description: "Pioneering multilingual AI solutions that understand cultural context and regional nuances."
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
            <Users className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">About Us</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Building the{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Future</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
            We're on a mission to democratize AI by making it truly multilingual and culturally aware. 
            Our team combines cutting-edge technology with deep linguistic expertise to create AI that 
            understands not just words, but context, culture, and community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card hover:shadow-primary transition-all duration-500 text-center"
            >
              <motion.div 
                className="bg-gradient-primary p-4 rounded-2xl shadow-primary mb-6 w-fit mx-auto"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <value.icon className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-12 shadow-card text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-foreground mb-6">Our Vision for the Future</h3>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            "We envision a world where language is no longer a barrier to accessing the power of AI. 
            Where every person, regardless of their native tongue, can interact with technology in a way 
            that feels natural, respectful, and empowering. This is not just about translation—it's about 
            true understanding across cultures and communities."
          </p>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
              <span className="text-primary-foreground font-bold text-xl">CTO</span>
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">Dr. Sarah Chen</div>
              <div className="text-muted-foreground">Chief Technology Officer</div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid md:grid-cols-4 gap-8 mt-20"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-foreground mb-2">3</div>
            <div className="text-muted-foreground">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-foreground mb-2">50+</div>
            <div className="text-muted-foreground">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-foreground mb-2">10k+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-foreground mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;