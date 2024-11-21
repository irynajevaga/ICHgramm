// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  username: string;
  email: string;
  full_name: string;
  bio: string;
  bio_website: string;
  profile_image: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

// Инициализируем состояние из localStorage, если данные есть
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Сохраняем данные пользователя в localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;

      // Удаляем данные пользователя из localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Удаляем дополнительные данные (например, лайки)
      localStorage.removeItem("likedPosts");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;