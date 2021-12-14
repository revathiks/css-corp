import React, { forwardRef, memo } from 'react';
import propTypes from 'prop-types';

const WeatherForm = forwardRef(({ findWeather }, ref) => {
    return (
        <form className="flex justify-center my-4" onSubmit={findWeather}>
            <input type="text" ref={ref} />
            <button type="submit" className="btn-primary">Find</button>
        </form>
    );
});

export default memo(WeatherForm);