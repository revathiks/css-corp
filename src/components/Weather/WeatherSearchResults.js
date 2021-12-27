import React, { memo } from 'react';
import PropTypes from 'prop-types';

const WeatherSearchResults = ({ searchResult, searchStatus, getWeather, locationText }) => {
    console.log('Weather search result Render');
    return (
        <div className="flex justify-center">
            {searchStatus?.status === 'REQUEST' && <div className="font-semibold text-red-400">Loading...</div>}
            {searchStatus?.status === 'FAIL' && <div className=" font-semibold text-red-800">{searchStatus.payload.message}</div>}
            {locationText ? searchResult.map((item) => <button className="btn-primary my-1 mx-1 bg-pink-400 rounded-full" key={item.id} onClick={() => getWeather(item.id)}>{item.name}</button>) : ''}

        </div>
    )
}
WeatherSearchResults.propTypes = {
    searchResult: PropTypes.array.isRequired,
    searchStatus: PropTypes.shape({
        status: PropTypes.oneOf(['REQUEST', 'FAIL']),
        type: PropTypes.oneOf(['SEARCH_CITY']),
        payload: PropTypes.objectOf(Error)
    }),
    getWeather: PropTypes.func.isRequired,
    locationText: PropTypes.string.isRequired,
}
WeatherSearchResults.defaultProps = {
    searchStatus: undefined
}
export default memo(WeatherSearchResults);