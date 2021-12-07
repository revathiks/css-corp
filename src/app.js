import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './User';

class App extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        caption: PropTypes.string,
    };

    static defaultProps = {
        caption: 'Great day...',
    };

    test() { }

    render() {
        const { title, caption } = this.props;
        return (
            <>
                <h1>{title}</h1>
                <h2>{caption}</h2>
                <User firstName="Revathi" lastName="sengottaiyan" />
            </>
        );
    }
}

// const App = ({ title, caption }) => (
//   <>
//     <h1>{title}</h1>
//     <h2>{caption}</h2>
//   </>
// );

// App.propTypes = {
//   title: PropTypes.string.isRequired,
//   caption: PropTypes.string,
// };

// App.defaultProps = {
//   caption: 'Great day...',
// };

export default App;
