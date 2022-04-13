import * as React from "react";
import ReactDOM from "react-dom"
import Update from "./Update"
import Add from "./Add";
import Search from "./Search";
import getToDoList from "./models/todoList";

const LIST_STATUS = {1 : "Hoàn thành", 0: "Chưa hoàn thành"};


function App()
{
    const [errors, setErrors] = React.useState({});
    const [jobs, setJobs] = React.useState([]);
    const [addJob, setAddJob] = React.useState('');
    const [filterData, setFilterData] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const [addProcess, setAddProcess] = React.useState();
    const [isShowUpdate, setIsShowUpdate] = React.useState();

    React.useEffect(() => setCounter(filterData.length), [filterData])
    React.useEffect(() => {
        getToDoList().then(datas => {
            setJobs(datas);
            setFilterData(datas);
            return datas;
        })
    }, [])
    
    const onAddJob = e => {
        setAddJob(e.target.value)
    }
    
    const HandleAddJob = () => {
        validation();
        if (validation() === true) {
            const newListJob = [...jobs,
                {id: jobs[jobs.length - 1].id + 1, title: addJob, completed: addProcess}];
            setJobs(newListJob);
            setFilterData(newListJob);
            setAddJob('');
        }
    }

    const validation = () => {
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

    const onAddProcess = e => {
        setAddProcess(e.target.value)
    }
    
    const handleShowUpdate = (jobId) => {
        setIsShowUpdate(jobId);
    }

    const onUpdateJob = (updateItem) => {
        const newJobList = jobs;
        newJobList.map(job => job.id === updateItem.id ? updateItem : job);
        setJobs(newJobList);
        setIsShowUpdate();
    }

    const cancelUpdate = () => {
        setIsShowUpdate();
    }

    const handleDeleteJob = (jobId) => {
        const newJobList = jobs.filter(job => {
            return job.id !== jobId;
        });
        setJobs(newJobList);
        setFilterData(newJobList);
    }

    const handleSearchJob = (input) => {
        if (input === '') {
            setFilterData(jobs);
        } else {
            const result = jobs.filter((job) => job.title.toLowerCase().includes(input));
            setFilterData(result);
        }
        return filterData;
    }

    return (
        <div className='container'>
            <Add 
                addJob={addJob}
                listProcess={LIST_STATUS} 
                handleAddJob={HandleAddJob} 
                onAddJob={onAddJob}
                onAddProcess={onAddProcess}
                listErrors={errors}
            />
            <Search
                searchJob={handleSearchJob}

            />
            <h3>Danh sách công việc</h3>
            <h5>Hiện trong danh sách có: {counter} công việc</h5>
            <ul>
            {filterData.map(job => (
                <div key={job.id}>
                    <div 
                        className="mt-3"    
                    >
                        <li className="d-block">
                            <p>{job.title}</p>
                            <p>Trạng thái: {job.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</p>
                        </li>
                        {
                            isShowUpdate === job.id &&
                            <Update 
                                updateItem={job} 
                                onUpdateJob={onUpdateJob} 
                                cancelUpdate={cancelUpdate}
                                listProcess={LIST_STATUS} 
                            /> 
                        }
                        <button className='btn btn-outline-success' onClick={() => handleShowUpdate(job.id)}>Update</button>
                        <button className='btn btn-outline-danger' onClick={() => handleDeleteJob(job.id)}>Delete</button>
                    </div><hr/>
                </div>
            ))}
            </ul>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));