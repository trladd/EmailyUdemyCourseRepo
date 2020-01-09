import React from 'react';
import Landing from './Landing';

const Thanks = () => {
    return(
        <div>
            <div className="z-depth-4 green accent-1 flow-text">
                <h3>Thanks for voting with Emaily!</h3>
                <p>Your Survey Id: </p>
            </div>
            <Landing/>
        </div>
        
        
    );
};

export default Thanks;