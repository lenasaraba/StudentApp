export interface Course {
  id: number;
  name: string;
  description: string;
  year: Year;
  studyProgram: StudyProgram;
  materials: Material[];
  themes: Theme[];
  courseCreationDate: string;
  usersCourse: UsersCourse[];
  professorsCourse: ProfessorsCourse[];
}

export interface UsersCourse {
  id: number;
  user: User;
  courseId: number;
  enrollDate: string;
  withdrawDate: string;
}


export interface ProfessorsCourse {
  id: number;
  user: User;
  courseId: number;
  enrollDate: string;
  withdrawDate: string;
}

export interface User {
  email: string;
  username: string;
  token: string;
  firstName: string;
  lastName: string;
}

export interface Theme {
  title: string;
  description: string;
  date: string;
  userId: number;
  messages: Message[];
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
  materialType: MaterialType;
  creationDate: string;
}

export interface Year {
  id: number;
  name: string;
  description: string;
}
export interface StudyProgram {
  id: number;
  name: string;
  description: string;
}
export interface MaterialType {
  id: number;
  name: string;
  description: string;
}

export interface CoursesParams{
  orderBy:string
  searchTerm?:string
  years:string[]
  programs:string[]
  pageNumber:number
  pageSize:number
}