import axios from "../axios";
const getAllCampaignDonations = (inputId) => {
   return axios.get(`/api/get-all-campaign-donations?id=${inputId}`);
};
const createNewCampaignDonationService = (data) => {
   return axios.post("/api/create-campaign-donation", data);
};

const deleteCampaignDonationService = (id) => {
   return axios.delete(`/api/delete-campaign-donation`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: id, //truyen id cua campaign-donation can xoa
      },
   });
};

const editCampaignDonationService = (inputData) => {
   return axios.put("/api/update-campaign-donation", inputData);
};

const getAllCampaigns = (inputId) => {
   return axios.get(`/api/get-all-campaigns?id=${inputId}`);
};
const getAllUsers = (inputId) => {
   return axios.get(`/api/get-all-users?id=${inputId}`);
};

const getCampaignDonationsByUser = (inputId) => {
   return axios.get(`/api/get-campaign-donations-by-user?id=${inputId}`);
};
const getCampaignDonationsByCampaign = (inputId) => {
   return axios.get(`/api/get-campaign-donations-by-campaign?id=${inputId}`);
};

export {
   getAllCampaignDonations,
   getCampaignDonationsByUser,
   getAllUsers,
   getAllCampaigns,
   createNewCampaignDonationService,
   deleteCampaignDonationService,
   editCampaignDonationService,
   getCampaignDonationsByCampaign,
};
