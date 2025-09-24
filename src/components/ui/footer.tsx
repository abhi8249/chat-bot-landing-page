import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#demo' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Security', href: '#security' },
      { name: 'Compliance', href: '#compliance' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-background-secondary border-t border-primary/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
                  <Bot className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                  Multilingual AI
                </div>
              </motion.div>
              
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                Breaking down language barriers with advanced AI technology. 
                Experience conversations in Hindi, English, and Odia like never before.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span>support@multilingual-ai.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-foreground font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-6">Support</h3>
              <ul className="space-y-4 mb-8">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div>
                <h4 className="text-foreground font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-12 border-t border-primary/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-8">
              Get the latest updates about our multilingual AI technology and new features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/50 border border-primary/20 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-primary hover:shadow-primary transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 Multilingual AI. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;