import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ProfessionalAIBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // === Scene, Camera, Renderer ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      5000
    );
    camera.position.set(0, 0, 800);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // === Colors & Scale ===
    const globalScale = 1.5;
    const primaryColor = new THREE.Color(0x6366f1);
    const accentColor = new THREE.Color(0x8b5cf6);
    const secondaryColor = new THREE.Color(0x06b6d4);
    const tertiaryColor = new THREE.Color(0x10b981);

    // === Neural Network Group ===
    const neuralNetworkGroup = new THREE.Group();
    const neuralNodes: Array<{ group: THREE.Group; core: THREE.Mesh; ring: THREE.Mesh }> = [];

    const createNeuralNode = (
      x: number,
      y: number,
      z: number,
      size = 1,
      color = primaryColor
    ) => {
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(8 * size * globalScale, 16, 16),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 })
      );

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(12 * size * globalScale, 14 * size * globalScale, 32),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = Math.PI / 2;

      const group = new THREE.Group();
      group.add(core, ring);
      group.position.set(x, y, z);

      return { group, core, ring };
    };

    // === Network Layers ===
    const networkLayers = [
      { nodes: 8, y: -200 * globalScale, color: primaryColor },
      { nodes: 12, y: -100 * globalScale, color: accentColor },
      { nodes: 16, y: 0, color: secondaryColor },
      { nodes: 12, y: 100 * globalScale, color: accentColor },
      { nodes: 6, y: 200 * globalScale, color: tertiaryColor },
    ];

    networkLayers.forEach((layer, i) => {
      for (let j = 0; j < layer.nodes; j++) {
        const angle = (j / layer.nodes) * Math.PI * 2;
        const radius = (150 + i * 20) * globalScale;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 0.8 + Math.random() * 0.4;

        const node = createNeuralNode(x, layer.y, z, size, layer.color);
        neuralNodes.push(node);
        neuralNetworkGroup.add(node.group);
      }
    });

    // === Data Connections ("khap" lines) ===
    const createDataConnection = (start: THREE.Vector3, end: THREE.Vector3, color: THREE.Color) => {
      const points: THREE.Vector3[] = [];
      const segments = 20;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const point = new THREE.Vector3().lerpVectors(start, end, t);
        // curve for organic feel
        point.x += Math.sin(t * Math.PI) * 10 * globalScale;
        points.push(point);
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.25,
      });
      return new THREE.Line(geometry, material);
    };

    for (let l = 0; l < networkLayers.length - 1; l++) {
      const currentStart =
        networkLayers.slice(0, l + 1).reduce((sum, layer) => sum + layer.nodes, 0) -
        networkLayers[l].nodes;
      const nextStart =
        networkLayers.slice(0, l + 2).reduce((sum, layer) => sum + layer.nodes, 0) -
        networkLayers[l + 1].nodes;

      for (let i = 0; i < networkLayers[l].nodes; i++) {
        const currentIndex = currentStart + i;
        const connections = Math.min(3, networkLayers[l + 1].nodes);
        for (let j = 0; j < connections; j++) {
          const nextIndex = nextStart + ((i + j) % networkLayers[l + 1].nodes);
          if (neuralNodes[currentIndex] && neuralNodes[nextIndex]) {
            const connection = createDataConnection(
              neuralNodes[currentIndex].group.position,
              neuralNodes[nextIndex].group.position,
              networkLayers[l].color
            );
            neuralNetworkGroup.add(connection);
          }
        }
      }
    }

    scene.add(neuralNetworkGroup);

    // === Mouse interaction ===
    let targetY = 0;
    let targetX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetY = x * 0.25;
      targetX = -y * 0.15;
    };
    container.addEventListener("mousemove", handleMouseMove);

    // === Animation Loop ===
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      camera.rotation.y += (targetY - camera.rotation.y) * 0.04;
      camera.rotation.x += (targetX - camera.rotation.x) * 0.04;

      neuralNetworkGroup.rotation.y += 0.0008;

      neuralNodes.forEach((node, idx) => {
        const pulse = 1 + Math.sin(time * 2 + idx * 0.3) * 0.08;
        node.core.scale.setScalar(pulse);
        node.ring.rotation.z += 0.005;
        (node.core.material as THREE.MeshBasicMaterial).opacity =
          0.6 + Math.sin(time * 3 + idx) * 0.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    // === Resize Handling ===
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Only fills its parent section
  return <div ref={containerRef} className="absolute w-full h-[1000px] overflow-hidden" />;
};

export default ProfessionalAIBackground;
