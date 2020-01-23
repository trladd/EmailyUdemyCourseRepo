import React from 'react';
import githublogo from '../images/github.png';
import swaggerlogo from '../images/swagger.png';

const About = () => {
    return(
        <div className="flow-text">
            <h3>About this App</h3>
            <p>This app was first created for use with a <a href="https://www.udemy.com/course/node-with-react-fullstack-web-development/">udemy course</a> that I started where I wanted to learn node.js development along with React. After completing the course, I chose to continue practicing these skills by building on to this web appliation. Since completing the course, I have built out an Github issues list where I am slowly adding more features.</p>
            <h4>What is Emaily?</h4>
            <p>Emaily was the name of the app in the Udemy course by Stephen Grider. I chose to keep the name but have added many features since then. At its core, Emaily is a web application that allows users to log in, add credits to their account, and use those credits to send out email surveys. The user sends surveys to a mass group of users where they are asking for feedback (a yes or a no response) which is presented as links in the email sent to recipients. The Emaily user can then see their past surveys that they have sent out, along with important information for their surveys such as total number of yes responses, total number of no responses, survey creation date, last received response, and so on...</p>
            <h4>Key Technologies Used</h4>
            <ul>
                <li><b>Sendgrid</b> working as email service to handle sending emails, and using a webhook, sends response information from users clicking links back to Emaily.</li>
                <li><b>Google Oauth</b> for authentication (eventually expanding to other types)</li>
                <li><b>Mongo Atlas</b> as database</li>
                <li><b>React</b> frontend</li>
                <li><b>Express</b> backend node server</li>
                <li><b>Swipe</b> service for handling credit card payments</li>
                <li><b>Heroku</b> for hosting application and providing automated deployment pipeline</li>
                <li><b>Jest</b> Javascript testing</li>
                <li><b>SuperTest</b> Javascript testing backend routes</li>
            </ul>
            <a href="https://github.com/trladd/EmailyUdemyCourseRepo/issues">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img  className="responsive-image" src={githublogo} alt="githublogo"/>
                        </div>
                        <div className="card-content">
                            <h2 class="header">Feature Backlog</h2>
                            <p>Click here to see my github issues list of upcoming features and view the source code</p>
                        </div>
                    </div>
                </div>
            </a>
            <a href="/swagger">
                <div className="col s12 m7">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img className="responsive-image"src={swaggerlogo} alt="swaggerlogo"/>
                        </div>
                        <div className="card-content">
                            <h2 class="header">API Documentation</h2>
                            <p>Click here to view swagger docs for this site's backend</p>
                        </div>
                    </div>
                </div>
            </a>
            
            
            <br/><br/><br/><br/><br/>
        </div>
    );
};

export default About;