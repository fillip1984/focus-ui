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

  const { boardDispatch } = useContext(BoardContext);

  const updateBucketName = (id: number, name: string) => {
    boardDispatch({
      type: BoardActionType.UpdateBucket,
      payload: { boardId: Number(id), bucketId: id, name },
    });
  };

  const handleAddTask = () => {
    addTaskToBucket(bucket.id, newTask);
    setNewTask("");
  };

  const addTaskToBucket = (bucketId: number, name: string) => {
    console.log("task genning");
    const task = {
      id: generateId(),
      name,
      complete: false,
    } as Task;

    console.log("context updatin");
    boardDispatch({
      type: BoardActionType.AddTask,
      payload: { boardId, bucketId, task },
    });
  };

  const removeTaskFromBucket = (bucketId: number, taskId: number) => {
    boardDispatch({
      type: BoardActionType.RemoveTask,
      payload: { boardId, bucketId, taskId },
    });
  };

  return (
    <div className="new-bucket flex w-[350px] flex-col items-center justify-between rounded-lg border border-white p-2">
      <input
        type="text"
        value={bucket.name}
        onChange={(e) => setBucketName(e.target.value)}
        onBlur={() => updateBucketName(bucket.id, bucketName)}
        className="w-full border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
      />

      <div className="flex w-full flex-col gap-2">
        {bucket.tasks?.map((task) => (
          <div
            key={task.id}
            className="flex w-full justify-between rounded border p-3">
            <span>{task.name}</span>
            <button
              type="button"
              className="hover:text-red-400"
              onClick={() => removeTaskFromBucket(bucket.id, task.id)}>
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
          onClick={handleAddTask}
          type="button"
          className="h-8 w-8 rounded border border-white text-2xl">
          <BsPlus />
        </button>
      </div>
    </div>
  );
};

export default BucketView;
