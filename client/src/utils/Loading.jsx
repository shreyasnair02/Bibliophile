import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[50vh] min-w-[100vw] justify-center items-center">
      <span className="loading loading-infinity loading-lg scale-[2]"></span>
    </div>
  );
};

export default Loading;