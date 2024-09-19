import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import SecondaryFooter from "@/components/SecondaryFooter";

export const metadata: Metadata = {
  title: "Payment Options - Help Center",
  description:
    "Learn about the different payment methods available for booking your bus tickets. Manage your payment preferences and find out about upcoming payment options.",
};

export default function PaymentOptionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-screen fixed top-0 left-0 flex justify-center items-center bg-neutral-900 paddingX py-4 z-20">
        <Navbar className="max-w-4xl" />
      </div>
      <main className="flex-grow container max-w-4xl mx-auto px-4 sm:px-8 xl:px-0 pt-32 pb-12">
        <div className="flex flex-col gap-4 sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold mb-8 text-primary">
            Payment Options
          </h1>
          <Link href="/help">
            <Button variant="outline" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Help Center
            </Button>
          </Link>
        </div>

        {/* Current Payment Methods */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accepted Payment Methods</CardTitle>
            <CardDescription>
              Learn about the payment options currently available on our
              platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Card Payments:</strong> You can pay for your bookings
                using credit or debit cards. We support all major card
                providers.
              </li>
              <li>
                <strong>Account Balance:</strong> Deposit money to your account
                in advance to pay for bookings without needing to enter your
                card details every time. Your account balance will be
                automatically applied to future purchases.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* How to Add Funds Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How to Add Funds to Your Account</CardTitle>
            <CardDescription>
              Add funds to your account balance to make future payments faster
              and easier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Log in to your account on our platform</li>
              <li>
                Navigate to the &quot;Account&quot; then click
                &quot;Deposit&quot; section
              </li>
              <li>
                Select &quot;Deposit Funds&quot; and enter the amount you&apos;d
                like to add
              </li>
              <li>Complete the deposit using your credit or debit card</li>
              <li>
                Your account balance will be updated, and you can use it for
                future bookings
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Upcoming Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payment Options</CardTitle>
            <CardDescription>
              We are constantly working to improve your payment experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Soon, we&apos;ll be introducing more convenient payment methods to
              give you flexibility and choice.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Mobile Payment Options (e.g., Apple Pay, Google Pay)</li>
              <li>PayPal and other e-wallet services</li>
              <li>Bank Transfers</li>
              <li>Local payment methods based on your region</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Stay tuned for updates as we expand our payment options to make
              your experience even better.
            </p>
          </CardContent>
        </Card>
      </main>
      <SecondaryFooter className="max-w-4xl" />
    </div>
  );
}