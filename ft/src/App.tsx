import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import NewTask from "./components/NewTask";
import HeaderTask from "./components/HeaderTask";
import ActionModal from "./components/ActionModal";

interface Task {
  id: number;
  text: string;
  date: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTasks([
      { id: 1, text: "Task 1", date: "2024/11/01 21:18:16" },
      {
        id: 2,
        text: "Taskik 2",
        date: "2024/11/15 10:01:01",
      },
      { id: 3, text: "Task 3", date: "2024/12/01 15:23:25" },
    ]);
  }, []);

  const getLastId = () => tasks[tasks.length - 1].id;

  const getCurrentTask = (currentTask: Task) => {
    setTask(currentTask);
  };

  const addTask = (newItem: Task) => {
    setTasks((prevTasks) => [...prevTasks, newItem]);
  };

  const completeTask = () => {
    setTasks(tasks.filter((tsk) => tsk.id !== task!.id));
    handleModal();
  };

  const editTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((tsk) =>
        tsk.id === task!.id
          ? {
              ...tsk,
              text: updatedTask!.text,
            }
          : tsk
      )
    );
    handleModal();
  };

  const tasksSort = tasks.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div>
        <HeaderTask counter={tasks.length} />
        <div className="tasks__container">
          {tasksSort.map((task, i) => (
            <Task
              key={i}
              task={task}
              handleModal={handleModal}
              getCurrentTask={getCurrentTask}
            />
          ))}
        </div>
      </div>
      <NewTask onAddTask={addTask} getLastId={getLastId} />
      {isModalOpen && (
        <ActionModal
          task={task!}
          completeTask={completeTask}
          editTask={editTask}
        />
      )}
    </>
  );
}

export default App;
