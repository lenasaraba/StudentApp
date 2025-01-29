import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Message } from "../../app/models/theme";

export interface MessageState {
  messages: Record<number, Message[]> | null;
  status: string;
  //loaded ?
}

const initialState: MessageState = {
  messages: {},
  status: "idle",
};

export const fetchMessagesAsync = createAsyncThunk<Message[], number>(
  "message/fetchMessagesAsync",
  async (id, thunkAPI) => {
    const messages = await agent.Message.getAll(id);
    // console.log(messages);
    thunkAPI.dispatch(setMessages({themeId:id, messagesTheme: messages}));
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
      console.log(action.payload);
      state.messages![action.payload.themeId] = action.payload.messagesTheme;
    },
  },
});
export const { setMessages } = messageSlice.actions;
