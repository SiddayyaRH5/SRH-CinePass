import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-30 w-30 border-8 border-gray-300 border-t-blue-500"></div>
    </div>
  );
};

export default Loading;
