import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import Users from "./user/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

function App() {
  
  const {login, logout, token, userId } = useAuth()
  
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            {token && <Route path="/places/new" element={<NewPlace />} />}
            {token && (
              <Route path="/places/:placeId" element={<UpdatePlace />} />
            )}
            {!token && <Route path="/auth" element={<Auth />} />}
            {token && <Route path="/auth" element={<Navigate to="/" />} />}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
