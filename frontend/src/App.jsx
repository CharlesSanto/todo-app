import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';

function PrivateRoute({ children }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return signed ? children : <Navigate to="/login" />;
}

import SettingsPage from './pages/SettingsPage';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            } 
          />
          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;