import SearchWithSuggestions from "./SearchWithSuggestions";
import heroImage from "@/assets/hero-bg.jpg";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useTheme } from "next-themes";

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

  const overlayOpacity = theme === "dark" ? "0.5" : "0.3";

  return (
    // GEWIJZIGD: De minimale hoogte is verlaagd van 50vh naar 40vh
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

        <SearchWithSuggestions initialValues={initialValues} />
      </div>
    </section>
  );
};

export default HeroSection;
