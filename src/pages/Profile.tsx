
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { PasswordStrengthMeter } from '@/components/PasswordStrengthMeter';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import ProfileTiles from './ProfileTiles';

const Profile = () => {
  const { user, loading: authLoading, signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
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

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Wachtwoorden komen niet overeen.');
      return;
    }
    
    if (registerForm.password.length < 6) {
      toast.error('Wachtwoord moet minimaal 6 karakters lang zijn.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(
        registerForm.email, 
        registerForm.password, 
        registerForm.firstName, 
        registerForm.lastName, 
        registerForm.phone
      );
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('Er bestaat al een account met dit e-mailadres.');
        } else if (error.message.includes('Password should be at least 6 characters')) {
          toast.error('Wachtwoord moet minimaal 6 karakters lang zijn.');
        } else {
          toast.error('Er is een fout opgetreden bij het registreren. Probeer het opnieuw.');
        }
      } else {
        toast.success('Account aangemaakt! Controleer je e-mail om je account te bevestigen.');
        setActiveTab('login');
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
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welkom terug' : 'Account aanmaken'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' 
                  ? 'Log in om toegang te krijgen tot je profiel' 
                  : 'Maak een account aan om te beginnen'
                }
              </p>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-muted rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Inloggen
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'register' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Registreren
              </button>
            </div>
            
            <div className="card-jetleg p-8">
              {activeTab === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-2">
                      E-mailadres
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="login-email"
                        name="email"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        placeholder="user@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-2">
                      Wachtwoord
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="login-password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
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
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onChange={handleLoginChange}
                        className="rounded border-border text-accent focus:ring-accent/20"
                      />
                      <span className="text-sm text-muted-foreground">Onthoud mij</span>
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-accent hover:text-accent/80 transition-colors"
                    >
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
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        Voornaam
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={registerForm.firstName}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                          placeholder="Voornaam"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Achternaam
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        placeholder="Achternaam"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium text-foreground mb-2">
                      E-mailadres
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        id="register-email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        placeholder="user@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefoonnummer
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={registerForm.phone}
                        onChange={handleRegisterChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        placeholder="+31 6 12345678"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium text-foreground mb-2">
                      Wachtwoord
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="register-password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
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
                  <PasswordStrengthMeter password={registerForm.password} />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Bevestig wachtwoord
                  </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        className="w-full pl-10 pr-12 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-jetleg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Account aanmaken...' : 'Account aanmaken'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ProfileTiles />;
};

export default Profile;
