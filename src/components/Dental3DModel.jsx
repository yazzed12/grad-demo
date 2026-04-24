import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { FDI_TOOTH_MAP, TOOTH_TYPES, TOOTH_STATUS } from '../data/toothData';

// Status Colors
const STATUS_COLORS = {
  [TOOTH_STATUS.HEALTHY]: '#ffffff',
  [TOOTH_STATUS.PROBLEM]: '#ef4444',
  [TOOTH_STATUS.TREATED]: '#10b981',
  [TOOTH_STATUS.SELECTED]: '#fbbf24',
};

export const getToothName = (id) => {
  return FDI_TOOTH_MAP[id]?.name || 'Unknown Tooth';
};

const getToothPosition = (id) => {
  const tooth = FDI_TOOTH_MAP[id];
  if (!tooth) return { pos: [0, 0, 0], rot: [0, 0, 0] };

  const isUpper = tooth.arch === 'Upper';
  let index;

  // Map FDI to 0-15 index for each arch
  // Upper: 18(0)...11(7), 21(8)...28(15)
  // Lower: 48(0)...41(7), 31(8)...38(15)
  if (isUpper) {
    if (id <= 18) index = 18 - id;
    else index = id - 21 + 8;
  } else {
    if (id >= 41) index = 48 - id;
    else index = id - 31 + 8;
  }
  
  const angle = (index / 15) * Math.PI - Math.PI / 2;
  const radiusX = 2.8; 
  const radiusZ = 3.4; 
  const x = Math.sin(angle) * radiusX;
  const z = Math.cos(angle) * radiusZ * 1.1 - 2.0; 
  const y = isUpper ? 0.6 : -0.6;
  const rotX = isUpper ? 0.15 : -0.15;
  const rotY = angle;
  
  return { pos: [x, y, z], rot: [isUpper ? Math.PI + rotX : rotX, rotY, 0] };
};

const Tooth = ({ id, status, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const toothInfo = FDI_TOOTH_MAP[id];
  const { pos, rot } = useMemo(() => getToothPosition(id), [id]);

  const getColor = () => {
    if (isSelected) return STATUS_COLORS[TOOTH_STATUS.SELECTED];
    if (hovered) return '#e0e7ff';
    return STATUS_COLORS[status] || STATUS_COLORS[TOOTH_STATUS.HEALTHY];
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(id);
  };

  const type = toothInfo.type;
  let crownArgs = [0.4, 0.7, 0.25]; 
  if (type === TOOTH_TYPES.MOLAR) crownArgs = [0.65, 0.6, 0.6];
  if (type === TOOTH_TYPES.PREMOLAR) crownArgs = [0.5, 0.65, 0.4];
  if (type === TOOTH_TYPES.CANINE) crownArgs = [0.45, 0.8, 0.4];

  const scale = isSelected ? 1.15 : 1;

  return (
    <group position={pos} rotation={rot} scale={[scale, scale, scale]}>
      {/* CROWN */}
      <RoundedBox 
        name={`Tooth_${id}`}
        args={crownArgs} 
        radius={0.12} 
        smoothness={4}
        position={[0, 0.4, 0]} 
        castShadow
        receiveShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        userData={{ toothId: id }}
      >
        <meshPhysicalMaterial 
          color={getColor()} 
          roughness={0.1} 
          metalness={0.0} 
          clearcoat={1.0} 
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* ROOT */}
      <mesh 
        position={[0, -0.4, 0]} 
        castShadow
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        userData={{ toothId: id }}
      >
        <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
        <meshStandardMaterial 
          color={getColor() === STATUS_COLORS[TOOTH_STATUS.HEALTHY] ? '#fdf6e3' : getColor()} 
          roughness={0.9} 
        />
      </mesh>
    </group>
  );
};

export default function Dental3DModel({ toothData, selectedTooth, onToothSelect, viewMode }) {
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)', borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', pointerEvents: 'none' }}>
        <strong>Interactive FDI Numbering System</strong>
      </div>

      <Canvas shadows camera={{ position: [0, 2, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 15, 10]} angle={0.4} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
        <pointLight position={[-10, 5, -10]} intensity={0.6} color="#e0e7ff" />
        <pointLight position={[10, 5, -10]} intensity={0.6} color="#e0e7ff" />
        <directionalLight position={[0, -5, 5]} intensity={0.8} color="#c7d2fe" />
        
        <group position={[0, 0, 0]}>
          {(viewMode === 'both' || viewMode === 'upper') && 
            upperTeeth.map((id) => (
              <Tooth 
                key={`u-${id}`} 
                id={id} 
                status={toothData[id]?.status} 
                isSelected={selectedTooth === id}
                onClick={onToothSelect}
              />
            ))
          }
          {(viewMode === 'both' || viewMode === 'lower') && 
            lowerTeeth.map((id) => (
              <Tooth 
                key={`l-${id}`} 
                id={id} 
                status={toothData[id]?.status} 
                isSelected={selectedTooth === id}
                onClick={onToothSelect}
              />
            ))
          }
        </group>

        <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI} enableDamping dampingFactor={0.05} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

