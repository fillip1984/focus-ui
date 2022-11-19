import { useContext, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { BoardContext } from "../../contexts/BoardContext";
import { BoardActionType } from "../../reducers/BoardReducer";
import { Bucket, generateId, Task } from "../../Types";

interface BucketProps {
  bucket: Bucket;
  boardId: number;
}

const BucketView = ({ bucket, boardId }: BucketProps) => {
  const [bucketName, setBucketName] = useState(bucket.name);
  const [newTask, setNewTask] = useState("");

  const { boards } = useContext(BoardContext);

  const updateBucketName = (name: string) => {
    boardDispatch({
      type: BoardActionType.UpdateBucket,
      payload: { boardId, bucketId: bucket.id, name },
    });
  };

  const addTaskToBucket = () => {
    const task = {
      id: generateId(),
      name: newTask,
      complete: false,
    } as Task;

    boardDispatch({
      type: BoardActionType.AddTask,
      payload: { boardId, bucketId: bucket.id, task },
    });
    setNewTask("");
  };

  const removeTaskFromBucket = (taskId: number) => {
    boardDispatch({
      type: BoardActionType.RemoveTask,
      payload: { boardId, bucketId: bucket.id, taskId },
    });
  };

  const removeBucketFromBoard = () => {
    console.log("removing bucket");
    boardDispatch({
      type: BoardActionType.RemoveBucket,
      payload: { boardId, bucketId: bucket.id },
    });
  };

  return (
    <div className="new-bucket flex w-[350px] flex-col items-center justify-between rounded-lg border border-white p-2">
      <input
        type="text"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        onBlur={() => updateBucketName(bucketName)}
        className="w-full border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
      />
      <button
        type="button"
        className="hover:text-red-400"
        onClick={removeBucketFromBoard}>
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
              onClick={() => removeTaskFromBucket(task.id)}>
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
          onClick={addTaskToBucket}
          type="button"
          className="h-8 w-8 rounded border border-white text-2xl">
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default BucketView;
