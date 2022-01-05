import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './components/Weather';
import './root.css';
import { weatherServer } from './server';
weatherServer();

ReactDOM.render(<Weather />, document.getElementById('root'));