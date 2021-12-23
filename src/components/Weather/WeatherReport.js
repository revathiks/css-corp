import React, { memo } from 'react'

const WeatherReport = ({ weatherReport }) => {
    console.log('Weather Report Render');
    return (
        <div>
            {weatherReport ?
                <><div><h1></h1><p>SCATTERED CLOUDS| FEEL LIKE {weatherReport.feels_like}</p></div><div>CURRENT TEMPRATURE {weatherReport.temp}</div><div>MAXIMUM TEMPRATURE {weatherReport.temp_max}</div><div>MINIMUM TEMPRATURE {weatherReport.temp_min}</div><div>WIND SPEED: {weatherReport.wind_speed}</div><div>WIND DIRECTION {weatherReport.wind_direction}</div><div>PRESSURE {weatherReport.pressure}</div><div>HUMIDITY {weatherReport.humidity}</div></>
                : ''
            }
        </div>
    )
}
export default memo(WeatherReport);