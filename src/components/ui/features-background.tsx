import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FeaturesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    networks: THREE.Group;
    targetRotationY: number;
    targetRotationX: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create floating particle network
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const primaryColor = new THREE.Color(0x7c3aed); // matches our primary
    const accentColor = new THREE.Color(0xd946ef); // matches our accent
    
    for (let i = 0; i < particleCount; i++) {
      // Create clusters of particles
      const cluster = Math.floor(Math.random() * 8);
      const clusterX = (cluster % 4 - 1.5) * 800;
      const clusterY = (Math.floor(cluster / 4) - 0.5) * 600;
      
      positions[i * 3] = clusterX + (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 300;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

      // Color mixing
      const mix = Math.random();
      const color = primaryColor.clone().lerp(accentColor, mix);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 3 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Floating animation
          modelPosition.y += sin(time + modelPosition.x * 0.01) * 20.0;
          modelPosition.x += cos(time * 0.7 + modelPosition.z * 0.01) * 15.0;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          gl_PointSize = size * (300.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          
          gl_FragColor = vec4(vColor * strength, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create geometric network connections
    const networkGroup = new THREE.Group();
    
    // Create interconnected geometric shapes
    const createNetworkNode = (x: number, y: number, z: number, scale: number = 1) => {
      const geometry = new THREE.IcosahedronGeometry(20 * scale, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      return mesh;
    };

    // Create network nodes
    const nodes: THREE.Mesh[] = [];
    const nodePositions = [
      [-400, 200, -200],
      [0, 100, 0],
      [400, 200, -200],
      [-200, -100, 200],
      [200, -100, 200],
      [0, -300, 100],
    ];

    nodePositions.forEach(([x, y, z]) => {
      const node = createNetworkNode(x, y, z, Math.random() * 0.5 + 0.5);
      nodes.push(node);
      networkGroup.add(node);
    });

    // Create connections between nodes
    const createConnection = (start: THREE.Vector3, end: THREE.Vector3) => {
      const points = [];
      const distance = start.distanceTo(end);
      const segments = Math.floor(distance / 50);
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        // Add some curve to the connection
        point.y += Math.sin(t * Math.PI) * 30;
        points.push(point);
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xd946ef,
        transparent: true,
        opacity: 0.4,
      });
      
      return new THREE.Line(geometry, material);
    };

    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 500) {
          const connection = createConnection(nodes[i].position, nodes[j].position);
          networkGroup.add(connection);
        }
      }
    }

    scene.add(networkGroup);

    // Create floating geometric shapes
    const floatingShapes = new THREE.Group();
    
    for (let i = 0; i < 15; i++) {
      const shapes = [
        new THREE.TetrahedronGeometry(15),
        new THREE.OctahedronGeometry(12),
        new THREE.DodecahedronGeometry(10),
      ];
      
      const geometry = shapes[Math.floor(Math.random() * shapes.length)];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x7c3aed : 0xd946ef,
        transparent: true,
        opacity: 0.6,
        wireframe: true,
      });
      
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 800
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      floatingShapes.add(shape);
    }
    
    scene.add(floatingShapes);

    camera.position.set(0, 0, 800);

    // Mouse interaction
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      
      targetRotationY = x * 0.3;
      targetRotationX = -y * 0.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Update shader time uniform
      if (particleMaterial.uniforms) {
        particleMaterial.uniforms.time.value = time;
      }

      // Smooth camera movement
      camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05;
      camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05;

      // Rotate network nodes
      networkGroup.rotation.y += 0.002;
      networkGroup.rotation.x += 0.001;

      // Animate floating shapes
      floatingShapes.children.forEach((shape, index) => {
        shape.rotation.x += 0.01 + index * 0.001;
        shape.rotation.y += 0.008 + index * 0.0005;
        shape.position.y += Math.sin(time + index) * 0.5;
      });

      // Gentle particle rotation
      particles.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      networks: networkGroup,
      targetRotationY,
      targetRotationX,
    };

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default FeaturesBackground;