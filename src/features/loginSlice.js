import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdmin, staffLoginApi, verify2FAApi } from "../api";
import { history } from "../history";

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

export const verify2FA = createAsyncThunk(
  "login/verify2FA",
  async (credentials, thunkAPI) => {
    try {
      const response = await verify2FAApi(credentials);
      return response;
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

    verify2FAData: {},
    verify2FADataLoading: false,
    verify2FADataError: null,
    verify2FADataSuccess: null,
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

    builder
      .addCase(verify2FA.pending, (state) => {
        state.verify2FADataLoading = true;
        state.verify2FADataSuccess = false;
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        state.loginData = action.payload.loginData;
        state.loginToken = action.payload.token;
        state.loginDataSuccess = true;

        state.verify2FAData = action.payload.twoFaData;
        state.verify2FADataLoading = false;
        state.verify2FADataSuccess = true;

        localStorage.setItem("id", action.payload.loginData.id);
        localStorage.setItem("token", action.payload.token);
        history.navigate("/");
      })
      .addCase(verify2FA.rejected, (state, action) => {
        state.verify2FADataLoading = false;
        state.verify2FADataError = action.error.message;
      });
  },
});
export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
