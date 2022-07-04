const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

const stripe = new Stripe("sk_test_51LHPwRHmrIZ7aRdiuTmKtbygMrYlavu4CejuVtnZVHZ1cTJmJ4EzZH0XzjDZMYSJTwVaGtqyY43OGjURqGtdSxLE00sEH8i7E9")

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req, res) => {
    
    const { id, amount } = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Producto",
        payment_method: id,
        confirm: true
    })

    console.log(payment)

    res.send({message: 'Pago exitoso'})
})

app.listen(3001, () => {
    console.log('Server on port', 3001)
})