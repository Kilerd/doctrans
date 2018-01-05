import React, { Component } from 'react'
import CatalogBar from './components/catalogBar/catalogBar.jsx'
import './app.scss'
import MainBody from './components/mainBody/mainBody'
import { connect } from 'react-redux'
import ui from './action/uiAction'

@connect(state => ({
  showAddPaperNotice: state.ui.getIn(['showAddPaperNotice']),
  showAddLanguageNotice: state.ui.getIn(['showAddLanguageNotice'])
}))
class App extends Component {
  async handleClick(e) {
    let clickClass = e.target.className

    let ifClose =
      e.target.parentNode.className.includes('notice') ||
      e.target.parentNode.parentNode.className.includes('notice') ||
      e.target.parentNode.parentNode.parentNode.className.includes('notice') ||
      e.target.className.includes('notice')

    if (!ifClose) {
      await ui.closeAddPaperNotice()
      await ui.closeAddLanguageNotice()
    }

    switch (clickClass) {
      case 'add-paper-btn': {
        ui.showAddPaperNotice()
        return
      }

      case 'choice-language-btn': {
        ui.showAddLanguageNotice()
        return
      }

      default:
        return
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
