import React from "react";

interface BrushControlProps {
    setColor: (color: string) => void;
    setBrushSize: (size: number) => void;
}

const BrushControl: React.FC<BrushControlProps> = ({ setColor, setBrushSize }) => {
    return (
        <div className="mb-4">
            <label htmlFor="color-picker">Color:</label>
            <input id="color-picker" type="color" onChange={(e) => setColor(e.target.value)} />
            <label htmlFor="brush-size">Brush Size:</label>
            <input id="brush-size" type="range" min="1" max="50" onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} />
        </div>
    );
};

export default BrushControl;
