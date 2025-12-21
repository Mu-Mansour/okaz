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
                <div className='relative aspect-[16/6] w-full min-h-[300px]'>
                  <Image
                    alt={product.name}
                    src={product.banner}
                    fill
                    sizes='100vw'
                    className='object-cover rounded-md'
                    priority
                  />
                </div>
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
