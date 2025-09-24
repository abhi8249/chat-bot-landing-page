// AnimatedNavbar.tsx
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const AnimatedNavbar = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(100); // navbar height

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      windowWidth / windowHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Floating particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * windowWidth;
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    camera.position.z = 100;

    const animate = (time: number) => {
      frameId.current = requestAnimationFrame(animate);
      particles.rotation.y = time * 0.0003;
      renderer.render(scene, camera);
    };
    animate(0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerWidth < 640 ? 80 : 100); // smaller navbar for mobile
      camera.aspect = window.innerWidth / (window.innerWidth < 640 ? 80 : 100);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerWidth < 640 ? 80 : 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId.current!);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [windowWidth, windowHeight]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Navbar content */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 h-20 sm:h-24">
        <div className="flex items-center gap-2 sm:gap-3 text-white text-xl sm:text-2xl font-bold">
          <img
            src="https://estpl.in/assets/images/logo/logo.png"
            alt="Logo"
            className="h-8 sm:h-10 w-auto"
          />
          <span>E Square</span>
        </div>

        {/* Menu for desktop */}
        <ul className="hidden sm:flex gap-6 sm:gap-8 text-white font-semibold">
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

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button className="bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded-lg text-white font-semibold transition">
            Menu
          </button>
        </div>

        <button className="hidden sm:block bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg text-white font-semibold transition">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default AnimatedNavbar;
