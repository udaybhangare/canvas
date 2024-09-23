

import React from "react";

interface BrushControlProps {
    setColor: (color: string) => void;
    setBrushSize: (size: number) => void;
    setIsEraser: (isEraser: boolean) => void; // Add a setter for eraser state
    style?: React.CSSProperties; // Allow style prop
}

const BrushControl: React.FC<BrushControlProps> = ({ setColor, setBrushSize, setIsEraser, style }) => {
    return (
        <div 
            className="mb-4" 
            style={{ 
                position: 'absolute', 
                zIndex: 10, 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly more opaque
                padding: '10px 15px', 
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                backdropFilter: 'blur(10px)', // Optional: adds a blur effect behind the component
                display: 'flex', // Use flexbox to arrange items horizontally
                alignItems: 'center', // Center items vertically
                ...style, // Apply the passed-in styles
                whiteSpace: 'nowrap', // Prevent wrapping
            }}
        >
            <label htmlFor="color-picker" style={{ marginRight: '8px' }}>Color:</label>
            <input 
                id="color-picker" 
                type="color" 
                defaultValue="#ffffff" 
                onChange={(e) => {
                    setIsEraser(false); // Disable eraser when color is picked
                    setColor(e.target.value);
                }} 
                style={{ border: 'none', borderRadius: '4px', cursor: 'pointer', width: '40px' }}
            />
            <label htmlFor="brush-size" style={{ margin: '0 8px' }}>Brush Size:</label>
            <input 
                id="brush-size" 
                type="range" 
                min="1" 
                max="50" 
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))} 
                style={{ width: '100px' }} // Fixed width for the slider
            />
            <button 
                onClick={() => setIsEraser(true)} 
                style={{
                    padding: '5px 10px', 
                    backgroundColor: '#ff4d4d', // Red color for the eraser button
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    marginLeft: '10px', // Space between elements
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e60000'} // Darker red on hover
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4d4d'} // Original red on leave
            >
                Eraser
            </button>
        </div>
    );
};

export default BrushControl;

