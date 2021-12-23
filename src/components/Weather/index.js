import React, { Component, memo, useRef, useState, useEffect, useCallback } from 'react';
import WeatherForm from './weatherForm';
import WeatherSearchResults from './WeatherSearchResults';
import WeatherReport from './WeatherReport';
import WeatherUnits from './weatherUnit'
import PropTypes from 'prop-types';
//import debounce from 'lodash/debounce';
import debounce from "lodash.debounce"

const Weather = () => {
    const [searchResult, setsearchResult] = useState([]);
    const [weatherReport, setweatherReport] = useState('');
    const [locationText, setlocationText] = useState('');
    const [error, seterror] = useState('');
    const [httpStatus, setHttpStatus] = useState([]);
    const inputRef = useRef();

    //loading functionality
    const loadingStatus = ({ type, id = -1 }) => {
        setHttpStatus((existingStatus) => {
            const findIndexNo = existingStatus.findIndex((item) => item.type === type && item.id === id);
            const data = { type, status: 'REQUEST', id };

            if (findIndexNo == -1) {
                return [...existingStatus, data]
            }
            return [...existingStatus.slice(0, findIndexNo), data, ...existingStatus.slice(findIndexNo + 1)];
        });
    }

    const successStatus = ({ type, id = -1 }) => {
        setHttpStatus((existingStatus) =>
            existingStatus.filter((item) => !(item.type === type && item.id === id))
        );
    };

    const errorStatus = ({ type, payload, id = -1 }) => {
        setHttpStatus((existingStatus) =>
            existingStatus.map((item) => {
                if (item.type === type && item.id === id) {
                    return { ...existingStatus, status: 'FAIL', payload };
                }
                return item;
            }),
        );
    };

    const findLocation = async () => {
        console.log(4)
        const type = 'SEARCH_CITY';
        try {
            loadingStatus({ type });
            const location = inputRef.current.value;
            const result = await fetch('http://localhost:3000/weather-list');
            const json = await result.json();
            const searchResult = json.filter((item) => item.location.toLowerCase().match(location));
            setsearchResult(searchResult);
            successStatus({ type });
        } catch (error) {
            errorStatus({ type, payload: error });
        }
    };

    //const searchLocations = useCallback(debounce((text) => setlocationText(text), 1000), []);
    const searchLocations = debounce((text) => setlocationText(text), 1000);

    const getWeatherReport = async (id) => {
        const type = 'CITY_REPORT';
        try {
            // loadingStatus({ type, id: item.id });
            console.log(5)
            const result = await fetch(`http://localhost:3000/weather-list/${id}`);
            const json = await result.json();
            console.log(result)
            setweatherReport(json);
        } catch (error) {

        }

    }
    useEffect(() => {
        findLocation()
    }, [locationText]);


    const searchStatus = httpStatus.length > 0 ? httpStatus.find((x) => x.type === 'SEARCH_CITY') : '';
    //console.log(searchStatus);
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="flex justify-center mx-1 my-1 divide-y divide-dashed">
                <h1 className="font-medium  border-b border-red-800">WeatherWatch</h1>
            </div>
            <div className="flex flex-row justify-center">
                <WeatherForm ref={inputRef} setlocationText={setlocationText} searchLocations={searchLocations} />
                <WeatherUnits />
            </div>
            <WeatherSearchResults locationText={locationText} searchResult={searchResult} searchStatus={searchStatus} getWeatherReport={getWeatherReport} />
            <WeatherReport weatherReport={weatherReport} />

        </div>
    );
}
export default memo(Weather);
