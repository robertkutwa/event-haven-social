import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/" replace />
              : <Login onLogin={user => setUser(user)} />
          }
        />
        <Route
          path="/signup"
          element={
            user
              ? <Navigate to="/" replace />
              : <Signup onSignup={user => setUser(user)} />
          }
        />
        <Route
          path="/"
          element={user ? <Index user={user} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} onUpdate={setUser} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
