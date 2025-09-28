
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import ProfileTiles from './ProfileTiles';

const Profile = () => {
  const { user, loading: authLoading, signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.');
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Bevestig je e-mailadres voordat je inloggt. Controleer je inbox.');
        } else {
          toast.error('Er is een fout opgetreden bij het inloggen. Probeer het opnieuw.');
        }
      } else {
        toast.success('Succesvol ingelogd!');
      }
    } catch (error) {
      toast.error('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Profiel laden...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Show login form inline instead of redirecting
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welkom terug</h1>
              <p className="text-muted-foreground">Log in om toegang te krijgen tot je profiel</p>
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
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                      placeholder="je@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Wachtwoord
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-jetleg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ProfileTiles />;
};

export default Profile;
