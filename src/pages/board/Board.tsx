import { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { Board, generateId } from "../../Types";

const BoardPage = () => {
  const { boards, boardDispatch } = useContext(BoardContext);
  const { id } = useParams();
  const isNew = id && id === "new";
  const [board, setBoard] = useState<Board>();

  // loads in an empty board or existing board's details
  useEffect(() => {
    if (isNew) {
      setBoard({ id: generateId(), name: "", description: "" } as Board);
    } else {
      const boardId = Number(id);
      setBoard(boards.find((board) => board.id === boardId));
    }
  }, [isNew, id]);

  const [newBucket, setNewBucket] = useState("");
  const [buckets, setBuckets] = useState(board?.buckets);

  const handleAddBucket = () => {
    // updateBoardMutator({ ...board });
    // board?.buckets?.push({ name: newBucket } as Bucket);
    setNewBucket("");
  };

  return (
    <div className="pt-4 pl-4">
      {board?.buckets?.map((bucket) => (
        <div key={bucket.id} className="bucket">
          {bucket.name}
        </div>
      ))}
      <div className="new-bucket flex h-32 w-56 flex-col items-center rounded-lg border border-white p-2">
        <input
          type="text"
          value={newBucket}
          onChange={(e) => setNewBucket(e.target.value)}
          className="w-full rounded border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
        />
        <button
          type="button"
          onClick={handleAddBucket}
          className="mt-4 flex w-full justify-center p-2 text-2xl">
          <BsPlusLg />
        </button>
      </div>
    </div>
  );
};

export default BoardPage;
