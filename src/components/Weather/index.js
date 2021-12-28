import React, { Component, memo, useRef, useState, useEffect, useCallback } from 'react';
import WeatherForm from './weatherForm';
import WeatherSearchResults from './WeatherSearchResults';
import WeatherReport from './WeatherReport';
import WeatherUnits from './weatherUnit';
//import debounce from 'lodash/debounce';
import debounce from "lodash.debounce";
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
const appId = '333458e05b25c5e69a7c22d64b7bc47f';

const Weather = () => {
    const [searchResult, setsearchResult] = useState([]);
    const [weatherReport, setweatherReport] = useState({});
    const [locationText, setlocationText] = useState('');
    const [tempOption, settempOption] = useState('imperial');
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
                    return { ...item, status: 'FAIL', payload };
                }
                return item;
            }),
        );
    };

    const findLocation = async () => {
        const type = 'SEARCH_CITY';
        try {
            loadingStatus({ type });
            const location = inputRef.current.value;
            const result = await fetch('http://localhost:3000/cities');
            if (!result.ok) throw new Error("Something went wrong with API")
            const json = await result.json();
            const searchResults = json.filter((item) => item.name.toLowerCase().match(location.toLowerCase()));
            setsearchResult(searchResults);
            setlocationText(location);
            successStatus({ type });
        } catch (error) {
            errorStatus({ type, payload: error });
        }
    };

    //const searchLocations = useCallback(debounce((text) => setlocationText(text), 1000), []);
    //const searchLocations = debounce((text) => { setlocationText(text); setweatherReport('') }, 1000);
    const searchLocations = debounce((text) => { findLocation(); setweatherReport('') }, 1000);

    const getWeather = async (city = 'bangalore') => {
        const type = 'CITY_REPORT';
        try {
            // loadingStatus({ type });
            // const result = await fetch(`http://localhost:3000/weather-list/${id}`);
            //console.log(`${apiUrl}?q=${city}&units=${tempOption}&appid=${appId}`);
            const result = await fetch(`${apiUrl}?q=${city}&units=${tempOption}&appid=${appId}`)
            if (!result.ok) throw new Error("Something went wrong with weather report API")
            const json = await result.json();
            setweatherReport(json);
            // successStatus({ type });
        } catch (error) {
            //errorStatus({ type, payload: error });
        }

    }
    const UpdateTemp = (val) => {
        settempOption(val);


    }
    // useEffect(() => {
    //     findLocation();
    // }, [locationText]);

    useEffect(() => {
        getWeather()
    }, [tempOption]);


    const searchStatus = httpStatus.find((x) => x.type === 'SEARCH_CITY');
    const reportStatus = httpStatus.find((x) => x.type === 'CITY_REPORT');
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="flex justify-center mx-1 my-1 divide-y divide-dashed">
                <h1 className="font-medium  border-b border-red-800">WeatherWatch</h1>
            </div>
            <div className="flex flex-row justify-center">
                <WeatherForm ref={inputRef} setlocationText={setlocationText} searchLocations={searchLocations} />
                <WeatherUnits UpdateTemp={UpdateTemp} />
            </div>
            {searchResult.length > 0 && <WeatherSearchResults locationText={locationText} searchResult={searchResult} searchStatus={searchStatus} getWeather={getWeather} />}
            {weatherReport.name && <WeatherReport weatherReport={weatherReport} reportStatus={reportStatus} />}

        </div>
    );
}
export default memo(Weather);
