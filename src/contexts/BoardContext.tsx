import { createContext, ReactNode, useState } from "react";
import { Board } from "../Types";

interface BoardContextProviderProps {
  children: ReactNode;
}

interface BoardContextProps {
  boards: Board[] | null;
  addBoard: (board: Board) => void;
  removeBoard: (id: number) => void;
  updateBoard: (id: number, fieldsToUpdate: Partial<Board>) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [boards, setBoards] = useState(sampleData);

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

  return (
    <BoardContext.Provider
      value={{ boards, addBoard, removeBoard, updateBoard }}>
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
