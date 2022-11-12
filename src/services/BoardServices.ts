import { Board } from "../Types";

const BOARD_API_URL = `${import.meta.env.VITE_ROOT_API_URL}/boards`;
// TODO: replace with user principal
const username = "admin";
const password = "admin";

// methods are CRRUD or Create, Read all, Read by id, update, delete
export const createBoard = async (board: Board): Promise<Board> => {
  try {
    const response = await fetch(`${BOARD_API_URL}`, {
      method: "POST",
      body: JSON.stringify(board),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while trying to create board. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive?
    console.log("Exception occurred while creating board", e);
    throw new Error("Exception occurred while creating board");
  }
};

export const readAllBoards = async (): Promise<Board[]> => {
  try {
    const response = await fetch(`${BOARD_API_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading all boards. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading all boards", e);
    throw new Error("Exception occurred while reading all boards");
  }
};

export const readBoardById = async (id: number): Promise<Board> => {
  try {
    const response = await fetch(`${BOARD_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while reading board by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while reading board by id", e);
    throw new Error("Exception occurred while reading board by id");
  }
};

export const updateBoard = async (board: Board): Promise<Board> => {
  try {
    const response = await fetch(`${BOARD_API_URL}/${board.id}`, {
      method: "PUT",
      body: JSON.stringify(board),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while updating board. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json;
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while updating board", e);
    throw new Error("Exception occurred while updating board");
  }
};

export const deleteBoardById = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${BOARD_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Basic ${btoa(username + ":" + password)}`,
      },
    });

    if (!response.ok) {
      const msg = `An exception occurred while deleting board by id. HTTP Status: ${response.status} and message: ${response.statusText}`;
      console.log(msg);
      throw new Error(msg);
    }

    const text = await response.text();
    return text === "true";
  } catch (e) {
    // TODO: repetitive
    console.log("Exception occurred while deletong board by id", e);
    throw new Error("Exception occurred while deleting board by id");
  }
};
