import { notFound } from "next/navigation";
import { ShippingAddress } from "@/types";
import { getOrderById } from "@/lib/actions/orderActions";
import OrderDetailsTable from "../../place-order/OrderDetailsTable/OrderDetailsTable";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const session = await auth();

  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();
  let client_secret = null;

  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
  }
  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
