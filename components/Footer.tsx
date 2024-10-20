"use client";

import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/data";
import Link from "next/link";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { useToast } from "./hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed!",
          description:
            "Thank you for subscribing. Please check your email for confirmation.",
        });
        setEmail("");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section
      className={`paddingX py-12 bg-neutral-900 flex justify-center items-center flex-col relative`}
    >
      <div
        className={`flex justify-center items-start md:flex-row flex-col mb-8 w-full max-w-6xl`}
      >
        <div className="flex-1 w-full flex-col sm:flex sm:flex-row sm:items-center md:items-start justify-between md:justify-start md:flex-col mr-10">
          <Link href="/">
            {/* <Image
              src={whitelogo}
              alt="Logo"
              width={150}
              height={40}
              className="w-[150px] h-[40px] md:w-[200px] md:h-[55px] cursor-pointer object-contain"
            /> */}
            <h1 className="font-semibold text-2xl text-white/95">Busly</h1>
          </Link>
          <p
            className={`font-normal text-white/70 text-[18px] leading-[30.8px] mt-4 max-w-[310px]`}
          >
            Our mission is to equip modern explorers with cutting-edge,
            functional, and stylish bags that elevate every adventure.
          </p>
          <div className="flex flex-col ss:my-0 my-4 space-y-4 min-w-[250px] w-full sm:w-fit">
            <h1 className="font-medium text-lg text-white">Get Updates</h1>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  className="w-full h-12 px-4 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="absolute right-1 top-1 bg-white text-neutral-900 hover:bg-white/90"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap gap-4 !mt-6">
              {SOCIAL_LINKS.map((social, index) => (
                <Link
                  key={index}
                  href={social?.link}
                  target="_blank"
                  className={`object-contain cursor-pointer p-3 flex justify-center items-center rounded-full bg-white/20`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-7 w-7 text-white" />
                  <span className="sr-only">
                    Follow us on {social.name}
                  </span>{" "}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 z-[2]">
          {FOOTER_LINKS.map((footerLink, index) => (
            <div
              key={index}
              className="flex flex-col ss:my-0 my-4 min-w-[150px]"
            >
              <h4 className="font-normal text-lg text-white">
                {footerLink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerLink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-base tracking-wide text-white/70  cursor-pointer ${
                      index !== footerLink.links.length - 1 ? "mb-3" : "mb-0"
                    }`}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-between items-start md:items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3e45] max-w-6xl">
        <p className="font-normal text-sm text-center leading-[27px] text-white/70">
          &copy; {new Date().getFullYear()} Busly. All Rights Reserved.
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-0 text-white/70 text-sm">
          <p>24/7 Customer Support</p>
          <p className="hidden md:inline">|</p>
          <p>Secure Payment</p>
          <p className="hidden md:inline">|</p>
          <Link href="/help" className="hover:text-white transition-colors">
            Help & FAQ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
