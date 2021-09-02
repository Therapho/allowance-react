import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice'
import accountReducer from './slices/accountSlice'
const store = configureStore({
  reducer: {
    profile: profileReducer,
    account: accountReducer
  }
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

