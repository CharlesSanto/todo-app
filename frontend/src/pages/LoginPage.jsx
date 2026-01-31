import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login, signed } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      navigate("/");
    }
  }, [signed, navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Campo obrigatório";
    if (!password) newErrors.password = "Campo obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') {
      if (error) setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-lg border border-secondary/30">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">Bem-vindo</h1>
          <p className="text-text-muted">Faça login para organizar suas tarefas</p>
        </div>

        {/* Mostra o erro sempre que ele existir */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-danger/20 flex items-center gap-3 text-danger animate-pulse-once">
            <AlertIcon />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate={true}>
          
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(prev => ({...prev, email: ''}));
              }}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-2 rounded-lg border bg-background text-text-main 
                         focus:outline-none focus:ring-2 focus:ring-primary transition-all
                         ${(error || fieldErrors.email) ? 'border-danger focus:ring-danger' : 'border-secondary'}`} 
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
            {fieldErrors.email && <span className="text-xs text-danger mt-1 block">{fieldErrors.email}</span>}
          </div>

          <div>
             <label className="block text-sm font-medium text-text-main mb-1">Senha</label>
             <input 
               type="password"
               value={password}
               onChange={(e) => {
                 setPassword(e.target.value);
                 if (fieldErrors.password) setFieldErrors(prev => ({...prev, password: ''}));
               }}
               onKeyDown={handleKeyDown}
               className={`w-full px-4 py-2 rounded-lg border bg-background text-text-main 
                          focus:outline-none focus:ring-2 focus:ring-primary transition-all
                          ${(error || fieldErrors.password) ? 'border-danger focus:ring-danger' : 'border-secondary'}`}
               placeholder="••••••••"
               required
               disabled={loading}
             />
             {fieldErrors.password && <span className="text-xs text-danger mt-1 block">{fieldErrors.password}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition-all mt-6
              ${loading 
                ? 'bg-primary/70 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-hover active:scale-95'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <SpinnerIcon /> Entrando...
              </span>
            ) : "Entrar"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Não tem uma conta? <Link to="/signup" className="font-semibold text-primary hover:text-primary-hover">Crie agora</Link>
        </p>
      </div>
    </div>
  );
}