"use client";

import moment from "moment-timezone";
import { Symbols } from "@/symbols";
import { Ticket as TicketType } from "@/models/ticket";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";

export interface TicketProps {
  ticket: TicketType;
  adults?: string | null;
  nrOfChildren?: string | null;
}

const TicketBlock: React.FC<TicketProps> = ({
  ticket,
  adults,
  nrOfChildren,
}) => {
  const { setSelectedTicket } = useCheckoutStore();
  const router = useRouter();

  const handleCheckout = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      setSelectedTicket(ticket);
      router.push(`/checkout?adults=${adults}&children=${nrOfChildren}`);
      console.log({ ticket });
    } catch (error) {
      console.error(error);
    }
  };

  const departureDate = moment.utc(ticket.stops[0].departure_date);
  const arrivalTime = moment.utc(ticket.stops[0].arrival_time);
  const duration = moment.duration(arrivalTime.diff(departureDate));
  const durationFormatted = `${duration.hours()}:${duration
    .minutes()
    .toString()
    .padStart(2, "0")} hrs`;

  return (
    <div className="max-w-5xl mx-auto bg-white border rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <div className="flex gap-2 items-center mb-2 sm:mb-0 justify-between w-full">
            <Badge>{ticket.metadata.operator_name}</Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-2" />
              {departureDate.format("ddd, MMMM D, YYYY")}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end relative gap-3">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center">
              <div className="text-base sm:text-lg md:text-xl">
                {departureDate.format("HH:mm")}
              </div>
              <div className="text-center flex-1 px-2">
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-2 text-neutral-700 font-medium text-lg sm:text-xl">
                    {durationFormatted}
                  </span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
              <div className="text-base sm:text-lg md:text-xl">
                {arrivalTime.format("HH:mm")}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[0].from.city}
                </h1>
                <span className="truncate text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].from.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="font-medium text-base sm:text-lg capitalize">
                  {ticket.stops[0].to.city}
                </h1>
                <span className="truncate text-accent-foreground/50 line-clamp-1">
                  {ticket.stops[0].to.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 w-full md:flex-col md:justify-end md:items-end md:w-fit">
            <div className="text-xl sm:text-2xl font-semibold w-full md:w-1/3 flex md:flex-col justify-between items-end mt-2 md:mt-0">
              {Symbols.EURO}
              {ticket.stops[0].other_prices.our_price.toFixed(2)}
            </div>
            <Button
              className="w-fit text-sm sm:text-base bg-emerald-700 hover:bg-emerald-600"
              onClick={handleCheckout}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBlock;
