import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

interface NewBucketProps {
  handleAddBucket: (name: string) => void;
}

const NewBucket = ({ handleAddBucket }: NewBucketProps) => {
  const [newBucket, setNewBucket] = useState("");

  const handleAddBucketClick = () => {
    handleAddBucket(newBucket);
    setNewBucket("");
  };

  return (
    <div className="new-bucket ml-6 flex h-32 w-[350px] flex-col items-center rounded-lg border border-white p-2">
      <input
        type="text"
        value={newBucket}
        placeholder="New bucket name"
        onChange={(e) => setNewBucket(e.target.value)}
        className="w-full rounded border-b-2 border-b-white bg-transparent placeholder-slate-300 focus:border-transparent focus:border-b-inherit focus:ring-0"
      />
      <button
        type="button"
        onClick={handleAddBucketClick}
        className="mt-4 flex w-full justify-center p-2 text-2xl">
        <BsPlusLg />
      </button>
    </div>
  );
};

export default NewBucket;
