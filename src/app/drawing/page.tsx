'use client';

import { useState } from "react";
import Canvas from '../../components/Canvas';
import BrushControl from "@/components/BrushControls";

export default function DrawingPage() { 
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(5);
    const [isEraser, setIsEraser] = useState(false); // New state for eraser

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <BrushControl setColor={setColor} setBrushSize={setBrushSize} setIsEraser={setIsEraser} />
            <Canvas 
                color={isEraser ? "#FFFFFF" : color} // Use white for eraser
                brushSize={brushSize} 
                width={800} 
                height={600} 
                className="border border-black" 
            />
        </div>
    );
}
