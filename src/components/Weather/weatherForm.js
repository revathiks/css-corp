import React, { memo, forwardRef } from 'react';

const WeatherForm = forwardRef(({ findLoaction }, ref) => {
    console.log('Weather form Render');
    return (
        <>
            <form onSubmit={findLoaction}>
                <h1>Location</h1>
                <input type="text" onKeyPress={findLoaction} ref={ref} />
                <button type="submit">submit</button>
            </form>
        </>

    );
});
export default memo(WeatherForm);