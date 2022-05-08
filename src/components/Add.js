import * as React from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../actions/createJob";

function Add(props)
{
    const dispatch = useDispatch();
    const {listProcess, listErrors, validation} = props;
    const [addJob, setAddJob] = React.useState('');
    const [addProcess, setAddProcess] = React.useState();

    const handleAddJob = (event) => {
        event.preventDefault();
        validation(addJob)
        if (validation(addJob)) {
            dispatch(createJob(addJob, addProcess));
        }
    }

    return (
        <div className="my-3">
            <form className="form-row" onSubmit={handleAddJob}>
                <div className="form-group col-md-6">
                    <label htmlFor="inputJob">Công việc:</label> 
                    
                    <p className="text-danger">{listErrors.job ? listErrors.job: null}</p>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="inputStatus">Trạng thái:</label>
                    <select 
                        id="inputStatus"
                        className="custom-select" 
                        defaultValue="Chua lam" 
                        onChange={ e => setAddProcess(listProcess.indexOf(e))}>
                        {Object.keys(listProcess).map((key) => (
                            <option key={key}>
                                {listProcess[key]}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-0" style={{alignSelf: "center"}}>
                    <button type="submit" className='btn btn-outline-dark'>Add</button>
                </div>
            </form>
        </div>
    );
}

export default Add;