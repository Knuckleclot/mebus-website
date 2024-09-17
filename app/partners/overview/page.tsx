import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  ArrowRight,
  Bus,
  Globe,
  CreditCard,
  Users,
  TrendingUp,
  BarChart,
  Shield,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MeBus | Partner Overview",
  description:
    "Learn how to partner with MeBus, expand your reach, and grow your bus operation with our cutting-edge online platform.",
};
export default function OperatorPartnership() {
  return (
    <div className="mx-auto px-4 sm:px-8 xl:px-0 pt-20">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-6xl" />
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16 max-w-6xl mx-auto">
        <div className="lg:w-1/2">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            Partner with MeBus
            <br />
            <span className="text-primary">Expand Your Reach</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our platform and start selling your bus tickets online. We
            provide the technology, you provide the rides!
          </p>
          <Link href={"/partners/apply"}>
            <Button size="lg" className="font-semibold">
              Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2">
          <Image
            width={1920}
            height={1080}
            src="/assets/images/busOperatorPartnership.jpg"
            alt="Bus operator partnership"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Why partner with MeBus?
          </h2>
          <p className="text-center mb-12 text-lg max-w-2xl mx-auto">
            Boost your bus operation business with our cutting-edge online
            platform and take advantage of our extensive network.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8 mb-4 text-primary" />,
                title: "Expand Your Online Presence",
                description:
                  "Reach a wider audience and sell tickets 24/7 through our user-friendly platform.",
              },
              {
                icon: <CreditCard className="w-8 h-8 mb-4 text-primary" />,
                title: "Secure Online Payments",
                description:
                  "Accept various payment methods with our integrated, secure payment system.",
              },
              {
                icon: <Users className="w-8 h-8 mb-4 text-primary" />,
                title: "Customer Management",
                description:
                  "Efficiently manage bookings, cancellations, and customer inquiries through our system.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 mb-4 text-primary" />,
                title: "Grow Your Business",
                description:
                  "Increase your sales and optimize your routes with our data-driven insights.",
              },
              {
                icon: <BarChart className="w-8 h-8 mb-4 text-primary" />,
                title: "Analytics Dashboard",
                description:
                  "Access real-time data and analytics to make informed business decisions.",
              },
              {
                icon: <Shield className="w-8 h-8 mb-4 text-primary" />,
                title: "Fraud Protection",
                description:
                  "Benefit from our advanced fraud detection and prevention systems.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="bg-white">
                <CardHeader>
                  <CardTitle className="flex flex-col items-start">
                    {benefit.icon}
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 flex max-w-6xl mx-auto flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">
            How to become a MeBus partner
          </h2>
          <p className="mb-8 text-lg">
            Join our network of bus operators in just a few simple steps
          </p>
          <div className="space-y-8">
            {[
              {
                title: "Apply",
                description:
                  "Fill out our partnership application form with your company details and route information.",
              },
              {
                title: "Verify",
                description:
                  "Our team will review your application and verify your bus operation credentials to ensure quality service.",
              },
              {
                title: "Integrate",
                description:
                  "Work with our technical team to set up your routes, schedules, and pricing on our platform.",
              },
              {
                title: "Start Selling",
                description:
                  "Once everything is set up, start selling tickets online and grow your business with MeBus.",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="rounded-full border-2 border-primary text-primary w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <Image
            width={1920}
            height={1080}
            src="/assets/images/busOperatorPartnershipProcess.jpg"
            alt="Partnership process"
            className="rounded-lg shadow-lg h-[400px]"
          />
        </div>
      </section>

      <section className="py-16 bg-primary max-w-6xl mx-auto  text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to get started?</h2>
        <p className="mb-8 max-w-2xl mx-auto text-lg">
          Join the MeBus network today and transform your bus operation with our
          advanced online ticketing system. Expand your customer base,
          streamline your operations, and boost your revenue.
        </p>
        <Link href={"/partners/apply"}>
          <Button
            size="lg"
            className="font-semibold bg-white text-primary hover:bg-gray-100"
          >
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      <SecondaryFooter />
    </div>
  );
}