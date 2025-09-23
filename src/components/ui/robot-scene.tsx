import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  Text3D, 
  Center,
  Sparkles,
  Stars,
  useTexture,
  MeshDistortMaterial,
  Sphere
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Animated Robot Component
const AnimatedRobot = ({ position, scale = 1, color = "#6366f1" }: any) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group 
        ref={meshRef} 
        position={position} 
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Robot Head */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color={hovered ? "#8b5cf6" : color} 
            metalness={0.8} 
            roughness={0.2}
            emissive={hovered ? "#4c1d95" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>
        
        {/* Robot Eyes */}
        <mesh position={[-0.2, 1.6, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.2, 1.6, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>

        {/* Robot Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.2, 1.5, 0.8]} />
          <meshStandardMaterial 
            color={hovered ? "#8b5cf6" : color} 
            metalness={0.7} 
            roughness={0.3}
            emissive={hovered ? "#3730a3" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>

        {/* Robot Arms */}
        <mesh position={[-0.8, 0.8, 0]} rotation={[0, 0, Math.PI * 0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color={hovered ? "#a855f7" : color} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.8, 0.8, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
          <meshStandardMaterial color={hovered ? "#a855f7" : color} metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Robot Legs */}
        <mesh position={[-0.3, -0.7, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
          <meshStandardMaterial color={hovered ? "#a855f7" : color} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.3, -0.7, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 1.2, 8]} />
          <meshStandardMaterial color={hovered ? "#a855f7" : color} metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Sparkles around robot when hovered */}
        {hovered && <Sparkles count={50} scale={3} size={2} speed={0.4} color="#8b5cf6" />}
      </group>
    </Float>
  );
};

// Floating Orb Component
const FloatingOrb = ({ position, color }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <Sphere args={[0.3, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
      <pointLight color={color} intensity={1} distance={10} />
    </mesh>
  );
};

// Interactive Particles
const InteractiveParticles = () => {
  const { mouse, viewport } = useThree();
  const meshRef = useRef<THREE.Points>(null);

  const particles = React.useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.01;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      
      meshRef.current.rotation.x = mouse.y * viewport.height * 0.00005;
      meshRef.current.rotation.y = mouse.x * viewport.width * 0.00005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6366f1" transparent opacity={0.6} />
    </points>
  );
};

// Main 3D Scene Component
const RobotScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="!absolute !inset-0"
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <pointLight position={[10, -10, 10]} intensity={0.5} color="#8b5cf6" />

        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Interactive Elements */}
        <InteractiveParticles />
        
        {/* Floating Orbs */}
        <FloatingOrb position={[-6, 2, -3]} color="#6366f1" />
        <FloatingOrb position={[6, -1, -2]} color="#8b5cf6" />
        <FloatingOrb position={[-4, -2, 2]} color="#ec4899" />
        
        {/* Animated Robots */}
        <AnimatedRobot position={[-3, 0, 0]} scale={0.8} color="#6366f1" />
        <AnimatedRobot position={[3, 0, -1]} scale={0.9} color="#8b5cf6" />
        <AnimatedRobot position={[0, -1, -3]} scale={0.7} color="#ec4899" />

        {/* Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default RobotScene;