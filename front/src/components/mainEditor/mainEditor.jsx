import React, { Component } from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css'
import './mainEditor.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import userData from '../../action/userData'

@connect(state => ({}), { getPaperContent: userData.getPaperContent })
export default class MainEditor extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '1111',
      fileName: this.props.location.query.fileName,
      name: this.props.location.query.name
    }
  }

  async componentWillMount() {
    let { fileName } = this.props.location.query
    let result = await this.props.getPaperContent(fileName)
    this.setState({
      code: result.data.markdown
    })
  }

  async componentWillUnmount() {
    console.log('when leave save data!')
    await userData.changePaperContent({
      file: this.state.fileName,
      name: this.state.name,
      data: this.state.code
    })
  }

  async componentDidUpdate() {
    let { fileName: newFileName, name: newName } = this.props.location.query
    if (this.state.fileName !== newFileName) {
      let data = await userData.changePaperContent({
        file: this.state.fileName,
        name: this.state.name,
        data: this.state.code
      })
      console.log(data)
      let result = await this.props.getPaperContent(newFileName)
      let code = result.data.markdown
      this.setState({
        code: code,
        fileName: newFileName,
        name: newName
      })
    }
  }

  onBeforeChange(editor, data, value) {
    this.setState({ code: value })
  }

  render() {
    const options = {
      lineNumbers: true,
      mode: 'markdown'
    }
    return <CodeMirror value={this.state.code} onBeforeChange={this.onBeforeChange.bind(this)} options={options} />
  }
}
