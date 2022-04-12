import * as React from 'react';

function Search(props)
{
    const {searchJob} = props;
    const [inputSearch, setInputSearch] = React.useState('');

    const handleSearch = () => {
        searchJob(inputSearch)
    }

    return (
        <div className='row my-3 mx-0'>
            <div className='col-md-6 p-0'>
                <input 
                    className='form-control'
                    onChange={e => setInputSearch(e.target.value)}
                    placeholder='Tìm kiếm....'/>
            </div>
            <div className='col-md-5 p-0'>
                <button className='btn btn-outline-primary' onClick={handleSearch}>Tìm kiếm</button>
            </div>
        </div>
    );
}

export default Search;
