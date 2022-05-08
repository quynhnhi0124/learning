/**
 * tạo action để add post
 * action dùng để mô tả event người dùng tạo ra
 * một action bao gồm type và payload: khi action type = "ADD_JOB" thì tạo ra một bài post với id ngẫu nhiên và content
 * khi ấn vào tạo bài viết thì action sẽ được dispatch đến reducer để xử lý => sau khi tạo action thì tạo đến reducer
 */
const createJob = (content, complete) => ({
    type: 'ADD_JOB',
    payload: {
        id: null,
        title: content,
        complete: complete
    }
});

const getJob = (datas) => ({
    type: 'GET_JOB',
    payload : datas
})

export {createJob, getJob};
