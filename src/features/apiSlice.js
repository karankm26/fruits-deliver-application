import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdmin,
  getCitiesApi,
  getCountriesApi,
  getStatesApi,
  // loginAdmin,
  passwordChangeAdmin,
  registerAdmin,
  subscribersList,
  subscribersNotification,
  subscribersNotificationToAll,
  updateAdmin,
  allUserNotificationApi,
  userApi,
  userDiposit,
  userUpdateApi,
  userWithdraw,
  usersApi,
  userNotificationApi,
  userCountApi,
  allStaffApi,
  staffUpdateApi,
  staffRegisterApi,
  staffByIdApi,
  getAllSupportTicketApi,
  getSupportTicketMessageByIdApi,
  sendSupportTicketMessageApi,
  updateSupportTicketMessageByIdApi,
  getTransactions,
  getEvents,
  createEventApi,
  getEventById,
  updateEventApi,
  loginLogsApi,
  fetchUserNotificationApi,
  allWithdrawals,
  withdrawalStatusApi,
  allDepositsApi,
  depositStatusApi,
  userAllDetailsApi,
} from "../api";

export const fetchAdmin = createAsyncThunk("api/fetchAdmin", async (id) => {
  const response = await getAdmin(id);
  return response.data;
});

export const register = createAsyncThunk(
  "api/register",
  async (body, thunkAPI) => {
    try {
      const response = await registerAdmin(body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const login = createAsyncThunk("api/login", async (body, thunkAPI) => {
//   try {
//     const response = await loginAdmin(body);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

export const update = createAsyncThunk("api/update", async (data, thunkAPI) => {
  try {
    const response = await updateAdmin(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const passwordChange = createAsyncThunk(
  "api/passwordChange",
  async (data, thunkAPI) => {
    try {
      const response = await passwordChangeAdmin(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSubscribersList = createAsyncThunk(
  "api/fetchSubscribersList",
  async (data, thunkAPI) => {
    try {
      const response = await subscribersList(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const subscribersNotificationSend = createAsyncThunk(
  "api/subscribersNotificationSend",
  async (data, thunkAPI) => {
    try {
      const response = await subscribersNotification(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const subscribersNotificationSendToAll = createAsyncThunk(
  "api/subscribersNotificationSendToAll",
  async (data, thunkAPI) => {
    try {
      const response = await subscribersNotificationToAll(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "api/fetchUsers",
  async (data, thunkAPI) => {
    try {
      const response = await usersApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchUser = createAsyncThunk(
  "api/fetchUser",
  async (data, thunkAPI) => {
    try {
      const response = await userApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "api/fetchUserDetails",
  async (data, thunkAPI) => {
    try {
      const response = await userCountApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "api/fetchCountries",
  async (_, thunkAPI) => {
    try {
      const response = await getCountriesApi();
      return response.data.countries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStates = createAsyncThunk(
  "api/fetchStates",
  async (data, thunkAPI) => {
    try {
      const response = await getStatesApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCities = createAsyncThunk(
  "api/fetchCities",
  async (data, thunkAPI) => {
    try {
      const response = await getCitiesApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "api/updateUser",
  async (data, thunkAPI) => {
    try {
      const response = await userUpdateApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const allUserNotification = createAsyncThunk(
  "api/allUserNotification",
  async (data, thunkAPI) => {
    try {
      const response = await allUserNotificationApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userNotification = createAsyncThunk(
  "api/userNotification",
  async (data, thunkAPI) => {
    try {
      console.log("hello2");
      const response = await userNotificationApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserNotification = createAsyncThunk(
  "api/fetchUserNotification",
  async (data, thunkAPI) => {
    try {
      const response = await fetchUserNotificationApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const adminAddedUserBalance = createAsyncThunk(
  "api/adminAddedUserBalance",
  async (data, thunkAPI) => {
    try {
      const response = await userDiposit(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const admiSubtractedUserBalance = createAsyncThunk(
  "api/admiSubtractedUserBalance",
  async (data, thunkAPI) => {
    try {
      const response = await userWithdraw(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStaff = createAsyncThunk(
  "api/fetchAllStaff",
  async (data, thunkAPI) => {
    try {
      const response = await allStaffApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStaffById = createAsyncThunk(
  "api/fetchStaffById",
  async (data, thunkAPI) => {
    try {
      const response = await staffByIdApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const staffUpdate = createAsyncThunk(
  "api/staffUpdate",
  async (data, thunkAPI) => {
    try {
      console.log("ffffffffffffffffffff");
      const response = await staffUpdateApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const staffRegister = createAsyncThunk(
  "api/staffRegister",
  async (data, thunkAPI) => {
    try {
      const response = await staffRegisterApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllSupportTicket = createAsyncThunk(
  "api/fetchAllSupportTicket",
  async (data, thunkAPI) => {
    try {
      const response = await getAllSupportTicketApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchSupportTicketMessageById = createAsyncThunk(
  "api/fetchSupportTicketMessageById",
  async (data, thunkAPI) => {
    try {
      const response = await getSupportTicketMessageByIdApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendSupportTicketMessage = createAsyncThunk(
  "api/sendSupportTicketMessage",
  async (data, thunkAPI) => {
    try {
      const response = await sendSupportTicketMessageApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateSupportTicketMessageById = createAsyncThunk(
  "api/updateSupportTicketMessageById",
  async (data, thunkAPI) => {
    try {
      const response = await updateSupportTicketMessageByIdApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "api/fetchTransactions",
  async (data, thunkAPI) => {
    try {
      const response = await getTransactions(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "api/fetchEvents",
  async (data, thunkAPI) => {
    try {
      const response = await getEvents(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "api/fetchEventById",
  async (data, thunkAPI) => {
    try {
      const response = await getEventById(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const CreateEvents = createAsyncThunk(
  "api/CreateEvents",
  async (data, thunkAPI) => {
    try {
      const response = await createEventApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const UpdateEvents = createAsyncThunk(
  "api/UpdateEvents",
  async (data, thunkAPI) => {
    try {
      const response = await updateEventApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
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

export const withdrawals = createAsyncThunk(
  "api/withdrawals",
  async (data, thunkAPI) => {
    try {
      const response = await allWithdrawals(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const withdrawalStatus = createAsyncThunk(
  "api/withdrawalStatus",
  async (data, thunkAPI) => {
    try {
      const response = await withdrawalStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const allDeposits = createAsyncThunk(
  "api/allDeposits",
  async (data, thunkAPI) => {
    try {
      const response = await allDepositsApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const depositStatus = createAsyncThunk(
  "api/depositStatus",
  async (data, thunkAPI) => {
    try {
      const response = await depositStatusApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userAllDetails = createAsyncThunk(
  "api/userAllDetails",
  async (data, thunkAPI) => {
    try {
      const response = await userAllDetailsApi(data);
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

    profileUpdate: {},
    profileUpdateLoading: false,
    profileUpdateError: null,
    profileUpdateSuccess: null,

    subscribersListData: [],
    subscribersListDataLoading: false,
    subscribersListDataError: null,
    subscribersListDataSuccess: null,

    subscribersNotificationData: [],
    subscribersNotificationDataLoading: false,
    subscribersNotificationDataError: null,
    subscribersNotificationDataSuccess: null,

    subscribersNotificationDataToAll: [],
    subscribersNotificationDataToAllLoading: false,
    subscribersNotificationDataToAllError: null,
    subscribersNotificationDataToAllSuccess: null,

    usersData: [],
    usersDataLoading: false,
    usersDataError: null,
    usersDataSuccess: null,

    userData: {},
    userDataLoading: false,
    userDataError: null,
    userDataSuccess: null,

    userDetailsData: {},
    userDetailsDataLoading: false,
    userDetailsDataError: null,
    userDetailsDataSuccess: null,

    userUpdateData: {},
    userUpdateDataLoading: false,
    userUpdateDataError: null,
    userUpdateDataSuccess: null,

    countriesData: [],
    countriesDataLoading: false,
    countriesDataError: null,
    countriesDataSuccess: null,

    StatesData: [],
    StatesDataLoading: false,
    StatesDataError: null,
    StatesDataSuccess: null,

    CitiesData: [],
    CitiesDataLoading: false,
    CitiesDataError: null,
    CitiesDataSuccess: null,

    balanceUpdateData: [],
    balanceUpdateDataLoading: false,
    balanceUpdateDataError: null,
    balanceUpdateDataSuccess: null,

    allUserNotificationData: [],
    allUserNotificationDataLoading: false,
    allUserNotificationDataError: null,
    allUserNotificationDataSuccess: null,

    userNotificationData: [],
    userNotificationDataLoading: false,
    userNotificationDataError: null,
    userNotificationDataSuccess: null,

    userNotificationData: [],
    userNotificationDataLoading: false,
    userNotificationDataError: null,
    userNotificationDataSuccess: null,

    staffAllData: [],
    staffAllDataLoading: false,
    staffAllDataError: null,
    staffAllDataSuccess: null,

    staffByIdData: [],
    staffByIdDataLoading: false,
    staffByIdDataError: null,
    staffByIdDataSuccess: null,

    staffUpdateDataLoading: false,
    staffUpdateDataSuccess: null,

    staffRegisterData: [],
    staffRegisterDataLoading: false,
    staffRegisterDataError: null,
    staffRegisterDataSuccess: null,

    allSupportTicketData: [],
    allSupportTicketDataLoading: false,
    allSupportTicketDataError: null,
    allSupportTicketDataSuccess: null,

    supportTicketMessageByIdData: [],
    supportTicketMessageByIdDataLoading: false,
    supportTicketMessageByIdDataError: null,
    supportTicketMessageByIdDataSuccess: null,

    sendSupportTicketMessageData: [],
    sendSupportTicketMessageDataLoading: false,
    sendSupportTicketMessageDataError: null,
    sendSupportTicketMessageDataSuccess: null,

    updateSupportTicketMessageByIdData: [],
    updateSupportTicketMessageByIdDataLoading: false,
    updateSupportTicketMessageByIdDataError: null,
    updateSupportTicketMessageByIdDataSuccess: null,

    transactionsData: [],
    transactionsDataLoading: false,
    transactionsDataError: null,
    transactionsDataSuccess: null,

    eventsData: [],
    eventsDataLoading: false,
    eventsDataError: null,
    eventsDataSuccess: null,

    eventByIdData: [],
    eventByIdDataLoading: false,
    eventByIdDataError: null,
    eventByIdDataSuccess: null,

    eventCreateData: [],
    eventCreateDataLoading: false,
    eventCreateDataError: null,
    eventCreateDataSuccess: null,

    eventUpdateData: [],
    eventUpdateDataLoading: false,
    eventUpdateDataError: null,
    eventUpdateDataSuccess: null,

    loginLogsData: [],
    loginLogsDataLoading: false,
    loginLogsDataError: null,
    loginLogsDataSuccess: null,

    fetchUserNotificationData: [],
    fetchUserNotificationDataLoading: false,
    fetchUserNotificationDataError: null,
    fetchUserNotificationDataSuccess: null,

    withdrawalsData: [],
    withdrawalsDataLoading: false,
    withdrawalsDataError: null,
    withdrawalsDataSuccess: null,

    withdrawalStatusData: [],
    withdrawalStatusDataLoading: false,
    withdrawalStatusDataError: null,
    withdrawalStatusDataSuccess: null,

    allDepositsData: [],
    allDepositsDataLoading: false,
    allDepositsDataError: null,
    allDepositsDataSuccess: null,

    depositStatusData: [],
    depositStatusDataLoading: false,
    depositStatusDataError: null,
    depositStatusDataSuccess: null,

    userAllDetailsData: [],
    userAllDetailsDataLoading: false,
    userAllDetailsDataError: null,
    userAllDetailsDataSuccess: null,
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
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // builder
    //   .addCase(login.pending, (state) => {
    //     state.loginDataLoading = true;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.loginDataLoading = false;
    //     state.loginData = action.payload;
    //     state.loginDataSuccess = true;
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.loginDataLoading = false;
    //     state.loginDataError = action.error.message;
    //   });
    builder
      .addCase(update.pending, (state) => {
        state.profileUpdateLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdate = action.payload;
        state.profileUpdateSuccess = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateError = action.error.message;
      });

    builder
      .addCase(passwordChange.pending, (state) => {
        state.profileUpdateLoading = true;
      })
      .addCase(passwordChange.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdate = action.payload;
        state.profileUpdateSuccess = true;
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.profileUpdateError = action.error.message;
      });

    builder
      .addCase(fetchSubscribersList.pending, (state) => {
        state.subscribersListDataLoading = true;
      })
      .addCase(fetchSubscribersList.fulfilled, (state, action) => {
        state.subscribersListDataLoading = false;
        state.subscribersListData = action.payload;
        state.subscribersListDataSuccess = true;
      })
      .addCase(fetchSubscribersList.rejected, (state, action) => {
        state.subscribersListDataLoading = false;
        state.subscribersListDataError = action.error.message;
      });

    builder
      .addCase(subscribersNotificationSend.pending, (state) => {
        state.subscribersNotificationDataLoading = true;
      })
      .addCase(subscribersNotificationSend.fulfilled, (state, action) => {
        state.subscribersNotificationDataLoading = false;
        state.subscribersNotificationData = action.payload;
        state.subscribersNotificationDataSuccess = true;
      })
      .addCase(subscribersNotificationSend.rejected, (state, action) => {
        state.subscribersNotificationDataLoading = false;
        state.subscribersNotificationDataError = action.error.message;
      });

    builder
      .addCase(subscribersNotificationSendToAll.pending, (state) => {
        state.subscribersNotificationDataToAllLoading = true;
      })
      .addCase(subscribersNotificationSendToAll.fulfilled, (state, action) => {
        state.subscribersNotificationDataToAllLoading = false;
        state.subscribersNotificationDataToAll = action.payload;
        state.subscribersNotificationDataToAllSuccess = true;
      })
      .addCase(subscribersNotificationSendToAll.rejected, (state, action) => {
        state.subscribersNotificationDataToAllLoading = false;
        state.subscribersNotificationDataToAllError = action.error.message;
      });

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersDataLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersDataLoading = false;
        state.usersData = action.payload;
        state.usersDataSuccess = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersDataLoading = false;
        state.usersDataError = action.error.message;
      });

    builder
      .addCase(fetchUser.pending, (state) => {
        state.userDataLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userDataLoading = false;
        state.userData = action.payload;
        state.userDataSuccess = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userDataLoading = false;
        state.userDataError = action.error.message;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.userUpdateDataLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdateDataLoading = false;
        state.userUpdateData = action.payload;
        state.userUpdateDataSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateDataLoading = false;
        state.userUpdateDataError = action.error.message;
      });

    builder
      .addCase(fetchCountries.pending, (state) => {
        state.countriesDataLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesDataLoading = false;
        state.countriesData = action.payload;
        state.countriesDataSuccess = true;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countriesDataLoading = false;
        state.countriesDataError = action.error.message;
      });

    builder
      .addCase(fetchStates.pending, (state) => {
        state.StatesDataLoading = true;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.StatesDataLoading = false;
        state.StatesData = action.payload;
        state.StatesDataSuccess = true;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.StatesDataLoading = false;
        state.StatesDataError = action.error.message;
      });

    builder
      .addCase(fetchCities.pending, (state) => {
        state.CitiesDataLoading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.CitiesDataLoading = false;
        state.CitiesData = action.payload;
        state.CitiesDataSuccess = true;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.CitiesDataLoading = false;
        state.CitiesDataError = action.error.message;
      });

    builder
      .addCase(adminAddedUserBalance.pending, (state) => {
        state.balanceUpdateDataLoading = true;
      })
      .addCase(adminAddedUserBalance.fulfilled, (state, action) => {
        state.balanceUpdateDataLoading = false;
        state.balanceUpdateData = action.payload;
        state.balanceUpdateDataSuccess = true;
      })
      .addCase(adminAddedUserBalance.rejected, (state, action) => {
        state.balanceUpdateDataLoading = false;
        state.balanceUpdateDataError = action.error.message;
      });
    builder
      .addCase(admiSubtractedUserBalance.pending, (state) => {
        state.balanceUpdateDataLoading = true;
      })
      .addCase(admiSubtractedUserBalance.fulfilled, (state, action) => {
        state.balanceUpdateDataLoading = false;
        state.balanceUpdateData = action.payload;
        state.balanceUpdateDataSuccess = true;
      })
      .addCase(admiSubtractedUserBalance.rejected, (state, action) => {
        state.balanceUpdateDataLoading = false;
        state.balanceUpdateDataError = action.error.message;
      });

    builder
      .addCase(allUserNotification.pending, (state) => {
        state.allUserNotificationDataLoading = true;
      })
      .addCase(allUserNotification.fulfilled, (state, action) => {
        state.allUserNotificationDataLoading = false;
        state.allUserNotificationData = action.payload;
        state.allUserNotificationDataSuccess = true;
      })
      .addCase(allUserNotification.rejected, (state, action) => {
        state.allUserNotificationDataLoading = false;
        state.allUserNotificationDataError = action.error.message;
      });

    builder
      .addCase(userNotification.pending, (state) => {
        state.userNotificationDataLoading = true;
      })
      .addCase(userNotification.fulfilled, (state, action) => {
        state.userNotificationDataLoading = false;
        state.userNotificationData = action.payload;
        state.userNotificationDataSuccess = true;
      })
      .addCase(userNotification.rejected, (state, action) => {
        state.userNotificationDataLoading = false;
        state.userNotificationDataError = action.error.message;
      });

    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.userDetailsDataLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetailsDataLoading = false;
        state.userDetailsData = action.payload;
        state.userDetailsDataSuccess = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userDetailsDataLoading = false;
        state.userDetailsDataError = action.error.message;
      });

    builder
      .addCase(fetchAllStaff.pending, (state) => {
        state.staffAllDataLoading = true;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.staffAllDataLoading = false;
        state.staffAllData = action.payload;
        state.staffAllDataSuccess = true;
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.staffAllDataLoading = false;
        state.staffAllDataError = action.error.message;
      });

    builder
      .addCase(fetchStaffById.pending, (state) => {
        state.staffByIdDataLoading = true;
      })
      .addCase(fetchStaffById.fulfilled, (state, action) => {
        state.staffByIdDataLoading = false;
        state.staffByIdData = action.payload;
        state.staffByIdDataSuccess = true;
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.staffByIdDataLoading = false;
        state.staffByIdDataError = action.error.message;
      });

    builder
      .addCase(staffUpdate.pending, (state) => {
        state.staffUpdateDataLoading = true;
      })
      .addCase(staffUpdate.fulfilled, (state, action) => {
        state.staffUpdateDataLoading = false;
        // state.staffUpdateData = action.payload;
        state.staffUpdateDataSuccess = true;
      })
      .addCase(staffUpdate.rejected, (state, action) => {
        state.staffUpdateDataLoading = false;
        // state.staffUpdateDataError = action.error.message;
      });

    builder
      .addCase(staffRegister.pending, (state) => {
        state.staffRegisterDataLoading = true;
      })
      .addCase(staffRegister.fulfilled, (state, action) => {
        state.staffRegisterDataLoading = false;
        state.staffRegisterData = action.payload;
        state.staffRegisterDataSuccess = true;
      })
      .addCase(staffRegister.rejected, (state, action) => {
        state.staffRegisterDataLoading = false;
        state.staffRegisterDataError = action.error.message;
      });

    builder
      .addCase(fetchAllSupportTicket.pending, (state) => {
        state.allSupportTicketDataLoading = true;
      })
      .addCase(fetchAllSupportTicket.fulfilled, (state, action) => {
        state.allSupportTicketDataLoading = false;
        state.allSupportTicketData = action.payload;
        state.allSupportTicketDataSuccess = true;
      })
      .addCase(fetchAllSupportTicket.rejected, (state, action) => {
        state.allSupportTicketDataLoading = false;
        state.allSupportTicketDataError = action.error.message;
      });

    builder
      .addCase(fetchSupportTicketMessageById.pending, (state) => {
        state.supportTicketMessageByIdDataLoading = true;
      })
      .addCase(fetchSupportTicketMessageById.fulfilled, (state, action) => {
        state.supportTicketMessageByIdDataLoading = false;
        state.supportTicketMessageByIdData = action.payload;
        state.supportTicketMessageByIdDataSuccess = true;
      })
      .addCase(fetchSupportTicketMessageById.rejected, (state, action) => {
        state.supportTicketMessageByIdDataLoading = false;
        state.supportTicketMessageByIdDataError = action.error.message;
      });

    builder
      .addCase(sendSupportTicketMessage.pending, (state) => {
        state.sendSupportTicketMessageDataLoading = true;
      })
      .addCase(sendSupportTicketMessage.fulfilled, (state, action) => {
        state.sendSupportTicketMessageDataLoading = false;
        state.sendSupportTicketMessageData = action.payload;
        state.sendSupportTicketMessageDataSuccess = true;
      })
      .addCase(sendSupportTicketMessage.rejected, (state, action) => {
        state.sendSupportTicketMessageDataLoading = false;
        state.sendSupportTicketMessageDataError = action.error.message;
      });

    builder
      .addCase(updateSupportTicketMessageById.pending, (state) => {
        state.updateSupportTicketMessageByIdDataLoading = true;
      })
      .addCase(updateSupportTicketMessageById.fulfilled, (state, action) => {
        state.updateSupportTicketMessageByIdDataLoading = false;
        state.updateSupportTicketMessageByIdData = action.payload;
        state.updateSupportTicketMessageByIdDataSuccess = true;
      })
      .addCase(updateSupportTicketMessageById.rejected, (state, action) => {
        state.updateSupportTicketMessageByIdDataLoading = false;
        state.updateSupportTicketMessageByIdDataError = action.error.message;
      });

    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.transactionsDataLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactionsDataLoading = false;
        state.transactionsData = action.payload;
        state.transactionsDataSuccess = true;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.transactionsDataLoading = false;
        state.transactionsDataError = action.error.message;
      });

    builder
      .addCase(fetchEvents.pending, (state) => {
        state.eventsDataLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsDataLoading = false;
        state.eventsData = action.payload;
        state.eventsDataSuccess = true;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.eventsDataLoading = false;
        state.eventsDataError = action.error.message;
      });

    builder
      .addCase(fetchEventById.pending, (state) => {
        state.eventByIdDataLoading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.eventByIdDataLoading = false;
        state.eventByIdData = action.payload;
        state.eventByIdDataSuccess = true;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.eventByIdDataLoading = false;
        state.eventByIdDataError = action.error.message;
      });

    builder
      .addCase(CreateEvents.pending, (state) => {
        state.eventCreateDataLoading = true;
      })
      .addCase(CreateEvents.fulfilled, (state, action) => {
        state.eventCreateDataLoading = false;
        state.eventCreateData = action.payload;
        state.eventCreateDataSuccess = true;
      })
      .addCase(CreateEvents.rejected, (state, action) => {
        state.eventCreateDataLoading = false;
        state.eventCreateDataError = action.error.message;
      });

    builder
      .addCase(UpdateEvents.pending, (state) => {
        state.eventUpdateDataLoading = true;
      })
      .addCase(UpdateEvents.fulfilled, (state, action) => {
        state.eventUpdateDataLoading = false;
        state.eventUpdateData = action.payload;
        state.eventUpdateDataSuccess = true;
      })
      .addCase(UpdateEvents.rejected, (state, action) => {
        state.eventUpdateDataLoading = false;
        state.eventUpdateDataError = action.error.message;
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
      .addCase(fetchUserNotification.pending, (state) => {
        state.fetchUserNotificationDataLoading = true;
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.fetchUserNotificationDataLoading = false;
        state.fetchUserNotificationData = action.payload;
        state.fetchUserNotificationDataSuccess = true;
      })
      .addCase(fetchUserNotification.rejected, (state, action) => {
        state.fetchUserNotificationDataLoading = false;
        state.fetchUserNotificationDataError = action.error.message;
      });

    builder
      .addCase(withdrawals.pending, (state) => {
        state.withdrawalsDataLoading = true;
      })
      .addCase(withdrawals.fulfilled, (state, action) => {
        state.withdrawalsDataLoading = false;
        state.withdrawalsData = action.payload;
        state.withdrawalsDataSuccess = true;
      })
      .addCase(withdrawals.rejected, (state, action) => {
        state.withdrawalsDataLoading = false;
        state.withdrawalsDataError = action.error.message;
      });

    builder
      .addCase(withdrawalStatus.pending, (state) => {
        state.withdrawalStatusDataLoading = true;
      })
      .addCase(withdrawalStatus.fulfilled, (state, action) => {
        state.withdrawalStatusDataLoading = false;
        state.withdrawalStatusData = action.payload;
        state.withdrawalStatusDataSuccess = true;
      })
      .addCase(withdrawalStatus.rejected, (state, action) => {
        state.withdrawalStatusDataLoading = false;
        state.withdrawalStatusDataError = action.error.message;
      });

    builder
      .addCase(allDeposits.pending, (state) => {
        state.allDepositsDataLoading = true;
      })
      .addCase(allDeposits.fulfilled, (state, action) => {
        state.allDepositsDataLoading = false;
        state.allDepositsData = action.payload;
        state.allDepositsDataSuccess = true;
      })
      .addCase(allDeposits.rejected, (state, action) => {
        state.allDepositsDataLoading = false;
        state.allDepositsDataError = action.error.message;
      });

    builder
      .addCase(depositStatus.pending, (state) => {
        state.depositStatusDataLoading = true;
      })
      .addCase(depositStatus.fulfilled, (state, action) => {
        state.depositStatusDataLoading = false;
        state.depositStatusData = action.payload;
        state.depositStatusDataSuccess = true;
      })
      .addCase(depositStatus.rejected, (state, action) => {
        state.depositStatusDataLoading = false;
        state.depositStatusDataError = action.error.message;
      });

    builder
      .addCase(userAllDetails.pending, (state) => {
        state.userAllDetailsDataLoading = true;
      })
      .addCase(userAllDetails.fulfilled, (state, action) => {
        state.userAllDetailsDataLoading = false;
        state.userAllDetailsData = action.payload;
        state.userAllDetailsDataSuccess = true;
      })
      .addCase(userAllDetails.rejected, (state, action) => {
        state.userAllDetailsDataLoading = false;
        state.userAllDetailsDataError = action.error.message;
      });
  },
});

export default apiSlice.reducer;
