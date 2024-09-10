import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-white z-50">
      <div className="h-16 w-16 border-4 border-h1Text border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
