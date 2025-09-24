// AnimatedNavbar.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AnimatedNavbar = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / 100,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, 100); // navbar height
    renderer.setClearColor(0x000000, 0); // transparent
    mountRef.current.appendChild(renderer.domElement);

    // Floating particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * window.innerWidth;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    camera.position.z = 100;

    // Animate
    const animate = (time: number) => {
      frameId.current = requestAnimationFrame(animate);
      particles.rotation.y = time * 0.0003;
      renderer.render(scene, camera);
    };
    animate(0);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 100;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId.current!);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Navbar content */}
      <div className="relative z-10 flex items-center justify-between px-8 h-24">
        <div className="flex items-center gap-3 text-white text-2xl font-bold">
          <img
            src="https://estpl.in/assets/images/logo/logo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span>E Square</span>
        </div>

        <ul className="flex gap-8 text-white font-semibold">
          <li className="hover:text-teal-400 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-teal-400 cursor-pointer transition">
            Features
          </li>
          <li className="hover:text-teal-400 cursor-pointer transition">
            Pricing
          </li>
          <li className="hover:text-teal-400 cursor-pointer transition">
            Contact
          </li>
        </ul>
        <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg text-white font-semibold transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
