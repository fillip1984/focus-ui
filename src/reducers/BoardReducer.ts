import { Reducer } from "react";
import { Board, Bucket } from "../Types";

export enum BoardActionType {
  AddBoard,
  RemoveBoard,
  UpdateBoard,
  AddBucket,
  RemoveBucket,
  UpdateBucket,
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
    }
  | {
      type: BoardActionType.AddBucket;
      payload: { boardId: number; bucket: Bucket };
    }
  | {
      type: BoardActionType.RemoveBucket;
      payload: { boardId: number; bucketId: number };
    }
  | {
      type: BoardActionType.UpdateBucket;
      payload: { boardId: number; name: string };
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
    case BoardActionType.AddBucket:
      return state.map((board) => {
        if (board.id === action.payload.boardId) {
          if (!board.buckets) {
            board.buckets = [];
          }
          return {
            ...board,
            buckets: [...board.buckets, action.payload.bucket],
          };
        } else {
          return board;
        }
      });
    default:
      return state;
  }
};

export default useBoardReducer;
