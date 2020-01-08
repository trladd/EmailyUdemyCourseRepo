import React from 'react';
import Payments from '../Payments';


const Account = () =>{
    return (
        <div>
            <h3>Account Settings</h3>
            <p className="red-text">going to put things like account defaults, adding funds, etc</p>
            <h5>Add Credits</h5>
            <Payments/>
        </div>
        
    );
};

export default (Account);