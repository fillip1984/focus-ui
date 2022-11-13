import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readBoardById, updateBoard } from "../../services/BoardServices";
import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import { Bucket } from "../../Types";

const BoardPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: board,
    isError,
    isLoading,
    refetch,
  } = useQuery(["boards"], () => readBoardById(Number(id)));

  const { mutate: updateBoardMutator } = useMutation(updateBoard);

  const [newBucket, setNewBucket] = useState("");

  const [buckets, setBuckets] = useState(board?.buckets);

  const handleAddBucket = () => {
    updateBoardMutator({ ...board });
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

      {isLoading && (
        <div className="loading -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Loading...
        </div>
      )}
      {isError && (
        <div className="error -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          Error
          <button
            className="rounded bg-slate-400 p-4 text-white"
            onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
