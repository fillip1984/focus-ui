import { createContext, ReactNode, useState } from "react";
import { Board, Bucket, Task } from "../Types";

interface BoardContextProviderProps {
  children: ReactNode;
}

interface BoardContextProps {
  boards: Board[] | null;
  findBoardById: (id: number | string | undefined) => Board;
  addBoard: (board: Board) => void;
  removeBoard: (id: number) => void;
  // updateBoard: (id: number, fieldsToUpdate: Partial<Board>) => void;
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

  const findBoardById = (id: number | string | undefined) => {
    if (!id) {
      throw new Error("Unable to find board with undefined id");
    }

    if (typeof id === "string") {
      id = Number(id);
    }

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

  // const updateBoard = (id: number, fieldsToUpdate: Partial<Board>) => {
  //   setBoards(
  //     boards.map((board) => {
  //       if (board.id === id) {
  //         return { ...board, ...fieldsToUpdate };
  //       } else {
  //         return board;
  //       }
  //     })
  //   );
  // };
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
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            buckets: board.buckets?.filter((bucket) => bucket.id !== bucketId),
          };
        } else {
          return board;
        }
      })
    );
  };

  const updateBucket = (
    boardId: number,
    bucketId: number,
    fieldsToUpdate: Partial<Bucket>
  ) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            buckets: board.buckets?.map((bucket) => {
              if (bucket.id === bucketId) {
                return { ...bucket, ...fieldsToUpdate };
              } else {
                return bucket;
              }
            }),
          };
        } else {
          return board;
        }
      })
    );
  };

  const addTask = (boardId: number, bucketId: number, task: Task) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            buckets: board.buckets?.map((bucket) => {
              if (bucket.id === bucketId) {
                return {
                  ...bucket,
                  tasks: [...(bucket.tasks as Task[]), task],
                };
              } else {
                return bucket;
              }
            }),
          };
        } else {
          return board;
        }
      })
    );
  };

  const removeTask = (boardId: number, bucketId: number, taskId: number) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            buckets: board.buckets?.map((bucket) => {
              if (bucket.id === bucketId) {
                return {
                  ...bucket,
                  tasks: bucket.tasks?.filter((task) => task.id !== taskId),
                };
              } else {
                return bucket;
              }
            }),
          };
        } else {
          return board;
        }
      })
    );
  };

  const updateTask = (
    boardId: number,
    bucketId: number,
    taskId: number,
    fieldsToUpdate: Partial<Task>
  ) => {
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            buckets: board.buckets?.map((bucket) => {
              if (bucket.id === bucketId) {
                return {
                  ...bucket,
                  tasks: bucket.tasks?.map((task) => {
                    if (task.id === taskId) {
                      return { ...task, ...fieldsToUpdate };
                    } else {
                      return task;
                    }
                  }),
                };
              } else {
                return bucket;
              }
            }),
          };
        } else {
          return board;
        }
      })
    );
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        findBoardById,
        addBoard,
        removeBoard,
        // updateBoard,
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
