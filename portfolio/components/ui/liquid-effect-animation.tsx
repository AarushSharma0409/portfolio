"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    __liquidApp?: {
      dispose: () => void;
      loadImage: (url: string) => void;
      liquidPlane: {
        material: {
          metalness: number;
          roughness: number;
        };
        uniforms: {
          displacementScale: {
            value: number;
          };
        };
      };
      setRain: (enabled: boolean) => void;
    };
  }
}

export function Liquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') return

    // Create a unique ID for the canvas to prevent conflicts
    const canvasId = `liquid-canvas-${Math.random().toString(36).substr(2, 9)}`
    canvasRef.current.id = canvasId

    // Create script element
    const script = document.createElement('script')
    script.type = 'module'
    script.textContent = `
      import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js')
        .then(module => {
          const LiquidBackground = module.default;
          const canvas = document.getElementById('${canvasId}');
          if (canvas) {
           canvas.style.filter = 'invert(1)';
            const app = LiquidBackground(canvas);
            app.liquidPlane.material.metalness = 0.75;
            app.liquidPlane.material.roughness = 0.4;
            app.liquidPlane.uniforms.displacementScale.value = 5;
            app.setRain(false);
            window.__liquidApp = app;
            }
          })
          .catch(error => {
            console.error('Failed to load liquid effect:', error);
          });
    `

    scriptRef.current = script;
    document.body.appendChild(script);

    return () => {
      if (window.__liquidApp?.dispose) {
        window.__liquidApp.dispose();
        delete window.__liquidApp;
      }
      
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 m-0 w-full h-full touch-none overflow-hidden"
      style={{ 
        fontFamily: '"Montserrat", serif',
        background: 'black'
      }}
    >
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          background: 'black',
          opacity: 0.9
        }}
      />
    </div>
  );
}
export default Liquid;