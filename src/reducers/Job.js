/**
 * reducer dùng để trả về state mới (giá trị được cập nhật)
 * phải là pure function
 */
let jobs = []; //giá trị khởi tạo

export const jobReducer = (state = jobs, action) => {
    switch(action.type) {
        case 'ADD_JOB':
            //thực hiện trả về state mới bao gồm jobs được thêm vào
            return [...state, {...action.payload, id: state[state.length - 1].id + 1}];
        case 'GET_JOB':
            return action.payload;
        default:
            return state;
    }
}