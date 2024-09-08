import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { backendApi } from "../../../axios/api";
import { RootState } from "../../store";

interface User {
  _id: string;
  email: string;
  name?: string;
  token: string;
}

export interface AuthState {
  loggedInUser: User | null;
  loading: boolean;
}

interface SignUpPayload {
  email: string;
  password: String;
}
interface SignInPayload {
  email: string;
  password: String;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

const storedUser = localStorage.getItem("loggedInUser");
const initialState: AuthState = {
  loggedInUser: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
};

export const signUpUser = createAsyncThunk<
  void,
  SignUpPayload,
  { rejectValue: string }
>("auth/sign-up-user", async (payload) => {
  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/auth/sign-up",
      payload
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error: any) {
    const errMessage = error.response?.data?.message || "something went wrong";
    toast.error(errMessage);
  }
});

export const signInUser = createAsyncThunk<
  User | null,
  SignInPayload,
  { rejectValue: string }
>("auth/sign-in-user", async (payload, thunkAPI) => {
  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/auth/sign-in",
      payload
    );
    if (data.success) {
      if (data.user) {
        toast.success(data.message);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
      }
      return data.user || null;
    } else {
      toast.error(data.message);
      return thunkAPI.rejectWithValue(data.message);
    }
  } catch (error: any) {
    const errMessage = error.response?.data?.message || "something went wrong";
    toast.error(errMessage);
    return thunkAPI.rejectWithValue(errMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signInUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;
          state.loggedInUser = action.payload;
        }
      )
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logOutUser } = authSlice.actions;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
