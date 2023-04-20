const Express = require('express')
const app = Express()
const cors = require('cors')
const Routes = require('./routes/main')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(Express.json())
app.use(Routes)
mongoose.connect(process.env.MongooseURL).then(()=>{
    console.log('connected')
})



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});
  
  
  
app.post("/create-payment-intent", async (req, res) => {
   try {
    const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: 199,
        automatic_payment_methods: { enabled: true },
    });

        res.send({clientSecret: paymentIntent.client_secret})
   } catch (error) {
        console.log('it is an error')
        console.log(error.message)
     res.status(400).send(error.message)
   }

});


app.get("/config",(req,res)=>{
    res.send({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})







app.listen(5000,()=>{
    console.log('port listening 5000')
})