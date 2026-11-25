import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function createGlowAuraTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
  grad.addColorStop(0, 'rgba(139, 92, 246, 0.55)');
  grad.addColorStop(0.45, 'rgba(56, 189, 248, 0.24)');
  grad.addColorStop(1, 'rgba(7, 6, 21, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Flood-fills exterior near-black pixels from the image border to transparent
 * and softens edge pixels so the artwork floats seamlessly in 3D space.
 */
function buildSeamlessTexture(img) {
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const total = w * h;
  const visited = new Uint8Array(total);
  const isBg = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const isDarkExterior = (idx) => {
    const p = idx * 4;
    const maxC = Math.max(data[p], data[p + 1], data[p + 2]);
    return maxC < 24;
  };

  const enqueue = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const idx = y * w + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    if (isDarkExterior(idx)) {
      isBg[idx] = 1;
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < w; x++) {
    enqueue(x, 0);
    enqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    enqueue(0, y);
    enqueue(w - 1, y);
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % w;
    const y = (idx - x) / w;
    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }

  // Apply transparent exterior + soft 3px edge feather + subtle bottom fade
  for (let y = 0; y < h; y++) {
    const bottomFade = y > h * 0.9 ? Math.max(0, 1 - (y - h * 0.9) / (h * 0.1)) : 1;
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const p = idx * 4;
      if (isBg[idx]) {
        data[p + 3] = 0;
        continue;
      }

      // Check proximity to background for anti-aliased edge feathering
      let bgNeighbors = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < w && ny >= 0 && ny < h && isBg[ny * w + nx]) {
            bgNeighbors++;
          }
        }
      }

      let alpha = 255 * bottomFade;
      if (bgNeighbors > 0) {
        const edgeRatio = 1 - bgNeighbors / 25;
        alpha = Math.min(alpha, Math.max(25, edgeRatio * 255));
      }
      data[p + 3] = alpha;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function FloatingCubeCluster() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
      groupRef.current.position.y = -1.38 + Math.sin(t * 1.5) * 0.1;
    }
  });

  const cubes = [
    { pos: [0, 0, 0], size: 0.34, color: '#8b5cf6', rot: [0.4, 0.5, 0.2] },
    { pos: [0.42, 0.22, -0.15], size: 0.26, color: '#3b82f6', rot: [0.2, 0.8, 0.5] },
    { pos: [-0.34, 0.32, 0.12], size: 0.21, color: '#a78bfa', rot: [0.6, 0.2, 0.4] },
    { pos: [0.26, -0.28, 0.22], size: 0.19, color: '#38bdf8', rot: [0.1, 0.4, 0.8] },
  ];

  return (
    <group ref={groupRef} position={[2.45, -1.38, 0.72]}>
      {cubes.map((c, idx) => (
        <mesh key={idx} position={c.pos} rotation={c.rot}>
          <boxGeometry args={[c.size, c.size, c.size]} />
          <meshStandardMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

function InteractiveCrystal({ position, color, label, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.9;
      meshRef.current.rotation.x += delta * 0.45;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.35}>
      <group position={position}>
        <mesh
          ref={meshRef}
          scale={hovered ? 1.28 : 1}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <octahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 0.75}
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
        <Html distanceFactor={8} position={[0, -0.28, 0]} center>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            style={{
              background: hovered ? 'rgba(124, 58, 237, 0.85)' : 'rgba(13, 12, 34, 0.82)',
              border: `1px solid ${color}`,
              color: '#f8fafc',
              padding: '3px 9px',
              borderRadius: '999px',
              fontSize: '10.5px',
              fontFamily: 'JetBrains Mono, monospace',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              boxShadow: `0 0 12px ${color}44`,
            }}
          >
            {label}
          </button>
        </Html>
      </group>
    </Float>
  );
}

function HeroArtwork3DStage({ onTileClick }) {
  const stageRef = useRef();
  const ringFrontRef = useRef();
  const ringBackRef = useRef();
  const [heroTexture, setHeroTexture] = useState(null);
  const [aspect, setAspect] = useState(16 / 9);
  const auraTexture = useMemo(() => createGlowAuraTexture(), []);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/hero-dev.webp';
    img.onload = () => {
      if (!active) return;
      const tex = buildSeamlessTexture(img);
      setAspect((img.naturalWidth || 16) / (img.naturalHeight || 9));
      setHeroTexture(tex);
    };
    return () => {
      active = false;
    };
  }, []);

  useFrame((state, delta) => {
    if (stageRef.current) {
      const targetRotY = state.pointer.x * 0.24;
      const targetRotX = -state.pointer.y * 0.14;
      stageRef.current.rotation.y = THREE.MathUtils.lerp(
        stageRef.current.rotation.y,
        targetRotY,
        Math.min(1, delta * 4.2)
      );
      stageRef.current.rotation.x = THREE.MathUtils.lerp(
        stageRef.current.rotation.x,
        targetRotX,
        Math.min(1, delta * 4.2)
      );
    }
    if (ringFrontRef.current) {
      ringFrontRef.current.rotation.z += delta * 0.12;
    }
    if (ringBackRef.current) {
      ringBackRef.current.rotation.z -= delta * 0.1;
    }
  });

  const planeHeight = 3.55;
  const planeWidth = planeHeight * aspect;

  return (
    <group ref={stageRef} position={[0, 0.08, 0]}>
      {/* Ambient volumetric glow behind artwork */}
      <mesh position={[0, 0.05, -0.55]}>
        <planeGeometry args={[6.4, 5.2]} />
        <meshBasicMaterial map={auraTexture} transparent opacity={0.95} depthWrite={false} />
      </mesh>

      {/* Rear tilted 3D orbital energy ring */}
      <mesh ref={ringBackRef} position={[0, 0.12, -0.3]} rotation={[1.15, 0.28, -0.2]}>
        <torusGeometry args={[2.35, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={1.6}
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* Main 3D floating artwork plane with seamless feathered edges */}
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.2}>
        {heroTexture && (
          <mesh
            position={[0, 0.05, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onTileClick('projects');
            }}
          >
            <planeGeometry args={[planeWidth, planeHeight, 24, 24]} />
            <meshBasicMaterial
              map={heroTexture}
              transparent
              alphaTest={0.02}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </Float>

      {/* Front secondary neon arc wrapping around in Z-depth */}
      <mesh ref={ringFrontRef} position={[0, -0.1, 0.18]} rotation={[1.28, -0.22, 0.35]}>
        <torusGeometry args={[2.52, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.4}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Interactive 3D Floating Skill & Project Nodes in foreground Z-depth */}
      <InteractiveCrystal
        position={[-1.78, 1.32, 0.48]}
        color="#a78bfa"
        label="AI / PyTorch"
        onClick={() => onTileClick('ai-ml')}
      />
      <InteractiveCrystal
        position={[1.75, 1.28, 0.48]}
        color="#38bdf8"
        label="YOLOv8 & U-Net"
        onClick={() => onTileClick('projects')}
      />
      <InteractiveCrystal
        position={[-1.72, -1.08, 0.55]}
        color="#34d399"
        label="React & GenAI"
        onClick={() => onTileClick('genai')}
      />

      {/* Foreground 3D Cube Cluster */}
      <FloatingCubeCluster />
    </group>
  );
}

export default function HeroWorkspace3D({ onTileClick }) {
  return (
    <div className="hero-3d-wrap">
      <Canvas
        camera={{ position: [0, 0.08, 6.15], fov: 44 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.85} />
        <pointLight position={[3, 4, 4]} intensity={2.2} color="#a78bfa" />
        <pointLight position={[-4, 2, 3]} intensity={1.6} color="#38bdf8" />

        <Sparkles
          count={55}
          scale={[6.8, 4.4, 3]}
          size={1.7}
          speed={0.35}
          color="#c4b5fd"
        />

        <HeroArtwork3DStage onTileClick={onTileClick} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.4}
          maxPolarAngle={Math.PI / 1.75}
          minAzimuthAngle={-0.45}
          maxAzimuthAngle={0.45}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
