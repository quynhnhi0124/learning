import * as React from "react";
import ReactDOM from "react-dom"
import Update from "./Update"
import Add from "./Add";

const LIST_JOB = [
    {
        id: '1',
        name: 'Di choi',
        process: '1'
    },
    {
        id: '2',
        name: 'Di ngu',
        process: '2'
    }
];

const LIST_PROCESS = ["Dang lam", "Chua lam", "Da hoan thanh"]


function App()
{
    const [jobs, setJobs] = React.useState(LIST_JOB);
    const [addJob, setAddJob] = React.useState('');
    const [addProcess, setAddProcess] = React.useState("Chua lam");
    const [isShowUpdate, setIsShowUpdate] = React.useState();
    
    const onAddJob = e => {
        setAddJob(e.target.value)
    }
    
    const handleAddJob = () => {
        setJobs([...jobs, {id: String(jobs.pop().id + 1), name: addJob, process: addProcess}])
        setAddJob('')
    }
    console.log(addJob);

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
            return job.id !== jobId
        });
        setJobs(newJobList);
    }
    
    return (
        <div className='container'>
            <Add 
                addJob={addJob}
                listProcess={LIST_PROCESS} 
                handleAddJob={handleAddJob} 
                onAddJob={onAddJob}
                onAddProcess={onAddProcess}
            />
            <h3>Danh sách công việc</h3>
            <ul>
            {jobs.map(job => (
                <div key={job.id}>
                    <div 
                        className="mt-3"    
                    >
                        <li className="d-block">
                            <p>{job.name}</p>
                            <p>Trạng thái: {LIST_PROCESS[job.process]}</p>
                        </li>
                        {
                            isShowUpdate === job.id &&
                            <Update 
                                updateItem={job} 
                                onUpdateJob={onUpdateJob} 
                                cancelUpdate={cancelUpdate}
                                listProcess={LIST_PROCESS} 
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