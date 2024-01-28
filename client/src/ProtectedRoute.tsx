// ProtectedRoute.tsx

import { useAuthorizeQuery } from "./redux/services/usersApi";




const ProtectedRoute = () => {
  const {  error } = useAuthorizeQuery();

  return (
   <div>

   </div>
  );
};

export default ProtectedRoute;



