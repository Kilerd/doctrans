import React, { Component } from 'react'
import { connect } from 'react-redux'
import ui from '../../action/uiAction'
import userData from '../../action/userData'
import './fileCatalog.scss'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@connect(
  state => ({
    paperList: state.data.getIn(['paperList'])
  }),
  { getPaperList: userData.getPaperList, setCurrentSelectPaper: userData.setCurrentSelectPaper }
)
class FileCatalog extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  async componentWillMount(nextProps, nextState) {
    let result = await this.props.getPaperList()
    console.log(222, result)
  }

  formatData(list) {
    let result = []
    for (let value in list) {
      if (value) {
        result.push({
          fileName: value,
          name: list[value]
        })
      }
    }
    return result
  }

  async addPaper() {
    await ui.showAddPaperNotice()
  }

  handleClick(fileName, name) {
    console.log('before', fileName, name)
    this.props.setCurrentSelectPaper({ fileName, name })
    this.props.history.push(`/main/paper?fileName=${fileName}&name=${name}`)
  }

  render() {
    return (
      <div className="file-catalog">
        <div className="file-catalog-content">
          <ul>
            {this.formatData(this.props.paperList).map((key, index) => (
              <li
                id={index}
                key={index}
                className="file-catalog-item"
                onClick={this.handleClick.bind(this, key.fileName, key.name)}
              >
                <a>
                  {key.name}&nbsp;({key.fileName})
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-paper">
          <button className="add-paper-btn" onClick={this.addPaper.bind(this)}>
            编写文档
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(FileCatalog)
