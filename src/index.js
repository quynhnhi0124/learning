import * as React from "react";
import ReactDOM from "react-dom"
import Content from "./Content"

const LIST_JOB = [
    {
        id: '1',
        name: 'Di choi'
    },
    {
        id: '2',
        name: 'Di ngu'
    }
];


function App()
{
    const [jobs, setJobs] = React.useState(LIST_JOB);
    const [addJob, setAddJob] = React.useState('');
    const [isShowUpdate, setIsShowUpdate] = React.useState();

    const handleAddJob = () => {
        setJobs([...jobs, {id: String(jobs.length + 1), name: addJob}])
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
            <div className="row my-3">
                <input
                    className='form-control col-md-8 col-sm-8'
                    value={addJob}
                    onChange={e => setAddJob(e.target.value)}
                />
                <button className='btn btn-outline-dark' onClick={handleAddJob}>Add</button>
            </div>
            <h3>Danh sách công việc</h3>
            <ul>
            {jobs.map(job => (
                <div 
                    key={job.id}
                    className="row mt-3"    
                >
                    <li>
                        {job.name}
                    </li>
                    {isShowUpdate === job.id && <Content updateItem={job} onUpdateJob={onUpdateJob} cancelUpdate={cancelUpdate}/>}
                    <button className='btn btn-outline-dark' onClick={() => handleShowUpdate(job.id)}>Update</button>
                    <button className='btn btn-outline-dark' onClick={() => handleDeleteJob(job.id)}>Delete</button>
                </div>
            ))}
            </ul>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));