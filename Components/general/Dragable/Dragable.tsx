import React, { useState, MouseEvent } from 'react';

/**
 * DraggableComponent is a React component that enables the creation of draggable elements.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to be placed inside the draggable component.
 * @param {Object} [props.startPosition] - The initial position of the draggable component. Defaults to { x: 0, y: 0 }.
 * @param {Object} [props.startOffset] - The initial offset of the draggable component. Defaults to { x: 0, y: 0 }.
 * @returns {React.ReactElement} A draggable component.
 *  Example to Start in Lower Corner
 *  <DraggableComponent
 *  startPosition={{ x: window.innerWidth - 100, y: window.innerHeight - 50 }}
 *  startOffset={{ x: 50, y: 25 }}
 *  >
 */

/*

*/


interface DraggableComponentProps {
  children: React.ReactNode;
  startPosition?:{x:number,y:number};
  startOffset?:{x:number,y:number};
}



const Draggable: React.FC<DraggableComponentProps> = ({ 
  children,
  startPosition = { x: 0, y: 0 },
  startOffset = { x: 0, y: 0 }
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>(startPosition);
  const [offset, setOffset] = useState<{ x: number; y: number }>(startOffset);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const componentStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex:'1040',
    backgroundColor:'red'
  };

  return (
    <div
      className="draggable-component"
      style={componentStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default Draggable;
