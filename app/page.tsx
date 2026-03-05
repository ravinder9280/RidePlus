import { Footer } from "@/components/footer";
import { AnimatedGroup } from "@/components/motion-primitives/animated-groups";
import { TextEffect } from "@/components/motion-primitives/text-effects";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { transitionVariants } from "@/lib/utils";
import {
  ArrowRight,
  CarFront,
  Home,
  HelpCircle,
  ShieldCheck,
  Info,
  Mail,
  Menu,
  BadgeDollarSign,
  Car,
  Zap,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RideSearchBar from "@/components/rides/search/ride-search-bar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TestimonialCard from "@/components/testimonial-card";
import { MobileMenuHome } from "@/components/Navbar/Mobile/mobile-menu-home";
//home
//how it works
//trust and safety
//about us
//contact us
const howItWorks = [
  {
    title: "Your pick of rides at low prices.",
    description:
      "No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.",
    icon: BadgeDollarSign,
  },
  {
    title: "Trust who you travel with.",
    description:
      "We take the time to get to know each of our members and partners. We check reviews, profiles and IDs, so you know who you're travelling with and can book.",
    icon: Car,
  },
  {
    title: "Scroll, click, tap and go!",
    description:
      "Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.",
    icon: Zap,
  },
];

const navItems = [
  {
    label: "Home",
    href: "#home",
    icon: Home,
  },
  {
    label: "How it works",
    href: "#how-it-works",
    icon: HelpCircle,
  },
  {
    label: "Trust and safety",
    href: "#trust-and-safety",
    icon: ShieldCheck,
  },
  {
    label: "About us",
    href: "#about-us",
    icon: Info,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: Mail,
  },
];
const testimonials = [
  {
    quote:
      "This is a game-changer. The platform is intuitive, powerful, and has completely transformed our workflow. The support team is also incredibly responsive.",
    authorName: "Sarah Johnson",
    authorTitle: "CEO, Innovate Inc.",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    quote:
      "I was skeptical at first, but the results speak for themselves. Our productivity is up by 40% and the team is happier than ever. Highly recommended!",
    authorName: "Michael Chen",
    authorTitle: "CTO, Tech Solutions",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    rating: 5,
  },
  {
    quote:
      "An essential tool for any modern business. It's flexible enough to adapt to our unique needs, and the feature set is constantly growing and improving.",
    authorName: "Emily Rodriguez",
    authorTitle: "Marketing Director, Creative Co.",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    rating: 4,
  },
];

const LandingPage = () => {
  return (
    <>
      <header className="  z-[3] transition-all duration-300 bg-[#222733]  md:pt-4 backdrop-blur-sm">
        <div className="w-full container mx-auto sm:px-2 md:px-12 lg:px-24 xl:px-6 px-4">
          <div className="flex items-center h-16 justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={"/"}
                className="text-foreground font-poppins font-bold text-xl flex items-center cursor-pointer"
              >
                <CarFront className="text-primary" />
                <span className="ml-2">RIDEPLUS</span>
              </Link>
            </div>
            <nav className="md:flex hidden items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground font-poppins font-medium  hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="md:flex hidden items-center gap-4">
              {}
              <Button
                size={"lg"}
                variant="outline"
                asChild
                className="bg-transparent text-primary hover:text-primary"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
            <Sheet>
              <SheetTrigger className="md:hidden rounded-full p-2 hover:bg-muted">
                <Menu className="w-6 h-6 text-primary" />
              </SheetTrigger>
              <SheetContent side="top">
                <div className="relative ">
                  <MobileMenuHome
                    menuItems={navItems.map(({ label, href }) => ({
                      label,
                      href,
                    }))}
                  />
                  <div className="absolute top-0 right-0">
                    <SheetClose>
                      <X className="w-8 h-8" />
                    </SheetClose>
                  </div>
                  <div className="px-10 mt-10">
                    <Button
                      size={"lg"}
                      variant="outline"
                      asChild
                      className="bg-transparent text-primary hover:text-primary"
                    >
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <section id="home" className="min-h-screen w-full bg-[#222733]">
        <div className="container   px-8 py-8 lg:py-20 pb-20 lg:pb-24 mx-auto">
          <div className="relative  flex md:pb-20 py-10 items-center justify-between  lg:flex-row flex-col gap-12 ">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-4xl md:text-6xl font-bold text-white"
              >
                The easiest way to find
              </TextEffect>
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-4xl md:text-6xl font-bold text-white"
              >
                the best ride
              </TextEffect>

              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="text-[#c2c1c9] mt-6 max-w-xl text-lg text-muted-foreground"
              >
                We are a platform that allows you to find the best ride for your
                journey with the best drivers and the best prices for your
                journey with the best comfort and safety.
              </TextEffect>
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-8"
              >
                <Button
                  size={"lg"}
                  className="w-[16rem] h-[3rem] text-[14px] font-semibold"
                  asChild
                >
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </AnimatedGroup>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                },
              }}
              className="relative lg:w-1/2 h-full w-full flex items-center justify-center"
            >
              <Image
                src="/hero-car.svg"
                alt="ride"
                width={500}
                height={500}
                className="object-cover object-center w-full h-full"
              />
            </AnimatedGroup>
          </div>
          <div className="w-full rounded-lg border border-[#333842] mt-10 bg-[#2b303a]">
            <RideSearchBar />
          </div>
        </div>
      </section>

      <section id="how-it-works" className=" w-full bg-white ">
        <div className="container px-6 py-20 mx-auto">
          <div>
            <h2 className="text-4xl font-bold text-center text-black">
              How it <span className="text-primary">works</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mt-10">
            {howItWorks.map((item) => (
              <div key={item.title} className="flex flex-col items-center ">
                <div className="bg-primary/10 rounded-full p-4 mx-auto">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-center mt-4 text-black">
                  {item.title}
                </h3>
                <p className="text-zinc-600 text-lg  text-center mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="trust-and-safety" className=" w-full bg-white ">
        <div className="container px-6 py-20 mx-auto">
          <div className="flex  items-center justify-center">
            <div className="grid md:grid-cols-2 grid-cols-1 ">
              <div className="flex flex-col items-center justify-center py-10">
                <div>
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h2"
                    className=" text-4xl md:text-[52px] md:leading-[60px]  font-bold  text-black"
                  >
                    Your safety
                  </TextEffect>
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h2"
                    className=" text-4xl md:text-[52px]  md:leading-[60px] font-bold  text-black"
                  >
                    is our priority.
                  </TextEffect>
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="p"
                    className="  text-xl md:text-[28px]  md:leading-10 text-zinc-600 mt-10  "
                  >
                    RidePlus is designed to ensure
                  </TextEffect>
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="p"
                    className="  text-xl md:text-[28px] md:leading-10 text-zinc-600  "
                  >
                    your safety at all times.
                  </TextEffect>
                  <div className="mt-10">
                    <Link
                      href="#"
                      className="text-primary text-xl underline font-semibold "
                    >
                      How We Ensure Your Safety
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src="safety-car.svg"
                  alt="safety"
                  width={500}
                  height={500}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className=" w-full bg-[#222733] ">
        <div className="container px-6 py-20 mx-auto">
          <div className="flex flex-col  max-w-2xl mx-auto items-center justify-center">
            <h2 className="text-4xl font-bold text-center text-white">
              What Our Users Say
            </h2>
            <p className="text-[#c2c1c9] text-lg   text-center mt-4">
              We are a platform that allows you to find the best ride for your
              journey with the best drivers and the best prices for your journey
              with the best comfort and safety.
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.authorName}
                quote={testimonial.quote}
                authorName={testimonial.authorName}
                authorTitle={testimonial.authorTitle}
                avatarUrl={testimonial.avatarUrl}
                rating={testimonial.rating}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="about-us" className=" w-full bg-white ">
        <div className="container px-6 py-20 mx-auto">
          <div className="flex flex-col items-center justify-center mb-10">
            <h2 className="text-4xl font-bold text-center text-black">
              About Us
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex items-center justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
                <div className="max-w-xl flex items-center justify-center">
                  <p className="text-zinc-600 text-lg  text-center mt-2">
                    RidePlus is a modern ride-sharing platform designed to make
                    travel smarter, more affordable, and more connected. Our
                    goal is to help people easily find or offer rides, reduce
                    travel costs, and build a trusted community of travelers.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="about-mission.svg"
                    alt="about-us"
                    width={300}
                    height={300}
                    className="object-cover h-[300px] w-[300px]  object-center"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1  gap-12">
                <div className="flex items-center justify-center order-2 lg:order-1">
                  <Image
                    src="why-mission.svg"
                    alt="about-us"
                    width={300}
                    height={300}
                    className="object-cover h-full w-full  object-center"
                  />
                </div>
                <div className="max-w-xl flex items-center justify-center order-1 lg:order-2">
                  <p className="text-zinc-600 text-lg  text-center mt-2">
                    Many people travel the same routes every day but still spend
                    more money and time than necessary. RidePlus solves this by
                    connecting drivers and passengers heading in the same
                    direction.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
                <div className="max-w-xl flex items-center justify-center">
                  <p className="text-zinc-600 text-lg  text-center mt-2">
                    🚗 Easy ride sharing Quickly post or find rides between
                    cities. 💰 Save travel cost Split fuel expenses and travel
                    cheaper. 🤝 Trusted community Profiles, reviews, and
                    verification build trust. 🌱 Eco friendly Fewer vehicles on
                    the road reduces carbon footprint.{" "}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="about-benefits.svg"
                    alt="about-us"
                    width={300}
                    height={300}
                    className="object-cover h-full w-full  object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-5xl py-20 md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center  p-10">
          <div className="flex flex-wrap items-center justify-center p-1 rounded-full bg-primary/10 backdrop-blur border border-primary/40 text-sm">
            <div className="flex items-center">
              <Image
                height={20}
                width={20}
                className="size-6 md:size-7 rounded-full border-3 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
                alt="userImage1"
              />
              <Image
                height={20}
                width={20}
                className="size-6 md:size-7 rounded-full border-3 border-white -translate-x-2"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
                alt="userImage2"
              />
              <Image
                height={20}
                width={20}
                className="size-6 md:size-7 rounded-full border-3 border-white -translate-x-4"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                alt="userImage3"
              />
            </div>
            <p className="-translate-x-2 font-medium">
              Join RidePlus community{" "}
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xl mt-5 bg-gradient-to-r from-white to-[#CAABFF] text-transparent bg-clip-text">
            Start sharing your ride and save money
          </h1>
          <Button size={"lg"} className="px-8 py-3 transition-all   mt-8">
            Get Started
          </Button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
