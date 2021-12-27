import React, { memo, forwardRef } from 'react';

const WeatherUnits = forwardRef(({ UpdateTemp }) => {
    return (
        <>
            <div>
                <h1 className="uppercase font-medium">units</h1>
                <select onChange={(e) => UpdateTemp(e.target.value)}>
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>
                </select>
            </div>
        </>
    )
});
export default WeatherUnits;