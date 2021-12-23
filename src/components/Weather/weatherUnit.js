import React, { memo } from 'react';

const WeatherUnits = () => {
    return (
        <>
            <div>
                <h1 className="uppercase font-medium">units</h1>
                <select>
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>
                </select>
            </div>
        </>
    )
};
export default WeatherUnits;