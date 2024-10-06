import { Navigate } from 'react-router-dom';

const Protected = ({
  allAvailable = false,
  children,
}: React.PropsWithChildren & { allAvailable?: boolean }) => {
  const token = localStorage.getItem('token');
  if (token) {
    if (allAvailable) {
      return children;
    }
    const role = localStorage.getItem('role');
    return role === 'OPERATOR' ? <Navigate to="/dashboard/search-partner" /> : children;
  } else {
    return token ? children : <Navigate to="/login" />;
  }
};

export default Protected;
