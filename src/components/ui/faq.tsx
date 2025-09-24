import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const faqs = [
    {
      question: "How accurate is the multilingual AI chatbot?",
      answer: "Our AI chatbot achieves over 95% accuracy in understanding and responding in Hindi, English, and Odia. We continuously train our models with regional dialects and cultural context to improve accuracy."
    },
    {
      question: "Can I switch between languages during a conversation?",
      answer: "Yes! You can seamlessly switch between Hindi, English, and Odia at any point during your conversation. Our AI automatically detects the language change and responds appropriately."
    },
    {
      question: "Is voice recognition available in all supported languages?",
      answer: "Absolutely. Our voice recognition technology supports all three languages - Hindi, English, and Odia - including various regional accents and dialects for more natural interactions."
    },
    {
      question: "How secure is my data when using the chatbot?",
      answer: "We prioritize your privacy with end-to-end encryption, secure data handling, and compliance with international privacy standards. Your conversations are never stored longer than necessary or shared with third parties."
    },
    {
      question: "Can I integrate this AI chatbot into my existing business systems?",
      answer: "Yes, we provide comprehensive API access and integration support. Our Pro plan includes detailed documentation and technical support to help you integrate our AI into your existing workflows and systems."
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
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-foreground font-semibold">FAQ</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent">Questions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our multilingual AI chatbot. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-card"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-primary/10">
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-card backdrop-blur-xl border border-primary/20 rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you get the most out of our multilingual AI chatbot.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold shadow-primary hover:shadow-primary transition-all duration-300"
              >
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;