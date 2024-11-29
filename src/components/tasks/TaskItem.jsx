import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Circle,
    Trash2,
    GripVertical,
    Edit2,
    X,
} from "lucide-react";
import useTasks from "../../hooks/useTasks";

const TaskItem = ({ task, onToggle, onDelete, onUpdate, dragHandleProps }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const inputRef = useRef(null);
    const { categories } = useTasks();

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedText(task.text);
    };

    const handleSave = () => {
        if (editedText.trim()) {
            onUpdate(task.id, { text: editedText.trim() });
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setEditedText(task.text);
        }
    };

    const category =
        categories.find((c) => c.id === task.categoryId) || categories[3]; // default to 'other'

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                task.completed
                    ? "bg-gray-50 border-gray-100"
                    : "bg-white border-gray-200 hover:border-blue-200"
            }`}
        >
            <div
                {...dragHandleProps}
                className="cursor-grab active:cursor-grabbing text-gray-400"
            >
                <GripVertical size={20} />
            </div>

            <button
                onClick={() => onToggle(task.id)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label={
                    task.completed ? "Mark as incomplete" : "Mark as complete"
                }
            >
                {task.completed ? (
                    <CheckCircle2 className="text-green-500 h-6 w-6" />
                ) : (
                    <Circle className="h-6 w-6" />
                )}
            </button>

            <div className="flex-1">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="w-full px-2 py-1 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                ) : (
                    <div className="flex items-center gap-2">
                        <span
                            className={`flex-1 ${
                                task.completed
                                    ? "line-through text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            {task.text}
                        </span>
                        <span
                            className="px-2 py-1 text-xs rounded-full font-medium"
                            style={{
                                backgroundColor: `${category.color}20`,
                                color: category.color,
                            }}
                        >
                            {category.label}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                {!task.completed && (
                    <button
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-lg hover:bg-blue-50"
                        aria-label="Edit task"
                    >
                        {isEditing ? <X size={20} /> : <Edit2 size={20} />}
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                    aria-label="Delete task"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default TaskItem;
