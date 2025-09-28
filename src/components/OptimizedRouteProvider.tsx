
import { useLocation } from 'react-router-dom';
import SearchResults from '@/pages/SearchResults';

const OptimizedRouteProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Use standard SearchResults for search functionality
  if (location.pathname === '/search-results') {
    return <SearchResults />;
  }
  
  return <>{children}</>;
};

export default OptimizedRouteProvider;
