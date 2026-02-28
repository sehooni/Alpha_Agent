"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface PdbViewerProps {
    pdbId?: string;
    pdbData?: string | null;
}

export default function PdbViewer({ pdbId, pdbData }: PdbViewerProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if (scriptLoaded && window.$3Dmol && viewerRef.current) {
            // @ts-ignore
            const viewer = window.$3Dmol.createViewer(viewerRef.current, {
                backgroundColor: 'rgba(0,0,0,0)'
            });

            const loadModel = async () => {
                viewer.clear();
                let dataToLoad = pdbData;

                if (!dataToLoad && pdbId) {
                    try {
                        const res = await fetch(`https://files.rcsb.org/download/${pdbId}.pdb`);
                        if (res.ok) {
                            dataToLoad = await res.text();
                        } else {
                            console.error("Failed to fetch PDB:", res.status);
                        }
                    } catch (e) {
                        console.error("Error fetching PDB:", e);
                    }
                }

                if (dataToLoad) {
                    viewer.addModel(dataToLoad, "pdb");
                    viewer.setStyle({}, { cartoon: { color: 'spectrum' } });

                    // Emphasize the active hotspot just for demo effect
                    // In a real app this would be dynamic
                    viewer.setStyle({ resi: [292, 293] }, { cartoon: { color: 'spectrum' }, stick: { colorscheme: 'redCarbon', radius: 0.2 } });

                    viewer.zoomTo();
                    viewer.render();
                }
            };

            loadModel();

            return () => {
                viewer.clear();
            };
        }
    }, [scriptLoaded, pdbId, pdbData]);

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
