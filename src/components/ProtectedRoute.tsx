import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import type { UserRole } from '../store/userSlice';

type Props = {
  children: ReactNode;
  requiredRole?: UserRole;
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const role = useSelector((s: RootState) => s.user.role);

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
