const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Send stripe API key => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors(async ( res, req, next ) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY

})
})