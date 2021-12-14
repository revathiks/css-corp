import React, { memo } from 'react';
import propTypes from 'prop-types';

const WeatherResult = ({ weatherResult }) => {
    return (
        <div className="flex-1">
            {
                weatherResult ? <div key={weatherResult.id}>{weatherResult.city} weather is {weatherResult.temp}</div> : < div > no city found</div>
            }
        </div>
    );
}
export default memo(WeatherResult);

