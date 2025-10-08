import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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
        navigate('/');
      }
    } catch (error) {
      toast.error('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Welkom terug
            </h1>
            <p className="text-lg text-white/90">
              Log in om toegang te krijgen tot je account
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
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
                    placeholder="user@email.com"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-accent focus:ring-accent border-border rounded"
                  />
                  <span className="ml-2 text-sm text-foreground">Onthoud mij</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
                  Wachtwoord vergeten?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-jetleg-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Nog geen account?{' '}
                <Link to="/register" className="text-accent hover:text-accent/80 transition-colors font-medium">
                  Registreer hier
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;