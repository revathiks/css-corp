import React from 'react';
import ReactDOM from 'react-dom';
// import AppHook from './AppHook';
import Todo from './Pages/Todo';
import './root.css';
import { Provider } from 'react-redux';
import Store from './store'


ReactDOM.render(<Provider store={Store}><Todo /></Provider>, document.getElementById('root'));