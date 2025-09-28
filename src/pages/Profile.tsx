
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileTiles from './ProfileTiles';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    navigate('/login');
    return null;
  }

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
    return null;
  }

  return <ProfileTiles />;
};

export default Profile;
