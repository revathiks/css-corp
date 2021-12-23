import React, { memo } from 'react';

const WeatherSearchResults = ({ searchResult, searchStatus, getWeatherReport, locationText }) => {
    console.log('Weather search result Render');
    return (
        <div className="flex justify-center">
            {searchStatus?.status === 'REQUEST' && <h1>Loading...</h1>}
            {locationText ? searchResult.map((item) => <button className="btn-primary my-1 mx-1 bg-pink-400 rounded-full" key={item.id} onClick={() => getWeatherReport(item.id)}>{item.location}</button>) : ''}

        </div>
    )
}
export default memo(WeatherSearchResults);