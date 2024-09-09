import React from "react";

const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs sm:text-sm">
      1
    </div>
    <span
      className={`w-16 sm:w-24 h-1 sm:h-2 rounded-lg ${
        currentStep >= 2 ? "bg-orange-500" : "bg-orange-100"
      }`}
    ></span>
    <div
      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
        currentStep >= 2
          ? "bg-orange-500 text-white"
          : "bg-gray-300 text-gray-600"
      } flex items-center justify-center text-xs sm:text-sm`}
    >
      2
    </div>
    <span
      className={`w-16 sm:w-24 h-1 sm:h-2 rounded-lg ${
        currentStep === 3 ? "bg-orange-500" : "bg-orange-100"
      }`}
    ></span>
    <div
      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
        currentStep === 3
          ? "bg-orange-500 text-white"
          : "bg-gray-300 text-gray-600"
      } flex items-center justify-center text-xs sm:text-sm`}
    >
      3
    </div>
  </div>
);

export default ProgressBar;
