import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Professor } from "../../app/models/professor";

export interface ProfessorState {
  professors: Professor[] | null;
  status: string;
}

const initialState: ProfessorState = {
  professors: null,
  status: "idle",
};

export const fetchProfessorsAsyn = createAsyncThunk<Professor[]>(
  "professor/fetchProfessorsAsync",
  async (_, thunkAPI) => {
    try {
      const professors = await agent.Professor.GetAllProfessors();
      thunkAPI.dispatch(setProfessors(professors));
      return professors;
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
  },
});

export const { setProfessors } = professorSlice.actions;
