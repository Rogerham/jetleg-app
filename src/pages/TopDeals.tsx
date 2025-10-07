import DestinationDealCard from "@/components/DestinationDealCard";
import { MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDestinationDeals } from "@/hooks/useDestinationDeals";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";

// Region mapping for destinations
const REGION_MAP: Record<string, string> = {
  Paris: "europe",
  London: "europe",
  Ibiza: "europe",
  Nice: "europe",
  Geneva: "europe",
  Zurich: "europe",
  Milan: "europe",
  Barcelona: "europe",
  Monaco: "europe",
  Berlin: "europe",
  Madrid: "europe",
  Courchevel: "europe",
  Cannes: "europe",
  Dubai: "uae",
  "Abu Dhabi": "uae",
  "New York": "north-america",
  Miami: "north-america",
  "Los Angeles": "north-america",
};

type RegionFilter = "all" | "europe" | "north-america" | "uae";

const TopDeals = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: destinationDeals = [], isLoading, error } = useDestinationDeals();
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("all");

  // Filter deals based on selected region
  const filteredDeals = useMemo(() => {
    if (selectedRegion === "all") return destinationDeals;

    return destinationDeals.filter((deal) => {
      const region = REGION_MAP[deal.destination];
      return region === selectedRegion;
    });
  }, [destinationDeals, selectedRegion]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-br from-primary to-primary-dark py-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("topDeals.title")}</h1>
              <p className="text-lg text-white/90">{t("topDeals.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <DestinationDealSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <section className="bg-gradient-to-br from-primary to-primary-dark py-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("topDeals.title")}</h1>
              <p className="text-lg text-white/90">{t("topDeals.subtitle")}</p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("topDeals.error.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("topDeals.error.description")}</p>
              <button onClick={() => window.location.reload()} className="btn-jetleg-primary">
                {t("topDeals.error.retry")}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-primary to-primary-dark py-12">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t("topDeals.title")}</h1>
            <p className="text-lg text-white/90">{t("topDeals.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Region Filters */}
          {/* GEWIJZIGD: 'flex-wrap' is hier verwijderd om te voorkomen dat knoppen naar een nieuwe regel springen */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Button
              variant={selectedRegion === "all" ? "default" : "outline"}
              onClick={() => setSelectedRegion("all")}
              className="flex-1 sm:flex-initial"
            >
              {t("topDeals.filters.all")}
            </Button>
            <Button
              variant={selectedRegion === "europe" ? "default" : "outline"}
              onClick={() => setSelectedRegion("europe")}
              className="flex-1 sm:flex-initial"
            >
              {t("topDeals.filters.europe")}
            </Button>
            <Button
              variant={selectedRegion === "north-america" ? "default" : "outline"}
              onClick={() => setSelectedRegion("north-america")}
              className="flex-1 sm:flex-initial"
            >
              {t("topDeals.filters.northAmerica")}
            </Button>
            <Button
              variant={selectedRegion === "uae" ? "default" : "outline"}
              onClick={() => setSelectedRegion("uae")}
              className="flex-1 sm:flex-initial"
            >
              {t("topDeals.filters.uae")}
            </Button>
          </div>

          {destinationDeals.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("topDeals.noFlights.title")}</h3>
              <p className="text-muted-foreground mb-4">{t("topDeals.noFlights.description")}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-sm text-muted-foreground">
                  {filteredDeals.length} {t("topDeals.destinationsAvailable")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDeals.map((deal, index) => (
                  <div
                    key={deal.id}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <DestinationDealCard deal={deal} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const DestinationDealSkeleton = () => {
  return (
    <div className="card-jetleg h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Skeleton className="w-full h-48" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="mt-auto">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
