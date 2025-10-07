import heroImage from "@/assets/hero-bg.jpg";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";

// Iconen zijn aangepast om donkergrijs te zijn
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const HeroSection = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();

  const initialValues = useMemo(
    () => ({
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      date: searchParams.get("date") || "",
      passengers: searchParams.get("passengers") || "1",
    }),
    [searchParams],
  );

  const [searchData, setSearchData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Zoeken naar: ${JSON.stringify(searchData, null, 2)}`);
  };

  const overlayOpacity = theme === "dark" ? "0.5" : "0.3";

  return (
    <section
      className="text-white min-h-[40vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 py-6 md:py-10 text-center">
        <div className="animate-fade-in">
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto drop-shadow-md font-bold">
            {t("hero.subtitle")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-black/20 backdrop-blur-sm p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            {/* Input velden met witte achtergrond en donkergrijze placeholder */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
              </div>
              <input
                type="text"
                name="from"
                value={searchData.from}
                onChange={handleChange}
                placeholder="Vertrekplaats"
                className="w-full bg-white text-gray-900 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LocationIcon />
              </div>
              <input
                type="text"
                name="to"
                value={searchData.to}
                onChange={handleChange}
                placeholder="Bestemming"
                className="w-full bg-white text-gray-900 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon />
              </div>
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                name="date"
                value={searchData.date}
                onChange={handleChange}
                placeholder="Datum"
                className="w-full md:min-w-[180px] bg-white text-gray-900 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon />
              </div>
              <input
                type="number"
                name="passengers"
                min="1"
                value={searchData.passengers}
                onChange={handleChange}
                placeholder="Passagiers"
                className="w-full md:w-32 bg-white text-gray-900 p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Zoeken
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
