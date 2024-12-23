import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Theme } from "../../app/models/theme";
import agent from "../../app/api/agent";

export interface ThemeState {
  themes: Theme[] | null;
  status: string;
}

const initialState: ThemeState = {
  themes: null,
  status: "idle",
};

export const fetchThemesAsync = createAsyncThunk<Theme[], void>(
  "theme/fetchThemesAsync",
  async (_, thunkAPI) => {
    const themes = await agent.Theme.getAll();
    thunkAPI.dispatch(setThemes(themes));
    return themes;
  }
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemes: (state, action) => {
      state.themes = action.payload;
    },
  },
});
export const { setThemes } = themeSlice.actions;
