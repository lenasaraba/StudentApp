import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course, CoursesParams } from "../../app/models/course";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

export interface CourseState {
  courses: Course[] | null;
  myCourses: Course[] | null;
  professorCourses: Record<number, Course[]> | null;
  status: string;
  filtersLoaded: boolean;
  coursesLoaded: boolean;
  years: string[];
  programs: string[];
  coursesParams: CoursesParams;
  metaData: MetaData | null;
  //loading: boolean;
}

const initialState: CourseState = {
  courses: null,
  myCourses: null,
  professorCourses: {},
  status: "idle",
  coursesLoaded: false,
  filtersLoaded: false,
  years: [],
  programs: [],
  coursesParams: initParams(),
  metaData: null,
  //loading: false,
};

function initParams() {
  return {
    // pageNumber: 1,
    // pageSize: 6,
    // orderBy: "name",
    type: "all",
    years: [],
    studyPrograms: [],
  };
}

function getAxiosParams(coursesParams: CoursesParams) {
  const params = new URLSearchParams();

  // params.append("pageNumber", coursesParams.pageNumber.toString());
  // params.append("pageSize", coursesParams.pageSize.toString());
  // params.append("orderBy", coursesParams.orderBy.toString());

  if (coursesParams.type) params.append("type", coursesParams.type.toString());
  if (coursesParams.searchTerm)
    params.append("searchTerm", coursesParams.searchTerm.toString());
  if (coursesParams.years.length > 0) {
    // params.append("years", coursesParams.years.toString());
    coursesParams.years.forEach((year) => {
      params.append("years", year);
    });
  }
  if (coursesParams.studyPrograms.length > 0)
    // params.append("studyPrograms", coursesParams.studyPrograms.toString());
    coursesParams.studyPrograms.forEach((program) => {
      params.append("studyPrograms", program);
    });
  return params;
}

export const fetchCoursesAsync = createAsyncThunk<
  Course[],
  void,
  { state: RootState }
>("course/fetchCoursesAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().course.coursesParams);

  try {
    const courses = await agent.Course.list(params);
    thunkAPI.dispatch(setCourses(courses));
    thunkAPI.dispatch(setMetaData(courses.metaData));

    return courses;
  } catch (error: any) {
    console.log(error.data);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});
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

export const fetchFilters = createAsyncThunk(
  "course/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return agent.Course.fetchFilters();
    } catch (error: any) {
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
    },
    setMyCourses: (state, action) => {
      state.myCourses = action.payload;
    },
    setProfessorCourses: (state, action) => {
      state.professorCourses![action.payload.professorId] =
        action.payload.courses;
    },
    setCoursesParams: (state, action) => {
      state.coursesLoaded = false;
      state.coursesParams = {
        ...state.coursesParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.coursesLoaded = false;
      state.coursesParams = { ...state.coursesParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetCoursesParams: (state) => {
      state.coursesParams = initParams();
    },
    // setLoading(state, action) {
    //   state.loading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.years = action.payload.years;
      state.programs = action.payload.programs;
      state.status = "idle";
      state.filtersLoaded = true;
      //state.loading = false;
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
    // builder.addCase(fetchUserCoursesAsync.pending, (state) => {
    //   //state.loading = true; // Postavi loading na true
    //   state.status='pendingFetchCourses';

    // });
    // builder.addCase(fetchUserCoursesAsync.fulfilled, (state) => {
    //   //state.loading = false; // Postavi loading na true
    //   state.coursesLoaded = true;
    //   state.status='idle';

    // });
    // builder.addCase(fetchUserCoursesAsync.rejected, (state) => {
    //   //state.loading = false;
    //   state.status='idle';

    // });
    builder.addCase(fetchCoursesAsync.pending, (state) => {
      state.status = "pendingFetchCourses";
    });
    builder.addCase(fetchCoursesAsync.rejected, (state) => {
      //state.loading = false;
      state.status = "idle";
    });
    builder.addCase(fetchCoursesAsync.fulfilled, (state) => {
      //state.loading = false; // Postavi loading na true
      state.status = "idle";
      state.coursesLoaded = true;
    });
  },
});

export const {
  setCourses,
  setMyCourses,
  setProfessorCourses,
  setCoursesParams,
  setPageNumber,
  resetCoursesParams,
  setMetaData,
} = courseSlice.actions;
