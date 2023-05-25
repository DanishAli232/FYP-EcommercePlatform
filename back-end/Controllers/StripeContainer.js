import Stripe from "stripe";
import Order from "../Models/OrderModel.js";
import config from "../Utils/config.js";

const stripe = Stripe(config.STRIPE_KEY);

export const StripCheckoutSession = async(req, res) => {
    console.log(req.body.alldetail.DefaultAddress._id);
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cartItems.product),
        },
    });
    const line_items = req.body.cartItems.map((item) => {
        return {
            price_data: {
                currency: "pkr",
                product_data: {
                    name: item.product.name,
                    // images: [item.product.image],
                    description: item.product.description,
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
        };
    });
    console.log(line_items);
    line_items.push({
        price_data: {
            currency: "pkr",
            product_data: {
                name: "Shipping cost",
                description: "Shipping cost",
            },
            unit_amount: 149 * 100,
        },
        quantity: req.body.cartItems.length,
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            // allowed_countries: ["US", "CA", "KE", "PK"],
            allowed_countries: [],
        },
        // shipping_options: [
        //   {
        //     shipping_rate_data: {
        //       type: "fixed_amount",
        //       fixed_amount: {
        //         amount: 150,
        //         currency: "pkr",
        //       },
        //       display_name: "Free shipping",
        //       // Delivers between 5-7 business days
        //       delivery_estimate: {
        //         minimum: {
        //           unit: "business_day",
        //           value: 5,
        //         },
        //         maximum: {
        //           unit: "business_day",
        //           value: 7,
        //         },
        //       },
        //     },
        //   },
        //   {
        //     shipping_rate_data: {
        //       type: "fixed_amount",
        //       fixed_amount: {
        //         amount: 1500,
        //         currency: "pkr",
        //       },
        //       display_name: "Next day air",
        //       // Delivers in exactly 1 business day
        //       delivery_estimate: {
        //         minimum: {
        //           unit: "business_day",
        //           value: 1,
        //         },
        //         maximum: {
        //           unit: "business_day",
        //           value: 1,
        //         },
        //       },
        //     },
        //   },
        // ],
        phone_number_collection: {
            enabled: true,
        },

        // customer: customer.id,
        line_items,
        mode: "payment",
        // customer: customer.id,
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        customer_email: "balochdanish2020@gmail.com",
    });

    res.send({ url: session.url });
};

export const plan_stripe = (req, res) => {};