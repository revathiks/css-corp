import React, { memo, forwardRef } from 'react';

const WeatherForm = forwardRef(({ setlocationText, searchLocations }, ref) => {
    console.log('Weather form Render');
    return (
        <div className=" mr-1">
            <form>
                <div>
                    <h1 className="uppercase font-medium">Location</h1>
                    <input type="text" onChange={(e) => searchLocations(e.target.value)} ref={ref} />
                </div>

            </form>
        </div>

    );
});
export default memo(WeatherForm);