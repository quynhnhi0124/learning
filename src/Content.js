import * as React from 'react';

function Content(props)
{
    const {updateItem, onUpdateJob, cancelUpdate} = props;
    const [updateJobName, setUpdateJobName] = React.useState(updateItem.name);
    const handleUpdateJob = () => {
        updateItem.name = updateJobName;
        onUpdateJob(updateItem);
    }
    const handleCancelUpdate = () => {
        cancelUpdate();
    }
    
    return (
        <div>
            <input
                className='form-control'
                value={updateJobName}
                onChange={e => setUpdateJobName(e.target.value)}
            />
            <button className='btn btn-outline-dark' onClick={handleUpdateJob}>OK</button>
            <button className='btn btn-outline-dark' onClick={handleCancelUpdate}>Cancel</button>
        </div>
    );
}

export default Content;