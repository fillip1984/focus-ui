import { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import BoardCard from "../../components/board/BoardCard";
import { BoardContext } from "../../contexts/BoardContext";

const BoardList = () => {
  const { boards, removeBoard } = useContext(BoardContext);
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2">
        {boards?.map((board) => (
          <BoardCard key={board.id} board={board} removeBoard={removeBoard} />
        ))}
      </div>

      {boards?.length === 0 && (
        <div className="loading -m-32 flex h-screen flex-col items-center justify-center text-4xl">
          There are no boards
        </div>
      )}

      <div className="fab fixed bottom-8 right-8">
        <Link
          to="/boards/new/detail"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-4 text-2xl text-slate-500 hover:shadow hover:shadow-white">
          <BsPlusLg />
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
