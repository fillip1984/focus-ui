import { useQuery } from "@tanstack/react-query";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { readAllBoards } from "../../services/BoardServices";
import BoardCard from "./BoardCard";

const BoardList = () => {
  const {
    data: boards,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["boards"], readAllBoards);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2">
        {!isFetching &&
          boards &&
          boards?.map((board) => <BoardCard key={board.id} board={board} />)}
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

      <div className="fab fixed bottom-8 right-8">
        <Link
          to="/boards/new"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-4 text-2xl text-slate-500 hover:shadow hover:shadow-white">
          <BsPlusLg />
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
