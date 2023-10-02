import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../helpers/api"; // Importa la función updateTask
import CreateTaskModal from "./CreateTaskModal";
import Swal from "sweetalert2";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Estado para almacenar la tarea que se está editando

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await deleteTask(taskId);
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        Swal.fire("Eliminada", "La tarea ha sido eliminada", "success");
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        Swal.fire("Error", "Hubo un problema al eliminar la tarea", "error");
      }
    }
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? response.data.task : task
      );
      setTasks(updatedTasks);
      setIsModalOpen(false);
      setEditingTask(null);
      Swal.fire("Actualizada", "La tarea ha sido actualizada", "success");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      Swal.fire("Error", "Hubo un problema al actualizar la tarea", "error");
    }
  };

  return (
    <div className="tasks-container">
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditingTask(null); // Limpiar la tarea que se estaba editando
        }}
        className="btn-add"
      >
        Agregar Tarea
      </button>

      <div className="tasks-content">
        {tasks.length === 0 ? (
          <p className="no-tasks">No se han creado tareas</p>
        ) : (
          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id} className="task">
                <div className="task-header">
                  <div className="task-title">{task.title}</div>
                  <div
                    className="task-close"
                    onClick={() => handleTaskDelete(task.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <div className="task-body">{task.description}</div>
                <div className="task-footer">
                  <div
                    className="task-edit"
                    onClick={() => handleTaskEdit(task)} // Agregar funcionalidad de edición
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setEditingTask(null); // Limpiar la tarea que se estaba editando
        }}
        onTaskCreated={handleTaskCreated}
        editingTask={editingTask} // Pasa la tarea que se está editando al modal
        onTaskUpdate={handleTaskUpdate} // Pasa la función de actualización de tarea al modal
      />
    </div>
  );
};

export default ToDoList;
