import { auth } from "@/auth";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";
import { getMyCart } from "@/lib/actions/cartActions";
import { getUserById } from "@/lib/actions/userActions";
import ShippingAddressForm from "./ShippingAddressForm/ShippingAddressForm";
import CheckoutSteps from "@/assets/CheckoutSteps";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found");
  }

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />;
    </>
  );
};

export default ShippingAddressPage;
