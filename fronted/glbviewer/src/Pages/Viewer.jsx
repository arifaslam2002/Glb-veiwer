import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";
import '../App.css';
function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

function Loader() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#667eea" wireframe />
        </mesh>
    );
}

export default function Viewer() {
    const url = new URLSearchParams(window.location.search).get("url");
    const filename = url?.split('/').pop() || "3D Model";

    return (
        <div className="viewer">
            <div className="viewer-header">
                <div className="viewer-title">🎨 {decodeURIComponent(filename)}</div>
                <a href="/" className="back-btn">← Back to Home</a>
            </div>

            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                <Suspense fallback={<Loader />}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <directionalLight 
                        position={[5, 5, 5]} 
                        intensity={1} 
                        castShadow 
                    />
                    <pointLight position={[-5, 5, -5]} intensity={0.5} />
                    <Environment preset="studio" />
                    <OrbitControls 
                        enableDamping 
                        dampingFactor={0.05}
                        minDistance={1}
                        maxDistance={20}
                    />
                    <Model url={url} />
                </Suspense>
            </Canvas>

            <div className="viewer-controls">
                🖱️ Left click + drag to rotate • Right click + drag to pan • Scroll to zoom
            </div>
        </div>
    );
}