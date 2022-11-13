import { Bucket } from "../../Types";

interface BucketProps {
  bucket: Bucket;
}

const BucketView = ({ bucket }: BucketProps) => {
  return (
    <div className="new-bucket flex h-32 w-[350px] flex-col items-center rounded-lg border border-white p-2">
      <input
        type="text"
        defaultValue={bucket.name}
        //onChange={(e) => setNewBucket(e.target.value)}
        className="w-full rounded border-b-2 border-b-white bg-transparent focus:border-transparent focus:border-b-inherit focus:ring-0"
      />
    </div>
  );
};

export default BucketView;
