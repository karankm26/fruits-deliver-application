import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apkUploadApi,
  changeAdminPasswordApi,
  createMemoApi,
  createOperatorApi,
  createOwnerApi,
  getAdmin,
  getApkApi,
  getMemoApi,
  getMemoByIdApi,
  getMemoIDApi,
  getOperator,
  getOperatorsApi,
  getOwnerApi,
  getOwnersApi,
  loginLogsApi,
  loginLogsDetailsApi,
  seenMemoApi,
  updateAdminApi,
  updateMemoApi,
} from "../api";

export const fetchAdmin = createAsyncThunk("api/fetchAdmin", async (id) => {
  const response = await getAdmin(id);
  return response.data;
});

export const fetchOperator = createAsyncThunk(
  "api/fetchOperator",
  async (id) => {
    const response = await getOperator(id);
    return response.data;
  }
);

export const loginLogs = createAsyncThunk(
  "api/loginLogs",
  async (data, thunkAPI) => {
    try {
      const response = await loginLogsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginLogsDetails = createAsyncThunk(
  "api/loginLogsDetails",
  async (data, thunkAPI) => {
    try {
      const response = await loginLogsDetailsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createMemo = createAsyncThunk(
  "api/createMemo",
  async (data, thunkAPI) => {
    try {
      const response = await createMemoApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getMemo = createAsyncThunk(
  "api/getMemo",
  async (data, thunkAPI) => {
    try {
      const response = await getMemoApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMemoById = createAsyncThunk(
  "api/getMemobyId",
  async (data, thunkAPI) => {
    try {
      const response = await getMemoByIdApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createOperator = createAsyncThunk(
  "api/createOperator",
  async (data, thunkAPI) => {
    try {
      const response = await createOperatorApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getOperators = createAsyncThunk(
  "api/getOperators",
  async (data, thunkAPI) => {
    try {
      const response = await getOperatorsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createOwner = createAsyncThunk(
  "api/createOwner",
  async (data, thunkAPI) => {
    try {
      const response = await createOwnerApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getOwners = createAsyncThunk(
  "api/getOwners",
  async (data, thunkAPI) => {
    try {
      const response = await getOwnersApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMemoID = createAsyncThunk(
  "api/getMemoID",
  async (data, thunkAPI) => {
    try {
      const response = await getMemoIDApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMemo = createAsyncThunk(
  "api/updateMemo",
  async (data, thunkAPI) => {
    try {
      const response = await updateMemoApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "api/updateAdmin",
  async (data, thunkAPI) => {
    try {
      const response = await updateAdminApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeAdminPassword = createAsyncThunk(
  "api/changeAdminPassword",
  async (data, thunkAPI) => {
    try {
      const response = await changeAdminPasswordApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const seenMemo = createAsyncThunk(
  "api/seenMemo",
  async (data, thunkAPI) => {
    try {
      const response = await seenMemoApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const apkUpload = createAsyncThunk(
  "api/apkUpload",
  async (data, thunkAPI) => {
    try {
      const response = await apkUploadApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    status: "idle",
    error: null,

    loginLogsData: [],
    loginLogsDataLoading: false,
    loginLogsDataError: null,
    loginLogsDataSuccess: null,

    loginLogsDetailsData: [],
    loginLogsDetailsDataLoading: false,
    loginLogsDetailsDataError: null,
    loginLogsDetailsDataSuccess: null,

    createMemoData: {},
    createMemoDataLoading: false,
    createMemoDataError: null,
    createMemoDataSuccess: null,

    updateMemoData: {},
    updateMemoDataLoading: false,
    updateMemoDataError: null,
    updateMemoDataSuccess: null,

    getMemoData: [],
    getMemoDataLoading: false,
    getMemoDataError: null,
    getMemoDataSuccess: null,

    getMemoByIdData: {},
    getMemoByIdDataLoading: false,
    getMemoByIdDataError: null,
    getMemoByIdDataSuccess: null,

    createOperatorData: {},
    createOperatorDataLoading: false,
    createOperatorDataError: null,
    createOperatorDataSuccess: null,

    getOperatorsData: [],
    getOperatorsDataLoading: false,
    getOperatorsDataError: null,
    getOperatorsDataSuccess: null,

    createOwnerData: {},
    createOwnerDataLoading: false,
    createOwnerDataError: null,
    createOwnerDataSuccess: null,

    getOwnersData: [],
    getOwnersDataLoading: false,
    getOwnersDataError: null,
    getOwnersDataSuccess: null,

    getMemoIDData: {},
    getMemoIDDataLoading: false,
    getMemoIDDataError: null,
    getMemoIDDataSuccess: null,

    updateAdminData: {},
    updateAdminDataLoading: false,
    updateAdminDataError: null,
    updateAdminDataSuccess: null,

    changeAdminPasswordData: {},
    changeAdminPasswordDataLoading: false,
    changeAdminPasswordDataError: null,
    changeAdminPasswordDataSuccess: null,

    seenMemoData: {},
    seenMemoDataLoading: false,
    seenMemoDataError: null,
    seenMemoDataSuccess: null,

    apkUploadData: {},
    apkUploadDataLoading: false,
    apkUploadDataError: null,
    apkUploadDataSuccess: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchOperator.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOperator.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchOperator.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(loginLogs.pending, (state) => {
        state.loginLogsDataLoading = true;
      })
      .addCase(loginLogs.fulfilled, (state, action) => {
        state.loginLogsDataLoading = false;
        state.loginLogsData = action.payload;
        state.loginLogsDataSuccess = true;
      })
      .addCase(loginLogs.rejected, (state, action) => {
        state.loginLogsDataLoading = false;
        state.loginLogsDataError = action.error.message;
      });

    builder
      .addCase(createMemo.pending, (state) => {
        state.createMemoDataLoading = true;
      })
      .addCase(createMemo.fulfilled, (state, action) => {
        state.createMemoDataLoading = false;
        state.createMemoData = action.payload;
        state.createMemoDataSuccess = true;
      })
      .addCase(createMemo.rejected, (state, action) => {
        state.createMemoDataLoading = false;
        state.createMemoDataError = action.error.message;
      });

    builder
      .addCase(getMemo.pending, (state) => {
        state.getMemoDataLoading = true;
      })
      .addCase(getMemo.fulfilled, (state, action) => {
        state.getMemoDataLoading = false;
        state.getMemoData = action.payload;
        state.getMemoDataSuccess = true;
      })
      .addCase(getMemo.rejected, (state, action) => {
        state.getMemoDataLoading = false;
        state.getMemoDataError = action.error.message;
      });

    builder
      .addCase(getMemoById.pending, (state) => {
        state.getMemoByIdDataLoading = true;
      })
      .addCase(getMemoById.fulfilled, (state, action) => {
        state.getMemoByIdDataLoading = false;
        state.getMemoByIdData = action.payload;
        state.getMemoByIdDataSuccess = true;
      })
      .addCase(getMemoById.rejected, (state, action) => {
        state.getMemoByIdDataLoading = false;
        state.getMemoByIdDataError = action.error.message;
      });

    builder
      .addCase(createOperator.pending, (state) => {
        state.createOperatorDataLoading = true;
      })
      .addCase(createOperator.fulfilled, (state, action) => {
        state.createOperatorDataLoading = false;
        state.createOperatorData = action.payload;
        state.createOperatorDataSuccess = true;
      })
      .addCase(createOperator.rejected, (state, action) => {
        state.createOperatorDataLoading = false;
        state.createOperatorDataError = action.error.message;
      });

    builder
      .addCase(getOperators.pending, (state) => {
        state.getOperatorsDataLoading = true;
      })
      .addCase(getOperators.fulfilled, (state, action) => {
        state.getOperatorsDataLoading = false;
        state.getOperatorsData = action.payload;
        state.getOperatorsDataSuccess = true;
      })
      .addCase(getOperators.rejected, (state, action) => {
        state.getOperatorsDataLoading = false;
        state.getOperatorsDataError = action.error.message;
      });

    builder
      .addCase(createOwner.pending, (state) => {
        state.createOwnerDataLoading = true;
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        state.createOwnerDataLoading = false;
        state.createOwnerData = action.payload;
        state.createOwnerDataSuccess = true;
      })
      .addCase(createOwner.rejected, (state, action) => {
        state.createOwnerDataLoading = false;
        state.createOwnerDataError = action.error.message;
      });

    builder
      .addCase(getOwners.pending, (state) => {
        state.getOwnersDataLoading = true;
      })
      .addCase(getOwners.fulfilled, (state, action) => {
        state.getOwnersDataLoading = false;
        state.getOwnersData = action.payload;
        state.getOwnersDataSuccess = true;
      })
      .addCase(getOwners.rejected, (state, action) => {
        state.getOwnersDataLoading = false;
        state.getOwnersDataError = action.error.message;
      });

    builder
      .addCase(loginLogsDetails.pending, (state) => {
        state.loginLogsDetailsDataLoading = true;
      })
      .addCase(loginLogsDetails.fulfilled, (state, action) => {
        state.loginLogsDetailsDataLoading = false;
        state.loginLogsDetailsData = action.payload;
        state.loginLogsDetailsDataSuccess = true;
      })
      .addCase(loginLogsDetails.rejected, (state, action) => {
        state.loginLogsDetailsDataLoading = false;
        state.loginLogsDetailsDataError = action.error.message;
      });

    builder
      .addCase(getMemoID.pending, (state) => {
        state.getMemoIDDataLoading = true;
      })
      .addCase(getMemoID.fulfilled, (state, action) => {
        state.getMemoIDDataLoading = false;
        state.getMemoIDData = action.payload;
        state.getMemoIDDataSuccess = true;
      })
      .addCase(getMemoID.rejected, (state, action) => {
        state.getMemoIDDataLoading = false;
        state.getMemoIDDataError = action.error.message;
      });

    builder
      .addCase(updateMemo.pending, (state) => {
        state.updateMemoDataLoading = true;
      })
      .addCase(updateMemo.fulfilled, (state, action) => {
        state.updateMemoDataLoading = false;
        state.updateMemoData = action.payload;
        state.updateMemoDataSuccess = true;
      })
      .addCase(updateMemo.rejected, (state, action) => {
        state.updateMemoDataLoading = false;
        state.updateMemoDataError = action.error.message;
      });

    builder
      .addCase(updateAdmin.pending, (state) => {
        state.updateAdminDataLoading = true;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.updateAdminDataLoading = false;
        state.updateAdminData = action.payload;
        state.updateAdminDataSuccess = true;
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.updateAdminDataLoading = false;
        state.updateAdminDataError = action.error.message;
      });

    builder
      .addCase(changeAdminPassword.pending, (state) => {
        state.changeAdminPasswordDataLoading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state, action) => {
        state.changeAdminPasswordDataLoading = false;
        state.changeAdminPasswordData = action.payload;
        state.changeAdminPasswordDataSuccess = true;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.changeAdminPasswordDataLoading = false;
        state.changeAdminPasswordDataError = action.error.message;
      });

    builder
      .addCase(seenMemo.pending, (state) => {
        state.seenMemoDataLoading = true;
      })
      .addCase(seenMemo.fulfilled, (state, action) => {
        state.seenMemoDataLoading = false;
        state.seenMemoData = action.payload;
        state.seenMemoDataSuccess = true;
      })
      .addCase(seenMemo.rejected, (state, action) => {
        state.seenMemoDataLoading = false;
        state.seenMemoDataError = action.error.message;
      });

    builder
      .addCase(apkUpload.pending, (state) => {
        state.apkUploadDataLoading = true;
      })
      .addCase(apkUpload.fulfilled, (state, action) => {
        state.apkUploadDataLoading = false;
        state.apkUploadData = action.payload;
        state.apkUploadDataSuccess = true;
      })
      .addCase(apkUpload.rejected, (state, action) => {
        state.apkUploadDataLoading = false;
        state.apkUploadDataError = action.error.message;
      });
  },
});

export default apiSlice.reducer;
