import { useContext, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { BoardContext } from "../../contexts/BoardContext";
import { Bucket, generateId } from "../../Types";

interface BucketProps {
  boardId: number;
  bucket: Bucket;
}

const BucketView = ({ boardId, bucket }: BucketProps) => {
  const [newTask, setNewTask] = useState("");
  const newTaskRef = useRef<HTMLInputElement>(null);

  const { addTask, removeTask, removeBucket, updateBucket, updateTask } =
    useContext(BoardContext);

  const handleAddTask = () => {
    if (newTask) {
      addTask(boardId, bucket.id, {
        id: generateId(),
        name: newTask,
        complete: false,
      });
      setNewTask("");
      newTaskRef?.current?.focus();
    }
  };

  return (
    <div className="new-bucket flex w-[350px] flex-col items-center justify-between rounded-lg border border-white p-2">
      <div className="w-full">
        <div className="mb-2 flex w-full justify-between p-2">
          <input
            type="text"
            defaultValue={bucket.name}
            onBlur={(e) => {
              if (e.target.value.trim().length > 0) {
                updateBucket(boardId, bucket.id, {
                  ...bucket,
                  name: e.target.value,
                });
              } else {
                // set back previous value if none was given
                e.target.value = bucket.name;
              }
            }}
            className="border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
          />
          <button
            type="button"
            className="pl-4 text-2xl hover:text-red-400"
            onClick={() => removeBucket(boardId, bucket.id)}>
            X
          </button>
        </div>

        <div className="flex w-full flex-col gap-2">
          {bucket.tasks?.map((task) => (
            <div
              key={task.id}
              className="flex w-full justify-between rounded border p-3">
              <input
                type="text"
                defaultValue={task.name}
                onBlur={(e) =>
                  updateTask(boardId, bucket.id, task.id, {
                    ...task,
                    name: e.target.value,
                  })
                }
                className="border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
              />
              <button
                type="button"
                className="hover:text-red-400"
                onClick={() => removeTask(boardId, bucket.id, task.id)}>
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="my-2 flex w-full items-center gap-2">
        <input
          type="text"
          className="w-full border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          ref={newTaskRef}
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
