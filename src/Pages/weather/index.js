import React, { Component, createRef } from 'react';
import './weatherStyle.css';
import WeatherForm from './weatherForm';
import WeatherResult from './weatherResult';

export default class Weather extends Component {
    state = {
        // weatherData: [
        //     { id: 1, city: 'chennai', weather: '50' },
        //     { id: 2, city: 'salem', weather: '60' },
        //     { id: 3, city: 'delhi', weather: '100' },
        //     { id: 4, city: 'bangalore', weather: '40' },
        //     { id: 5, city: 'ap', weather: '100' },
        //     { id: 6, city: 'mumbai', weather: '90' }
        // ],
        weatherApiData: [],
        weatherResult: '',
        error: null
    };

    async componentDidMount() {
        try {

            const result = await fetch('http://localhost:3000/weather-list');
            const json = await result.json();
            this.setState({ weatherApiData: json })

        } catch (error) {
            this.setState({ error })
        }

    }
    findWeather = (event) => {
        event.preventDefault();
        //const { weatherData } = this.state;
        const weatherText = this.inputRef.current.value;
        this.setState(({ weatherApiData }) => {
            console.log(weatherApiData);
            return { weatherResult: weatherApiData.find((i) => i.city === weatherText) };
        });
    };

    inputRef = createRef();
    render() {
        //console.log(this.state)
        const { weatherResult } = this.state;
        return (
            <div className="h-screen flex flex-col sm:bg-green-300 bg-slate-200">
                <h1 className="text-4xl text-center my-4 font-bold text-red-400">Weather App</h1>
                <WeatherForm findWeather={this.findWeather} ref={this.inputRef} />
                <WeatherResult weatherResult={weatherResult} />
            </div >
        );
    }
}
