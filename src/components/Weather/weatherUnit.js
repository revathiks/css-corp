import React, { memo } from 'react';

const WeatherUnits = () => {
    return (
        <>
            <div>
                <select>
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>

                </select>
            </div>
        </>
    )
};
export default WeatherUnits;