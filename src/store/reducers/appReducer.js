import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'en',
    systemMenuPath: '/system/user-manage',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    },
    selectedProvinceId: null, //thêm state mới cho việc chọn tỉnh thành
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }
        case actionTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            }
            //thêm reducer mới cho việc chọn tỉnh thành
        case actionTypes.SET_SELECTED_PROVINCE:
            return {
                ...state,
                selectedProvinceId: action.provinceId,
            }
        default:
            return state;
    }
}

export default appReducer;