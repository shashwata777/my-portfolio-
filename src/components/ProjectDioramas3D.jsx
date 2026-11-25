import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Line } from '@react-three/drei';

export function YoloDiorama({ active, onSelect, position = [1.8, 0.3, 1.2] }) {
  const scanRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (scanRef.current) {
      scanRef.current.position.z = Math.sin(t * 2.1) * 0.95;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.18;
    }
  });

  const boxOpacity = active ? 0.95 : 0.45;

  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={position}
        scale={active ? 1.15 : 0.78}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
          <planeGeometry args={[2.3, 2.3, 8, 8]} />
          <meshStandardMaterial
            color="#0f172a"
            wireframe
            emissive="#22d3ee"
            emissiveIntensity={active ? 0.65 : 0.25}
          />
        </mesh>

        {[
          { pos: [-0.45, -0.15, 0.25], size: [0.68, 0.42, 0.56], conf: '0.91' },
          { pos: [0.48, -0.18, -0.3], size: [0.54, 0.36, 0.48], conf: '0.84' },
        ].map((det, idx) => (
          <group key={idx} position={det.pos}>
            <mesh>
              <boxGeometry args={det.size} />
              <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={boxOpacity} />
            </mesh>
            <mesh position={[0, -det.size[1] * 0.35, 0]}>
              <cylinderGeometry args={[det.size[0] * 0.35, det.size[0] * 0.42, 0.08, 16]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#22d3ee"
                emissiveIntensity={0.8}
                transparent
                opacity={0.45}
              />
            </mesh>
            {active && (
              <Html distanceFactor={10} position={[0, det.size[1] * 0.75, 0]} center>
                <div
                  style={{
                    background: 'rgba(4,7,20,0.88)',
                    border: '1px solid rgba(34,211,238,0.6)',
                    color: '#67e8f9',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontFamily: 'JetBrains Mono, monospace',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  pothole {det.conf}
                </div>
              </Html>
            )}
          </group>
        ))}

        <mesh ref={scanRef} position={[0, -0.05, 0]}>
          <boxGeometry args={[2.25, 0.78, 0.02]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={active ? 0.24 : 0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export function UNetDiorama({ active, onSelect, position = [-1.8, 0.3, 1.2] }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.cos(t * 0.45) * 0.22;
    }
  });

  const layers = [
    { x: -0.95, y: 0.35, h: 1.05, w: 0.14, color: '#34d399' },
    { x: -0.48, y: 0.05, h: 0.72, w: 0.14, color: '#2dd4bf' },
    { x: 0.0, y: -0.28, h: 0.44, w: 0.18, color: '#22d3ee' },
    { x: 0.48, y: 0.05, h: 0.72, w: 0.14, color: '#2dd4bf' },
    { x: 0.95, y: 0.35, h: 1.05, w: 0.14, color: '#34d399' },
  ];

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={position}
        scale={active ? 1.15 : 0.78}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        {layers.map((layer, i) => (
          <mesh key={i} position={[layer.x, layer.y, 0]}>
            <boxGeometry args={[layer.w, layer.h, layer.h * 0.85]} />
            <meshStandardMaterial
              color={layer.color}
              emissive={layer.color}
              emissiveIntensity={active ? 0.65 : 0.25}
              transparent
              opacity={active ? 0.65 : 0.35}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        ))}

        <Line
          points={[
            [-0.95, 0.35, 0],
            [0, 0.72, 0],
            [0.95, 0.35, 0],
          ]}
          color="#6ee7b7"
          lineWidth={active ? 2 : 1}
          transparent
          opacity={active ? 0.9 : 0.45}
        />
        <Line
          points={[
            [-0.48, 0.05, 0],
            [0, 0.35, 0],
            [0.48, 0.05, 0],
          ]}
          color="#5eead4"
          lineWidth={active ? 2 : 1}
          transparent
          opacity={active ? 0.85 : 0.4}
        />
      </group>
    </Float>
  );
}

export function ExpiryDiorama({ position = [0, 0, 0] }) {
  const ringRef = useRef();
  const cardRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.55;
    if (cardRef.current) cardRef.current.rotation.y = Math.sin(t * 0.6) * 0.28;
  });

  return (
    <Float speed={1.7} rotationIntensity={0.15} floatIntensity={0.35}>
      <group position={position}>
        {/* Warranty Bill / Shield Card */}
        <group ref={cardRef}>
          <mesh>
            <boxGeometry args={[1.35, 1.7, 0.1]} />
            <meshStandardMaterial
              color="#1e1b4b"
              emissive="#7c3aed"
              emissiveIntensity={0.35}
              roughness={0.25}
              metalness={0.6}
            />
          </mesh>
          {/* Extracted scan strips */}
          {[-0.35, 0, 0.35].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0.06]}>
              <boxGeometry args={[0.92, 0.14, 0.02]} />
              <meshStandardMaterial
                color={idx === 0 ? '#34d399' : '#a78bfa'}
                emissive={idx === 0 ? '#34d399' : '#8b5cf6'}
                emissiveIntensity={0.9}
              />
            </mesh>
          ))}
        </group>

        {/* Orbiting countdown alert ring */}
        <group ref={ringRef} rotation={[Math.PI / 3, 0.25, 0]}>
          <mesh>
            <torusGeometry args={[1.28, 0.025, 16, 80]} />
            <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={1.2} />
          </mesh>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, i) => (
            <mesh key={i} position={[Math.cos(ang) * 1.28, Math.sin(ang) * 1.28, 0]}>
              <sphereGeometry args={[0.09, 14, 14]} />
              <meshStandardMaterial
                color={i === 0 ? '#f59e0b' : '#38bdf8'}
                emissive={i === 0 ? '#f59e0b' : '#38bdf8'}
                emissiveIntensity={1.2}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

export function TalentDiorama({ position = [0, 0, 0] }) {
  const scannerRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (scannerRef.current) scannerRef.current.position.y = Math.sin(t * 2.2) * 0.65;
    if (groupRef.current) groupRef.current.rotation.y = Math.cos(t * 0.5) * 0.22;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.35}>
      <group ref={groupRef} position={position}>
        {/* Resume verification slate */}
        <mesh>
          <boxGeometry args={[1.25, 1.65, 0.08]} />
          <meshStandardMaterial
            color="#17153b"
            emissive="#f472b6"
            emissiveIntensity={0.28}
            roughness={0.25}
            metalness={0.55}
          />
        </mesh>

        {/* AI Authenticity & Bot Sentinel score bars */}
        {[
          { x: -0.78, h: 1.0, color: '#34d399' },
          { x: 0.78, h: 0.75, color: '#f472b6' },
        ].map((bar, idx) => (
          <mesh key={idx} position={[bar.x, -0.2, 0.15]}>
            <boxGeometry args={[0.18, bar.h, 0.18]} />
            <meshStandardMaterial
              color={bar.color}
              emissive={bar.color}
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}

        {/* Laser verification beam */}
        <mesh ref={scannerRef}>
          <boxGeometry args={[1.45, 0.05, 0.35]} />
          <meshBasicMaterial color="#f472b6" transparent opacity={0.65} />
        </mesh>
      </group>
    </Float>
  );
}

export function RagDiorama({ position = [0, 0, 0] }) {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6;
      coreRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <Float speed={1.6} rotationIntensity={0.14} floatIntensity={0.35}>
      <group position={position}>
        {/* PDF / OCR Input Node */}
        <mesh position={[-1.15, 0.2, 0]}>
          <boxGeometry args={[0.45, 0.62, 0.08]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.75} />
        </mesh>

        {/* Central ChromaDB Vector Lattice */}
        <group ref={coreRef} position={[0, 0, 0]}>
          <mesh>
            <icosahedronGeometry args={[0.52, 0]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#34d399"
              emissiveIntensity={0.7}
              wireframe
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={1.1} />
          </mesh>
        </group>

        {/* Groq LPU Response Core */}
        <mesh position={[1.15, -0.15, 0]}>
          <dodecahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.95} />
        </mesh>

        {/* Vector retrieval links */}
        <Line
          points={[
            [-1.15, 0.2, 0],
            [0, 0, 0],
            [1.15, -0.15, 0],
          ]}
          color="#6ee7b7"
          lineWidth={2}
          transparent
          opacity={0.85}
        />
      </group>
    </Float>
  );
}
