import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const WeatherUnits = ({ UpdateTemp }) => {
    console.log("Weather unit render");
    return (
        <>
            <div className="order-2 flex-grow border px-5 py-5 bg-white">
                <h1 className="uppercase font-medium">units</h1>
                <select onChange={(e) => UpdateTemp(e.target.value)} className=' border'>
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>
                </select>
            </div>
        </>
    )
};
WeatherUnits.prototypes = {
    UpdateTemp: PropTypes.string.isRequired
}
WeatherUnits.defaultProps = {
    tempOption: 'imperial'
}
export default memo(WeatherUnits);