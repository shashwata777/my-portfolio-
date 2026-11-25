import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  YoloDiorama,
  UNetDiorama,
  ExpiryDiorama,
  TalentDiorama,
  RagDiorama,
} from './ProjectDioramas3D';

export default function ProjectCard3D({ type }) {
  return (
    <div className="project-3d-canvas-box">
      <Canvas camera={{ position: [0, 0.7, 3.8], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 4, 4]} intensity={1.8} color="#a78bfa" />
        <pointLight position={[-4, -2, 3]} intensity={1.2} color="#38bdf8" />
        {type === 'yolo' && <YoloDiorama active position={[0, -0.05, 0]} />}
        {type === 'unet' && <UNetDiorama active position={[0, -0.1, 0]} />}
        {type === 'expiry' && <ExpiryDiorama position={[0, 0, 0]} />}
        {type === 'talent' && <TalentDiorama position={[0, 0, 0]} />}
        {type === 'rag' && <RagDiorama position={[0, 0, 0]} />}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
