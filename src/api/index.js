import axios from "axios";
import { snack } from "../utils/snack";
import { history } from "../history";
const apiUrl = import.meta.env.VITE_API_URL + "/api";
const countryApiUrl = import.meta.env.VITE_COUNTRIES_API_URL;

// const headers = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// };

const data = localStorage.getItem("persist:root");
const persistData = JSON.parse(data);
const Token = persistData && JSON.parse(persistData?.login);
const TokenKey = Token && Token?.loginToken;
const headers = {
  headers: {
    Authorization: `Bearer ${
      TokenKey ? TokenKey : localStorage.getItem("token")
    }`,
  },
};

const registerAdmin = async (body) => {
  const response = await axios
    .post(`${apiUrl}/admin/register`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const loginAdmin = async (body) => {
  const response = await axios
    .post(`${apiUrl}/admin/authenticate`, body)
    .then((res) => {
      if (res.data.data.twofa_status) {
        history.navigate("/session/two-factor", {
          state: {
            id: res?.data?.data?.id,
            email: res?.data?.data?.email,
            token: res?.data?.data?.token,
            data: res?.data?.data,
          },
        });
      } else {
        return res.data;
      }
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const getAdmin = async (id) => {
  const response = await axios
    .get(`${apiUrl}/admin/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const updateAdmin = async (data) => {
  const response = await axios
    .put(`${apiUrl}/admin/${data.id}`, data.body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const passwordChangeAdmin = async (data) => {
  const response = await axios
    .post(`${apiUrl}/admin/change-password`, data)
    .then((res) => {
      snack.success("Password Changed Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const subscribersList = async (data) => {
  const response = await axios
    .get(`${apiUrl}/subscribe?search=${data.search}&pageSize=${data.limit}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const subscribersNotification = async (data) => {
  const response = await axios
    .post(`${apiUrl}/sub-notification/send`, data)
    .then((res) => {
      snack.success("Sent Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};
const subscribersNotificationToAll = async (data) => {
  const response = await axios
    .post(`${apiUrl}/sub-notification/send/all`, data)
    .then((res) => {
      snack.success("Sent Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};
const usersApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/user?type=${data.type}&search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const userApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/user/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const userUpdateApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/user/${data?.id}`, data.body)
    .then((res) => {
      snack.success("Updates Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err);
      throw new Error(err);
    });
  return response;
};

const allUserNotificationApi = async (data) => {
  console.log(data);
  const response = await axios
    .post(`${apiUrl}/user_mail/all`, data)
    .then((res) => {
      snack.success("Sent Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err.response.data.message);
      throw new Error(err);
    });
  return response;
};

const userNotificationApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/user_mail/user`, data)
    .then((res) => {
      snack.success("Sent Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err.response.data.message);
      throw new Error(err);
    });
  return response;
};

const fetchUserNotificationApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/user_mail?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getCountriesApi = async () => {
  const response = await axios
    .get(`${apiUrl}/countries`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getStatesApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/countries/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getCitiesApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/states/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const userWithdraw = async (data) => {
  const response = await axios
    .post(`${apiUrl}/transaction/admin/withdraw`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Balance Subtracted Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const allWithdrawals = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/withdrawals?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const withdrawalStatusApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/transaction/withdraw `, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Withdraw completed successfully");

      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const depositStatusApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/transaction/deposit `, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Deposited completed successfully");

      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const allDepositsApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/deposits?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`,
      data
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const userDiposit = async (data) => {
  const response = await axios
    .post(`${apiUrl}/transaction/admin/deposit`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Balance Added Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const userCountApi = async () => {
  const response = await axios
    .get(`${apiUrl}/user/count-all`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

// Staff

const allStaffApi = async (data) => {
  const response = await axios
    .get(`${apiUrl}/sub-admin/all?search=${data.search}&pageSize=${data.limit}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const staffByIdApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/sub-admin/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const staffUpdateApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/sub-admin/update/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const staffRegisterApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/sub-admin/register`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const staffLoginApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/sub-admin/authenticate`, data)
    .then((res) => {
      if (res.data.data.twofa_status) {
        history.navigate("/session/two-factor", {
          state: {
            id: res?.data?.data?.id,
            email: res?.data?.data?.email,
            token: res?.data?.data?.token,
            data: res?.data?.data,
          },
        });
      } else {
        history.navigate("/session/two-factor-required", {
          state: {
            id: res?.data?.data?.id,
            email: res?.data?.data?.email,
            token: res?.data?.data?.token,
            data: res?.data?.data,
          },
        });
      }
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const getAllSupportTicketApi = async () => {
  const response = await axios
    .get(`${apiUrl}/support-tickets`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const sendSupportTicketMessageApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/ticket-message/store`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getSupportTicketMessageByIdApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/support-tickets/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const updateSupportTicketMessageByIdApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/support-tickets/${data?.id}`, data?.body)
    .then((res) => {
      if (data?.body?.status === 3) {
        snack.success("Closed Successfully");
      }
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const getTransactions = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/transaction?search=${data.search}&type=${data.type}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getEvents = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/events?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getEventById = async (id) => {
  console.log(id);
  const response = await axios
    .get(`${apiUrl}/events/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const createEventApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/events/store/`, data)
    .then((res) => {
      snack.success("Event Created Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const updateEventApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/events/${data.id}`, data.body)
    .then((res) => {
      if (data?.body?.status || data?.body?.status === 0) {
        return res.data;
      }
      snack.success("Event Updated Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const loginLogsApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/login-logs?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const userAllDetailsApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/user/detail/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const loginLogsDetailsApi = async () => {
  const response = await axios
    .get(`${apiUrl}/login-logs/log/details`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const updateEventStatusApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/events/statusUpdate/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const register2FAApi = async (body) => {
  const response = await axios
    .post(`${apiUrl}/two-factor/register`, body)
    .then((res) => {
      snack.success("Two Factor Activated Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const verify2FAApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/two-factor/verify`, data?.twoFatorData)
    .then((res) => {
      snack.success("Login Successfully");
      return {
        twoFaData: res.data,
        loginData: data.loginData,
        token: data.token,
      };
    })
    .catch((err) => {
      snack.error(err?.response?.data?.error);
      throw new Error(err);
    });
  return response;
};
const addSubscriptionApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/subscriptionForm/store`, data)
    .then((res) => {
      snack.success("Subscription Plan Added Successfully!");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

// const updateSubscriptionApi = async (data) => {
//   const response = await axios
//     .put(`${apiUrl}/subscriptionForm/update/${data.id}`, data.body)
//     .then((res) => {
//       snack.success("Subscription Plan Updated Successfully!");
//       return res.data;
//     })
//     .catch((err) => {
//       snack.error(err?.response?.data?.error);
//       throw new Error(err);
//     });
//   return response;
// };

const allSubscriptionApi = async () => {
  const response = await axios
    .get(`${apiUrl}/subscriptionForm`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const subscriptionByIdApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/subscriptionForm/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const allUsersSubscriptionsApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/subscriptionUser?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const activeSubscriptionUsersApi = async (data) => {
  const response = await axios
    .get(`${apiUrl}/subscriptionUser?returnUser=true`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const updateSubscriptionApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/subscriptionForm/update/${data.id}`, data.body)
    .then((res) => {
      snack.success("Subscription Plan Updated Successfully!");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.error);
      throw new Error(err);
    });
  return response;
};

const setEventWinningApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/events/win/${data?.id}`, data.body)
    .then((res) => {
      snack.success("Winning Uploaded Successfully!");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

export {
  registerAdmin,
  loginAdmin,
  getAdmin,
  updateAdmin,
  passwordChangeAdmin,
  subscribersList,
  usersApi,
  getCountriesApi,
  getStatesApi,
  getCitiesApi,
  subscribersNotification,
  subscribersNotificationToAll,
  userApi,
  userCountApi,
  userUpdateApi,
  userWithdraw,
  userDiposit,
  allUserNotificationApi,
  userNotificationApi,
  staffRegisterApi,
  allStaffApi,
  staffUpdateApi,
  staffLoginApi,
  staffByIdApi,
  getAllSupportTicketApi,
  getSupportTicketMessageByIdApi,
  sendSupportTicketMessageApi,
  updateSupportTicketMessageByIdApi,
  getTransactions,
  getEvents,
  getEventById,
  updateEventApi,
  createEventApi,
  loginLogsApi,
  fetchUserNotificationApi,
  withdrawalStatusApi,
  allWithdrawals,
  allDepositsApi,
  depositStatusApi,
  userAllDetailsApi,
  loginLogsDetailsApi,
  updateEventStatusApi,
  register2FAApi,
  verify2FAApi,
  addSubscriptionApi,
  allSubscriptionApi,
  updateSubscriptionApi,
  subscriptionByIdApi,
  allUsersSubscriptionsApi,
  activeSubscriptionUsersApi,
  setEventWinningApi,
};
