import { useContext, useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
import BucketView from "../../components/board/BucketView";
import NewBucket from "../../components/board/NewBucket";
import { BoardContext } from "../../contexts/BoardContext";
import { Board, Bucket, generateId } from "../../Types";

const BoardPage = () => {
  const { boards } = useContext(BoardContext);
  const { id } = useParams();
  const isNew = id && id === "new";
  const [board, setBoard] = useState<Board>();
  const [buckets, setBuckets] = useState<Bucket[]>();

  // loads in an empty board or existing board's details
  useEffect(() => {
    if (isNew) {
      setBoard({ id: generateId(), name: "", description: "" } as Board);
    } else {
      const boardId = Number(id);
      const existingBoard = boards?.find((board) => board.id === boardId);
      setBoard(existingBoard);
      setBuckets(existingBoard?.buckets);
    }
  }, [isNew, id]);

  const addBucket = (name: string) => {
    const newBucket = { id: generateId(), name, tasks: [] } as Bucket;

    // boardDispatch({
    //   type: BoardActionType.AddBucket,
    //   payload: { boardId: Number(id), bucket: newBucket },
    // });
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
            {buckets?.map((bucket) => (
              <BucketView key={bucket.id} boardId={board.id} bucket={bucket} />
            ))}
            <NewBucket addBucket={addBucket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
