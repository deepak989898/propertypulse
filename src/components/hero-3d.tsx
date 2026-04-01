"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, PerspectiveCamera, RoundedBox } from "@react-three/drei";

function CityBlock() {
  return (
    <>
      {[...Array(20)].map((_, index) => (
        <Float key={index} speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <RoundedBox
            args={[0.5, 1 + (index % 5), 0.5]}
            radius={0.05}
            smoothness={3}
            position={[
              (index % 5) * 1.2 - 2.4,
              (1 + (index % 5)) / 2 - 0.6,
              Math.floor(index / 5) * -1.4 + 1.8,
            ]}
          >
            <meshStandardMaterial
              color={index % 3 === 0 ? "#1e3a8a" : index % 3 === 1 ? "#10b981" : "#f59e0b"}
            />
          </RoundedBox>
        </Float>
      ))}
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[380px] w-full rounded-3xl overflow-hidden border border-dark/10 bg-white shadow-md shadow-dark/10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[4, 4, 7]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 8, 5]} intensity={1.2} />
        <pointLight position={[-5, 5, -5]} intensity={0.7} color="#3b82f6" />
        <CityBlock />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} />
      </Canvas>
    </div>
  );
}
