"use client";
import { useCallback, useEffect, useState } from "react";
import useSearchStore, { useCheckoutStore } from "@/store";
import { useRouter } from "next/navigation";

import { SearchForm } from "@/components/forms/SearchForm";
import { useTranslation } from "react-i18next";
import { DateSelectBlock } from "./DateSelectBlock";

const SearchSection = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    returnDate,
    setReturnDate,

    setTripType,
    tripType,
  } = useSearchStore();
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return tripType === "round-trip";
    }
    return false;
  });
  const resetSearch = useSearchStore((state) => state.resetSearch);

  const { setOutboundTicket, setReturnTicket, setIsSelectingReturn } =
    useCheckoutStore();

  useEffect(() => {
    return () => {
      resetSearch();
    };
  }, [resetSearch]);

  const handleTripTypeChange = useCallback(
    (type: "one-way" | "round-trip") => {
      setIsRoundTrip(type === "round-trip");
      setTripType(type);
      setReturnDate(null);
      setReturnTicket(null);
      setOutboundTicket(null);
      setIsSelectingReturn(false);

      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);

        if (type === "one-way") {
          currentParams.delete("returnDate");
        } else {
          const today = new Date();
          const defaultReturnDate = new Date(today);
          defaultReturnDate.setDate(today.getDate() + 7);

          const formattedReturnDate = defaultReturnDate
            .toISOString()
            .split("T")[0];
          currentParams.set("returnDate", returnDate || formattedReturnDate);
        }

        const newPathname = `${
          window.location.pathname
        }?${currentParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
    },
    [
      returnDate,
      setReturnDate,
      setReturnTicket,
      setOutboundTicket,
      setIsSelectingReturn,
      router,
    ]
  );

  return (
    <>
      <div className="bg-white rounded-lg py-4 md:py-6 flex flex-col gap-4 w-full min-h-fit">
        <div className="max-w-6xl paddingX mx-auto w-full">
          <div className="space-y-4 flex-1">
            <div className="w-full flex flex-col gap-2 md:flex-row justify-start md:justify-between items-start md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="tripType"
                      value="one-way"
                      checked={tripType === "one-way"}
                      onChange={() => handleTripTypeChange("one-way")}
                      className="h-7 w-7 accent-primary-bg"
                    />
                    <span>{t("searchBlock.tripType.oneWay")}</span>
                  </label>
                  <label className="cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="tripType"
                      value="round-trip"
                      checked={tripType === "round-trip"}
                      onChange={() => handleTripTypeChange("round-trip")}
                      className="h-7 w-7 accent-primary-bg"
                    />
                    <span>{t("searchBlock.tripType.roundTrip")}</span>
                  </label>
                </div>
              </div>
            </div>

            <SearchForm updateUrl />
          </div>
        </div>
      </div>
      <DateSelectBlock />
    </>
  );
};

export default SearchSection;
