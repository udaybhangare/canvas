import { useRef, useState, useEffect } from 'react';
import BrushControl from './BrushControls'; // Adjust the path as necessary

interface CanvasProps {
  color: string;
  brushSize: number;
  width: number;
  height: number;
  className?: string; // Make className optional
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  setIsEraser: (isEraser: boolean) => void; // Add a setter for eraser state
}

const Canvas: React.FC<CanvasProps> = ({ color, brushSize, width, height, className, setColor, setBrushSize, setIsEraser }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Effect to set the black background once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safely exit if canvas is null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Safely exit if context is null

    // Fill the canvas with a black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
  }, [width, height]); // Only run when width or height changes

  // Effect for drawing functionality
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safely exit if canvas is null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Safely exit if context is null

    const startDrawing = (event: MouseEvent) => {
      if (event.button !== 0) return; // Only draw on left mouse button
      setIsDrawing(true);
      ctx.strokeStyle = color; // Set the stroke color
      ctx.lineWidth = brushSize; // Set the brush size
      ctx.beginPath();
      ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;
      ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      ctx.stroke();
    };

    const stopDrawing = (event: MouseEvent) => {
      if (event.button !== 0) return; // Only stop drawing on left mouse button release
      setIsDrawing(false);
      ctx.closePath();
    };

    // Add event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing); // Stop drawing if mouse leaves the canvas

    return () => {
      // Clean up event listeners
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, [isDrawing, color, brushSize]); // Add isDrawing, color, and brushSize to dependencies

  return (
    <div>
      <BrushControl 
      setColor={setColor} 
      setBrushSize={setBrushSize} 
      setIsEraser={setIsEraser}
      style={{ 
        position: 'absolute', 
        top: '10px', // Position from the top
        left: '50%', 
        transform: 'translateX(-50%)', // Center horizontally
        zIndex: 10, 
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
        padding: '10px', 
        borderRadius: '8px',
        backdropFilter: 'blur(10px)' // Optional: adds a blur effect behind the component
       }} />
      <canvas ref={canvasRef} width={width} height={height} className={className} />
    </div>
  );
};

export default Canvas;