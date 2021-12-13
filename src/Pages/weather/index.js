import React, { Component, createRef } from 'react';
import './weatherStyle.css';

export default class Todo extends Component {
    state = {
        weatherData: [
            { id: 1, city: 'chennai', weather: '50' },
            { id: 2, city: 'salem', weather: '60' },
            { id: 3, city: 'delhi', weather: '100' },
            { id: 4, city: 'bangalore', weather: '40' },
            { id: 5, city: 'ap', weather: '100' },
            { id: 6, city: 'mumbai', weather: '90' }
        ],
        weatherResult: '',
    };


    findWeather = (event) => {
        event.preventDefault();
        const { weatherData } = this.state;
        const weatherText = this.inputRef.current.value;
        this.setState(({ weatherResult }) => {
            return { weatherResult: weatherData.find((i) => i.city === weatherText) };
        });
    };

    inputRef = createRef();
    render() {
        const { weatherData, weatherResult } = this.state;
        console.log('render');
        console.log(typeof (weatherResult));



        return (
            <div className="container">
                <h1>Weather App</h1>
                <form onSubmit={this.findWeather}>
                    <input type="text" ref={this.inputRef} />
                    <button type="submit">Find</button>
                </form>
                <div className="weather-result">
                    {
                        weatherResult ? <div key={weatherResult.id}>{weatherResult.city} weather is {weatherResult.weather}</div> : < div > no city found</div>
                    }
                </div>

            </div >
        );
    }
}
