import { useState } from "react";

interface Task {
  _id?: string;
  text: string;
  createdAt?: string;
}

type ActionType = 0 | 1 | 2;

export default function ActionModal({
  task,
  actionModal,
  editTask,
  completeTask,
  handleModal,
}: {
  task: Task;
  actionModal: ActionType;
  editTask: (tsk: Task) => void;
  completeTask: (completedTask: Task) => void;
  handleModal: (actionSwipe: ActionType) => void;
}) {
  const [value, setValue] = useState(task.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEdit = () => {
    if (value.trim()) {
      setValue("");
      editTask({ ...task, text: value });
    }
  };

  const handleComplete = () => {
    completeTask(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
    }
  };

  const anulateAction = () => {
    handleModal(0);
  };

  return (
    <div className="modalTask__container">
      <div className="modalTask">
        {actionModal === 1 && (
          <>
            <h4>✏ Actualizar tarea</h4>
            <input
              className="input"
              type="text"
              onChange={handleChange}
              value={value}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="button__container">
              <button className="button__border" onClick={anulateAction}>
                Cancelar
              </button>
              <button className="button__solid" onClick={handleEdit}>
                Guardar
              </button>
            </div>
          </>
        )}
        {actionModal === 2 && (
          <>
            <h4>✔ Completar tarea</h4>
            <p className="questrion__popup">¿Desea completar la tarea?</p>
            <div className="button__container">
              <button className="button__border" onClick={anulateAction}>
                Cancelar
              </button>
              <button className="button__solid" onClick={handleComplete}>
                Completar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
