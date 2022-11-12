import React from "react";

const Board = () => {
  return (
    <div className="pt-4 pl-4">
      <div className="bucket"></div>
      <div className="new-bucket h-32 w-56 rounded-lg border border-white p-2">
        <input
          type="text"
          className="w-full rounded border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
        />
      </div>
    </div>
  );
};

export default Board;
