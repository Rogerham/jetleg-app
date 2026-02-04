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

  // Luxe gradient overlay - more sophisticated than simple black
  const overlayGradient = theme === "dark" 
    ? "linear-gradient(180deg, hsl(220 20% 8% / 0.7) 0%, hsl(220 20% 8% / 0.5) 100%)"
    : "linear-gradient(180deg, hsl(220 20% 12% / 0.55) 0%, hsl(220 20% 12% / 0.40) 100%)";

  return (
    <section
      className="text-white min-h-[35vh] md:min-h-[38vh] flex items-center"
      style={{
        backgroundImage: `${overlayGradient}, url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 py-4 md:py-6 text-center">
        {t("hero.subtitle") && (
          <div className="animate-fade-in">
            <p className="text-xl md:text-2xl mb-3 text-white/90 max-w-3xl mx-auto drop-shadow-md font-bold">
              {t("hero.subtitle")}
            </p>
          </div>
        )}

        <SearchWithSuggestions initialValues={initialValues} />
      </div>
    </section>
  );
};

export default HeroSection;
