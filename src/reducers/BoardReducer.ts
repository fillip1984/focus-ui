import { Reducer } from "react";
import { Board } from "../Types";

export enum BoardActionType {
  AddBoard,
  RemoveBoard,
  UpdateBoard,
}

export type BoardReducerType =
  | {
      type: BoardActionType.AddBoard;
      payload: Board;
    }
  | {
      type: BoardActionType.RemoveBoard;
      payload: number;
    }
  | {
      type: BoardActionType.UpdateBoard;
      payload: { id: number; fieldsToUpdate: Partial<Board> };
    };

const useBoardReducer: Reducer<Board[], BoardReducerType> = (
  state: Board[],
  action: BoardReducerType
) => {
  switch (action.type) {
    case BoardActionType.AddBoard:
      return [...state, action.payload];
    case BoardActionType.RemoveBoard:
      return state.filter((board) => board.id !== action.payload);
    case BoardActionType.UpdateBoard:
      return state.map((board) => {
        if (board.id === action.payload.id) {
          return { ...board, ...action.payload.fieldsToUpdate };
        } else {
          return board;
        }
      });
    default:
      return state;
  }
};

export default useBoardReducer;
