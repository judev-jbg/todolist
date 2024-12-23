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
}: {
  task: Task;
  actionModal: ActionType;
  editTask: (tsk: Task) => void;
}) {
  const [value, setValue] = useState(task.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      setValue("");
      editTask({ ...task, text: value });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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
              <button className="button__border" onClick={handleSubmit}>
                Cancelar
              </button>
              <button className="button__border" onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </>
        )}
        {actionModal === 2 && (
          <>
            <h4>✔ Completar tarea</h4>
            <p>¿Desea completar la tarea?</p>
            <div className="button__container">
              <button className="button__border" onClick={handleSubmit}>
                Cancelar
              </button>
              <button className="button__border" onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
