import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  date: string;
}

interface NewTaskProps {
  onAddTask: (newItem: Task) => void;
  getLastId: () => number;
}

export default function NewTask({ onAddTask, getLastId }: NewTaskProps) {
  const [isVisibleInput, setisVisibleInput] = useState(false);
  const [value, setValue] = useState("");
  const date = new Date();
  const optionWeekDay: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };
  const optionDay: Intl.DateTimeFormatOptions = {
    day: "numeric",
  };
  const optionMonth: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  const optionYear: Intl.DateTimeFormatOptions = {
    year: "numeric",
  };

  const capitalize = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleInput = () => {
    setisVisibleInput(!isVisibleInput);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onAddTask({
        id: getLastId() + 1,
        text: value,
        date: Date(),
      });
      setValue("");
      setisVisibleInput(!isVisibleInput);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="newTask__container">
      {!isVisibleInput && (
        <>
          <span className="flex-col">
            <div>{`${capitalize(
              date.toLocaleString("es-ES", optionWeekDay)
            )},`}</div>
            <div> {date.toLocaleString("es-ES", optionDay)}</div>
          </span>
          <span className="flex-col">
            <small>
              {capitalize(date.toLocaleString("es-ES", optionMonth))}
            </small>
            <small> {date.toLocaleString("es-ES", optionYear)}</small>
          </span>
        </>
      )}
      {!isVisibleInput && (
        <button className="newTask__button" onClick={handleInput}>
          +
        </button>
      )}
      {isVisibleInput && (
        <div className="actionTask__container">
          <input
            className="newTask__input"
            type="text"
            onChange={handleChange}
            value={value}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="saveTask__button" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
}
