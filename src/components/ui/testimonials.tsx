import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import Lottie from "lottie-react";
import k from "../../../public/livebot.json";   

const TestimonialCard = ({ name, role, content, rating, avatar, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group relative bg-transparent-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card hover:shadow-primary transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
      
      <div className="relative z-10">
        <Quote className="h-8 w-8 text-primary mb-6 opacity-50" />
        
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 italic">
          "{content}"
        </p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mr-4">
            {avatar}
          </div>
          <div>
            <h4 className="text-foreground font-semibold">{name}</h4>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      content: "The multilingual support in Hindi has revolutionized how I communicate with my customers. It's like having a personal assistant available 24/7.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Healthcare Professional",
      content: "Being able to provide medical information in regional languages has made healthcare more accessible to our patients. This AI is truly remarkable.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Amit Patel",
      role: "Education Director",
      content: "Our students love learning with an AI that speaks their language. The Odia support has been particularly valuable for our regional programs.",
      rating: 5,
      avatar: "AP"
    },
    {
      name: "Sarah Johnson",
      role: "Customer Service Manager",
      content: "The voice recognition is incredibly accurate, even with different accents. Our customer satisfaction has improved dramatically since implementation.",
      rating: 5,
      avatar: "SJ"
    }
  ];

  return (
    <section className="py-32 bg-background-secondary relative overflow-hidden">
         <div className="absolute inset-0 pointer-events-none z-0">
        <Lottie
          animationData={k}
          loop
          autoplay
          className="w-[800px] h-[800px] opacity-80"
          style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>
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
            <Star className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Customer Stories</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            What Our{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Users Say</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what real users are saying about 
            their experience with our multilingual AI chatbot.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">10k+</div>
              <div className="text-muted-foreground text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">99.9%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">3</div>
              <div className="text-muted-foreground text-sm">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24/7</div>
              <div className="text-muted-foreground text-sm">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;