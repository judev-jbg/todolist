import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import NewTask from "./components/NewTask";
import HeaderTask from "./components/HeaderTask";
import ActionModal from "./components/ActionModal";
import api from "./services/api";

interface Task {
  _id?: string;
  text: string;
  createdAt?: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.payload);
      } catch (error) {
        console.error("Error al obtener las tareas: ", error);
      }
    };
    fetchTasks();
  }, []);

  const getCurrentTask = (currentTask: Task) => {
    setTask(currentTask);
  };

  const addTask = async (newItem: Task) => {
    const response = await api.post("/task", { text: newItem.text });
    setTasks((prevTasks) => [...prevTasks, response.data.payload]);
  };

  const completeTask = async () => {
    const response = await api.delete(`/task/${task!._id}`);
    setTasks(tasks.filter((tsk) => tsk._id !== response.data.payload._id));
    handleModal();
  };

  const editTask = async (updatedTask: Task) => {
    const response = await api.patch(`/task/${updatedTask._id}`, {
      text: updatedTask.text,
    });
    setTasks(
      tasks.map((tsk) =>
        tsk._id === task!._id
          ? {
              ...tsk,
              text: response.data.payload.text,
            }
          : tsk
      )
    );
    handleModal();
  };

  const tasksSort = tasks.sort(
    (a, b) => Number(new Date(b.createdAt!)) - Number(new Date(a.createdAt!))
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
      <NewTask onAddTask={addTask} />
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
