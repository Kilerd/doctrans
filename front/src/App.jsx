import React, { Component } from 'react'
import CatalogBar from './components/catalogBar/catalogBar.jsx'
import './app.scss'
import MainBody from './components/mainBody/mainBody'
import { connect } from 'react-redux'
import ui from './action/uiAction'

@connect(state => ({
  show: state.ui.getIn(['showAddPaperNotice'])
}))
class App extends Component {
  handleClick(e) {
    console.log(e.target.className)
    let ifOpen =
      e.target.parentNode.className.includes('notice') ||
      e.target.parentNode.parentNode.className.includes('notice') ||
      e.target.className.includes('notice') ||
      e.target.parentNode.className.includes('add-paper')
    if (this.props.show && !ifOpen) {
      ui.closeAddPaperNotice()
    }
  }

  render() {
    return (
      <div className="App" onClick={this.handleClick.bind(this)}>
        <CatalogBar />
        <MainBody />
      </div>
    )
  }
}

export default App
