import React, { Component } from 'react'
import { connect } from 'react-redux'
import './addPaperNotice.scss'
import userData from '../../action/userData'
import ui from '../../action/uiAction'
import PropTypes from 'prop-types'

@connect(
  state => ({
    show: state.ui.getIn(['showAddPaperNotice'])
  }),
  { createPaper: userData.createPaper }
)
export default class AddPaperNotice extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fileName: '',
      name: ''
    }
  }

  async handleClick() {
    let data = {
      file: this.state.fileName,
      name: this.state.name,
      data: ''
    }
    await this.props.createPaper(data)
    await ui.closeAddPaperNotice()
    this.context.router.history.push(`/main/paper?fileName=${data.file}&name=${data.name}`)
    this.setState({
      name: '',
      fileName: ''
    })
  }

  handleName(e) {
    let value = e.target.value
    this.setState({
      name: value
    })
  }

  handleFileName(e) {
    let value = e.target.value
    this.setState({
      fileName: value
    })
  }

  render() {
    let { show } = this.props
    return (
      <div className="notice-box" style={{ display: show ? 'flex' : 'none' }}>
        <div className="notice-body">
          <div>
            <span>文章名称:</span>
            <input value={this.state.name} onChange={this.handleName.bind(this)} type="text" />
          </div>
          <div>
            <span>文件名称:</span>
            <input value={this.state.fileName} onChange={this.handleFileName.bind(this)} type="text" />
          </div>
        </div>
        <div className="notice-btn">
          <button onClick={this.handleClick.bind(this)}>确认</button>
        </div>
      </div>
    )
  }
}
