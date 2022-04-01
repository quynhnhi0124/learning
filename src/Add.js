import * as React from "react";

function Add(props)
{
    const {addJob, listProcess, onAddJob, onAddProcess, handleAddJob} = props;

    return (
        <div className="my-3 mx-3">
            <div className="row d-block">
                <p>Công việc:</p> 
                <input
                    className='form-control col-md-6 col-sm-6'
                    value={addJob}
                    onChange={e => onAddJob(e)}
                />
            </div>
            <div className="row d-block">
                <p>Trạng thái:</p>
                <select 
                    className="custom-select col-md-6 col-sm-6" 
                    defaultValue="Chua lam" 
                    onChange={ e => onAddProcess(listProcess.indexOf(e))}>
                    {listProcess.map((item, key) => (
                        <option key={key}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <button className='my-1 btn btn-outline-dark' onClick={handleAddJob}>Add</button>
        </div>
    );
}

export default Add;