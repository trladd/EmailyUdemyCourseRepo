//Survey field contains logic to redner a single label and text input
import React from 'react';

export default({input, label, toolTip, meta:{error, touched}}) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom:'5px'}} className="tooltipped"  data-tooltip={toolTip}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
            
        </div>
    );
};