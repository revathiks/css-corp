import React, { memo } from 'react';

const WeatherSearchResults = ({ searchResult, searchStatus, getWeatherReport, locationText }) => {
    console.log('Weather search result Render');
    return (
        <div>
            {searchStatus?.status === 'REQUEST' && <h1>Loading...</h1>}
            {locationText ? searchResult.map((item) => <div key={item.id} onClick={() => getWeatherReport(item.id)}>{item.location}</div>) : ''}

        </div>
    )
}
export default memo(WeatherSearchResults);