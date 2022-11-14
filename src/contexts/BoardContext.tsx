import { createContext, Dispatch, ReactNode, useReducer } from "react";
import useBoardReducer, { BoardReducerType } from "../reducers/BoardReducer";
import { Board } from "../Types";

interface BoardContextProviderProps {
  children: ReactNode;
}

interface BoardContextType {
  boards: Board[];
  boardDispatch: Dispatch<BoardReducerType>;
}

export const BoardContext = createContext({} as BoardContextType);

const BoardContextProvider = ({ children }: BoardContextProviderProps) => {
  const [boards, boardDispatch] = useReducer(useBoardReducer, sampleData);

  return (
    <BoardContext.Provider value={{ boards, boardDispatch }}>
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
