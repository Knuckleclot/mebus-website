"use client";

import { Station } from "@/models/station";
import useSearchStore from "@/store";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import Cookies from "js-cookie";
import CitySelectDialog from "./dialogs/CitySelectDialog";
import useIsMobile from "./hooks/use-mobile";

interface CustomSelectProps {
  stations?: Station[];
  departure?: string;
}

interface OptionProps {
  value: string | undefined;
  label: string;
}

const CitySelect: React.FC<CustomSelectProps> = ({
  stations = [],
  departure,
}) => {
  const { setFrom, setTo, setFromCity, setToCity, from, to } = useSearchStore();
  const [showRecent, setShowRecent] = useState(false);
  const [defaultFrom, setDefaultFrom] = useState<OptionProps>();
  const [defaultTo, setDefaultTo] = useState<OptionProps>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadSavedLocations = (
      cityKey: string,
      valueKey: string,
      setCity: (city: string) => void,
      setValue: (value: string) => void,
      setDefault: React.Dispatch<React.SetStateAction<OptionProps | undefined>>
    ) => {
      const savedCity = localStorage.getItem(cityKey);
      const savedValue = localStorage.getItem(valueKey);

      if (savedCity && savedValue) {
        console.log(
          `Setting ${cityKey.replace("City", "")}:`,
          savedCity,
          savedValue
        );
        setCity(savedCity);
        setValue(savedValue);
        setDefault({ label: savedCity, value: savedValue });
      }
    };

    loadSavedLocations(
      "fromCity",
      "fromValue",
      setFromCity,
      setFrom,
      setDefaultFrom
    );
    loadSavedLocations("toCity", "toValue", setToCity, setTo, setDefaultTo);
  }, []);

  const handleSelect = (option: SingleValue<OptionProps>) => {
    if (option) {
      const value = option.value || "";
      const label = option.label || "";
      console.log({ option });
      if (departure === "from") {
        setFromCity(label);
        setFrom(value);
        localStorage.setItem("fromCity", label);
        localStorage.setItem("fromValue", value);

        const recentFromStations = JSON.parse(
          Cookies.get("recentFromStations") || "[]"
        );
        const updatedRecentFromStations = [
          { _id: value, city: label },
          ...recentFromStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        Cookies.set(
          "recentFromStations",
          JSON.stringify(updatedRecentFromStations),
          { expires: 7 }
        );
      } else if (departure === "to") {
        setToCity(label);
        setTo(value);
        localStorage.setItem("toCity", label);
        localStorage.setItem("toValue", value);

        const recentToStations = JSON.parse(
          Cookies.get("recentToStations") || "[]"
        );
        const updatedRecentToStations = [
          { _id: value, city: label },
          ...recentToStations.filter(
            (station: { _id: string }) => station._id !== value
          ),
        ].slice(0, 5);
        Cookies.set(
          "recentToStations",
          JSON.stringify(updatedRecentToStations),
          { expires: 7 }
        );
      }

      setShowRecent(false);
    }
  };

  const getRecentStations = (
    cookieName: "recentFromStations" | "recentToStations"
  ) => {
    const recentStations = JSON.parse(Cookies.get(cookieName) || "[]");
    return recentStations.map((station: { _id: string; city: string }) => ({
      value: station._id,
      label: station.city,
    }));
  };

  const options = stations.map((station) => ({
    value: station._id,
    label: station.city,
  }));

  const recentFromOptions = getRecentStations("recentFromStations");
  const recentToOptions = getRecentStations("recentToStations");

  useEffect(() => {
    if (!recentFromOptions.length && !recentToOptions.length) {
      setShowRecent(false);
      return;
    }
    setShowRecent(true);
  }, [recentFromOptions, recentToOptions]);

  const formatOptionLabel = ({ label }: { label: string }) => {
    // console.log({ label });
    // if (label == "") {
    //   return <Separator className="pointer-events-none cursor-not-allowed" />;
    // }
    return (
      <div className="flex items-center space-x-2">
        <MapPin className="w-6 h-6 text-primary" />
        <span className="w-full">{label}</span>
      </div>
    );
  };

  const handleInputChange = (inputValue: string) => {
    setShowRecent(!inputValue);
  };

  if (isMobile) {
    return (
      <>
        <div
          className="h-14 px-4 flex items-center border border-input bg-background text-sm ring-offset-background cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <MapPin className="w-6 h-6 text-primary mr-2" />
          <span className="capitalize">
            {departure === "from"
              ? from
                ? stations.find((s) => s._id === from)?.city
                : "From"
              : to
              ? stations.find((s) => s._id === to)?.city
              : "To"}
          </span>
        </div>
        <CitySelectDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          stations={stations}
          departure={departure}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <Select
        value={options.find(
          (option) => option.value === (departure === "from" ? from : to)
        )}
        defaultValue={departure === "from" ? defaultFrom : defaultTo}
        onChange={handleSelect}
        onInputChange={handleInputChange}
        styles={{
          container: (provided) => ({
            ...provided,
            outline: "none",
          }),
          control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            textTransform: "capitalize",
            minHeight: "3.5rem",
            borderColor: state.isFocused ? "#efefef" : "#efefef",
            backgroundColor: state.isFocused ? "var(--accent)" : "#fff",
            boxShadow: state.isFocused ? `0 0 0 1px var(--primary)` : "none",
            borderRadius: "var(--radius)",
            "&:hover": {
              backgroundColor: "rgb",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: "0 1rem",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "var(--muted-foreground)",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 20,
            marginTop: "0.5rem",
            borderRadius: "var(--radius)",
            border: `1px solid var(--border)`,
          }),
          menuList: (provided) => ({
            ...provided,
            padding: "0.5rem 0",
          }),
          groupHeading: (provided) => ({
            ...provided,
            padding: "0 1rem",
            color: "var(--foreground)",
            fontWeight: "600",
          }),
          option: (provided, state) => ({
            ...provided,
            padding: "0.5rem 1rem",
            textTransform: "capitalize",
            backgroundColor: state.isFocused
              ? "#efefef"
              : state.isSelected
              ? "var(--primary)"
              : "var(--background)",
            color: state.isSelected
              ? "var(--primary-foreground)"
              : "var(--foreground)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#efefef",
            },
          }),
        }}
        options={
          recentFromOptions.length > 0 && recentToOptions.length > 0
            ? [
                ...(showRecent
                  ? [
                      {
                        label: "Recent Searches",
                        options:
                          departure === "from"
                            ? recentFromOptions
                            : recentToOptions,
                      },
                      // {
                      //   options: [{ label: "", value: "" }],
                      // },
                    ]
                  : []),
                ...options,
              ]
            : options
        }
        formatOptionLabel={formatOptionLabel}
        placeholder={departure === "from" ? "From" : "To"}
        menuPlacement="auto"
        menuPosition="fixed"
      />
    </div>
  );
};

export default CitySelect;
