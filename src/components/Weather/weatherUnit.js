import React, { memo, forwardRef } from 'react';

const WeatherUnits = ({ UpdateTemp }) => {
    return (
        <>
            <div className="order-2 flex-grow border px-5 py-5 bg-white">
                <h1 className="uppercase font-medium">units</h1>
                <select onChange={(e) => UpdateTemp(e.target.value)} className=' border'>

                    <option value="imperial">imperial</option>
                    <option value="C">Celsius</option>
                    <option value="F">Fahrenheit</option>
                </select>
            </div>
        </>
    )
};
export default WeatherUnits;