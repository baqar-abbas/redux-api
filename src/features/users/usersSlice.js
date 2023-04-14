import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPost = createAsyncThunk('posts/fetchPost',
async () => {
  const response = await axios.get('https://randomuser.me/api/?results=50');
  return response.data;
});

const initialState = {
    users:[],
    isLoading:false,
    error: null,
  };

  export const usersSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
     state.isLoading = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
    state.isLoading = false;
    state.posts = action.payload;
    state.error = null;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
    state.isLoading = false;
    state.posts = [];
    state.error = action.error.message;
    });
  },
  });

  export default usersSlice.reducer;
