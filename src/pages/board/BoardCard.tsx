import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MouseEvent } from "react";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deleteBoardById } from "../../services/BoardServices";
import { Board } from "../../Types";

interface BoardCardProps {
  board: Board;
}
const BoardCard = ({ board }: BoardCardProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteBoardByIdMutator } = useMutation(deleteBoardById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
    },
  });

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteBoardByIdMutator(board.id);
  };

  return (
    <Link
      to={`/boards/${board.id}`}
      className="flex h-52 w-96 flex-col rounded border p-2 hover:shadow hover:shadow-white">
      <h3>{board.name}</h3>
      <div className="flex flex-1 flex-col justify-between">
        <span>{board.description}</span>
        <button
          type="button"
          onClick={handleDelete}
          className="ml-auto flex justify-end transition duration-150 hover:text-red-400">
          <BsTrash className="text-xl " />
        </button>
      </div>
    </Link>
  );
};

export default BoardCard;
