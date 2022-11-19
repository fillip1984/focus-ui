import { useContext, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { BoardContext } from "../../contexts/BoardContext";
import { Bucket, generateId } from "../../Types";

interface BucketProps {
  boardId: number;
  bucket: Bucket;
}

const BucketView = ({ boardId, bucket }: BucketProps) => {
  const [newTask, setNewTask] = useState("");

  const { addTask, removeTask, removeBucket } = useContext(BoardContext);

  const updateBucketName = (name: string) => {
    // boardDispatch({
    //   type: BoardActionType.UpdateBucket,
    //   payload: { boardId, bucketId: bucket.id, name },
    // });
  };

  return (
    <div className="new-bucket flex w-[350px] flex-col items-center justify-between rounded-lg border border-white p-2">
      <input
        type="text"
        defaultValue={bucket.name}
        // onChange={(e) => setBucketName(e.target.value)}
        // onBlur={() => updateBucketName(bucketName)}
        className="w-full border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
      />
      <button
        type="button"
        className="hover:text-red-400"
        onClick={() => removeBucket(boardId, bucket.id)}>
        X
      </button>

      <div className="flex w-full flex-col gap-2">
        {bucket.tasks?.map((task) => (
          <div
            key={task.id}
            className="flex w-full justify-between rounded border p-3">
            <span>{task.name}</span>
            <button
              type="button"
              className="hover:text-red-400"
              onClick={() => removeTask(boardId, bucket.id, task.id)}>
              X
            </button>
          </div>
        ))}
      </div>

      <div className="my-2 flex w-full items-center gap-2">
        <input
          type="text"
          className="w-full border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={() =>
            addTask(boardId, bucket.id, {
              id: generateId(),
              name: newTask,
              complete: false,
            })
          }
          type="button"
          className="h-8 w-8 rounded border border-white text-2xl">
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default BucketView;
