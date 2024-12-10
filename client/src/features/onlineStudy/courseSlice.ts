import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course } from "../../app/models/course";
import agent from "../../app/api/agent";

export interface CourseState {
  courses: Course[] | null;
  status: string;
}

const initialState: CourseState = {
  courses: null,
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

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
      console.log("slsajs" + state.courses);
    },
  },
});

export const { setCourses } = courseSlice.actions;
