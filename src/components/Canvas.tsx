


'use client';

import { useRef, useState, useEffect } from 'react';
import BrushControl from './BrushControls'; // Adjust the path as necessary

interface CanvasProps {
  color: string;
  brushSize: number;
  className?: string; // Make className optional
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setIsEraser: (isEraser: boolean) => void; // Add a setter for eraser state
}

const Canvas: React.FC<CanvasProps> = ({ color, brushSize, className, setColor, setBrushSize, setIsEraser }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas and fill it with a black background
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const startDrawing = (event: MouseEvent) => {
      if (event.button !== 0) return;
      setIsDrawing(true);
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(event.clientX, event.clientY);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
    };

    const stopDrawing = (event: MouseEvent) => {
      if (event.button !== 0) return;
      setIsDrawing(false);
      ctx.closePath();
    };

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      // Clean up event listeners
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing, color, brushSize]);

  // Clear canvas function
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill with black background again
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <BrushControl 
        setColor={setColor} 
        setBrushSize={setBrushSize} 
        setIsEraser={setIsEraser}
        style={{ 
          position: 'absolute', 
          top: '10px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 10, 
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          padding: '10px', 
          borderRadius: '8px',
          backdropFilter: 'blur(10px)' 
        }} 
      />
      <button 
        onClick={clearCanvas} 
        style={{
          position: 'absolute',
          top: '10px', 
          right: '10px',
          padding: '5px 10px', 
          backgroundColor: '#ffcc00', // Yellow color for the clear button
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          zIndex: 10,
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6b800'} // Darker yellow on hover
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffcc00'} // Original yellow on leave
      >
        Clear Canvas
      </button>
      <canvas ref={canvasRef} className={className} />
    </div>
  );
};


export default Canvas;