import axios from "axios";
import { snack } from "../utils/snack";
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

const loginAdmin = async (body) => {
  const response = await axios
    .post(`${apiUrl}/admin/authenticate`, body)
    .then((res) => {
      snack.success("Admin Login Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const loginOperator = async (body) => {
  const response = await axios
    .post(`${apiUrl}/operator/authenticate`, body)
    .then((res) => {
      snack.success("Operator Login Successfully");
      return res.data;
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

const updateAdminApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/admin/${data.id}`, data.body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Profile Updated Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const changeAdminPasswordApi = async (body) => {
  const response = await axios
    .put(`${apiUrl}/admin/changePassword`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Profile Updated Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};
const getOperator = async (id) => {
  const response = await axios
    .get(`${apiUrl}/operator/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const loginLogsApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/loginLogs?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}&type=${data.type}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const loginLogsDetailsApi = async (type) => {
  const response = await axios
    .get(`${apiUrl}/loginLogs/log/details?type=${type} `)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const createMemoApi = async (body) => {
  const response = await axios
    .post(`${apiUrl}/memo/store`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Memo Created Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const updateMemoApi = async (data) => {
  const response = await axios
    .put(`${apiUrl}/memo/update/${data.id}`, data.body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Memo Updated Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const getMemoApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/memo?status=${data.status}&search=${data.search}&filter=${data.type}&startDate=${data.startDate}&endDate=${data.endDate}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getMemoByIdApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/memo/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const createOperatorApi = async (body) => {
  const response = await axios
    .post(`${apiUrl}/operator/register`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Memo Created Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const updateOperatorApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/operator/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getOperatorsApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/operator?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const createOwnerApi = async (body) => {
  const response = await axios
    .post(`${apiUrl}/owners/register`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      snack.success("Memo Created Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const updateOwnerApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/owners/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getOwnersApi = async (data) => {
  const response = await axios
    .get(
      `${apiUrl}/owners?search=${data.search}&page=${data.currentPage}&pageSize=${data.limit}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const getOwnerApi = async (id) => {
  const response = await axios
    .get(`${apiUrl}/owners/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};
const getMemoIDApi = async () => {
  const response = await axios
    .get(`${apiUrl}/memo/lastMemo/memoId `)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const seenMemoApi = async (id) => {
  const response = await axios
    .put(`${apiUrl}/memo/status/seen/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const apkUploadApi = async (data) => {
  const response = await axios
    .post(`${apiUrl}/apk/upload`, data)
    .then((res) => {
      snack.success("Apk Uploaded Successfully");
      return res.data;
    })
    .catch((err) => {
      snack.error(err?.response?.data?.message);
      throw new Error(err);
    });
  return response;
};

const getApkApi = async () => {
  const response = await axios
    .get(`${apiUrl}/apk/download`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

export {
  loginAdmin,
  loginOperator,
  getAdmin,
  getOperator,
  loginLogsApi,
  loginLogsDetailsApi,
  createMemoApi,
  getMemoApi,
  getMemoByIdApi,
  createOperatorApi,
  updateOperatorApi,
  getOperatorsApi,
  createOwnerApi,
  updateOwnerApi,
  getOwnersApi,
  getOwnerApi,
  getMemoIDApi,
  updateMemoApi,
  updateAdminApi,
  changeAdminPasswordApi,
  seenMemoApi,
  apkUploadApi,
  getApkApi,
};
