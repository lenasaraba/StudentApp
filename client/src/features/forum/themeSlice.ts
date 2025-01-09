import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateTheme, Theme } from "../../app/models/theme";
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

export const createThemeAsync = createAsyncThunk<Theme, CreateTheme>(
  "messages/createTheme",
  async (newTheme, thunkAPI) => {
    try {
      const response = await agent.Theme.create(newTheme);
      return response; // Ovo vraća listu poruka sa servera
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
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
  extraReducers: (builder) => {
    builder.addCase(createThemeAsync.fulfilled, (state, action) => {
      state.status = "succeeded"; // Ažuriramo status kako bismo pokazali da je operacija uspešna
      if (state.themes) {
        // Ako već imamo teme, dodajemo novu u listu
        state.themes.push(action.payload);
      } else {
        // Ako nema tema, postavljamo novu listu sa jednom temom
        state.themes = [action.payload];
      }
    });
  },
});
export const { setThemes } = themeSlice.actions;
