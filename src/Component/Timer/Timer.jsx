import React, { useState, useEffect } from 'react';

const Timer = ({ minutes, setMinutes, seconds, setSeconds }) => {


    useEffect(() => {
        let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds]);

    return (
        <div>
            <p>
                Time Remaining: {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
            </p>
        </div>
    );
};

export default Timer;
