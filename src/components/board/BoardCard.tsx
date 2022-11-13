import { Dispatch, MouseEvent } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { BoardActionType, BoardReducerType } from "../../reducers/BoardReducer";
import { Board } from "../../Types";

interface BoardCardProps {
  board: Board;
  boardDispatch: Dispatch<BoardReducerType>;
}
const BoardCard = ({ board, boardDispatch }: BoardCardProps) => {
  const navigate = useNavigate();

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    // side stepping: <a> cannot appear as a descendant of <a>
    e.preventDefault();
    navigate(`/boards/${board.id}/detail`);
  };

  return (
    <Link
      to={`/boards/${board.id}`}
      className="flex h-52 w-96 flex-col rounded border p-2 hover:shadow hover:shadow-white">
      <h3>{board.name}</h3>
      <div className="flex flex-1 flex-col justify-between">
        <span>{board.description}</span>
        <div className="actions ml-auto flex gap-2 text-2xl">
          <button
            type="button"
            onClick={(e) => handleEdit(e)}
            className="transition duration-150 hover:text-green-600">
            <BsPencil />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              boardDispatch({
                type: BoardActionType.RemoveBoard,
                payload: board.id,
              });
            }}
            className="transition duration-150 hover:text-red-400">
            <BsTrash />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
