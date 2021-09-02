import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import DataService from "../../services/dataService";
import { Account } from "../entities/account";
import { serviceState } from "../serviceState";
import { RootState } from "../store";

const initialState: serviceState<Account> = {
    data: null,
    status: "idle",
    error: null,
  };

  export const getAccount = createAsyncThunk('account/getAccount', async (userId:string) => {
    return await DataService.getAccount(userId);
  });

  export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
   
    },
    extraReducers: builder => {
      builder
        .addCase(getAccount.pending, (state) => {
        state.status = "loading";
      })
        .addCase(getAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
        .addCase(getAccount.rejected, (state) => {
        state.status = "failed";
      });
    },
  });

export const selectAccount = (state: RootState) => state.profile;

export default accountSlice.reducer;