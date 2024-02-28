import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin, staffLoginApi } from "../api";

export const loginAsync = createAsyncThunk(
  "login/loginAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = await loginAdmin(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginStaffAsync = createAsyncThunk(
  "login/loginStaffAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = await staffLoginApi(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const logout = () => {
//   return { type: "login/logout" };
// };

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginData: {},
    loginToken: null,
    loginDataLoading: false,
    loginDataError: null,
    loginDataSuccess: null,
  },
  reducers: {
    logout: (state) => {
      state.loginData = {};
      state.loginToken = null;
      state.loginDataLoading = false;
      state.loginDataError = null;
      state.loginDataSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loginDataLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginDataLoading = false;
        state.loginData = action.payload;
        state.loginToken = action.payload.token;
        state.loginDataSuccess = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginDataLoading = false;
        state.loginDataError = action.error.message;
      });

    builder
      .addCase(loginStaffAsync.pending, (state) => {
        state.loginDataLoading = true;
      })
      .addCase(loginStaffAsync.fulfilled, (state, action) => {
        state.loginDataLoading = false;
        state.loginData = action.payload;
        state.loginToken = action.payload.token;
        state.loginDataSuccess = true;
      })
      .addCase(loginStaffAsync.rejected, (state, action) => {
        state.loginDataLoading = false;
        state.loginDataError = action.error.message;
      });
  },
});
export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
