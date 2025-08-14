import axios from "../axios";
const getAllPartners = (inputId) => {
    return axios.get(`/api/get-all-partners?id=${inputId}`);
};
const createNewPartnerService = (data) => {
    return axios.post("/api/create-partner", data);
};

const deletePartnerService = (partnerId) => {
    return axios.delete(`/api/delete-partner`, {
        //goi phuong thuc delete
        data: {
            //truyen tham so vao
            id: partnerId, //truyen id cua partner can xoa
        },
    });
};
const editPartnerService = (inputData) => {
    return axios.put("/api/update-partner", inputData);
};

const getAllCampaigns = (inputId) => {
    return axios.get(`/api/get-all-campaigns?id=${inputId}`);
}

const getPartnerByCampaignId = (inputId) => {
    return axios.get(`/api/get-partners-by-campaign?id=${inputId}`);
}


export {
    getAllPartners,
    createNewPartnerService,
    deletePartnerService,
    editPartnerService,
    getAllCampaigns,
    getPartnerByCampaignId
};
