const Base_Url = "https://upskilling-egypt.com:3003/api/v1";
export const Base_Img_Url = "https://upskilling-egypt.com:3003/";

export const requestHeader = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const Base_Users = `${Base_Url}/Users`;

export const User_URls = {
  login: `${Base_Users}/Login`,
  register: `${Base_Users}/Register`,
  resetRequest: `${Base_Users}/Reset/Request`,
  reset: `${Base_Users}/Reset`,
  getList: `${Base_Users}`,
  verify: `${Base_Users}/verify`,
  ChangePassword: `${Base_Users}/ChangePassword`,
  getCurrentUser: `${Base_Users}/currentUser`,
  getUser: `${Base_Users}`,
  toggleStatues: (id: string) => `${Base_Users}/${id}`,
};

const Base_Tasks = `${Base_Url}/Task`;

export const Task_URLs = {
  create: `${Base_Tasks}`,
  getAllAssigned: `${Base_Tasks}`,
  getAllForManager: `${Base_Tasks}/manager`,
  update: (id: number | string): string => `${Base_Tasks}/${id}`,
  delete: (id: number | string): string => `${Base_Tasks}/${id}`,
  count: `${Base_Tasks}/count`,
  changeStatus: (id: number | string): string =>
    `${Base_Tasks}/${id}/change-status`,
  getByProject: (projectId: number | string): string =>
    `${Base_Tasks}/project/${projectId}`,
};

export const Project_URLs = {
  addNewProject: `${Base_Url}/Project`,
};
