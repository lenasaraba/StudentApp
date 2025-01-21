import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Course,
  CoursesParams,
  CreateCourse,
  StudyProgram,
  Year,
} from "../../app/models/course";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

export interface CourseState {
  courses: Course[] | null;
  allCourses: Course[] | null;

  myCourses: Course[] | null;
  professorCourses: Record<number, Course[]> | null;
  status: string;
  filtersLoaded: boolean;
  coursesLoaded: boolean;
  years: Year[] | null;
  programs: StudyProgram[] | null;
  coursesParams: CoursesParams;
  metaData: MetaData | null;
  //loading: boolean;
}

const initialState: CourseState = {
  courses: null,
  myCourses: null,
  allCourses: null,
  professorCourses: {},
  status: "idle",
  coursesLoaded: false,
  filtersLoaded: false,
  years: null,
  programs: null,
  coursesParams: initParams(),
  metaData: null,
  //loading: false,
};

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 6,
    // orderBy: "name",
    type: "all",
    years: [],
    studyPrograms: [],
  };
}

function getAxiosParams(coursesParams: CoursesParams) {
  const params = new URLSearchParams();

  params.append("pageNumber", coursesParams.pageNumber.toString());
  params.append("pageSize", coursesParams.pageSize.toString());
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
  try {
    const params = getAxiosParams(thunkAPI.getState().course.coursesParams);
    const courses = await agent.Course.list(params);
    console.log("Fetched courses:", courses.items); // Proveri šta API vraća

    let responseCourses = [];
    let responseMetaData;
    if (courses.items.items) {
      responseCourses = courses.items.items;
      responseMetaData = courses.items.metaData;
    } else {
      responseCourses = courses.items;
      responseMetaData = courses.metaData;
    }

    // console.log(responseCourses);
    // const plainResponse = JSON.parse(JSON.stringify(courses.items));
    // console.log("2 2 2 2 2 2 :" + plainResponse);
    thunkAPI.dispatch(setCourses(responseCourses));

    thunkAPI.dispatch(setMetaData(responseMetaData));

    return responseCourses;
  } catch (error: any) {
    console.log(error.data);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCoursesListAsync = createAsyncThunk<
  Course[],
  void,
  { state: RootState }
>("course/fetchCoursesAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().course.coursesParams);

  try {
    const courses = await agent.Course.fullList(params);
    console.log("Fetched courses:", courses); // Proveri šta API vraća

    thunkAPI.dispatch(setAllCourses(courses));
    // thunkAPI.dispatch(setMetaData(courses.metaData));

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

export const createCourseAsync = createAsyncThunk<Course, CreateCourse>(
  "course/createCourse",
  async (newCourse, thunkAPI) => {
    try {
      const response = await agent.Course.create(newCourse);
      // console.log(respo)
      return response.data; // Ovo vraća listu poruka sa servera
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      // console.log("OVOOOO " + action.payload);
      // console.log({ ...action });
      if (action.payload.items) state.courses = action.payload.items;
      else state.courses = action.payload;
    },
    setAllCourses: (state, action) => {
      // console.log(action.payload);
      state.allCourses = action.payload;
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
    builder.addCase(createCourseAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.status = "succeeded"; // Ažuriramo status kako bismo pokazali da je operacija uspešna
      console.log("2222222222222222222" + state.status);

      if (state.allCourses) {
        console.log("State.allcourses push");
        state.allCourses.push(action.payload);
        console.log(state.allCourses);
      } else {
        console.log("State.allcourses push");
        state.allCourses = [action.payload];
      }
      if (state.courses) {
        console.log("State.courses push");
        state.courses.push(action.payload);
        console.log(state.courses);
      } else {
        console.log("State.courses push");
        state.courses = [action.payload];
      }
    });
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
    // builder.addCase(createCourseAsync.fulfilled, (state, action) => {
    //   state.status = "succeeded"; // Ažuriramo status kako bismo pokazali da je operacija uspešna
    //   if (state.allCourses) {
    //     console.log("State.allcourses push");
    //     state.allCourses.push(action.payload);
    //     console.log(state.allCourses);
    //   } else {
    //     console.log("State.allcourses push");
    //     state.allCourses = [action.payload];
    //   }
    //   if (state.courses) {
    //     console.log("State.courses push");
    //     state.courses.push(action.payload);
    //     console.log(state.courses);
    //   } else {
    //     console.log("State.courses push");
    //     state.courses = [action.payload];
    //   }
    // });
  },
});

export const {
  setCourses,
  setAllCourses,
  setMyCourses,
  setProfessorCourses,
  setCoursesParams,
  setPageNumber,
  resetCoursesParams,
  setMetaData,
} = courseSlice.actions;
