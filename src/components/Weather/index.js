import React, { Component, memo, useRef } from 'react';
import WeatherForm from './weatherForm';
import PropTypes from 'prop-types';

const Weather = () => {
    const inputRef = useRef();

    const findLocation = (event) => {
        //event.preventDefault();
        const locationText = inputRef.current.value;
        console.log(locationText)

    }

    return (
        <>
            <h1>WeatherWatch</h1>
            <WeatherForm ref={inputRef} findLoaction={findLocation} />
        </>
    );
}
export default memo(Weather);
