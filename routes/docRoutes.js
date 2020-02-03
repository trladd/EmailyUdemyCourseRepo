const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerCSS='.swagger-ui .topbar{background-color:#bf360c} body{background-color:#eeeeee}'

var swaggerUiOptions={
    customCss:swaggerCSS
};

const swaggerJSDocOptions={
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
          title: 'Emaily Routes', // Title (required)
          version: '1.0.0', // Version (required)
          description: 'This swagger document shows the routes available for my application server. This is an express server running on node.js<br><br> <b><a href="/">Link back to main site</a></b>',
        },
      },
      // Path to the API docs
      apis: ['./routes/authRoutes.js', './routes/billingRoutes.js', './routes/surveyRoutes.js','./routes/emailySurveyRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

module.exports = app => {

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });

    //const swaggerDocument = require('./api-docs.json');

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
};
