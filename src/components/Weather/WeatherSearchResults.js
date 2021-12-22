import React, { memo } from 'react'
const WeatherSearchResults = ({ searchResult, searchStatus }) => {

    return (
        <div>
            {searchStatus?.status === 'REQUEST' && <h1>Loading...</h1>}
            {searchResult.map((item) => <div key={item.id}>{item.location}</div>)}
        </div>
    )
}
export default memo(WeatherSearchResults);