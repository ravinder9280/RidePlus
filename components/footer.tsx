import {
  CarFront,
  FacebookIcon,
  GithubIcon,
  Grid2X2Plus,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: <GithubIcon className="size-4" />,
    link: "#",
  },
  {
    icon: <InstagramIcon className="size-4" />,
    link: "#",
  },
  {
    icon: <LinkedinIcon className="size-4" />,
    link: "#",
  },
  {
    icon: <TwitterIcon className="size-4" />,
    link: "#",
  },
];

const quickLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Search Rides",
    href: "/rides/search",
  },
  {
    title: "Explore Rides",
    href: "/rides",
  },

  {
    title: "Post a Ride",
    href: "/rides/new",
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-16 dark:bg-black bg-white  border-t py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className=" flex flex-col items-center  ">
            <CarFront className="text-primary size-10 mb-4" />

            <h3 className="mb-4 font-semibold text-lg">RidePlus</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
              A comprehensive ride sharing platform for your journey.
            </p>
          </div>
          <div className="flex items-center flex-col justify-center">
            <h3 className=" mb-4 text-lg font-semibold ">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, title }, i) => (
                <li key={i} className="items-center justify-center flex">
                  <Link
                    className={`text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors  duration-200`}
                    href={href}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex items-center  flex-col">
            <h3 className=" mb-4 text-lg font-semibold ">Follow Me</h3>
            <ul className="flex items-center gap-2">
              {socialLinks.map(({ icon, link }, i) => (
                <li key={i}>
                  <Link
                    className={` transition-colors duration-200 p-2 flex items-center justify-center bg-white/10 border rounded-full`}
                    href={link}
                  >
                    {icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-8 text-center w-full flex items-center justify-center gap-2">
          <p className="text-muted-foreground text-center font-thin">
            © <Link href="https://x.com/Ravinder387573">Ravinder</Link>. All
            rights reserved {year}
          </p>
        </div>
      </div>
    </footer>
  );
};
