import { useState } from "react";

interface Task {
  id: number;
  text: string;
  date: string;
}

export default function ActionModal({
  task,
  completeTask,
  editTask,
}: {
  task: Task;
  completeTask: () => void;
  editTask: (tsk: Task) => void;
}) {
  const [onEdit, setOnEdit] = useState(false);
  const [value, setValue] = useState(task.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEdit = () => {
    setOnEdit(true);
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
        {!onEdit ? (
          <>
            <p>Puedes editar o completar la tarea</p>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={completeTask}>Completar</button>
          </>
        ) : (
          <>
            <input
              className=""
              type="text"
              onChange={handleChange}
              value={value}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button className="" onClick={handleSubmit}>
              Guardar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
