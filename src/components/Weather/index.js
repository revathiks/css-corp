import React, { Component, memo, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import WeatherForm from './weatherForm';
import WeatherSearchResults from './WeatherSearchResults';
import WeatherReport from './WeatherReport';
import WeatherUnits from './weatherUnit';
//import debounce from 'lodash/debounce';
import debounce from "lodash.debounce";
import useHttpStatus from '../../hooks/useHttpStatus';

const Weather = () => {
    const [searchResult, setsearchResult] = useState([]);
    const [weatherReport, setweatherReport] = useState({});
    const [locationText, setlocationText] = useState('');
    const [tempOption, settempOption] = useState('C');
    const [selectedcity, setselectedcity] = useState('1277333');
    const [error, seterror] = useState('');
    const { httpStatus, loadingStatus, successStatus, errorStatus } = useHttpStatus();
    const inputRef = useRef();

    const findLocation = async () => {
        const type = 'SEARCH_CITY';
        try {
            loadingStatus({ type });
            const location = inputRef.current.value;
            if (!location) {
                throw new Error("Plese enter city")
            }
            const result = await fetch(`https://api.weatherserver.com/weather/cities/${location}`);
            const json = await result.json();
            if (!result.ok) throw new Error("Something went wrong with API")
            const searchResults = json.results.filter((item) => item.name.toLowerCase().startsWith(location.toLowerCase()));
            setsearchResult(searchResults);
            setlocationText(location);
            successStatus({ type });
        } catch (error) {
            errorStatus({ type, payload: error });
        }
    }

    //const searchLocations = debounce((text) => { setlocationText(text); setweatherReport('') }, 1000);
    const searchLocations = useCallback(debounce((text) => { findLocation(); }, 1000), []);

    const getWeather = useCallback(async (city = selectedcity) => {
        const type = 'CITY_REPORT';
        try {
            loadingStatus({ type });
            const result = await fetch(`https://api.weatherserver.com/weather/current/${city}/${tempOption}`)
            if (!result.ok) throw new Error("Something went wrong with weather report API")
            const json = await result.json();
            setweatherReport(json);
            setselectedcity(city)
            successStatus({ type });
        } catch (error) {
            errorStatus({ type, payload: error });
        }

    }, [loadingStatus, successStatus, errorStatus]);

    const UpdateTemp = useCallback((val) => {
        settempOption(val);
    }, [loadingStatus, successStatus, errorStatus])


    useEffect(() => {
        getWeather()
    }, [tempOption]);


    const searchStatus = useMemo(() => httpStatus.find((x) => x.type === 'SEARCH_CITY'), [httpStatus]);
    const reportStatus = useMemo(() => httpStatus.find((x) => x.type === 'CITY_REPORT'), [httpStatus]);
    return (
        <div className=" bg-gray-100">
            < div className=" flex flex-col bg-slate-50 mx-10 py-5 px-5" >
                <div className="justify-center mx-1 my-1 divide-y divide-dashed">
                    <h1 className="font-bold text-xl border-b border-red-800">WeatherWatch</h1>
                </div>

                <div className='flex mt-5'>
                    <WeatherForm ref={inputRef} setlocationText={setlocationText} searchLocations={searchLocations} />
                    <WeatherUnits UpdateTemp={UpdateTemp} />
                </div>
                <WeatherSearchResults locationText={locationText} searchResult={searchResult} searchStatus={searchStatus} getWeather={getWeather} />
                <div className="flex flex-col bg-white px-5 my-3">
                    <div className="">
                        {reportStatus?.status === 'REQUEST' && <div className="font-semibold text-red-400">Loading...</div>}
                        {reportStatus?.status === 'FAIL' && <div className=" font-semibold text-red-800">{reportStatus.payload.message}</div>}
                    </div>
                    {weatherReport && <WeatherReport weatherReport={weatherReport} reportStatus={reportStatus} tempOption={tempOption} />}
                </div>


            </div >
        </div >
    );
}
export default memo(Weather);
