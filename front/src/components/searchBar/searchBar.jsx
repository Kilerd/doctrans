import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './searchBar.scss'
import ui from '../../action/uiAction'

@connect(state => ({
  currentSelectPaper: state.data.getIn(['currentSelectPaper']),
  showTranslateSideBar: state.ui.getIn(['showTranslateSideBar']),
  showAddLanguageNotice: state.ui.getIn(['showAddLanguageNotice'])
}))
export default class SearchBar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  fileCatalog() {
    if (this.props.showTranslateSideBar) {
      ui.closeTranslateSideBar()
    }
  }

  translateCatalog() {
    if (!this.props.showTranslateSideBar) {
      if (!this.props.currentSelectPaper) {
        return alert('请选择翻译文章!')
      }
      ui.showTranslateSideBar()
      this.context.router.history.push('/main/translation')
    }
  }

  choiceLanguage() {
    if (!this.props.showAddLanguageNotice) {
      ui.showAddLanguageNotice()
    }
  }

  render() {
    return (
      <div className="search-bar">
        <button onClick={this.fileCatalog.bind(this)}>文档目录</button>
        <button onClick={this.translateCatalog.bind(this)}>翻译目录</button>
        <button className="choice-language-btn" onClick={this.choiceLanguage.bind(this)}>
          选择语言
        </button>
      </div>
    )
  }
}
