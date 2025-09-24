import React, { useRef, useEffect, useState } from 'react';
import './DiceTwo.css';

const ThreeDDice = ({ 
  width = 400, 
  height = 400, 
  className = "",
  onRoll = null 
}) => {
  const canvasRef = useRef(null);
  const illustrationRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    // Check if Zdog is available
    if (typeof window === 'undefined' || !window.Zdog) {
      console.warn('Zdog library not found. Please include Zdog in your project.');
      return;
    }

    const { Illustration, Group, Box, Hemisphere, TAU, easeInOut } = window.Zdog;
    
    const colors = {
      white: "hsl(0 0% 99%)",
      black: "hsl(206 6% 24%)",
      red: "hsl(4 77% 55%)"
    };
    
    const stroke = 20;
    const size = 50;
    const diameter = 13;
    const offset = 16;

    // Initialize illustration
    const illustration = new Illustration({
      element: canvasRef.current,
      zoom: 2,
      rotate: {
        x: (TAU / 14) * -1,
        y: TAU / 8
      }
    });

    illustrationRef.current = illustration;

    // Create dice
    const dice = new Box({
      addTo: illustration,
      color: colors.white,
      stroke,
      width: size,
      height: size,
      depth: size
    });

    // Create dot template
    const dot = new Hemisphere({
      color: colors.black,
      stroke: 0,
      diameter
    });

    // Face 1 (top)
    const one = new Group({
      addTo: dice,
      translate: {
        y: (size / 2 + stroke / 2) * -1
      },
      rotate: {
        x: TAU / 4
      }
    });
    dot.copy({
      addTo: one,
      color: colors.red
    });

    // Face 6 (bottom)
    const six = new Group({
      addTo: dice,
      translate: {
        y: size / 2 + stroke / 2
      },
      rotate: {
        x: (TAU / 4) * -1
      }
    });
    for (const { x, y } of [
      { x: offset, y: offset * -1 },
      { x: offset, y: 0 },
      { x: offset, y: offset },
      { x: offset * -1, y: offset },
      { x: offset * -1, y: 0 },
      { x: offset * -1, y: offset * -1 }
    ]) {
      dot.copy({
        addTo: six,
        translate: { x, y }
      });
    }

    // Face 2 (back)
    const two = new Group({
      addTo: dice,
      translate: {
        z: (size / 2 + stroke / 2) * -1
      },
      rotate: {
        x: TAU / 2
      }
    });
    for (const { x, y } of [
      { x: offset, y: offset * -1 },
      { x: offset * -1, y: offset }
    ]) {
      dot.copy({
        addTo: two,
        translate: { x, y }
      });
    }

    // Face 5 (front)
    const five = new Group({
      addTo: dice,
      translate: {
        z: size / 2 + stroke / 2
      }
    });
    for (const { x, y } of [
      { x: 0, y: 0 },
      { x: offset, y: offset * -1 },
      { x: offset, y: offset },
      { x: offset * -1, y: offset },
      { x: offset * -1, y: offset * -1 }
    ]) {
      dot.copy({
        addTo: five,
        translate: { x, y }
      });
    }

    // Face 3 (left)
    const three = new Group({
      addTo: dice,
      translate: {
        x: (size / 2 + stroke / 2) * -1
      },
      rotate: {
        y: TAU / 4
      }
    });
    for (const { x, y } of [
      { x: 0, y: 0 },
      { x: offset, y: offset * -1 },
      { x: offset * -1, y: offset }
    ]) {
      dot.copy({
        addTo: three,
        translate: { x, y }
      });
    }

    // Face 4 (right)
    const four = new Group({
      addTo: dice,
      translate: {
        x: size / 2 + stroke / 2
      },
      rotate: {
        y: (TAU / 4) * -1
      }
    });
    for (const { x, y } of [
      { x: offset, y: offset * -1 },
      { x: offset, y: offset },
      { x: offset * -1, y: offset },
      { x: offset * -1, y: offset * -1 }
    ]) {
      dot.copy({
        addTo: four,
        translate: { x, y }
      });
    }

    illustration.updateRenderGraph();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const rollDice = () => {
    if (isRolling || !illustrationRef.current || !window.Zdog) return;

    const { TAU, easeInOut } = window.Zdog;
    const illustration = illustrationRef.current;
    
    setIsRolling(true);
    
    let ticker = 0;
    const cycle = 125;
    
    const angles = {
      x: illustration.rotate.x,
      y: illustration.rotate.y,
      z: illustration.rotate.z
    };
    
    // Generate random target angles
    const anglesNext = {
      x: (Math.floor(Math.random() * 4) * TAU) / 4 + TAU * 2,
      y: (Math.floor(Math.random() * 4) * TAU) / 4 + TAU * 2,
      z: (Math.floor(Math.random() * 4) * TAU) / 4 + TAU * 2
    };

    const animate = () => {
      if (ticker >= cycle) {
        // Animation complete
        illustration.rotate.x = anglesNext.x % TAU;
        illustration.rotate.y = anglesNext.y % TAU;
        illustration.rotate.z = anglesNext.z % TAU;
        illustration.updateRenderGraph();
        
        setIsRolling(false);
        
        // Call onRoll callback if provided
        if (onRoll) {
          onRoll();
        }
        
        ticker = 0;
        animationFrameRef.current = null;
      } else {
        // Continue animation
        const ease = easeInOut((ticker / cycle) % 1, 3);
        illustration.rotate.x = angles.x + (anglesNext.x - angles.x) * ease;
        illustration.rotate.y = angles.y + (anglesNext.y - angles.y) * ease;
        illustration.rotate.z = angles.z + (anglesNext.z - angles.z) * ease;
        illustration.updateRenderGraph();
        
        ticker++;
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <div className={`inline-block relative aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`
          absolute left-1/2 bottom-0 -translate-x-1/2
          font-bold uppercase tracking-wide text-sm
          text-gray-100 bg-slate-700 hover:bg-slate-600
          border-none px-3 py-2 rounded-lg
          transition-transform duration-250 ease-out
          transform-origin-bottom
          focus:outline-offset-1 focus:outline-slate-700
          ${isRolling ? 'scale-75 bg-slate-600' : 'scale-100'}
        `}
        style={{
          transition: 'scale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        Roll
      </button>
    </div>
  );
};

console.log("ThreeDDice component loaded");


export default ThreeDDice;