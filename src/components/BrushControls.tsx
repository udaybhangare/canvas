import React from "react";

interface BrushControlProps {
    setColor: (color: string) => void;
    setBrushSize: (size: number) => void;
    setIsEraser: (isEraser: boolean) => void; // Add a setter for eraser state
}

const BrushControl: React.FC<BrushControlProps> = ({ setColor, setBrushSize, setIsEraser }) => {
    return (
        <div className="mb-4">
            <label htmlFor="color-picker">Color:</label>
            <input id="color-picker" type="color" onChange={(e) => {
                setIsEraser(false); // Disable eraser when color is picked
                setColor(e.target.value);
            }} />
            <label htmlFor="brush-size">Brush Size:</label>
            <input id="brush-size" type="range" min="1" max="50" onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
            <button onClick={() => setIsEraser(true)} className="ml-4">Eraser</button> {/* Button to activate eraser */}
        </div>
    );
};

export default BrushControl;
