import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './button';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "support@multilingual-ai.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "San Francisco, CA",
      description: "Come say hello at our office"
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
            <Mail className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">Get in Touch</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Contact{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Us</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to experience the future of multilingual AI? Get in touch with our team 
            to learn more or start your journey with our AI chatbot.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-background/50 border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us more about your needs..."
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in touch</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-primary transition-all duration-300"
              >
                <div className="flex items-start">
                  <motion.div 
                    className="bg-gradient-primary p-3 rounded-xl shadow-primary mr-4 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-primary font-medium mb-1">{item.info}</p>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-card text-center"
            >
              <h4 className="text-xl font-bold text-foreground mb-4">Ready to get started?</h4>
              <p className="text-muted-foreground mb-6">
                Experience our multilingual AI chatbot today and see the difference it can make.
              </p>
              <Button size="lg" className="w-full">
                Start Free Trial
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;