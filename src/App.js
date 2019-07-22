import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      list: [],
      text: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    })
  }

  handleSubmit = e => {
    if (this.state.text !== '') {
      this.setState({
        list: [...this.state.list, this.state.text],
        text: '',
      })
    }
  }

  handleRemove = index => {
    let newList = [...this.state.list].filter((val, idx) => idx !== index)
    this.setState({
      list: newList,
    })
  }

  handleEdit = (text, index) => {
    let newList = [...this.state.list]
    newList.splice(index, 1, text)
    this.setState({
      list: newList,
    })
  }

  render() {
    return (
      <div className="App">
        <header>TO DO LIST ! {this.state.list.length}</header>
        <input
          onChange={this.handleChange}
          value={this.state.text}
          onKeyPress={e => {
            if (e.charCode === 13) {
              this.handleSubmit()
            }
          }}
        />
        <button onClick={this.handleSubmit}>submit</button>
        {this.state.list &&
          this.state.list.map((val, index) => (
            <ToDoList
              key={index}
              val={val}
              index={index}
              handleRemove={this.handleRemove}
              handleEdit={this.handleEdit}
            />
          ))}

        {this.state.list && this.state.list.map(val => val + ',')}
      </div>
    )
  }
}

class ToDoList extends Component {
  constructor(props) {
    super()
    this.state = {
      isEdit: false,
      text: props.val,
    }
    this.handleEditStatus = this.handleEditStatus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleEditStatus = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    })
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    })
  }

  render() {
    return (
      <div key={this.props.index}>
        {this.state.isEdit ? (
          <input onChange={this.handleChange} value={this.state.text} />
        ) : (
          this.state.text
        )}
        <button
          onClick={() => {
            this.handleEditStatus()
            this.state.isEdit &&
              this.props.handleEdit(this.state.text, this.props.index)
          }}>
          {this.state.isEdit ? 'save' : 'edit'}
        </button>
        <button onClick={() => this.props.handleRemove(this.props.index)}>
          remove
        </button>
      </div>
    )
  }
}

export default App
