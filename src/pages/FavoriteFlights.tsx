import React, { useState } from 'react';
import { Heart, Bell, BellOff, Trash2, ArrowRight, AlertTriangle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedSearches, useAlertPreferences } from '@/hooks/useSavedSearches';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import PageHeader from '@/components/PageHeader';

const FavoriteFlights = () => {
  const { savedSearches, isLoading, deleteSearch } = useSavedSearches();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchToDelete, setSearchToDelete] = useState<string | null>(null);

  const handleDeleteClick = (searchId: string) => {
    setSearchToDelete(searchId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (searchToDelete) {
      try {
        await deleteSearch(searchToDelete);
        setDeleteDialogOpen(false);
        setSearchToDelete(null);
      } catch (error) {
        console.error('Failed to delete search:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Favoriete vluchten"
          subtitle="Beheer je opgeslagen zoekopdrachten en notificaties"
        />
        
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {[...Array(3)].map((_, index) => (
              <FavoriteSkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader
          title="Favoriete vluchten"
          subtitle="Beheer je opgeslagen zoekopdrachten en notificaties"
        />
        
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">

              {savedSearches.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Geen favorieten gevonden</h3>
                  <p className="text-muted-foreground mb-6">
                    Je hebt nog geen vluchten opgeslagen. Ga naar de zoekpagina en klik op het hartje om vluchten op te slaan.
                  </p>
                  <Link to="/" className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 rounded-xl font-medium transition-colors">
                    <Search className="h-4 w-4" />
                    Ga naar zoeken
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedSearches.map((search) => (
                    <SavedSearchCard
                      key={search.id}
                      search={search}
                      onDelete={() => handleDeleteClick(search.id)}
                    />
                  ))}
                </div>
              )}

              <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Favoriet verwijderen
                    </DialogTitle>
                    <DialogDescription>
                      Weet je zeker dat je deze opgeslagen zoekopdracht wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Annuleren
                    </Button>
                    <Button variant="destructive" onClick={handleConfirmDelete}>
                      Verwijderen
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

interface SavedSearchCardProps {
  search: any;
  onDelete: () => void;
}

const FavoriteSkeletonCard = React.memo(() => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
});

FavoriteSkeletonCard.displayName = 'FavoriteSkeletonCard';

const SavedSearchCard = React.memo(({ search, onDelete }: SavedSearchCardProps) => {
  const { alertPreferences, saveAlertPreferences } = useAlertPreferences(search.id);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    alertPreferences?.email_notifications || false
  );

  const toggleNotifications = React.useCallback(async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    
    try {
      await saveAlertPreferences({
        saved_search_id: search.id,
        email_notifications: newValue,
        phone_notifications: false,
        email_address: search.user_id
      });
    } catch (error) {
      console.error('Failed to update alert preferences:', error);
      setNotificationsEnabled(!newValue);
    }
  }, [notificationsEnabled, search.id, saveAlertPreferences, search.user_id]);

  const formatDate = React.useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: nl });
    } catch {
      return dateString;
    }
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span>{search.search_criteria.from}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span>{search.search_criteria.to}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(search.search_criteria.date)}</span>
            <span>{search.search_criteria.passengers} {parseInt(search.search_criteria.passengers) === 1 ? 'passagier' : 'passagiers'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleNotifications}
            className={`p-2 rounded-full transition-colors ${
              notificationsEnabled 
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                : 'text-muted-foreground bg-muted hover:bg-muted/80'
            }`}
            title={notificationsEnabled ? 'Notificaties uitschakelen' : 'Notificaties inschakelen'}
          >
            {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </button>
          
          <button
            onClick={onDelete}
            className="p-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            title="Verwijderen"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

SavedSearchCard.displayName = 'SavedSearchCard';

export default FavoriteFlights;