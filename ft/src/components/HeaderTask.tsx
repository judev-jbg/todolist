export default function HeaderTask({ counter }: { counter: number }) {
  return (
    <div className="headerTask__container">
      <h3>Mi lista de pendientes 📋</h3>
      <div className="counterTask">{`${counter} Tareas`}</div>
    </div>
  );
}
