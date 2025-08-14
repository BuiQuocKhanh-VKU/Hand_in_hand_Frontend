import axios from "../axios";
const getAllDonations = (inputId) => {
   return axios.get(`/api/get-all-donations?id=${inputId}`);
};

const createNewDonationService = (data) => {
   return axios.post("/api/create-donation", data);
};

const deleteDonationService = (donationId) => {
   return axios.delete(`/api/delete-donation`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: donationId, //truyen id cua donation can xoa
      },
   });
};
const editDonationService = (inputData) => {
   return axios.put("/api/update-donation", inputData);
};

const getDonationByUser = (userId) => {
   return axios.get(`/api/get-donation-by-user?id=${userId}`);
};

const getAllProducts = (inputId) => {
   return axios.get(`/api/get-all-products?id=${inputId}`);
};
const getAllUsers = (inputId) => {
   return axios.get(`/api/get-all-users?id=${inputId}`);
};
const getAllCarts = (inputId) => {
   return axios.get(`/api/get-all-carts?id=${inputId}`);
};
const getDonationsCountForCurrentWeek = () => {
   return axios.get("/api/get-donations-count-for-current-week");
};
export {
   getAllDonations,
   createNewDonationService,
   deleteDonationService,
   editDonationService,
   getDonationByUser,
   getAllProducts,
   getAllUsers,
   getAllCarts,
   getDonationsCountForCurrentWeek,
};
