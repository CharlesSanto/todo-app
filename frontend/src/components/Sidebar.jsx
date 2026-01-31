import { Icons } from '../utils/Icons';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeNav, setActiveNav, user, onLogout, toggleTheme, isDarkMode }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const navItems = [
        { id: 'hoje', label: 'Hoje', icon: <Icons.Sun /> },
        { id: 'proximos', label: 'Próximos', icon: <Icons.Calendar /> },
        { id: 'concluidas', label: 'Histórico', icon: <Icons.CheckCircle /> },
        { id: 'estatisticas', label: 'Estatísticas', icon: <Icons.BarChart /> },
        { id: 'configuracoes', label: 'Configurações', icon: <Icons.Settings /> },
    ];

    const handleNavigation = (itemId) => {
        setActiveNav(itemId);

        if (itemId === 'configuracoes') {
            navigate('/configuracoes');
        } else {
            navigate('/', { state: { activeNav: itemId } });
        }

        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#202020] border-r border-slate-200 dark:border-[#2a2a2a] text-sm transition-colors duration-200">
            <div className="flex items-center justify-between p-5 pb-2">
                <div className="flex items-center gap-2.5">
                    <div className="text-blue-600 dark:text-blue-500">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">TodoApp</span>
                </div>
                <button 
                    onClick={() => setSidebarOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1 rounded hover:bg-slate-200/50 dark:hover:bg-[#333] transition-colors"
                >
                    <div className="md:hidden"><Icons.Close /></div>
                    <div className="hidden md:block"><Icons.PanelLeftClose /></div>
                </button>
            </div>

            <div className="px-3 flex-1 mt-6">
                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item.id)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-all duration-200 group
                                ${activeNav === item.id 
                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 font-medium' 
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#2a2a2a] dark:hover:text-slate-200 font-normal'
                                }`}
                        >
                            <span className={activeNav === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300'}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-[#2a2a2a]">
                <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded bg-slate-200 dark:bg-[#333] text-slate-500 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[80px] group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {user?.name || 'Dev'}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                        <button onClick={toggleTheme} className="text-slate-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#333]" title="Alterar tema">
                            {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                        </button>
                        
                        <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-slate-100 dark:hover:bg-[#333]" title="Sair">
                            <Icons.Logout />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className={`hidden md:block h-screen sticky top-0 transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-[#2a2a2a] overflow-hidden ${sidebarOpen ? 'w-64' : 'w-0'}`}>
                <SidebarContent />
            </div>
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/20 dark:bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                <aside className={`absolute inset-y-0 left-0 w-64 bg-white dark:bg-[#202020] shadow-xl transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <SidebarContent />
                </aside>
            </div>
        </>
    );
}