import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serviceState } from "../serviceState";
import { RootState } from "../store";


export class Profile {
  constructor(clientPrincipal: any) {
    this.userId = clientPrincipal.userId;
    this.userRoles = clientPrincipal.userRoles;
    this.identityProvider = clientPrincipal.identityProvider;
    this.userDetails = clientPrincipal.userDetails;
  }
  userId: string;
  userRoles: string[];
  identityProvider: string;
  userDetails: string;
}

const initialState: serviceState<Profile> = {
  data: null,
  status: "idle",
  error: null,
};

export const getProfile = createAsyncThunk('profile/getProfile', async () => {
  console.log("Retrieving profile from /.auth/me")
  const response = await axios.get("/.auth/me");
  return response.data;
});

export const profileSlice = createSlice({
  name: "profile",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetProfileStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfile.pending, (state) => {
      state.status = "loading";
    })
      .addCase(getProfile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload.clientPrincipal? new Profile(action.payload.clientPrincipal) : null;
    })
      .addCase(getProfile.rejected, (state) => {
      state.status = "failed";
    });
  },
});
export const {resetProfileStatus} = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
