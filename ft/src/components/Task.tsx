import { useState } from "react";

interface Task {
  _id?: string;
  text: string;
  createdAt?: string;
}

type ActionType = 0 | 1 | 2;

export default function Task({
  task,
  handleModal,
  getCurrentTask,
}: {
  task: Task;
  handleModal: (actionSwipe: ActionType) => void;
  getCurrentTask: (currentTask: Task) => void;
}) {
  const [startX, setStartX] = useState(0); // Posición inicial del toque
  const [translateX, setTranslateX] = useState(0); // Desplazamiento actual
  const [isSwiping, setIsSwiping] = useState(false); // Indica si está deslizando

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };
  const handleMouseStart = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX; // Diferencia de posición
    setTranslateX(diffX);

    if (diffX > 150) {
      showModal(2);
      console.log("Completar tarea"); // Editar si desliza a la derecha
    } else if (diffX < -150) {
      showModal(1);
      console.log("Editar tarea"); // Completar si desliza a la izquierda
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    const currentX = e.clientX;
    const diffX = currentX - startX; // Diferencia de posición
    setTranslateX(diffX);

    if (diffX > 150) {
      showModal(2);
      console.log("Completar tarea"); // Editar si desliza a la derecha
    } else if (diffX < -150) {
      showModal(1);
      console.log("Editar tarea"); // Completar si desliza a la izquierda
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
    setTranslateX(0);
  };

  const showModal = (actionSwipe: ActionType) => {
    handleModal(actionSwipe);
    getCurrentTask(task);
    handleTouchEnd();
  };

  return (
    <div className="task__container">
      <div
        className="itemTask"
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseStart}
        onTouchMove={handleTouchMove}
        onMouseMove={handleMouseMove}
        onTouchEnd={handleTouchEnd}
        onMouseUp={handleTouchEnd}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease",
        }}
      >
        <p>{task.text}</p>
      </div>
      <div className="itemTask__action">
        <div>✔</div>
        <div>✏</div>
      </div>
    </div>
  );
}
