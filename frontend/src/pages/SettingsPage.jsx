import { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userService } from '../services/userService';
import { Icons } from '../utils/Icons';

export default function SettingsPage() {
    const { user, setUser, logout } = useContext(AuthContext);
    
    // Estados do formulário
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    
    // Estados de UI
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeNav, setActiveNav] = useState('configuracoes');
    
    // Estado do Modal de Exclusão
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const navigate = useNavigate();

    // Lógica do Tema
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) return true;
        return false;
    });

    useEffect(() => {
        if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; } 
        else { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const handleLogout = () => { if (logout) { logout(); navigate('/login'); } };

    // Handler de update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const updated = await userService.updateUser({ name, email });
            setUser(updated);
            setSuccess(true);
        } catch (err) {
            setError('Erro ao atualizar perfil.');
        } finally {
            setLoading(false);
        }
    };

    // Função real de deletar (chamada pelo Modal)
    const confirmDeleteAccount = async () => {
        try {
            // await userService.deleteAccount(); 
            console.log('Conta deletada');
            handleLogout();
        } catch (err) {
            setError('Erro ao deletar conta');
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-200 relative">
            
            {/* --- MODAL DE CONFIRMAÇÃO --- */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setShowDeleteModal(false)}
                    />
                    <div className="relative bg-white dark:bg-[#202020] rounded-xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-[#2a2a2a] overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-500">
                                    <Icons.AlertTriangle size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Excluir conta permanentemente?
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados dos nossos servidores.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-[#252525] px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-[#2a2a2a]">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-[#333] border border-slate-300 dark:border-[#444] rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                            >
                                Sim, excluir conta
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button 
                className={`fixed top-4 left-4 z-50 p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-[#333] ${sidebarOpen ? 'md:hidden' : 'block'}`} 
                onClick={() => setSidebarOpen(true)}
            >
                <Icons.Menu />
            </button>

            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                activeNav={activeNav} 
                setActiveNav={setActiveNav} 
                user={user} 
                onLogout={handleLogout} 
                toggleTheme={toggleTheme} 
                isDarkMode={isDarkMode} 
            />

            <main className="flex-1 w-full mx-auto p-4 md:p-10 overflow-y-auto">
                <div className="max-w-2xl mx-auto space-y-6 mt-6 md:mt-0">
                    
                    <div className="flex flex-col gap-1 mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie suas informações pessoais e preferências.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* CARD: Informações Básicas */}
                        <div className="bg-white dark:bg-[#202020] rounded-xl border border-slate-200 dark:border-[#2a2a2a] p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-[11px]">Perfil</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nome</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#252525] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">E-mail</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#252525] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botão Salvar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                            <div className="text-sm">
                                {success && <span className="text-green-600 font-medium flex items-center gap-1"><Icons.CheckCircle size={16} /> Salvo com sucesso!</span>}
                                {error && <span className="text-red-500 font-medium">{error}</span>}
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </div>
                    </form>

                    {/* CARD: Zona de Perigo */}
                    <div className="mt-10 border-t border-slate-200 dark:border-[#2a2a2a] pt-8">
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-sm font-bold text-red-600 dark:text-red-400">Deletar Conta</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Esta ação é irreversível e excluirá todos os seus dados.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
                                className="px-4 py-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                            >
                                Excluir Conta
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}