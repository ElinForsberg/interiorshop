// ProtectedRoute.tsx
import  { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import { isLoggedIn } from './redux/slices/userSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children, ...rest }: ProtectedRouteProps) => {
  const userIsLoggedIn = useAppSelector(isLoggedIn);

  return (
    <Route
      {...rest}
      element={userIsLoggedIn ? children : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;



