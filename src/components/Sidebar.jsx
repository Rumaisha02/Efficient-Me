import { Link } from 'react-router-dom'

 function Sidebar() {
  return (
    <div>
      <div className="sidebar flex">
        <Link to="/todo">
          <div>
            <button className="button-styling">
              <img src="todolist.svg" alt="To Do List" />
            </button>
          </div>
        </Link>

        <Link to="/notes">
          <div>
            <button className="button-styling">
              <img src="notes.svg" alt="Notes" />
            </button>
          </div>
        </Link>

        <Link to="/progress">
          <div>
            <button className="button-styling">
              <img src="progress.svg" alt="Progress" />
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Sidebar