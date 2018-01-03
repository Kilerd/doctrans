import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './searchBar.scss'
import ui from '../../action/uiAction'

@connect(state => ({
  showTranslateSideBar: state.ui.getIn(['showTranslateSideBar'])
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
      ui.showTranslateSideBar()
      this.context.router.history.push('/main/translation')
    }
  }

  render() {
    return (
      <div className="search-bar">
        <button onClick={this.fileCatalog.bind(this)}>文档目录</button>
        <button onClick={this.translateCatalog.bind(this)}>翻译目录</button>
      </div>
    )
  }
}
