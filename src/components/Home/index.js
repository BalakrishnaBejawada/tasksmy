import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import Task from '../Task'

import Tags from '../Tags'

import './index.css'

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

class Home extends Component {
  state = {
    activeOptionId: tagsList[0].optionId,
    taskInput: '',
    addingList: [],
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {activeOptionId, taskInput} = this.state

    const updatedList = {
      id: uuid(),
      activeOptionId,
      taskInput,
    }
    this.setState(prevState => ({
      addingList: [...prevState.addingList, updatedList],
      activeOptionId: '',
      taskInput: '',
    }))
  }

  setActiveOption = optionId => {
    this.setState({
      activeOptionId: optionId,
    })
  }

  getFilteredTasks = () => {
    const {activeOptionId} = this.setState
    const filteredTasks = tagsList.filter(
      eachTask => eachTask.displayText === activeOptionId,
    )
    return filteredTasks
  }

  render() {
    const {taskInput, activeOptionId, addingList} = this.state

    return (
      <div className="task-container">
        <div className="input-container">
          <h1 className="task-heading">Create A Task!</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="task-label" className="task-input">
              Task
            </label>
            <input
              type="text"
              className="input"
              id="task-label"
              value={taskInput}
              onChange={this.onChangeTask}
              placeholder="Enter the task here"
            />
            <label className="task-input" htmlFor="tag">
              Tags
            </label>
            <select
              className="select-tags"
              onChange={this.onChangeTag}
              value={activeOptionId}
              id="tag"
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="background">
          <h1 className="adding-tasks">Tags</h1>
          <ul className="wrap">
            {tagsList.map(each => (
              <Tags
                key={each.id}
                itemDetails={each}
                setActiveOption={this.setActiveOption}
              />
            ))}
          </ul>
          <div className="middle">
            <h1 className="adding-tasks">Tasks</h1>
            {addingList.length === 0 ? (
              <p className="task-heading">No Tasks Added Yet</p>
            ) : (
              <ul className="items-list">
                {addingList.map(each => (
                  <Task
                    key={each.id}
                    itemDetails={each}
                    setActiveOption={this.setActiveOption}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
