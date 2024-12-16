import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../app/models/course";
import agent from "../../app/api/agent";
import { RootState, useAppSelector } from "../../app/store/configureStore";

export interface CourseState {
  courses: Course[] | null;
  myCourses: Course[]|null;
  status: string;
}

const initialState: CourseState = {
  courses: null,
  myCourses:null,
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
      console.log("------- USER -------- bez usera");
      const state = thunkAPI.getState() as RootState; // Tipizuj prema RootState
      const user = state.account.user; // Pretpostavljam da `account` slice ima `user` objekat

      console.log("------- USER -------- "+{...user});
      const myCourses = await agent.Course.getMy(user!.email);
      thunkAPI.dispatch(setMyCourses(myCourses));
      return myCourses;
    } catch (error: any) {
      console.log(error.data);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);


export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
      console.log("SVI KURSEVI" + state.courses);
    },
    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
      console.log("MOJI KURSEVI" + state.myCourses);
    },
  },
});

export const { setCourses, setMyCourses } = courseSlice.actions;
