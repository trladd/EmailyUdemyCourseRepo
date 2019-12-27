//Survey field contains logic to redner a single label and text input
import React from 'react';

export default({input, label}) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input}/>
        </div>
    );
};