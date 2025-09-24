import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { Check, Crown, Zap, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import robotAnimation from "../../../public/robo.json";
import k from "../../../public/livebot.json";   


// Button Component
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default:
      "bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700 shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-teal-400/50 text-white hover:bg-teal-400/10 hover:border-teal-300",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 py-3 text-lg",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Pricing Background (Three.js floating spheres & particles)
const PricingBackground = () => {
  const mountRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Floating spheres
    const floatingElements = [];
    for (let i = 0; i < 25; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 1.2 + 0.3, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${160 + Math.random() * 60}, 70%, 60%)`),
        emissive: new THREE.Color(0x10b981),
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.5,
        roughness: 0.2,
        metalness: 0.6,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 60
      );
      scene.add(sphere);
      floatingElements.push({
        mesh: sphere,
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 100;
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: new THREE.Color("#34d399"),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight = new THREE.PointLight(0x10b981, 1.5, 100);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    camera.position.z = 40;

    const animate = (time) => {
      frameId.current = requestAnimationFrame(animate);
      floatingElements.forEach((el) => {
        el.mesh.position.y += Math.sin(time * 0.001 + el.floatOffset) * el.floatSpeed;
      });
      particles.rotation.y = time * 0.0003;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId.current);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none z-10" />
    </>
  );
};

// Pricing Card with robot background
const PricingCard = ({ name, price, period, description, features, popular, buttonText, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className={`relative backdrop-blur-2xl border rounded-3xl p-8 shadow-2xl transition-all duration-700 overflow-hidden transform-gpu ${
        popular ? "border-teal-400/60 shadow-emerald-400/40 scale-105" : "border-teal-400/30 hover:shadow-emerald-300/30"
      }`}
      style={{
        background: popular
          ? "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(16, 185, 129, 0.25))"
          : "linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(16, 185, 129, 0.15))",
      }}
    >
      {/* Robot Lottie Background */}
      <Lottie
        animationData={robotAnimation}
        loop
        autoplay
        className="absolute w-[400px] h-[400px] opacity-20 pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />

      {popular && (
        <motion.div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">
            <Crown className="h-4 w-4" /> Most Popular
          </div>
        </motion.div>
      )}

      <div className="relative z-10 text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
            ${price}
          </span>
          <span className="text-gray-400 ml-2">/{period}</span>
        </div>
      </div>

      <ul className="relative z-10 space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" /> {feature}
          </li>
        ))}
      </ul>

      <div className="relative z-10">
        <Button variant={popular ? "default" : "outline"} size="lg" className="w-full">
          {buttonText} <Sparkles className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

// Pricing Section
const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for trying out our AI chatbot",
      features: ["100 messages per month", "Basic chat support", "1 language (English)", "Standard response time", "Community support"],
      buttonText: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "29",
      period: "month",
      description: "Everything you need for professional use",
      features: ["Unlimited messages", "Voice & chat support", "All 3 languages (Hindi, English, Odia)", "Priority response time", "Advanced AI features", "Analytics dashboard", "API access", "24/7 priority support"],
      buttonText: "Start Pro Trial",
      popular: true,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <PricingBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-950/95 z-2" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 backdrop-blur-xl border border-teal-400/40 rounded-full px-6 py-3 mb-8 relative">
            <Zap className="h-5 w-5 text-teal-400" />
            <span className="text-white font-semibold">Pricing Plans</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Choose Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
              AI Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. Our transparent pricing scales with your AI needs, from personal use to enterprise-level voice AI solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={i} {...plan} delay={i * 0.3} />
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-300 text-lg">
            Have questions about AI pricing?{" "}
            <span className="text-teal-400 hover:text-teal-300 cursor-pointer ml-2 inline-flex items-center gap-1">
              Check our FAQ section <Sparkles className="h-4 w-4" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
