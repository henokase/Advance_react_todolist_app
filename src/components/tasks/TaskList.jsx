import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';
import EmptyState from '../ui/EmptyState';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate, onReorder, filter }) => {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return a.order - b.order;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {sortedTasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
                isDragDisabled={task.completed}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1
                    }}
                  >
                    <TaskItem
                      task={task}
                      onToggle={onToggle}
                      onDelete={onDelete}
                      onUpdate={onUpdate}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList; 