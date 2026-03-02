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

const company = [
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Brand assets",
    href: "#",
  },
  {
    title: "Privacy Policy",
    href: "#",
  },
  {
    title: "Terms of Service",
    href: "#",
  },
];

const socialLinks = [
  {
    icon: <FacebookIcon className="size-4" />,
    link: "#",
  },
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
  {
    icon: <YoutubeIcon className="size-4" />,
    link: "#",
  },
];

const resources = [
  {
    title: "Blog",
    href: "#",
  },
  {
    title: "Help Center",
    href: "#",
  },
  {
    title: "Contact Support",
    href: "#",
  },
  {
    title: "Community",
    href: "#",
  },
  {
    title: "Security",
    href: "#",
  },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-accent py-12 ">
      <div className="mx-auto max-w-5xl md:border-x">
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <Link
              href={"/"}
              className="text-foreground font-poppins font-bold text-xl flex items-center cursor-pointer"
            >
              <CarFront className="text-primary" />
              <span className="ml-2">RidePlus</span>
            </Link>
            <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
              A comprehensive ride sharing platform for your journey.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, i) => (
                <Link
                  key={i}
                  className="hover:bg-accent rounded-md border p-1.5"
                  target="_blank"
                  href={item.link}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">
              Resources
            </span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }, i) => (
                <Link
                  key={i}
                  className={`w-max py-1 text-sm duration-200 hover:underline`}
                  href={href}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Company</span>
            <div className="flex flex-col gap-1">
              {company.map(({ href, title }, i) => (
                <Link
                  key={i}
                  className={`w-max py-1 text-sm duration-200 hover:underline`}
                  href={href}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
          <p className="text-muted-foreground text-center font-thin">
            © <Link href="https://x.com/Ravinder387573">Ravinder</Link>. All
            rights reserved {year}
          </p>
        </div>
      </div>
    </footer>
  );
};
