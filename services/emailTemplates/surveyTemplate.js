const keys = require('../../config/keys');

//NOTE: great place to amp this up would be to changee the link to make it customizable per the user

module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks/${survey.id}/yes">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks/${survey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
    `;
};