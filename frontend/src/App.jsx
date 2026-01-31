import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';

function PrivateRoute({ children }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    // Detecta tema do usuário
    const isDark = (localStorage.theme === 'dark') || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        background: isDark ? '#121212' : '#fff',
        transition: 'background 0.2s',
      }} />
    );
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