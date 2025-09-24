import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Headphones, GraduationCap, Store, Heart } from 'lucide-react';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(0.5),
      new THREE.TetrahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.4),
      new THREE.DodecahedronGeometry(0.5)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x6366f1, 
        transparent: true, 
        opacity: 0.6,
        wireframe: true 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.4,
        wireframe: true 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x06b6d4, 
        transparent: true, 
        opacity: 0.5,
        wireframe: true 
      })
    ];

    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)].clone();
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 50;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = (Math.random() - 0.5) * 30;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatOffset: Math.random() * Math.PI * 2
      });
      
      scene.add(mesh);
    }

    // Particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.6);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Neural network connections
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions = [];
    const connectionColors = [];
    
    for (let i = 0; i < 50; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      connectionPositions.push(start.x, start.y, start.z);
      connectionPositions.push(end.x, end.y, end.z);
      
      const color = new THREE.Color(0x6366f1);
      connectionColors.push(color.r, color.g, color.b);
      connectionColors.push(color.r, color.g, color.b);
    }
    
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));
    
    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    camera.position.z = 20;

    // Animation loop
    const animate = (time) => {
      frameId.current = requestAnimationFrame(animate);
      
      // Animate floating shapes
      shapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
        
        shape.mesh.position.y += Math.sin(time * 0.001 + shape.floatOffset) * shape.floatSpeed;
      });
      
      // Animate particles
      const particlePositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particlePositions.length; i += 3) {
        particlePositions[i + 1] += Math.sin(time * 0.001 + i) * 0.01;
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Rotate the entire particle system
      particles.rotation.y = time * 0.0005;
      
      // Animate connections
      connections.rotation.z = time * 0.0002;
      
      // Camera movement
      camera.position.x = Math.sin(time * 0.0003) * 2;
      camera.position.y = Math.cos(time * 0.0004) * 1;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate(0);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const UseCaseCard = ({ icon: Icon, title, description, color, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        z: 50
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/50 transition-all duration-700 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />
      
      {/* Holographic overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-700`} />
      
      {/* Neural network pattern overlay */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <pattern id={`neural-${title}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-indigo-400">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="20" x2="40" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-indigo-300" opacity="0.5" />
              <line x1="20" y1="20" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-indigo-300" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#neural-${title})`} />
        </svg>
      </div>
      
      <div className="relative z-10">
        <motion.div 
          className="relative p-4 rounded-2xl mb-6 w-fit overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)'
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: 15,
            boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)'
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Icon glow effect */}
          <motion.div
            className="absolute inset-0 bg-white rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <Icon className="h-8 w-8 text-white relative z-10" />
        </motion.div>
        
        <motion.h3 
          className="text-2xl font-bold text-white mb-4"
          animate={{ 
            textShadow: isHovered 
              ? '0 0 20px rgba(99, 102, 241, 0.8)' 
              : '0 0 0px rgba(99, 102, 241, 0)'
          }}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
        
        {/* Floating particles in card */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
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
      color: "from-indigo-500/20 to-purple-500/20"
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Interactive learning assistant that explains concepts in local languages, making education accessible to students across different linguistic backgrounds.",
      color: "from-purple-500/20 to-cyan-500/20"
    },
    {
      icon: Store,
      title: "Local Business",
      description: "Help local businesses connect with customers in their native language, providing product information and support in multiple regional languages.",
      color: "from-cyan-500/20 to-indigo-500/20"
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical information and appointment assistance in regional languages, making healthcare more accessible and reducing communication barriers.",
      color: "from-indigo-500/20 to-purple-500/20"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Three.js Background */}
      <ThreeJSBackground />
      
      {/* Gradient overlay for better text contrast */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
          zIndex: 2
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 backdrop-blur-xl border border-indigo-500/50 rounded-full px-6 py-3 mb-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)'
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)'
            }}
            animate={{
              boxShadow: [
                '0 8px 32px rgba(99, 102, 241, 0.2)',
                '0 8px 32px rgba(139, 92, 246, 0.3)',
                '0 8px 32px rgba(99, 102, 241, 0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Store className="h-5 w-5 text-indigo-400" />
            <span className="text-white font-semibold">Use Cases</span>
            
            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-white mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(99, 102, 241, 0.5)',
                '0 0 30px rgba(139, 92, 246, 0.7)',
                '0 0 20px rgba(99, 102, 241, 0.5)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Perfect for{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text'
              }}
            >
              Every Industry
            </span>
          </motion.h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our multilingual AI chatbot adapts to various industries and use cases, 
            providing specialized support across different sectors with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              {...useCase}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
      
      {/* Additional floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default UseCases;