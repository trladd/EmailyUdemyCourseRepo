const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var swaggerUiOptions={
    explorer: true
};

const swaggerJSDocOptions={
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
          title: 'Emaily Routes', // Title (required)
          version: '1.0.0', // Version (required)
        },
      },
      // Path to the API docs
      apis: ['./routes/authRoutes.js', './routes/billingRoutes.js', './routes/surveyRoutes.js'],
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
