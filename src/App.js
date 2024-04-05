import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TasksView from './components/TasksView'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    input: '',
    tags: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onChangeInput = event => {
    this.setState({
      input: event.target.value,
    })
  }

  onChangeTags = event => {
    this.setState({
      tags: event.target.value,
    })
  }

  onSubmitTasks = event => {
    event.preventDefault()
    const {input, tags} = this.state

    const newTask = {
      id: uuidv4(),
      text: input,
      displayText: tags,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      input: '',
      tags: tagsList[0].optionId,
    }))
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {tasksList, input, tags, activeTag} = this.state
    const filterTask =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.displayText === activeTag)
    const isTrue = tasksList.length === 0

    return (
      <div className="main-container">
        <div className="left-card">
          <h1 className="heading">Create a task!</h1>

          <form className="form-card" onSubmit={this.onSubmitTasks}>
            <div className="task-card">
              <label htmlFor="task" className="text">
                Task
              </label>
              <input
                type="text"
                id="task"
                placeholder="Enter the task here"
                value={input}
                className="input"
                onChange={this.onChangeInput}
              />
            </div>

            <div className="task-card">
              <label htmlFor="tag" className="text">
                Tags
              </label>
              <select
                id="tag"
                className="select-card"
                value={tags}
                onChange={this.onChangeTags}
              >
                {tagsList.map(each => (
                  <option
                    value={each.optionId}
                    key={each.optionId}
                    className="option-text"
                  >
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>

        <div className="right-card">
          <h1 className="tags-head">Tags</h1>

          <ul className="tags-list-container">
            {tagsList.map(each => {
              const isActive = activeTag === each.optionId
              const changeClass = isActive ? 'active-tag-button' : 'tag-button'

              return (
                <li key={each.optionId}>
                  <button
                    type="button"
                    value={each.optionId}
                    className={changeClass}
                    onClick={this.onClickTag}
                  >
                    {each.displayText}
                  </button>
                </li>
              )
            })}
          </ul>

          <h1 className="tags-head">Tasks</h1>
          <ul className="task-list-container">
            {isTrue ? (
              <p className="no-task">No Tasks Added Yet</p>
            ) : (
              filterTask.map(each => (
                <TasksView key={each.id} tasksDetails={each} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
