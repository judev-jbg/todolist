interface Task {
  _id?: string;
  text: string;
  createdAt?: string;
}

export default function Task({
  task,
  handleModal,
  getCurrentTask,
}: {
  task: Task;
  handleModal: () => void;
  getCurrentTask: (currentTask: Task) => void;
}) {
  const showModal = () => {
    handleModal();
    getCurrentTask(task);
  };

  return (
    <div className="itemTask" onClick={showModal}>
      <p>{task.text}</p>
    </div>
  );
}
