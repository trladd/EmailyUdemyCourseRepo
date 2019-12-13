const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    /**
     * Constructor
     * @param {*} param0 an object holding subject and recipients
     * @param {*} content the body of the email
     */
    constructor({ subject, recipients}, content){
        super();

        this.from_email = new helper.Email('no-reply@trevarsudemycourse.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
    }

    formatAddresses(recipients){
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
}

module.exports = Mailer;