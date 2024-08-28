const Base_Url = "https://upskilling-egypt.com:3003/api/v1";

const Base_Users= `${Base_Url}/Users`;

export const User_URls ={
    login : `${Base_Users}/Login`,
    register : `${Base_Users}/Register`,
   // delete: (id) =>  `${Base_Users}/${id}`,
    resetRequest: `${Base_Users}/Reset/Request`,
    reset: `${Base_Users}/Reset`,
    getList : `${Base_Users}`,  
    verify : `${Base_Users}/verify`,
    ChangePassword : `${Base_Users}/ChangePassword`,
}