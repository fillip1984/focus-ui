import { createContext, Dispatch, ReactNode, useReducer } from "react";
import useBoardReducer, { BoardReducerType } from "../reducers/BoardReducer";
import { Board, generateId } from "../Types";

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
    id: generateId(),
    name: "Mind",
    description: "Tasks related to keeping a healthy mind",
    buckets: [
      {
        id: generateId(),
        name: "Todo",
      },
      {
        id: generateId(),
        name: "In progress",
      },
      {
        id: generateId(),
        name: "Waiting/blocked",
      },
      {
        id: generateId(),
        name: "Complete",
      },
    ],
  },
  {
    id: generateId(),
    name: "Body",
    description: "Health, exercise, goals to keep a healthy body",
    buckets: [
      {
        id: generateId(),
        name: "Todo",
      },
      {
        id: generateId(),
        name: "In progress",
      },
      {
        id: generateId(),
        name: "Waiting/blocked",
      },
      {
        id: generateId(),
        name: "Complete",
      },
    ],
  },
  {
    id: generateId(),
    name: "Work - team tasks",
    description: "Tasks owned by team",
    buckets: [
      {
        id: generateId(),
        name: "Todo",
      },
      {
        id: generateId(),
        name: "In progress",
      },
      {
        id: generateId(),
        name: "Waiting/blocked",
      },
      {
        id: generateId(),
        name: "Complete",
      },
    ],
  },
  {
    id: generateId(),
    name: "Work - personal tasks",
    description: "My tasks",
    buckets: [
      {
        id: generateId(),
        name: "Todo",
      },
      {
        id: generateId(),
        name: "In progress",
      },
      {
        id: generateId(),
        name: "Waiting/blocked",
      },
      {
        id: generateId(),
        name: "Complete",
      },
    ],
  },
];

export default BoardContextProvider;
