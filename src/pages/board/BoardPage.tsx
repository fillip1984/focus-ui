import { useContext } from "react";
import { BsArrowLeft } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
import BucketView from "../../components/board/BucketView";
import NewBucket from "../../components/board/NewBucket";
import { BoardContext } from "../../contexts/BoardContext";
import { generateId } from "../../Types";

const BoardPage = () => {
  const { findBoardById, addBucket } = useContext(BoardContext);
  const { id } = useParams();
  const board = findBoardById(id);

  const handleAddBucket = (name: string) => {
    const newBucket = { id: generateId(), name, tasks: [] };
    addBucket(Number(id), newBucket);
  };

  return (
    <div>
      {board && (
        <div>
          <div className="fixed top-0 right-0 left-0 flex justify-between bg-slate-300 p-4 text-slate-500">
            <h3>{board.name}</h3>
            <Link to="/boards" className="flex text-4xl">
              <BsArrowLeft />
            </Link>
          </div>
          <div className="mt-24 flex h-[80vh] w-[300vw] gap-4 px-2">
            {board.buckets?.map((bucket) => (
              <BucketView key={bucket.id} boardId={board.id} bucket={bucket} />
            ))}
            <NewBucket handleAddBucket={handleAddBucket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
