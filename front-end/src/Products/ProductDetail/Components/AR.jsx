// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// const CameraOverlay = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();

//   useEffect(() => {
//     const init = async () => {
//       // Access the camera stream
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//         });
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }

//       // Set up the Three.js scene
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000
//       );
//       const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Create a cube as the 3D object
//       const geometry = new THREE.BoxGeometry(1, 1, 1);
//       const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//       const cube = new THREE.Mesh(geometry, material);
//       scene.add(cube);

//       // Load and add a 3D model
//       const loader = new GLTFLoader();
//       loader.load("/path/to/model.gltf", (gltf) => {
//         const model = gltf.scene;
//         scene.add(model);
//       });

//       // Position the camera
//       camera.position.z = 5;

//       // Render the scene
//       const animate = () => {
//         requestAnimationFrame(animate);
//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.01;
//         renderer.render(scene, camera);
//       };
//       animate();
//     };

//     init();
//   }, []);

//   return (
//     <div>
//       <div style={{ position: "relative" }}>
//         <video
//           ref={videoRef}
//           width='640'
//           height='480'
//           // style={{ display: "none" }}
//         ></video>
//       </div>
//       <div style={{ position: "absolute" }}>
//         {" "}
//         <canvas ref={canvasRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default CameraOverlay;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CameraOverlay = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const renderer = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const cube = useRef(null);

  useEffect(() => {
    // Initialize the renderer, scene, and camera
    renderer.current = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.current.position.z = 5;

    // Create a cube geometry and material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube.current = new THREE.Mesh(geometry, material);
    scene.current.add(cube.current);

    // Start the animation loop
    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.current.rotation.x += 0.01;
    cube.current.rotation.y += 0.01;

    // Render the scene with the camera
    renderer.current.render(scene.current, camera.current);
  };

  const handleCameraStream = (stream) => {
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  // Handle error if access to camera is denied
  const handleCameraError = (error) => {
    console.error("Error accessing camera:", error);
  };

  // Request access to the camera
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(handleCameraStream)
      .catch(handleCameraError);
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div>
      <video ref={videoRef}></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CameraOverlay;
