"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              {product.banner && (
                <Image
                  alt={product.name}
                  src={product.banner}
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full h-auto max-h-[45vh] max-w-[1200px] object-cover rounded-md'
                />
              )}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='hidden md:block'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
