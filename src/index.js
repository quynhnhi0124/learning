import * as React from "react";
import ReactDOM from "react-dom"
import Add from "./components/Add";
import Search from "./components/Search";
import getToDoList from "./models/todoList";
import ListJob from "./components/ListJob";
import combineReducers from "./reducers/index";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import { getJob } from "./actions/createJob";

const store = createStore(combineReducers);

const LIST_STATUS = {1 : "Hoàn thành", 0: "Chưa hoàn thành"};


function App()
{
    const dispatch = useDispatch();
    const [errors, setErrors] = React.useState({});
    const [filterData, setFilterData] = React.useState([]);

    const jobs = useSelector(state => state.jobList);
    React.useEffect(() => {
        getToDoList().then(datas => {
            dispatch(getJob(datas));
            setFilterData(datas);
            return datas;
        })
    }, [])

    const validation = (addJob) => {
        if (addJob === null || addJob.match(/^ *$/) !== null) {
            if(!errors.hasOwnProperty('job')) {
                errors.job = 'Trường nhập bắt buộc';
                setErrors({...errors})
            }
            return false;
        } else {
            const delValidate  = errors;
            delete delValidate.job; 
            setErrors(delValidate);
            return true;
        }
    }

    const handleDeleteJob = (jobId) => {
        const newJobList = jobs.filter(job => {
            return job.id !== jobId;
        });

        dispatch(getJob(newJobList));
        setFilterData(newJobList);
    }

    const handleSearchJob = (input) => {
        if (input === '') {
            setFilterData(jobs);
        } else {
            const result = jobs.filter((job) => job.title.toLowerCase().includes(input));
            setFilterData(result);
        }
    }

    return (
        <div className='container'>
            <Add 
                listProcess={LIST_STATUS} 
                listErrors={errors}
                validation={validation}
            />
            <Search
                searchJob={handleSearchJob}

            />
            <ListJob
                handleDeleteJob={handleDeleteJob}
                listProcess={LIST_STATUS} 
            />
        </div>
    );
}

export { store };

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));