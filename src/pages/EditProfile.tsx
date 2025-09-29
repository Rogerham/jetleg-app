import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Building, Hash, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EditProfileProps {
  onBack: () => void;
}

interface ProfileData {
  first_name: string;
  last_name: string;
  phone: string;
  address?: string;
  company_name?: string;
  vat_number?: string;
}

const EditProfile = ({ onBack }: EditProfileProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    company_name: '',
    vat_number: ''
  });

  const [email, setEmail] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [accountCreatedDate, setAccountCreatedDate] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      setEmail(user.email || '');
      
      // Format account creation date
      if (user.created_at) {
        const createdDate = new Date(user.created_at);
        const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
          'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const formattedDate = `${monthNames[createdDate.getMonth()]} ${createdDate.getFullYear()}`;
        setAccountCreatedDate(formattedDate);
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfileData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            phone: data.phone || '',
            address: '',
            company_name: '',
            vat_number: ''
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update email if changed
      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email
        });
        
        if (emailError) {
          console.error('Error updating email:', emailError);
          toast.error('Fout bij het wijzigen van e-mail. Controleer je nieuwe e-mail voor verificatie.');
          setLoading(false);
          return;
        } else {
          toast.success('Verificatie e-mail verzonden naar je nieuwe e-mailadres');
        }
      }

      // Update profile data
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating profile:', error);
        toast.error('Fout bij het opslaan van profielgegevens');
      } else {
        toast.success('Profiel succesvol bijgewerkt');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword) {
      toast.error('Voer je huidige wachtwoord in');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Nieuwe wachtwoorden komen niet overeen');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Nieuw wachtwoord moet minimaal 6 karakters lang zijn');
      return;
    }

    setLoading(true);
    try {
      // First verify current password by attempting to sign in
      if (user?.email) {
        const { error: verifyError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: passwordData.currentPassword
        });
        
        if (verifyError) {
          toast.error('Huidig wachtwoord is incorrect');
          setLoading(false);
          return;
        }
      }
      
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) {
        console.error('Error updating password:', error);
        toast.error('Fout bij het wijzigen van wachtwoord');
      } else {
        toast.success('Wachtwoord succesvol gewijzigd');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is een fout opgetreden');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      // For now, we'll direct users to contact support for account deletion
      // as proper account deletion requires backend setup
      toast.error('Account verwijdering is nog niet geïmplementeerd. Neem contact op met de klantenservice voor hulp.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Er is een fout opgetreden');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Information Form */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <User className="h-5 w-5" />
            Persoonlijke gegevens
          </h2>
          
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Voornaam</label>
                <input
                  type="text"
                  value={profileData.first_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Achternaam</label>
                <input
                  type="text"
                  value={profileData.last_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  placeholder="user@email.com"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Bij wijziging wordt een verificatie e-mail verzonden</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Telefoon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Adres</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bedrijfsnaam (optioneel)</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={profileData.company_name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">BTW nummer (optioneel)</label>
              <input
                type="text"
                value={profileData.vat_number}
                onChange={(e) => setProfileData(prev => ({ ...prev, vat_number: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-jetleg-primary flex items-center gap-2 w-full"
            >
              <User className="h-4 w-4" />
              {loading ? 'Opslaan...' : 'Gegevens opslaan'}
            </button>
          </form>
        </div>

        {/* Account Settings Section */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <User className="h-5 w-5" />
            Account gegevens
          </h2>
          
          {/* Password Change */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-foreground">Wachtwoord wijzigen</h3>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn-jetleg-outline text-sm"
              >
                {showPasswordForm ? 'Annuleren' : 'Wijzigen'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Huidig wachtwoord</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full pr-10 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nieuw wachtwoord</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full pr-10 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bevestig nieuw wachtwoord</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-jetleg-primary w-full"
                >
                  {loading ? 'Wijzigen...' : 'Wachtwoord wijzigen'}
                </button>
              </form>
            )}
          </div>

          {/* Account Info */}
          {accountCreatedDate && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Actief sinds {accountCreatedDate}
              </p>
            </div>
          )}

          {/* Account Deletion */}
          <div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-4 py-2 bg-background text-destructive border border-destructive rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeleting ? 'Verwijderen...' : 'Account verwijderen'}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Account verwijderen</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je je account wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;