import * as React from "react";
import Update from "./Update";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "../actions/createJob";

function ListJob(props)
{
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobList);
    const [isShowUpdate, setIsShowUpdate] = React.useState();
    const [counter, setCounter] = React.useState(0);
    const { handleDeleteJob, listProcess } = props;

    const onUpdateJob = (updateItem) => {
        const newJobList = jobs;
        const jobId = updateItem.id-1;
        newJobList[jobId] = updateItem;
        dispatch(getJob(newJobList));
        setIsShowUpdate();
    }

    const cancelUpdate = () => {
        setIsShowUpdate();
    }

    React.useEffect(() => setCounter(jobs.length), [jobs]);

    return (
        <React.Fragment>
            <h3>Danh sách công việc</h3>
                <h5>Hiện trong danh sách có: {counter} công việc</h5>
                <ul>
                {jobs.map(job => (
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
                                    listProcess={listProcess} 
                                /> 
                            }
                            <button className='btn btn-outline-success' onClick={() => setIsShowUpdate(job.id)}>Update</button>
                            <button className='btn btn-outline-danger' onClick={() => handleDeleteJob(job.id)}>Delete</button>
                        </div><hr/>
                    </div>
                ))}
                </ul>
        </React.Fragment>
    );
}

export default ListJob;