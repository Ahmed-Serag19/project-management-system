const Base_Url = "https://upskilling-egypt.com:3003/api/v1";
export const Base_Img_Url ="https://upskilling-egypt.com:3003/"

export const requestHeader ={
  Authorization: `Bearer ${localStorage.getItem("token")}`,
}

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
  toggleStatues:(id:string)=> `${Base_Users}/${id}`,
};
