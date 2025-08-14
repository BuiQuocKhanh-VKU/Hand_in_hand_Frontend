import axios from "../axios";
const getAllCampaigns = (inputId) => {
   return axios.get(`/api/get-all-campaigns?id=${inputId}`);
};

const createNewCampaignService = (data) => {
   return axios.post("/api/create-campaign", data);
};

const deleteCampaignService = (campaignId) => {
   return axios.delete(`/api/delete-campaign`, {
      //goi phuong thuc delete
      data: {
         //truyen tham so vao
         id: campaignId, //truyen id cua campaign can xoa
      },
   });
};
const editCampaignService = (inputData) => {
   return axios.put("/api/update-campaign", inputData);
};

const getAllProvinces = (inputId) => {
   return axios.get(`/api/get-all-provinces?id=${inputId}`);
};

const getProvinceOverview = (inputId) => {
   return axios.get(`/api/get-province-overview?id=${inputId}`);
};
const getCampaignByProvinceId = (inputId) => {
   return axios.get(`/api/get-campaigns-by-province?id=${inputId}`);
};
const getCampaignStatusCounts = () => {
   return axios.get(`/api/get-campaign-status-counts`);
};
export {
   getAllCampaigns,
   createNewCampaignService,
   deleteCampaignService,
   editCampaignService,
   getAllProvinces,
   getProvinceOverview,
   getCampaignByProvinceId,
   getCampaignStatusCounts,
};
