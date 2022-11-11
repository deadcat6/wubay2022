import Home from "./Home";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
import {ChatContextProvider} from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
      <AuthContextProvider>
        <ChatContextProvider>
          <React.StrictMode>
            <BrowserRouter>
              <Routes>
                <Route path="/">
                  <Route
                      index
                      element={
                        <ProtectedRoute>
                          <Home />
                        </ProtectedRoute>
                      }
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </React.StrictMode>
        </ChatContextProvider>
      </AuthContextProvider>

  );
}

export default App;
