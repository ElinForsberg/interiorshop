import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../services/usersApi";
import { RootState } from "../store";

export type UserState = {
    user: User | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
   
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const isLoggedIn = (state: RootState) => state.user;
export const selectUser = (state: RootState): User | null => state.user.user;
export default userSlice.reducer;