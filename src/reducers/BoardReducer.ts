import { Reducer } from "react";
import { Board, Bucket, Task } from "../Types";

export enum BoardActionType {
  AddBoard,
  RemoveBoard,
  UpdateBoard,
  AddBucket,
  RemoveBucket,
  UpdateBucket,
  AddTask,
  RemoveTask,
  UpdateTask,
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
      payload: { boardId: number; bucketId: number; name: string };
    }
  | {
      type: BoardActionType.AddTask;
      payload: { boardId: number; bucketId: number; task: Task };
    }
  | {
      type: BoardActionType.RemoveTask;
      payload: { boardId: number; bucketId: number; taskId: number };
    }
  | {
      type: BoardActionType.UpdateTask;
      payload: {
        boardId: number;
        bucketId: number;
        fieldsToUpdate: Partial<Task>;
      };
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
    case BoardActionType.RemoveBucket: {
      const board = state.find((board) => board.id === action.payload.boardId);
      if (!board) {
        throw new Error(
          `Unable to find board with id: ${action.payload.boardId}`
        );
      }
      board.buckets = board?.buckets?.filter(
        (bucket) => bucket.id !== action.payload.bucketId
      );
      return { ...state, board };
    }
    case BoardActionType.AddTask: {
      const board = state.find((board) => board.id === action.payload.boardId);
      if (!board) {
        throw new Error(
          `Unable to find board with id: ${action.payload.boardId}`
        );
      }

      const bucket = board.buckets?.find(
        (bucket) => bucket.id === action.payload.bucketId
      );
      if (!bucket) {
        throw new Error(
          `Unable to find bucket with id: ${action.payload.bucketId} on board with id: ${action.payload.boardId}`
        );
      }

      // checking if task has already been added before adding again: https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice
      if (!bucket.tasks?.find((task) => task.id === action.payload.task.id)) {
        bucket.tasks?.push(action.payload.task);
      }

      return state.map((board) => {
        if (board.id === action.payload.boardId) {
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
    }
    case BoardActionType.RemoveTask: {
      const board = state.find((board) => board.id === action.payload.boardId);
      if (!board) {
        throw new Error(
          `Unable to find board with id: ${action.payload.boardId}`
        );
      }

      const bucket = board.buckets?.find(
        (bucket) => bucket.id === action.payload.bucketId
      );
      if (!bucket) {
        throw new Error(
          `Unable to find bucket with id: ${action.payload.bucketId} on board with id: ${action.payload.boardId}`
        );
      }

      bucket.tasks = bucket.tasks?.filter(
        (task) => task.id !== action.payload.taskId
      );

      return state.map((board) => {
        if (board.id === action.payload.boardId) {
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
    }
    case BoardActionType.UpdateTask:
    default:
      return state;
  }
};

export default useBoardReducer;
