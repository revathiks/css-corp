import React, { memo } from 'react'
import PropTypes from 'prop-types';
import propTypes from 'prop-types';

const WeatherReport = ({ weatherReport, reportStatus }) => {
    console.log('Weather Report Render');
    console.log(typeof (weatherReport), 4);
    return (
        <>

            <div className="flex justify-center">
                {reportStatus?.status === 'REQUEST' && <div className="font-semibold text-red-400">Loading...</div>}
                {reportStatus?.status === 'FAIL' && <div className=" font-semibold text-red-800">{reportStatus.payload.message}</div>}
            </div>
            {
                weatherReport ?
                    <>
                        <div className=' flex flex-row  justify-center'>
                            <div className="text-left bg-white mt-5">
                                <h1 className=" font-bold">{weatherReport.location}</h1>
                                <div >SCATTERED CLOUDS| FEEL LIKE {weatherReport.feels_like}</div>
                            </div>
                        </div>
                        <div className='flex flex-row  justify-center'>

                            <div className='bg-orange-400 bg-gradient-to-tr px-5 py-5 my-5'><div>CURRENT TEMPRATURE</div> <div>{weatherReport.temp}</div></div>
                            <div className='bg-orange-400 bg-gradient-to-tr px-5 py-5 my-5 mx-2'><div>MAXIMUM TEMPRATURE </div><div>{weatherReport.temp_max}</div></div>
                            <div className='bg-orange-400 bg-gradient-to-tr px-5 py-5 my-5'><div>MINIMUM TEMPRATURE </div><div>{weatherReport.temp_min}</div></div>

                        </div>
                        <div className='flex flex-row  justify-center'>

                            <div className=' bg-pink-500  bg-gradient-to-tr px-5 py-5 my-5'><div>WIND SPEED</div><div>{weatherReport.wind_speed}</div></div>
                            <div className='bg-pink-500 bg-gradient-to-tr px-5 py-5 my-5 ml-2'><div>WIND DIRECTION</div> <div>{weatherReport.wind_direction}</div></div>
                        </div>
                        <div className='flex flex-row  justify-center'>
                            <div className='bg-blue-500 bg-gradient-to-tr px-5 py-5 my-5'><div>PRESSURE</div> <div>{weatherReport.pressure}</div></div>
                            <div className='bg-blue-500 bg-gradient-to-tr px-5 py-5 my-5 ml-2'><div>HUMIDITY</div> <div>{weatherReport.humidity}</div></div>
                        </div>


                    </>
                    : ''
            }
        </>
    )
}
WeatherReport.propTypes = {
    weatherReport: PropTypes.shape(
        {
            location: PropTypes.string,
            temp: PropTypes.number,
            temp_max: PropTypes.number,
            temp_min: PropTypes.number,
            feels_like: PropTypes.number,
            wind_speed: PropTypes.number,
            wind_direction: PropTypes.string,
            pressure: PropTypes.number,
            humidity: PropTypes.number,
        }
    )
};
WeatherReport.defaultProps = {
    weatherReport: undefined,
}
export default memo(WeatherReport);