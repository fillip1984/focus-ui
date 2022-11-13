import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import { BoardActionType } from "../../reducers/BoardReducer";
import { Board, generateId } from "../../Types";

const BoardDetail = () => {
  const { boards, boardDispatch } = useContext(BoardContext);
  const { id } = useParams();
  const isNew = id && id === "new";
  const [board, setBoard] = useState<Board>();

  // loads in an empty board or existing board's details
  useEffect(() => {
    if (isNew) {
      setBoard({ id: generateId(), name: "", description: "" } as Board);
    } else {
      const boardId = Number(id);
      setBoard(boards.find((board) => board.id === boardId));
    }
  }, [isNew, id]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Board>();
  const onSubmit: SubmitHandler<Board> = (formData) => {
    if (isNew) {
      boardDispatch({
        type: BoardActionType.AddBoard,
        payload: { ...formData, id: generateId() },
      });
    } else {
      boardDispatch({
        type: BoardActionType.UpdateBoard,
        payload: { id: Number(id), fieldsToUpdate: formData },
      });
    }

    navigate("/boards");
  };

  return (
    <div>
      <div className="flex w-full justify-center gap-4 bg-white py-2">
        <button
          type="submit"
          form="board-form"
          className="rounded bg-slate-500 py-2 px-4 text-2xl">
          Save
        </button>
        <Link
          to="/boards"
          className="rounded border border-slate-500 py-2 px-4 text-2xl text-slate-500">
          Cancel
        </Link>
      </div>
      <form
        id="board-form"
        className="flex w-full flex-col gap-4 p-4 md:mx-auto md:max-w-md lg:max-w-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="text-2xl">
            Name
          </label>
          <input
            className="mt-1 block w-full rounded text-black focus:border-transparent focus:ring-0"
            id="name"
            type="text"
            defaultValue={board?.name}
            autoFocus
            {...register("name", {
              required: "Field is required",
              minLength: {
                value: 2,
                message: "Field must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Field must be 50 characters or less",
              },
            })}
          />
          {errors.name && (
            <span className="text-white">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="description" className="text-2xl">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded text-black focus:border-transparent focus:ring-0"
            rows={4}
            defaultValue={board?.description}
            {...register("description", {
              required: "Field is required",
              minLength: {
                value: 2,
                message: "Field must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Field must be 100 characters or less",
              },
            })}
          />
          {errors.description && (
            <span className="text-white">{errors.description.message}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default BoardDetail;
