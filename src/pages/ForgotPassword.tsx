import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        // Check for common "user not found" patterns in Supabase error messages
        if (error.message.toLowerCase().includes('user not found') || 
            error.message.toLowerCase().includes('invalid email') ||
            error.message.toLowerCase().includes('email not confirmed') ||
            error.message.toLowerCase().includes('signup disabled')) {
          toast.error('Dit e-mailadres is niet geregistreerd in ons systeem.');
        } else if (error.message.toLowerCase().includes('email rate limit')) {
          toast.error('Te veel verzoeken. Probeer het over een paar minuten opnieuw.');
        } else {
          toast.error('Er is een fout opgetreden. Probeer het opnieuw.');
        }
      } else {
        setIsSuccess(true);
        toast.success('Als dit e-mailadres geregistreerd is, ontvang je een reset link.');
      }
    } catch (error) {
      toast.error('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Link 
              to="/profile" 
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar profiel
            </Link>
            
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">E-mail verstuurd!</h1>
              <p className="text-muted-foreground">
                Controleer je inbox en klik op de link om je wachtwoord te resetten.
              </p>
            </div>
            
            <div className="card-jetleg p-8 text-center">
              <p className="text-muted-foreground mb-4">
                Geen e-mail ontvangen? Controleer je spam folder of probeer het opnieuw.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-accent hover:text-accent/80 transition-colors underline"
              >
                Opnieuw proberen
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <Link 
            to="/profile" 
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar profiel
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Wachtwoord vergeten?</h1>
            <p className="text-muted-foreground">
              Voer je e-mailadres in en we sturen je een link om je wachtwoord te resetten.
            </p>
          </div>
          
          <div className="card-jetleg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  E-mailadres
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                    placeholder="user@email.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-jetleg-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Bezig met versturen...' : 'Stuur reset link'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;