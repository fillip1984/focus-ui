export interface Base {
  id: number;
}
export interface Board extends Base {
  name: string;
  description: string;
  buckets?: Bucket[];
}

export interface Bucket extends Base {
  name: string;
  tasks?: Task[];
}

export interface Task extends Base {
  name: string;
  complete: boolean;
}

export const generateId = () => {
  return Math.floor(Math.random() * 100) * new Date().getTime();
};
