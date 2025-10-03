import { useState } from "react";

const ModelToggle = ({ activeModel, setActiveModel }) => {
  const isChecked = activeModel === "eye";

  const handleToggle = () => {
    setActiveModel(isChecked ? "retina" : "eye");
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {/* Retina Label */}
      <span
        className={`text-sm font-medium ${
          !isChecked ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Retina
      </span>

      {/* Switch */}
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="sr-only"
          />
          <div className="block h-8 w-14 rounded-full bg-primary/30"></div>
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition ${
              isChecked ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>

      {/* Eye Label */}
      <span
        className={`text-sm font-medium ${
          isChecked ? "text-primary" : "text-muted-foreground"
        }`}
      >
        Eye
      </span>
    </div>
  );
};

export default ModelToggle;
