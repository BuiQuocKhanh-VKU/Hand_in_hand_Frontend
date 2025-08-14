import axios from "../axios";
const getAllProducts = (inputId) => {
   return axios.get(`/api/get-all-products?id=${inputId}`);
};
const createNewProductService = (data) => {
   return axios.post("/api/create-product", data);
};

const deleteProductService = (productId) => {
   return axios.delete(`/api/delete-product`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: productId, //truyen id cua product can xoa
      },
   });
};
const editProductService = (inputData) => {
   return axios.put("/api/update-product", inputData);
};

export { getAllProducts, createNewProductService, deleteProductService, editProductService };
