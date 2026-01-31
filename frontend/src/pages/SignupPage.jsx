import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Campo obrigatório";

    if (!formData.email.trim()) newErrors.email = "Campo obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";

    if (!formData.password) newErrors.password = "Campo obrigatório";
    else if (formData.password.length < 6) newErrors.password = "A senha deve ter no mínimo 6 caracteres";

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Campo obrigatório";
    } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não conferem";
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        try {
          const { confirmPassword, ...userData } = formData;
          const payload = {
            ...userData,
            passwordConfirmed: formData.confirmPassword
          };
          payload.PasswordConfirmed = payload.passwordConfirmed;
          delete payload.passwordConfirmed;

          await userService.createUser(payload);
          navigate('/login');
        } catch (error) {
          if (error.response?.data?.errors) {
            const apiErrors = error.response.data.errors;
            const newErrors = {};

            Object.keys(apiErrors).forEach(key => {
              const fieldName = key.charAt(0).toLowerCase() + key.slice(1);
              if (apiErrors[key]?.[0]) {
                newErrors[fieldName] = apiErrors[key][0];
              }
              if (key === 'PasswordConfirmed' && apiErrors[key]?.[0]) {
                newErrors.confirmPassword = apiErrors[key][0];
              }
            });

            setErrors(prev => ({ ...prev, ...newErrors }));
          } else {
            setErrors(prev => ({ ...prev, general: 'Ocorreu um erro inesperado. Tente novamente.' }));
          }
        }
    }
  };

  const getInputClass = (fieldError) => {
    return `w-full px-4 py-2 rounded-lg border bg-background text-text-main 
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
            ${fieldError ? 'border-danger focus:ring-danger' : 'border-secondary'}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg bg-surface p-8 rounded-2xl shadow-lg border border-secondary/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-main mb-2">Crie sua conta</h1>
          <p className="text-text-muted">Comece a organizar suas tarefas hoje mesmo</p>
        </div>
        {errors.general && (
          <div className="mb-4 p-3 rounded bg-red-50 border border-danger/20 text-danger text-center text-sm">
            {errors.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Campo Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-main mb-1">
              Nome Completo
            </label>
            <input 
              type="text" 
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={getInputClass(errors.name)}
              placeholder="Ex: Charles Oliveira"
            />
            {/* Mensagem de Erro Condicional */}
            {errors.name && <span className="text-xs text-danger mt-1 block">{errors.name}</span>}
          </div>

          {/* Campo Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-main mb-1">
              Email
            </label>
            <input 
              type="email" 
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={getInputClass(errors.email)}
              placeholder="seu@email.com"
            />
            {errors.email && <span className="text-xs text-danger mt-1 block">{errors.email}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-main mb-1">
                Senha
              </label>
              <input 
                type="password" 
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={getInputClass(errors.password)}
                placeholder="••••••••"
              />
              {errors.password && <span className="text-xs text-danger mt-1 block">{errors.password}</span>}
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-main mb-1">
                Confirmar Senha
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={getInputClass(errors.confirmPassword)}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <span className="text-xs text-danger mt-1 block">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold 
                rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 mt-6"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}