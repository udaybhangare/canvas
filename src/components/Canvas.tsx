import { useRef, useState, useEffect } from 'react';

interface CanvasProps {
  color: string;
  brushSize: number;
  width: number;
  height: number;
  className?: string; // Make className optional
}

const Canvas: React.FC<CanvasProps> = ({ color, brushSize, width, height, className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safely exit if canvas is null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Safely exit if context is null

    const startDrawing = (event: MouseEvent) => {
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

    const stopDrawing = () => {
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
  }, [isDrawing, color, brushSize]); // Add color and brushSize to dependencies

  return <canvas ref={canvasRef} width={width} height={height} className={className} />;
};

export default Canvas;
