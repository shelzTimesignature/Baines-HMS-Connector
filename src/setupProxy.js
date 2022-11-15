const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        createProxyMiddleware('/apacewebservices', {
            target: `https://test-submit.health263.systems:8081`,
            changeOrigin:true,
            secure:false
        })
    );


    app.use(
        createProxyMiddleware('/SGIFPCapture', {
            target: `https://localhost:8443`,
            changeOrigin:true,
            secure:false
        })
    );

    // app.use(
    //     createProxyMiddleware('/PatientCard', {
    //         target: `http://desktop-garljai:7048/BC130/ODataV4/Company('Baines Avenue Clinic')`,
    //         changeOrigin:true
    //     })
    // );
}