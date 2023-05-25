import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const CameraOverlay = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const init = async () => {
      // Access the camera stream
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }

      // Set up the Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create a cube as the 3D object
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Load and add a 3D model
      const loader = new GLTFLoader();
      loader.load("/path/to/model.gltf", (gltf) => {
        const model = gltf.scene;
        scene.add(model);
      });

      // Position the camera
      camera.position.z = 5;

      // Render the scene
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    };

    init();
  }, []);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          width='640'
          height='480'
          // style={{ display: "none" }}
        ></video>
      </div>
      <div style={{ position: "absolute" }}>
        {" "}
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default CameraOverlay;
