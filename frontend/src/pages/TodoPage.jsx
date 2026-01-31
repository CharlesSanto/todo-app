import { useContext, useState, useEffect, useCallback, useRef } from 'react';
const SpinnerIcon = () => (
    <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
import { AuthContext } from '../context/AuthContext';
import { todoService } from '../services/todoService';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TodoItem from '../components/TodoItem';
import { Icons } from '../utils/Icons';

const CustomDatePicker = ({ selectedDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date());
    const containerRef = useRef(null);
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const getDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1); const days = []; const firstDayOfWeek = date.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
        while (date.getMonth() === month) { days.push(new Date(date)); date.setDate(date.getDate() + 1); } return days;
    };
    const days = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    useEffect(() => {
        const handleClickOutside = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false); };
        document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSelectDay = (date) => { onChange(date.toLocaleDateString('en-CA')); setIsOpen(false); };
    const formatDateDisplay = (isoDate) => {
        if (!isoDate) return 'Data de vencimento'; const date = new Date(isoDate + 'T00:00:00');
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    };
    return (
        <div className="relative" ref={containerRef}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#333] transition-colors text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 w-full">
                <Icons.Calendar /> {formatDateDisplay(selectedDate)}
            </button>
            {isOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-64 bg-white dark:bg-[#2C2C2C] rounded-lg shadow-xl border border-slate-200 dark:border-[#444] z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200 capitalize">{months[viewDate.getMonth()]} de {viewDate.getFullYear()}</span>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"><Icons.ArrowUp /></button>
                            <button type="button" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"><Icons.ArrowDown /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">{weekDays.map(d => <span key={d} className="text-xs font-medium text-slate-400 dark:text-slate-500">{d}</span>)}</div>
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => {
                            if (!day) return <div key={idx} />; const isSelected = selectedDate === day.toLocaleDateString('en-CA');
                            return (<button key={idx} type="button" onClick={() => handleSelectDay(day)} className={`h-8 w-8 text-xs rounded flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#3e3e3e]'}`}>{day.getDate()}</button>);
                        })}
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t border-slate-100 dark:border-[#3e3e3e]">
                        <button type="button" onClick={() => {onChange(''); setIsOpen(false)}} className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Limpar</button>
                        <button type="button" onClick={() => handleSelectDay(new Date())} className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700">Hoje</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PriorityDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false); const dropdownRef = useRef(null);
    const priorities = [{ value: 3, label: 'Prioridade 1', color: 'text-red-500', iconColor: 'text-red-500' }, { value: 2, label: 'Prioridade 2', color: 'text-amber-500', iconColor: 'text-amber-500' }, { value: 1, label: 'Prioridade 3', color: 'text-blue-500', iconColor: 'text-blue-500' }, { value: 0, label: 'Prioridade 4', color: 'text-slate-500', iconColor: 'text-slate-400' }];
    const selected = priorities.find(p => p.value === value) || priorities[3];
    useEffect(() => { const handleClickOutside = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false); }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
    return (
        <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#333] hover:bg-slate-50 dark:hover:bg-[#333] transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"><span className={selected.iconColor}><Icons.Flag /></span> {selected.label}</button>
            {isOpen && (<div className="absolute bottom-full mb-1 left-0 w-44 bg-white dark:bg-[#2C2C2C] rounded-lg shadow-xl border border-slate-200 dark:border-[#444] z-50 overflow-hidden py-1">{priorities.map((p) => (<button key={p.value} type="button" onClick={() => { onChange(p.value); setIsOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-[#3e3e3e] transition-colors text-left group"><span className={p.iconColor}><Icons.Flag /></span><span className="text-slate-700 dark:text-slate-200">{p.label}</span>{value === p.value && <span className="ml-auto text-red-500"><Icons.Check /></span>}</button>))}</div>)}
        </div>
    );
};

const WeekStrip = ({ currentDate, onDateSelect }) => {
    const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(currentDate); d.setDate(currentDate.getDate() - 3 + i); return d; });
    const todayStr = new Date().toLocaleDateString('en-CA');
    return (
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#333] pb-2 mb-6 text-sm select-none">
            {days.map((date, idx) => {
                const isoDate = date.toLocaleDateString('en-CA'); const isToday = isoDate === todayStr; const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''); const dayNum = date.getDate();
                return (<button key={isoDate} onClick={() => onDateSelect(isoDate)} className={`flex flex-col items-center gap-1 min-w-[3rem] pb-1 cursor-pointer transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-[#252525] py-1 ${isToday ? 'font-bold' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}><span className="text-[10px] uppercase tracking-wide">{dayName}</span><span className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm ${isToday ? 'bg-red-500 text-white shadow-md' : 'text-slate-700 dark:text-slate-300'}`}>{dayNum}</span></button>);
            })}
        </div>
    );
};

const ProductivityChart = ({ todos }) => {
    const [range, setRange] = useState('7d');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const getChartData = () => {
        let start = new Date();
        let end = new Date();
        let groupBy = 'day';

        if (range === '7d') {
            start.setDate(end.getDate() - 6);
        } else if (range === '30d') {
            start.setDate(end.getDate() - 29);
        } else if (range === '1y') {
            start.setFullYear(end.getFullYear() - 1);
            start.setDate(1); 
            groupBy = 'month';
        } else if (range === 'custom') {
            if (!customStart || !customEnd) return [];
            start = new Date(customStart + 'T00:00:00');
            end = new Date(customEnd + 'T00:00:00');
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if (diffDays > 60) groupBy = 'month';
        }

        const dataPoints = [];
        let current = new Date(start);

        while (current <= end) {
            let label = '';
            let count = 0;
            let isoCheck = '';

            if (groupBy === 'day') {
                isoCheck = current.toISOString().split('T')[0];
                label = current.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                count = todos.filter(t => t.isCompleted && t.dueDate && t.dueDate.startsWith(isoCheck)).length;
                current.setDate(current.getDate() + 1);
            } else {
                isoCheck = current.toISOString().slice(0, 7);
                label = current.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
                count = todos.filter(t => t.isCompleted && t.dueDate && t.dueDate.startsWith(isoCheck)).length;
                current.setMonth(current.getMonth() + 1);
            }
            dataPoints.push({ label, count, fullDate: isoCheck });
        }
        return dataPoints;
    };

    const data = getChartData();
    const maxCount = Math.max(...data.map(d => d.count), 1);
    const totalTasks = data.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <div className="bg-white dark:bg-[#202020] rounded-2xl p-6 border border-slate-200 dark:border-[#333] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Produtividade</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-500">{totalTasks}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold">Concluídas</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['7d', '30d', '1y', 'custom'].map((r) => (
                        <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${range === r ? 'bg-blue-600 text-white border-blue-600 dark:border-blue-500 dark:bg-blue-500' : 'bg-white dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#444] hover:bg-slate-50 dark:hover:bg-[#333]'}`}>
                            {r === '7d' ? '7 Dias' : r === '30d' ? '30 Dias' : r === '1y' ? '1 Ano' : 'Personalizado'}
                        </button>
                    ))}
                </div>
            </div>

            {range === 'custom' && (
                <div className="flex items-center gap-2 mb-6 bg-slate-50 dark:bg-[#252525] p-3 rounded-lg border border-slate-100 dark:border-[#333]">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1 ml-1">Início</p>
                        <CustomDatePicker selectedDate={customStart} onChange={setCustomStart} />
                    </div>
                    <span className="text-slate-300 dark:text-slate-600 mt-4 mx-1">➜</span>
                    <div className="flex-1">
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-1 ml-1">Fim</p>
                        <CustomDatePicker selectedDate={customEnd} onChange={setCustomEnd} />
                    </div>
                </div>
            )}

            <div className="h-48 w-full flex gap-1 overflow-x-auto pb-2 scrollbar-hide"> 
                {data.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm italic border-2 border-dashed border-slate-100 dark:border-[#333] rounded-lg">
                        {range === 'custom' ? 'Selecione as datas acima' : 'Sem dados para o período'}
                    </div>
                ) : (
                    data.map((item, idx) => {
                        const heightPercentage = Math.max((item.count / maxCount) * 100, 5); 
                        const isToday = item.fullDate === new Date().toISOString().split('T')[0];
                        const showLabel = data.length > 15 ? idx % Math.ceil(data.length / 10) === 0 : true;

                        return (
                            <div key={idx} className="flex flex-col items-center flex-1 h-full min-w-[20px] group">
                                <div className="relative w-full flex items-end justify-center flex-1 pb-2">
                                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg">
                                        {item.count} tarefas em {item.label}
                                    </div>
                                    <div style={{ height: `${heightPercentage}%` }} className={`w-full max-w-[40px] rounded-t-[4px] transition-all duration-500 ease-out relative ${isToday ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-[#404040] hover:bg-blue-400 dark:hover:bg-blue-600'}`}></div>
                                </div>
                                <div className="h-4 flex items-center justify-center w-full">
                                    <span className={`text-[9px] uppercase font-medium text-slate-400 dark:text-slate-500 truncate w-full text-center ${!showLabel ? 'invisible' : ''}`}>
                                        {item.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default function TodoPage() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState(() => {
        const cached = localStorage.getItem('todos_cache');
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch {
                return [];
            }
        }
        return [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [titleError, setTitleError] = useState(''); 
    const [isOverdueOpen, setIsOverdueOpen] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState({}); 
    const [expandedDays, setExpandedDays] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    
    const [activeNav, setActiveNav] = useState(() => location.state?.activeNav || 'hoje');

    const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', priority: 0 });
    const [stripDate, setStripDate] = useState(new Date());

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) return true;
        return false;
    });

    useEffect(() => {
        if (isDarkMode) { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; } 
        else { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const isTodosChanged = (oldTodos, newTodos) => {
        return JSON.stringify(oldTodos) !== JSON.stringify(newTodos);
    };

    const fetchData = useCallback(async (force = false) => {
        setLoading(true);
        try {
            if (!force) {
                const cached = localStorage.getItem('todos_cache');
                const cachedTime = localStorage.getItem('todos_cache_time');
                if (cached && cachedTime) {
                    const now = Date.now();
                    if (now - Number(cachedTime) < 60000) {
                        setTodos(JSON.parse(cached));
                        setLoading(false);
                        return;
                    }
                }
            }
            const todosData = await todoService.getTodos();
            const cached = localStorage.getItem('todos_cache');
            if (!cached || isTodosChanged(JSON.parse(cached), todosData)) {
                localStorage.setItem('todos_cache', JSON.stringify(todosData));
                localStorage.setItem('todos_cache_time', Date.now().toString());
            }
            setTodos(todosData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) return;
        const cached = localStorage.getItem('todos_cache');
        const cachedTime = localStorage.getItem('todos_cache_time');
        const now = Date.now();
        if (cached && cachedTime && now - Number(cachedTime) < 60000) {
            setTodos(JSON.parse(cached));
            setLoading(false);
        } else {
            fetchData();
        }
    }, [isAuthenticated, fetchData, activeNav]);

    const handleLogout = () => { if (logout) { logout(); navigate('/login'); } };
    const toggleDay = (dateStr) => { setExpandedDays(prev => ({ ...prev, [dateStr]: !prev[dateStr] })); };
    const toggleGroup = (groupName) => { setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] })); };
    const handlePrevWeek = () => { const newDate = new Date(stripDate); newDate.setDate(stripDate.getDate() - 7); setStripDate(newDate); };
    const handleNextWeek = () => { const newDate = new Date(stripDate); newDate.setDate(stripDate.getDate() + 7); setStripDate(newDate); };
    const handleResetToToday = () => { setStripDate(new Date()); scrollToDate(new Date().toLocaleDateString('en-CA')); };
    const scrollToDate = (dateStr) => { const element = document.getElementById(`group-${dateStr}`); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); setExpandedDays(prev => ({ ...prev, [dateStr]: true })); } };

    const openCreateModal = (preFilledDate = null) => { setEditingTodoId(null); const defaultDate = preFilledDate || new Date().toISOString().split('T')[0]; setFormData({ title: '', description: '', dueDate: defaultDate, priority: 0 }); setIsModalOpen(true); };
    const openEditModal = (todo) => { setEditingTodoId(todo.id); setFormData({ title: todo.title, description: todo.description || '', dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '', priority: todo.priority }); setIsModalOpen(true); };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setTitleError('O título é obrigatório.');
            return;
        }
        try {
            const dueDateUtc = formData.dueDate ? new Date(formData.dueDate + 'T00:00:00').toISOString() : null;
            const payload = { ...formData, description: formData.description || '', priority: parseInt(formData.priority), dueDate: dueDateUtc, TagIds: [] };
            setIsModalOpen(false);
            if (editingTodoId) {
                setTodos(prev => {
                    const updated = prev.map(t => t.id === editingTodoId ? { ...t, ...payload } : t);
                    localStorage.setItem('todos_cache', JSON.stringify(updated));
                    localStorage.setItem('todos_cache_time', Date.now().toString());
                    return updated;
                });
                await todoService.updateTodo(editingTodoId, payload);
            } else {
                const tempId = 'temp-' + Date.now();
                const optimisticTodo = { ...payload, id: tempId, isCompleted: false };
                setTodos(prev => {
                    const updated = [optimisticTodo, ...prev];
                    localStorage.setItem('todos_cache', JSON.stringify(updated));
                    localStorage.setItem('todos_cache_time', Date.now().toString());
                    return updated;
                });
                try {
                    const created = await todoService.createTodo(payload);
                    setTodos(prev => {
                        const updated = prev.map(t => t.id === tempId ? { ...created } : t);
                        localStorage.setItem('todos_cache', JSON.stringify(updated));
                        localStorage.setItem('todos_cache_time', Date.now().toString());
                        return updated;
                    });
                } catch (err) {
                    setTodos(prev => {
                        const updated = prev.filter(t => t.id !== tempId);
                        localStorage.setItem('todos_cache', JSON.stringify(updated));
                        localStorage.setItem('todos_cache_time', Date.now().toString());
                        return updated;
                    });
                    throw err;
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
        try {
            await todoService.deleteTodo(id);
            localStorage.setItem('todos_cache', JSON.stringify(todos.filter(t => t.id !== id)));
            localStorage.setItem('todos_cache_time', Date.now().toString());
        } catch (error) {
            await fetchData(true);
            console.error(error);
        }
    };

    const handleToggleComplete = async (todoId, currentValue) => {
        setTodos(prev => prev.map(t => t.id === todoId ? { ...t, isCompleted: !currentValue } : t));
        try {
            await todoService.updateTodo(todoId, { isCompleted: !currentValue });
            localStorage.setItem('todos_cache', JSON.stringify(todos.map(t => t.id === todoId ? { ...t, isCompleted: !currentValue } : t)));
            localStorage.setItem('todos_cache_time', Date.now().toString());
        } catch (error) {
            await fetchData(true);
            console.error(error);
        }
    };

    const todayStr = new Date().toISOString().split('T')[0];
    const sortTodos = (list) => list.sort((a, b) => { const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0; const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0; if (dateA !== dateB) return dateA - dateB; return (b.priority ?? 0) - (a.priority ?? 0); });
    const completedList = sortTodos(todos.filter(t => t.isCompleted));
    const groupedCompletedTodos = completedList.reduce((groups, todo) => { const date = todo.dueDate ? new Date(todo.dueDate) : new Date(); const monthYear = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }); const formattedGroup = monthYear.charAt(0).toUpperCase() + monthYear.slice(1); if (!groups[formattedGroup]) groups[formattedGroup] = []; groups[formattedGroup].push(todo); return groups; }, {});
    const { overdueTodos, currentTodos } = todos.reduce((acc, todo) => { if (!todo.dueDate || todo.isCompleted) return acc; const todoDate = new Date(todo.dueDate).toISOString().split('T')[0]; if (todoDate < todayStr) acc.overdueTodos.push(todo); else { if (activeNav === 'hoje' && todoDate === todayStr) acc.currentTodos.push(todo); else if (activeNav === 'proximos' && todoDate >= todayStr) acc.currentTodos.push(todo); } return acc; }, { overdueTodos: [], currentTodos: [] });
    const sortedOverdue = sortTodos(overdueTodos); const sortedCurrent = sortTodos(currentTodos);
    const totalCount = activeNav === 'concluidas' ? completedList.length : sortedOverdue.length + sortedCurrent.length;
    const generateNextDays = () => Array.from({ length: 365 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toISOString().split('T')[0]; });
    const getDetailedDateHeader = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00'); const today = new Date(); today.setHours(0,0,0,0); const tomorrow = new Date(); tomorrow.setDate(today.getDate() + 1); tomorrow.setHours(0,0,0,0);
        const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''); const day = date.getDate(); const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' }); const weekdayCap = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        let relative = ''; if (dateStr === today.toISOString().split('T')[0]) relative = ' • Hoje'; else if (dateStr === tomorrow.toISOString().split('T')[0]) relative = ' • Amanhã';
        return (<div className="flex items-baseline gap-1 text-sm border-b border-slate-100 dark:border-[#333] pb-2 mb-2 w-full"><span className="font-bold text-slate-800 dark:text-slate-200">{month} {day}</span>{(relative || relative === '') && <span className={`font-medium ${relative ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>{relative}</span>}<span className="text-slate-400 dark:text-slate-500"> • {weekdayCap}</span></div>);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-[#121212] transition-colors duration-200">
            <button className={`fixed top-4 left-4 z-50 p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-[#333] ${sidebarOpen ? 'md:hidden' : 'block'}`} onClick={() => setSidebarOpen(true)}><Icons.Menu /></button>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={handleLogout} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

            <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:px-16 md:py-12 overflow-y-auto">
                {activeNav === 'estatisticas' ? (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Estatísticas</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Acompanhe seu progresso ao longo da semana.</p>
                        </div>
                        <ProductivityChart todos={todos} />
                    </div>
                ) : activeNav === 'proximos' ? (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Em breve</h2>
                            <div className="flex items-center gap-2"><span className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] px-3 py-1 rounded hover:bg-slate-50 dark:hover:bg-[#333] cursor-pointer flex items-center gap-2 capitalize">{stripDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</span><div className="flex bg-white dark:bg-[#202020] border border-slate-200 dark:border-[#333] rounded"><button onClick={handlePrevWeek} className="p-1.5 hover:bg-slate-50 dark:hover:bg-[#333] text-slate-500 border-r border-slate-200 dark:border-[#333]"><Icons.ChevronLeft /></button><button onClick={handleResetToToday} className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#333]">Hoje</button><button onClick={handleNextWeek} className="p-1.5 hover:bg-slate-50 dark:hover:bg-[#333] text-slate-500 border-l border-slate-200 dark:border-[#333]"><Icons.ChevronRight /></button></div></div>
                        </div>
                        <WeekStrip currentDate={stripDate} onDateSelect={scrollToDate} />
                    </div>
                ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{activeNav === 'hoje' ? 'Hoje' : 'Histórico'}</h2>
                            {activeNav !== 'concluidas' && totalCount > 0 && (<div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal"><Icons.CheckCircle /><span>{totalCount} {totalCount === 1 ? 'tarefa' : 'tarefas'}</span></div>)}
                        </div>
                        {activeNav !== 'concluidas' && (
                            <button onClick={() => openCreateModal()} className="bg-[#4F46E5] hover:bg-[#4338ca] text-white pl-4 pr-5 py-2 rounded-full shadow-lg shadow-indigo-200/50 dark:shadow-none font-semibold transition-all flex items-center gap-2 active:scale-95 group"><span className="opacity-80 group-hover:opacity-100 transition-opacity"><Icons.PlusSmall /></span> Nova Tarefa</button>
                        )}
                    </div>
                )}

                                {loading && todos.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-32">
                                        <SpinnerIcon />
                                    </div>
                                ) : (
                    <div className="space-y-10">
                        {activeNav === 'estatisticas' ? null : activeNav === 'concluidas' ? (
                            <div>
                                {Object.keys(groupedCompletedTodos).length === 0 ? <p className="text-slate-500 dark:text-slate-400 text-center py-10 font-light text-sm">Sem tarefas concluídas.</p> : 
                                    Object.entries(groupedCompletedTodos).map(([groupName, groupTasks]) => {
                                        const isExpanded = expandedGroups[groupName];
                                        return (
                                            <div key={groupName} className="mb-4">
                                                <button onClick={() => toggleGroup(groupName)} className="flex items-center gap-2 w-full text-left border-b border-slate-200 dark:border-[#333] pb-2 mb-2 group hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors rounded px-1">
                                                    <span className="text-slate-400">{isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}</span>
                                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{groupName}</span>
                                                    <span className="ml-auto text-xs text-slate-400 font-normal">{groupTasks.length} concluídas</span>
                                                </button>
                                                {isExpanded && (
                                                    <div className="animate-in slide-in-from-top-2 duration-200 pl-2">
                                                        {groupTasks.map(todo => <TodoItem key={todo.id} todo={todo} isOverdue={false} onEdit={openEditModal} onToggle={handleToggleComplete} onDelete={handleDelete} />)}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : activeNav === 'proximos' ? (
                            <div className="space-y-8">
                                {generateNextDays().map((dateStr) => {
                                    const tasksForDay = currentTodos.filter(t => new Date(t.dueDate).toISOString().split('T')[0] === dateStr);
                                    const isExpanded = expandedDays[dateStr];
                                    return (
                                        <div key={dateStr} id={`group-${dateStr}`} className="group/day scroll-mt-32">
                                            <button onClick={() => toggleDay(dateStr)} className="flex items-center gap-2 w-full text-left border-b border-slate-200 dark:border-[#333] pb-2 mb-2 group hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors rounded px-1">
                                                <span className="text-slate-400">{isExpanded ? <Icons.ChevronDown /> : <Icons.ChevronRight />}</span>
                                                {getDetailedDateHeader(dateStr).props.children}
                                                <span className="ml-auto text-xs text-slate-400 font-normal">{tasksForDay.length} tarefas</span>
                                            </button>
                                            {isExpanded && (
                                                <div className="animate-in slide-in-from-top-2 duration-200">
                                                    <div className="space-y-0 mb-2">
                                                        {tasksForDay.map(todo => <TodoItem key={todo.id} todo={todo} isOverdue={false} onEdit={openEditModal} onToggle={handleToggleComplete} onDelete={handleDelete} />)}
                                                    </div>
                                                    <button onClick={() => openCreateModal(dateStr)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm w-full text-left py-1 opacity-60 hover:opacity-100">
                                                        <span className="text-blue-600 dark:text-blue-400 text-lg leading-none pb-0.5 ml-0.5">+</span><span className="font-normal text-sm">Adicionar tarefa</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <>
                                {activeNav === 'hoje' && sortedOverdue.length > 0 && (
                                    <div className="mb-6">
                                        <button onClick={() => setIsOverdueOpen(!isOverdueOpen)} className="flex items-center gap-2 text-red-600 font-medium text-sm mb-2 hover:bg-red-50 dark:hover:bg-[#333] p-2 rounded w-full text-left transition-colors">{isOverdueOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />} Atrasadas <span className="text-xs text-red-400 ml-1 font-normal">{sortedOverdue.length}</span></button>
                                        {isOverdueOpen && <div className="space-y-0">{sortedOverdue.map(todo => <TodoItem key={todo.id} todo={todo} isOverdue={true} onEdit={openEditModal} onToggle={handleToggleComplete} onDelete={handleDelete} />)}</div>}
                                    </div>
                                )}
                                {sortedCurrent.length === 0 && sortedOverdue.length === 0 ? <div className="text-center py-20"><div className="w-16 h-16 bg-slate-100 dark:bg-[#202020] rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600"><Icons.Sun /></div><p className="text-slate-500 dark:text-slate-400 text-sm font-light">Tudo limpo por hoje.</p></div> : <div className="space-y-0">{sortedCurrent.map(todo => <TodoItem key={todo.id} todo={todo} isOverdue={false} onEdit={openEditModal} onToggle={handleToggleComplete} onDelete={handleDelete} />)}</div>}
                            </>
                        )}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/20 dark:bg-black/60 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-[#2C2C2C] rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <input type="text" name="title" value={formData.title} onChange={(e) => {setFormData({...formData, title: e.target.value}); setTitleError('')}} className="w-full text-xl font-semibold placeholder-slate-300 dark:placeholder-slate-500 border-none outline-none focus:ring-0 p-0 text-slate-900 dark:text-white bg-transparent" placeholder="Nome da tarefa" required autoFocus />
                                {titleError && <span className="text-xs text-red-500">{titleError}</span>}
                                <textarea name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full text-sm text-slate-500 dark:text-slate-400 placeholder-slate-300 dark:placeholder-slate-500 border-none outline-none focus:ring-0 p-0 resize-none h-24 bg-transparent" placeholder="Descrição" />
                                <div className="flex gap-2 pt-2 items-center">
                                    <div className="relative w-40"><CustomDatePicker selectedDate={formData.dueDate} onChange={(val) => setFormData({...formData, dueDate: val})} /></div>
                                    <PriorityDropdown value={formData.priority} onChange={(val) => setFormData({...formData, priority: val})} />
                                </div>
                                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-[#444] mt-2">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white dark:bg-[#333] hover:bg-slate-50 dark:hover:bg-[#444] rounded-lg text-xs font-medium text-slate-500 dark:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-[#555]">Cancelar</button>
                                    <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338ca] transition-colors shadow-md shadow-indigo-100 dark:shadow-none disabled:opacity-50" disabled={!formData.title}>Adicionar tarefa</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}