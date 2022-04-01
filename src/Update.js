import * as React from 'react';

function Update(props)
{
    const {updateItem, onUpdateJob, cancelUpdate, listProcess} = props;
    const [updateJobName, setUpdateJobName] = React.useState(updateItem.name);
    const [updateProcess, setUpdateProcess] = React.useState(updateItem.process);

    const handleUpdateJob = () => {
        updateItem.name = updateJobName;
        updateItem.process = updateProcess;
        onUpdateJob(updateItem);
    }
    const handleCancelUpdate = () => {
        cancelUpdate();
    }
    
    return (
        <div className='my-2'>
            <div className='d-block'>
                <p>Chỉnh sửa:</p>
                <input
                    className='form-control col-md-3 col-sm-3 mb-2'
                    value={updateJobName}
                    onChange={e => setUpdateJobName(e.target.value)}
                />
                <div className='d-block'>
                    {listProcess.map((item, key) => {
                        return (<div key={key}>
                                    <input
                                        type='radio'
                                        value={key} 
                                        checked={updateProcess === String(key) && 'checked'}
                                        onChange={(e) => setUpdateProcess(e.target.value)}/> {item}
                                </div>)
                    })}
                </div>
                <button className='btn btn-outline-dark' onClick={handleUpdateJob}>OK</button>
                <button className='btn btn-outline-dark' onClick={handleCancelUpdate}>Cancel</button>
            </div>
        </div>
    );
}

export default Update;