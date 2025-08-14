//file location: src/services/userService.js
import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post("/api/login", { email: userEmail, password: userPassword }); //truyen tham so vao
};

const getAllUsers = (inputId) => {
   return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
   return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
   return axios.delete(`/api/delete-user`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: userId, //truyen id cua user can xoa
      },
   });
};

const editUserService = (inputData) => {
   return axios.put("/api/edit-user", inputData);
};

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService };
