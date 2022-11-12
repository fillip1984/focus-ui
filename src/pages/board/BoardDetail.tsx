import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Board } from "../../Types";
import { createBoard } from "../../services/BoardServices";

const BoardDetail = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: board,
    isLoading,
    isError,
    refetch,
  } = useQuery<Board>(["boards"], () => {
    return {
      name: "",
      description: "",
    } as Board;
  });

  const { mutate: createBoardMutator } = useMutation(createBoard);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Board>();
  const onSubmit: SubmitHandler<Board> = (formData) => {
    createBoardMutator(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["boards"]);
        navigate("/boards");
      },
    });
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
    </div>
  );
};

export default BoardDetail;
