import { Icons } from '../utils/Icons';

export default function TodoItem({ todo, isOverdue, onEdit, onToggle, onDelete }) {
    
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const priorityLineColor = 
        todo.isCompleted ? 'bg-transparent' : 
        todo.priority === 3 ? 'bg-red-500' :   
        todo.priority === 2 ? 'bg-amber-500' : 
        todo.priority === 1 ? 'bg-blue-500' :  
        'bg-transparent'; 

    return (
        <div 
            onClick={(e) => { 
                if (e.target.closest('button') || e.target.closest('input')) return; 
                onEdit(todo); 
            }} 
            className={`group relative flex items-start gap-3 py-3 px-2 border-b border-slate-100 dark:border-[#2a2a2a] hover:bg-slate-50 dark:hover:bg-[#252525] transition-colors cursor-pointer ${todo.isCompleted ? 'opacity-50' : ''}`}
        >
            {todo.priority > 0 && !todo.isCompleted && (
                <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${priorityLineColor}`}></div>
            )}

            <button 
                onClick={() => onToggle(todo.id, todo.isCompleted)} 
                className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-full border transition-all duration-200 flex items-center justify-center
                    ${todo.isCompleted 
                        ? 'bg-slate-400 border-slate-400 dark:bg-slate-600 dark:border-slate-600 text-white' 
                        : 'bg-transparent border-slate-300 dark:border-slate-600 hover:border-blue-600 dark:hover:border-blue-500 text-transparent'
                    }`}
            >
                <Icons.Check />
            </button>
            
            <div className="flex-1 min-w-0">
                <h3 className={`text-[0.9rem] font-normal leading-snug text-slate-900 dark:text-slate-200 ${todo.isCompleted ? 'line-through decoration-slate-300 dark:decoration-slate-600' : ''}`}>
                    {todo.title}
                </h3>
                
                {todo.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-1 font-light break-words">
                        {truncateText(todo.description, 60)}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-2">
                    
                    {todo.tags && todo.tags.length > 0 && (
                        <div className="flex gap-1">
                            {todo.tags.map((tag, idx) => (
                                <span key={idx} className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#333] text-[10px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#444]">
                                    <Icons.Tag /> {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {todo.dueDate && (
                        <div className={`flex items-center gap-1 text-[10px] ${isOverdue && !todo.isCompleted ? 'text-red-500 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                            {new Date(todo.dueDate).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}
                        </div>
                    )}
                </div>
            </div>
            
            <button 
                onClick={() => onDelete(todo.id)} 
                className="text-slate-400 dark:text-slate-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all ml-2 opacity-0 group-hover:opacity-100"
                title="Excluir"
            >
                <Icons.Trash />
            </button>
        </div>
    );
}