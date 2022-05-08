import { combineReducers } from "redux";
import { jobReducer } from './Job';

/**
 * file này được tạo ra vì các reducer phải được combine lại để kết nối với store
 */

export default combineReducers({
    jobList: jobReducer,
});


