
import { useState } from 'react';
import { Heart, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import { useAuth } from '@/contexts/AuthContext';
import AlertPreferencesDialog from './AlertPreferencesDialog';

interface SaveSearchButtonProps {
  searchCriteria: {
    from: string;
    to: string;
    date: string;
    passengers: string;
    filters?: any;
  };
}

const SaveSearchButton = ({ searchCriteria }: SaveSearchButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { saveSearch, isSaving } = useSavedSearches();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [savedSearchId, setSavedSearchId] = useState<string | null>(null);

  const handleSaveSearch = async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const savedSearch = await saveSearch(searchCriteria);
      setSavedSearchId(savedSearch.id);
      setShowAlertDialog(true);
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  };

  return (
    <>
      <button 
        onClick={handleSaveSearch}
        disabled={isSaving}
        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent hover:text-accent/80 border border-accent/20 hover:border-accent/40 rounded-full bg-accent/5 hover:bg-accent/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
        <span>{isSaving ? 'Opslaan...' : 'Zoekopdracht opslaan'}</span>
      </button>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-accent" />
              Inloggen vereist
            </DialogTitle>
            <DialogDescription className="pt-4">
              Je moet ingelogd zijn om zoekopdrachten op te slaan als favorieten. 
              Log in of maak een gratis account aan om deze functie te gebruiken en notificaties te ontvangen over nieuwe vluchten.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Annuleren
            </Button>
            <Button 
              onClick={() => {
                setShowLoginPrompt(false);
                navigate('/login');
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Inloggen of account maken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertPreferencesDialog
        isOpen={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        savedSearchId={savedSearchId}
      />
    </>
  );
};

export default SaveSearchButton;
