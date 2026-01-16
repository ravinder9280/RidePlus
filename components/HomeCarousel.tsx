"use client";

import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const carouselImages = [
  {
    src: "/dummy1.png",
    text: "Ride sharing made easy",
    subText: "Book or offer rides instantly and travel smarter together.",
  },
  {
    src: "/dummy2.jpg",
    text: "Connect with fellow travelers",
    subText:
      "Meet people heading your way and enjoy every trip with great company.",
  },
  {
    src: "/dummy3.jpg",
    text: "Save money, share rides",
    subText:
      "Cut travel costs while reducing your carbon footprint on every journey.",
  },
];

export function HomeCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!carouselApi || totalItems <= 1) return;

    const autoScrollInterval = setInterval(() => {
      carouselApi.scrollNext();
    }, 4000); // 4 seconds - commonly used by companies like Uber, Airbnb, etc.

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [carouselApi, totalItems]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  // const goToPrevious = () => {
  //     if (currentIndex === 0) {
  //         scrollToIndex(totalItems - 1);
  //     } else {
  //         scrollToIndex(currentIndex - 1);
  //     }
  // };

  // const goToNext = () => {
  //     if (currentIndex === totalItems - 1) {
  //         scrollToIndex(0);
  //     } else {
  //         scrollToIndex(currentIndex + 1);
  //     }
  // };

  return (
    <div className="relative w-full max-w-5xl mx-auto lg:mt-6">
      <Carousel
        setApi={setCarouselApi}
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]  overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.text}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                {/* Optional overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Optional content overlay */}
                <div className="absolute bottom-8 left-6 flex flex-col gap-1 right-6 ">
                  <h2 className="text-2xl md:text-3xl font-bold text-white  ">
                    {image.text}
                  </h2>
                  <p className="text-sm md:text-base text-white/70">
                    {image.subText}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      {/* <div className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none">
                <Button
                    onClick={goToPrevious}
                    className="pointer-events-auto rounded-full w-10 h-10 p-0 bg-background/90  shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                </Button>
                <Button
                    onClick={goToNext}
                    className="pointer-events-auto rounded-full w-10 h-10 p-0 bg-background/90  shadow-lg hover:shadow-xl transition-all duration-200"
                    aria-label="Next image"
                >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                </Button>
            </div> */}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
