
import PageHeader from '@/components/PageHeader';
import DestinationDealCard from '@/components/DestinationDealCard';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDestinationDeals } from '@/hooks/useDestinationDeals';

const TopDeals = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: destinationDeals = [], isLoading, error } = useDestinationDeals();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader
          title={t('topDeals.title')}
          subtitle={t('topDeals.subtitle')}
          showBackButton
          backTo="/"
        />

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('topDeals.loading.title')}</h3>
                <p className="text-muted-foreground">{t('topDeals.loading.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader
          title={t('topDeals.title')}
          subtitle={t('topDeals.subtitle')}
          showBackButton
          backTo="/"
        />

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('topDeals.error.title')}</h3>
              <p className="text-muted-foreground mb-4">{t('topDeals.error.description')}</p>
              <button onClick={() => window.location.reload()} className="btn-jetleg-primary">
                {t('topDeals.error.retry')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Standardized Page Header */}
      <PageHeader
        title={t('topDeals.title')}
        subtitle={t('topDeals.subtitle')}
      />

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {destinationDeals.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t('topDeals.noFlights.title')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('topDeals.noFlights.description')}
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-sm text-muted-foreground">
                  {destinationDeals.length} {t('topDeals.destinationsAvailable')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {destinationDeals.map((deal, index) => (
                  <div key={deal.id} className="animate-fade-in" style={{
                    animationDelay: `${index * 0.1}s`
                  }}>
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

export default TopDeals;
