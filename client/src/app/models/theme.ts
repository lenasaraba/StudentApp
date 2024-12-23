export interface Theme {
  title: string;
  description: string;
  date: string;
  userId: number;
  user: User;
  courseId: number;
  messages: Message[];
}

export interface Message {
  content: string;
  creationDate: string;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  username: string;
  token: string;
  firstName: string;
  lastName: string;
}
