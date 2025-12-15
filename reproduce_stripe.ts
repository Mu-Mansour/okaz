import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.STRIPE_SECRET_KEY;
console.log("Testing Stripe Key:", key);

if (!key) {
  console.error("No STRIPE_SECRET_KEY found");
  process.exit(1);
}

const stripe = new Stripe(key);

async function test() {
  try {
    await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log("Success!");
  } catch (e: any) {
    console.error("Error:", e.message);
    console.error("Type:", e.type);
    console.error("Code:", e.code);
  }
}

test();
