import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDealsFlights } from '@/hooks/useFlights';
import DealsCarousel from './DealsCarousel';
import FlightCard from './FlightCard';
const DealsSection = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const {
    data: flights = [],
    isLoading,
    error
  } = useDealsFlights();

  // Get the first 6 flights as featured deals for better carousel experience
  const featuredDeals = flights.slice(0, 6);
  if (isLoading) {
    return <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-6">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map(index => <div key={index} className="card-jetleg h-64 animate-pulse bg-muted"></div>)}
          </div>
        </div>
      </section>;
  }
  if (error || featuredDeals.length === 0) {
    return <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-6">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-title text-foreground mb-4">
              {t('deals.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('deals.subtitle')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Geen deals beschikbaar op dit moment.</p>
          </div>
        </div>
      </section>;
  }
  return <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-6 md:px-8 lg:px-6">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-title text-foreground mb-4">
            {t('deals.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('deals.subtitle')}
          </p>
        </div>
        
        {/* Desktop: Regular grid, Mobile/Tablet: Carousel */}
        <div className="mb-12">
          {/* Desktop Grid - Hidden on mobile/tablet */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {featuredDeals.slice(0, 3).map((deal, index) => <div key={deal.id} className="animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="h-full">
                  <FlightCard {...deal} />
                </div>
              </div>)}
          </div>
          
          {/* Mobile/Tablet Carousel - Hidden on desktop */}
          <div className="lg:hidden">
            <DealsCarousel deals={featuredDeals} />
          </div>
        </div>
        
        <div className="text-center animate-fade-in">
          <button onClick={() => navigate('/top-deals')} className="btn-jetleg-primary inline-flex items-center gap-2">
            
            {t('deals.viewAll')}
          </button>
        </div>
      </div>
    </section>;
};
export default DealsSection;