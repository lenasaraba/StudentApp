import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Message } from "../../app/models/theme";

export interface MessageState {
  messages: Message[] | null;
  status: string;
}

const initialState: MessageState = {
  messages: null,
  status: "idle",
};

export const fetchMessagesAsync = createAsyncThunk<Message[], void>(
  "message/fetchMessagesAsync",
  async (_, thunkAPI) => {
    const messages = await agent.Message.getAll();
    thunkAPI.dispatch(setMessages(messages));
    return messages;
  }
);

export const createMessage = createAsyncThunk<Message[], Message>(
  "messages/createMessage",
  async (newMessage, { rejectWithValue }) => {
    try {
      console.log(newMessage);
      const response = await agent.Message.createMessage(newMessage);
      return response.data; // Ovo vraća listu poruka sa servera
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});
export const { setMessages } = messageSlice.actions;
