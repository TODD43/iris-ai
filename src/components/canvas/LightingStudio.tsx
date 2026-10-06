"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { Product } from "@/lib/store";

const defaultFace = Array.from({ length: 120 }, (_, index) => {
  const angle = (index / 120) * Math.PI * 2;
  const x = Math.cos(angle) * 0.5;
  const y = Math.sin(angle) * 0.8;
  return [x, y, 0.15];
}) as number[][];

export function FaceMesh3D({
  landmarks,
  product,
  environment,
}: {
  landmarks: number[][] | null;
  product: Product | null;
  environment?: string;
}) {
  const points = useMemo(() => {
    const source = landmarks && landmarks.length > 0 ? landmarks : defaultFace;
    return source.slice(0, 180).map(([x, y, z], index) => ({
      key: `landmark-${index}`,
      position: [x * 1.5, y * 1.4, z * 1.4 + 0.15] as [number, number, number],
    }));
  }, [landmarks]);

  const color = product?.shadeHex ?? "#f4c8c3";
  const roughness = product?.roughness ?? 0.48;
  const metalness = product?.metalness ?? 0.12;
  const clearcoat = product?.clearcoat ?? 0.18;

  const env = environment ?? "daylight";
  const lighting = {
    daylight: { background: "#dfe7ff", hemisphere: "#dfe7ff", directional: "#f2f5ff" },
    golden: { background: "#f9d7a2", hemisphere: "#ffc88b", directional: "#ffe9c5" },
    office: { background: "#dfe8ff", hemisphere: "#b4c7ff", directional: "#f5f7ff" },
    evening: { background: "#2b1b40", hemisphere: "#8b5cf6", directional: "#f9a8d4" },
  }[env];

  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 35 }}>
        <color attach="background" args={[lighting.background]} />
        <ambientLight intensity={0.8} color={lighting.hemisphere} />
        <directionalLight intensity={1.2} position={[1.5, 2, 2]} color={lighting.directional} />
        <pointLight position={[-1, -1, 2]} intensity={1.4} color="#ffffff" />

        <group rotation={[0.2, 0, 0]}>
          {points.map(({ key, position }) => (
            <mesh key={key} position={position}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshPhysicalMaterial
                color={color}
                roughness={roughness}
                metalness={metalness}
                clearcoat={clearcoat}
                clearcoatRoughness={0.2}
                emissive={new THREE.Color(color).multiplyScalar(0.08)}
              />
            </mesh>
          ))}
        </group>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
