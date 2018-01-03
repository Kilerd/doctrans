import React, { Component } from 'react'
import './catalogBar.scss'
import data from './example'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ui from '../../action/uiAction'
import userData from '../../action/userData'
import SearchBar from '../searchBar/searchBar'
import FileCatalog from '../fileCatalog/fileCatalog'
import TranslateCatalog from '../translateCatalog/translateCatalog'

@connect(state => ({
  showTranslateSideBar: state.ui.getIn(['showTranslateSideBar'])
}))
export default class CatalogBar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="catalog-bar">
        <div className="catalog-inner">
          <SearchBar />
          {this.props.showTranslateSideBar ? <TranslateCatalog /> : <FileCatalog />}
        </div>
      </div>
    )
  }
}
