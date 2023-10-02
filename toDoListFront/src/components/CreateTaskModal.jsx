import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { createTask, updateTask } from "../helpers/api"; // Importa las funciones de creación y actualización de tareas
import Swal from "sweetalert2";

Modal.setAppElement("#root"); // Establece el elemento raíz de la aplicación para el modal

const CreateTaskModal = ({
  isOpen,
  onRequestClose,
  onTaskCreated,
  editingTask,
  onTaskUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // useEffect para actualizar los campos cuando editingTask cambia
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleCreateOrUpdateTask = async () => {
    try {
      if (editingTask) {
        // Si estamos editando una tarea existente, actualízala
        const updatedTask = { ...editingTask, title, description };
        await updateTask(editingTask.id, updatedTask);
        onTaskUpdate(updatedTask);
      } else {
        // Si no estamos editando una tarea existente, crea una nueva
        const response = await createTask({ title, description });
        onTaskCreated(response.data.task);
        Swal.fire("Creada", "La tarea ha sido creada", "success");
      }

      setTitle("");
      setDescription("");
      onRequestClose();
    } catch (error) {
      console.error("Error al crear o actualizar la tarea:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={"modal-add"}
    >
      <div className="modal-content">
        <h2>{editingTask ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        <button onClick={handleCreateOrUpdateTask} className="btn-add">
          {editingTask ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </div>
    </Modal>
  );
};

CreateTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onTaskCreated: PropTypes.func.isRequired,
  editingTask: PropTypes.object, // Cambiamos el tipo de editingTask a un objeto (puede ser nulo si no estamos editando)
  onTaskUpdate: PropTypes.func.isRequired, // Agregamos PropTypes para la función onTaskUpdate
};

export default CreateTaskModal;
