import React, { memo, forwardRef } from 'react';

const WeatherForm = forwardRef(({ setlocationText, searchLocations }, ref) => {
    console.log('Weather form Render');
    return (
        <>
            <form >
                <div>
                    <h1>Location</h1>
                    <input type="text" onChange={(e) => searchLocations(e.target.value)} ref={ref} />
                </div>

            </form>
        </>

    );
});
export default memo(WeatherForm);