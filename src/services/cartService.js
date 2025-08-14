import axios from "../axios";
const getAllCarts = (inputId) => {
   return axios.get(`/api/get-all-carts?id=${inputId}`);
};
const createNewCartService = (data) => {
   return axios.post("/api/create-cart", data);
};

const deleteCartService = (cartId) => {
   return axios.delete(`/api/delete-cart`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: cartId, //truyen id cua cart can xoa
      },
   });
};
const editCartService = (inputData) => {
   return axios.put("/api/update-cart", inputData);
};
const getAllProducts = (id) => {
   return axios.get(`/api/get-all-products?id=${id}`);
};
const getCartByUser = (userId, status) => {
   return axios.get(`/api/get-cart-by-user?id=${userId}&status=${status}`);
};

export { getAllCarts, getCartByUser, getAllProducts, createNewCartService, deleteCartService, editCartService };
