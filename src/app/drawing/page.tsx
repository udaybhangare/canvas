'use client';

import { useState } from "react";
import Canvas from '../../components/Canvas';

export default function DrawingPage() { 
    const [color, setColor] = useState("white");
    const [brushSize, setBrushSize] = useState(5);
    const [isEraser, setIsEraser] = useState(false); // New state for eraser

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Canvas 
                color={isEraser ? "black" : color} // Use black for eraser
                brushSize={brushSize} 
                width={800} 
                height={600} 
                className="border border-black" 
                setColor={setColor}
                setBrushSize={setBrushSize}
                setIsEraser={setIsEraser}
            />
        </div>
    );
}

