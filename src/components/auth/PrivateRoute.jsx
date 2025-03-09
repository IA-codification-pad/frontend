import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth  from '../../hooks/useAuth';
import Loading from '../common/Loading';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <Loading message="Vérification de l'authentification..." />;
  }
  
  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    // Rediriger vers la page d'accueil si la route nécessite un admin mais l'utilisateur n'en est pas un
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;