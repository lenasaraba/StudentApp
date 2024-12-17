import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../app/models/course";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

export interface CourseState {
  courses: Course[] | null;
  myCourses: Course[] | null;
  professorCourses: Record<number, Course[]> | null;
  status: string;
}

const initialState: CourseState = {
  courses: null,
  myCourses: null,
  professorCourses: {},
  status: "idle",
};

export const fetchCoursesAsync = createAsyncThunk<Course[]>(
  "course/fetchCoursesAsync",
  async (_, thunkAPI) => {
    try {
      //  return await agent.Course.getAll();
      const courses = await agent.Course.getAll();
      thunkAPI.dispatch(setCourses(courses));
      return courses;
    } catch (error: any) {
      console.log(error.data);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchUserCoursesAsync = createAsyncThunk<Course[]>(
  "course/fetchUserCoursesAsync",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState; // Tipizuj prema RootState
      const user = state.account.user; // Pretpostavljam da `account` slice ima `user` objekat

      const myCourses = await agent.Course.getMy(user!.email);
      thunkAPI.dispatch(setMyCourses(myCourses));
      return myCourses;
    } catch (error: any) {
      console.log(error.data);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProfessorCoursesAsync = createAsyncThunk<
  Record<number, Course[]>,
  number
>("course/fetchProfessorCoursesAsync", async (id, thunkAPI) => {
  try {
    const professorCourses = await agent.Course.getProfessorCourses(id);
    thunkAPI.dispatch(
      setProfessorCourses({
        professorId: id,
        courses: professorCourses,
      })
    );
    return { id, professorCourses };
  } catch (error: any) {
    console.log(error.data);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
    },
    setProfessorCourses: (state, action) => {
      state.professorCourses![action.payload.professorId] =
        action.payload.courses;
    },
  },
});

export const { setCourses, setMyCourses, setProfessorCourses } =
  courseSlice.actions;
