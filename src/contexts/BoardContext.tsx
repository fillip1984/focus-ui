import { createContext, ReactNode, useState } from "react";
import { Board, Bucket, Task } from "../Types";

interface BoardContextProviderProps {
  children: ReactNode;
}

interface BoardContextProps {
  boards: Board[] | null;
  findBoardById: (id: number) => Board;
  addBoard: (board: Board) => void;
  removeBoard: (id: number) => void;
  updateBoard: (id: number, fieldsToUpdate: Partial<Board>) => void;
  addBucket: (boardId: number, bucket: Bucket) => void;
  removeBucket: (boardId: number, bucketId: number) => void;
  updateBucket: (
    boardId: number,
    bucketId: number,
    fieldsToUpdate: Partial<Bucket>
  ) => void;
  addTask: (boardId: number, bucketId: number, task: Task) => void;
  removeTask: (boardId: number, bucketId: number, taskId: number) => void;
  updateTask: (
    boardId: number,
    bucketId: number,
    taskId: number,
    fieldsToUpdate: Partial<Task>
  ) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [boards, setBoards] = useState(sampleData);

  const findBoardById = (id: number) => {
    const boardCandidate = boards.find((board) => board.id === id);
    if (boardCandidate) {
      return boardCandidate;
    } else {
      throw new Error(`Unable to find board with id: ${id}`);
    }
  };

  const addBoard = (board: Board) => setBoards([...boards, board]);

  const removeBoard = (id: number) =>
    setBoards(boards.filter((board) => board.id !== id));

  const updateBoard = (id: number, fieldsToUpdate: Partial<Board>) => {
    setBoards(
      boards.map((board) => {
        if (board.id === id) {
          return { ...board, ...fieldsToUpdate };
        } else {
          return board;
        }
      })
    );
  };

  const addBucket = (boardId: number, bucket: Bucket) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          if (!board.buckets) {
            board.buckets = [];
          }
          return {
            ...board,
            buckets: [...board.buckets, bucket],
          };
        } else {
          return board;
        }
      })
    );
  };

  const removeBucket = (boardId: number, bucketId: number) => {
    const board = boards.find((board) => board.id === boardId);
    //TODO: throw error or honor idempotence and return success here?
    if (!board) {
      throw new Error(`Unable to find board with id: ${boardId}`);
    }
    board.buckets = board?.buckets?.filter((bucket) => bucket.id !== bucketId);
    return boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, buckets: board.buckets };
      } else {
        return board;
      }
    });
  };

  const updateBucket = (
    boardId: number,
    bucketId: number,
    fieldsToUpdate: Partial<Bucket>
  ) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) {
      throw new Error(`Unable to find board with id: ${boardId}`);
    }
    board.buckets = board?.buckets?.map((bucket) => {
      if (bucket.id === bucketId) {
        return { ...bucket, ...fieldsToUpdate };
      } else {
        return bucket;
      }
    });

    return boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, buckets: board.buckets };
      } else {
        return board;
      }
    });
  };

  const addTask = (boardId: number, bucketId: number, task: Task) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) {
      throw new Error(`Unable to find board with id: ${boardId}`);
    }

    const bucket = board.buckets?.find((bucket) => bucket.id === bucketId);
    if (!bucket) {
      throw new Error(
        `Unable to find bucket with id: ${bucketId} on board with id: ${boardId}`
      );
    }

    // checking if task has already been added before adding again: https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
    if (!bucket.tasks?.find((task) => task.id === task.id)) {
      bucket.tasks?.push(task);
    }

    return boards.map((board) => {
      if (board.id === boardId) {
        const buckets = board.buckets as Bucket[];
        const updatedBoard = {
          ...board,
          buckets: [...buckets, bucket],
        };
        return updatedBoard;
      } else {
        return board;
      }
    });
  };

  const removeTask = (boardId: number, bucketId: number, taskId: number) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) {
      throw new Error(`Unable to find board with id: ${boardId}`);
    }

    const bucket = board.buckets?.find((bucket) => bucket.id === bucketId);
    if (!bucket) {
      throw new Error(
        `Unable to find bucket with id: ${bucketId} on board with id: ${boardId}`
      );
    }

    bucket.tasks = bucket.tasks?.filter((task) => task.id !== taskId);

    return boards.map((board) => {
      if (board.id === boardId) {
        const buckets = board.buckets as Bucket[];
        const updatedBoard = {
          ...board,
          buckets: [...buckets, bucket],
        };
        return updatedBoard;
      } else {
        return board;
      }
    });
  };

  const updateTask = (
    boardId: number,
    bucketId: number,
    taskId: number,
    fieldsToUpdate: Partial<Task>
  ) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) {
      throw new Error(`Unable to find board with id: ${boardId}`);
    }

    const bucket = board.buckets?.find((bucket) => bucket.id === bucketId);
    if (!bucket) {
      throw new Error(
        `Unable to find bucket with id: ${bucketId} on board with id: ${boardId}`
      );
    }

    bucket.tasks = bucket.tasks?.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...fieldsToUpdate };
      } else {
        return task;
      }
    });

    return boards.map((board) => {
      if (board.id === boardId) {
        const buckets = board.buckets as Bucket[];
        const updatedBoard = {
          ...board,
          buckets: [...buckets, bucket],
        };
        return updatedBoard;
      } else {
        return board;
      }
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        findBoardById,
        addBoard,
        removeBoard,
        updateBoard,
        addBucket,
        removeBucket,
        updateBucket,
        addTask,
        removeTask,
        updateTask,
      }}>
      {children}
    </BoardContext.Provider>
  );
};

const sampleData: Board[] = [
  {
    id: 1,
    name: "Mind",
    description: "Tasks related to keeping a healthy mind",
    buckets: [
      {
        id: 2,
        name: "Todo",
        tasks: [{ id: 3, name: "this is a test", complete: false }],
      },
      {
        id: 4,
        name: "In progress",
      },
      {
        id: 5,
        name: "Waiting/blocked",
      },
      {
        id: 6,
        name: "Complete",
      },
    ],
  },
  {
    id: 7,
    name: "Body",
    description: "Health, exercise, goals to keep a healthy body",
    buckets: [
      {
        id: 8,
        name: "Todo",
      },
      {
        id: 9,
        name: "In progress",
      },
      {
        id: 10,
        name: "Waiting/blocked",
      },
      {
        id: 11,
        name: "Complete",
      },
    ],
  },
  {
    id: 12,
    name: "Work - team tasks",
    description: "Tasks owned by team",
    buckets: [
      {
        id: 13,
        name: "Todo",
      },
      {
        id: 14,
        name: "In progress",
      },
      {
        id: 15,
        name: "Waiting/blocked",
      },
      {
        id: 16,
        name: "Complete",
      },
    ],
  },
  {
    id: 17,
    name: "Work - personal tasks",
    description: "My tasks",
    buckets: [
      {
        id: 18,
        name: "Todo",
      },
      {
        id: 19,
        name: "In progress",
      },
      {
        id: 20,
        name: "Waiting/blocked",
      },
      {
        id: 21,
        name: "Complete",
      },
    ],
  },
];

export default BoardContextProvider;
