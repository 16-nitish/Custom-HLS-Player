import React from "react";

import { useState, useRef, useCallback } from "react";

export function Slider({
  value,
  onValueChange,
  className = "",
  min = 0,
  max = 100,
  step = 1,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    updateValue(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        updateValue(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateValue = (e) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const newValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    onValueChange([Math.max(min, Math.min(max, steppedValue))]);
  };

  // Add event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const percentage = ((value[0] - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className={`relative flex items-center w-full h-5 cursor-pointer ${className}`}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-600 rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
        </div>
      </div>
    </div>
  );
}
