import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
    static propTypes = {
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
    };
    test() { }

    render() {
        const { firstName, lastName } = this.props;
        return (
            <>
                <h1>Hi {firstName} {lastName} !</h1>
            </>
        );
    }
}
export default User;
