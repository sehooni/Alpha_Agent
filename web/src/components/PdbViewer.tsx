"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface PdbViewerProps {
    pdbId?: string;
    pdbData?: string | null;
    isWobbling?: boolean;
    highlightedResidues?: number[];
}

export default function PdbViewer({ pdbId, pdbData, isWobbling = false, highlightedResidues = [] }: PdbViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const viewerInstance = useRef<any>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        // @ts-ignore
        if (scriptLoaded && window.$3Dmol && viewerRef.current) {
            // @ts-ignore
            const viewer = window.$3Dmol.createViewer(viewerRef.current, {
                backgroundColor: 'rgba(0,0,0,0)'
            });
            viewerInstance.current = viewer;

            const loadModel = async () => {
                viewer.clear();
                let dataToLoad = pdbData;

                if (!dataToLoad && pdbId) {
                    try {
                        const res = await fetch(`https://files.rcsb.org/download/${pdbId}.pdb`);
                        if (res.ok) {
                            dataToLoad = await res.text();
                        }
                    } catch (e) {
                        console.error("Error fetching PDB:", e);
                    }
                }

                if (dataToLoad) {
                    const format = (dataToLoad.includes('_cell.angle_alpha') || dataToLoad.startsWith('data_')) ? 'cif' : 'pdb';
                    viewer.addModel(dataToLoad, format);
                    // Updated to V2: use lightgrey for the base structure so highlighted parts stand out
                    viewer.setStyle({}, { cartoon: { color: 'lightgrey', opacity: 0.8 } });

                    if (highlightedResidues.length > 0) {
                        viewer.setStyle({ resi: highlightedResidues }, {
                            stick: { colorscheme: 'redCarbon', radius: 0.3 },
                            cartoon: { color: 'red' }
                        });
                    }

                    viewer.zoomTo();
                    viewer.render();
                }
            };

            loadModel();

            return () => {
                if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
                viewer.clear();
            };
        }
    }, [scriptLoaded, pdbId, pdbData, highlightedResidues]);

    // Wobble Animation Effect
    useEffect(() => {
        const viewer = viewerInstance.current;
        if (!viewer || !isWobbling) {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            return;
        }

        let startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            // Apply small random jitter to simulate "Wobble"
            const rx = Math.sin(elapsed * 0.05) * 0.5;
            const ry = Math.cos(elapsed * 0.05) * 0.5;

            viewer.rotate(rx, 'x');
            viewer.rotate(ry, 'y');
            viewer.render();

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isWobbling]);

    return (
        <div className="w-full h-full relative z-10">
            <Script
                src="https://3Dmol.csb.pitt.edu/build/3Dmol-min.js"
                strategy="lazyOnload"
                onReady={() => setScriptLoaded(true)}
            />
            <div ref={viewerRef} className="w-full h-full absolute inset-0" />
        </div>
    );
}
