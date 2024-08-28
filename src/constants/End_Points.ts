const Base_Url = "https://upskilling-egypt.com:3003/api/v1";
export const Base_Img_Url ="https://upskilling-egypt.com:3003/"
const Base_Users= `${Base_Url}/Users`;

export const User_URls ={
    login : `${Base_Users}/Login`,
    register : `${Base_Users}/Register`,
    resetRequest: `${Base_Users}/Reset/Request`,
    reset: `${Base_Users}/Reset`,
    getList : `${Base_Users}`,  
    verify : `${Base_Users}/verify`,
    ChangePassword : `${Base_Users}/ChangePassword`,
    currentUser:`${Base_Users}/currentUser`,
}