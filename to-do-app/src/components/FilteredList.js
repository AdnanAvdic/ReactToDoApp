import "../styles/FilteredList.css";

function FilteredList(props) {
  const filteredData = props.tasks.filter((element) => {
    if (props.filter === "") {
      return true;
    } else {
      return element.text.toLowerCase().includes(props.filter);
    }
  });

  return (
    <div className="list-wrapper">
      <ul className="task-list">
        {filteredData.map((element) => (
          <div className="list-div" key={element.id}>
            <div className="list-elements-wrapper">
              {props.editTask === element.id ? (
                <input
                  className="edit-input"
                  type="text"
                  onChange={(e) => props.setEditInputValue(e.target.value)}
                  value={props.editText}
                />
              ) : (
                <li className="list-element">{element.text}</li>
              )}

              <button
                className="delete-btn"
                onClick={() => props.handleDelete(element.id)}
              >
                X
              </button>

              {props.editTask === element.id ? (
                <button
                  className="edit-btn"
                  onClick={() => props.handleEdit(element.id)}
                >
                  ✓
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => props.setEditTask(element.id)}
                >
                  |||
                </button>
              )}

              <button
                className="complete-btn"
                onClick={() => props.handleComplete(element.id)}
              >
                {!element.completed ? "✓" : "/"}
              </button>
            </div>

            <div className="task-date-complete">
              {!element.completed ? (
                <h5 className="deadline">
                  Deadline at: {element.deadlineDate}
                </h5>
              ) : (
                <h5>Task Completed</h5>
              )}

              {!element.completed && (
                <h5 className="created">Task added at: {element.created}</h5>
              )}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default FilteredList;
