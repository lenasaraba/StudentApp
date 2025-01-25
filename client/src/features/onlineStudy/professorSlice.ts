import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Professor, ProfessorsParams } from "../../app/models/professor";
import { Course, StudyProgram, Year } from "../../app/models/course";
import { RootState } from "../../app/store/configureStore";

export interface ProfessorState {
  professors: Professor[];
  status: string;
  professorsParams: ProfessorsParams;
  filtersLoaded: boolean;
  professorsLoaded: boolean;
  programs: string[];
  years: string[];
  profYears: Record<number, Year[]> | null;
  profPrograms: Record<number, StudyProgram[]> | null;
}

const initialState: ProfessorState = {
  professors: [],
  status: "idle",
  professorsParams: initParams(),
  filtersLoaded: false,
  professorsLoaded: false,
  programs: [],
  years: [],
  profYears: {},
  profPrograms: {},
};

function initParams() {
  return {
    year: "Sve",
    program: "Sve",
  };
}

function getAxiosParams(professorsParams: ProfessorsParams) {
  const params = new URLSearchParams();

  if (professorsParams.searchTerm)
    params.append("searchTerm", professorsParams.searchTerm.toString());
  if (professorsParams.program)
    params.append("program", professorsParams.program.toString());
  if (professorsParams.year)
    params.append("year", professorsParams.year.toString());
  return params;
}

export const fetchProfessorCoursesAsync = createAsyncThunk<
  Record<number, Course[]>,
  number
>("professor/fetchProfessorYearsProgramsAsync", async (id, thunkAPI) => {
  try {
    const { years, programs } =
      await agent.Professor.getProfessorYearsPrograms(id);
    thunkAPI.dispatch(
      setProfessorCourses({
        professorId: id,
        years: years,
        programs: programs,
      })
    );
    return { id, years, programs };
  } catch (error: any) {
    console.log(error.data);
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProfessorsAsync = createAsyncThunk<
  Professor[],
  void,
  { state: RootState }
>("professor/fetchProfessorsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().professor.professorsParams);
  console.log(...params);
  try {
    const professors = await agent.Professor.GetAllProfessors(params);
    thunkAPI.dispatch(setProfessors(professors));
    console.log("IVANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(...professors);
    return professors;
  } catch (error: any) {
    console.log(".................IVANA")

    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchFilters = createAsyncThunk(
  "professor/fetchFilters",
  async (_, thunkAPI) => {
    try {
      const filters= agent.Professor.fetchFilters();

console.log(filters);
      return filters;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const professorSlice = createSlice({
  name: "professor",
  initialState,
  reducers: {
    setProfessors: (state, action) => {
      state.professors = action.payload;
    },
    setProfessorsParams: (state, action) => {
      state.professorsLoaded = false;
      state.professorsParams = {
        ...state.professorsParams,
        ...action.payload,
      };
      // console.log(state.themesParams);
    },
    resetProfessorsParams: (state) => {
      state.professorsParams = initParams();
    },
    setProfessorCourses: (state, action) => {
      state.profYears![action.payload.professorId] = action.payload.years;
      state.profPrograms![action.payload.professorId] = action.payload.programs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfessorsAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchProfessorsAsync.fulfilled, (state) => {
      state.status = "idle";
      state.professorsLoaded = true;
    });
    builder.addCase(fetchProfessorsAsync.rejected, (state) => {
      state.status = "idle";
      // console.log(action.payload);
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      console.log(action.payload);
      state.years = action.payload.years;
      state.programs = action.payload.programs;
      state.status = "idle";
      state.filtersLoaded = true;
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const { setProfessors, setProfessorsParams, setProfessorCourses, resetProfessorsParams } =
  professorSlice.actions;
