import { useLocation } from 'react-router-dom';

export default function useBasePath() {
  const { pathname } = useLocation();
  return pathname.startsWith('/claims-and-leave-mobile') ? '/claims-and-leave-mobile' : '/claims-and-leave';
}
