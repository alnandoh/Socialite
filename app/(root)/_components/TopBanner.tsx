"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import conference from "@/public/conference.webp";
import edm from "@/public/edm.webp";
import chess from "@/public/chess.webp";
import gamescon from "@/public/gamescon.webp";
import Link from "next/link";

const heroImages = [conference, edm, chess, gamescon];

export default function TopBanner() {
  return (
    <section className="wrapper flex justify-center mt-6">
      <Carousel
        className="w-full rounded-2xl overflow-hidden"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[56.14vw] md:h-[600px]">
                <Image
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  fill
                  className="object-cover object-center rounded-xl"
                />
                <Link href={`/event/${index + 1}`}>
                  <Button
                    variant="outline"
                    className="absolute right-2 bottom-2"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden absolute left-2 lg:flex" />
        <CarouselNext className="hidden absolute right-2 lg:flex" />
      </Carousel>
    </section>
  );
}
