import * as React from 'react';

function Update(props)
{
    const {updateItem, onUpdateJob, cancelUpdate, listProcess} = props;
    const [updateJobName, setUpdateJobName] = React.useState(updateItem.title);
    const [updateProcess, setUpdateProcess] = React.useState(updateItem.completed ? 1 : 0);

    const handleUpdateJob = () => {
        updateItem.title = updateJobName;
        updateItem.completed = Boolean(Number(updateProcess));
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
                    {Object.keys(listProcess).map((key) => {
                        return (<div key={key}>
                                    <input
                                        type='radio'
                                        value={key} 
                                        checked={String(updateProcess) === key ? 'checked' : ''}
                                        onChange={(e) => setUpdateProcess(e.target.value)}/> {listProcess[key]}
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