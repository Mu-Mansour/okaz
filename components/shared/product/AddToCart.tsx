"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast.error(res.message, {
          style: {
            color: "white",
            backgroundColor: "red",
          },
        });
        return;
      }

      toast(`${item.name}`, {
        description: res.message,
        action: {
          label: " Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast(res.message, {
        style: {
          color: res.success ? "green" : "white",
          backgroundColor: res.success ? "white" : "red",
        },
      });
    });
    return;
  };
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return existItem ? (
    <div>
      <Button
        type='button'
        variant='outline'
        onClick={handleRemoveFromCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className='w-4 h-4  animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button
        type='button'
        variant='outline'
        onClick={handleAddToCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}{" "}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus className='w-4 h-4' />
      Add to cart
    </Button>
  );
};

export default AddToCart;
