import React, { memo } from 'react'

const WeatherReport = ({ weatherReport }) => {
    console.log('Weather Report Render');
    console.log(weatherReport)
    return (
        <>
            {weatherReport ?
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
export default memo(WeatherReport);