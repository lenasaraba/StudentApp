export interface Course {
  id: number;
  name: string;
  description: string;
  category: string;
  materials: Material[];
  themes: Theme[];
}

export interface Theme {
  title: string;
  description: string;
  date: string;
  messages: Message[];
  userId: number;
}

export interface Message {
  content: string;
  creationDate: string;
  userId: number;
}

export interface Material {
  courseId: number;
  title: string;
  description: string;
  filePath: string;
  url: string;
  materialType: number;
}
