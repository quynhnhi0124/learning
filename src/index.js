import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function App()
{
    const [jobs, setJobs] = useState(() => {
        const listJob = JSON.parse(localStorage.getItem('jobs'));
        return listJob || [];
    });
    const [job, setJob] = useState('');
    const [showUpdate, setShowUpdate] = useState(() => {
        return new Array(jobs.length).fill().map((value) => (value = false));
    });

    const handleAdd = () => {
        setJobs(prev => {
            const newJob = [...prev, job];
            localStorage.setItem('jobs', JSON.stringify(newJob))
            return newJob;
        });
        setJob('');
    }

    const handleDelete = (key) => {
        setJobs(prev => {
            const newList = prev.filter((prev, index) => (index !== key));
            localStorage.setItem('jobs', JSON.stringify(newList));
            return newList;
        });
    }

    const handleUpdate = (key) => {
        setShowUpdate((prev) => {
            prev[key] = !prev[key];
            return prev;
        });
    }

    return (
        <div className="wrapper">
            <input 
                value={job}
                onChange={e => setJob(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>

            <ul>
                {jobs.map((job, key) => (
                    <div key={key}>
                        <li>{job}</li>
                        <button onClick={() => handleDelete(key)}>Delete</button>
                        <button onClick={() => handleUpdate(key)}>Update</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));
