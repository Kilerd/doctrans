import React, { Component } from 'react'
import { connect } from 'react-redux'
import './translationBlock.scss'
import userData from '../../action/userData'

@connect(
  state => ({
    currentSelectPaper: state.data.getIn(['currentSelectPaper'])
  }),
  { saveTranslate: userData.saveTranslate }
)
export default class TranslationBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      translationsList: []
    }
  }

  async handleClick() {
    console.log('papap', this.props.currentSelectPaper)
    console.log('kakaka', this.props.version)
    for (let item of this.state.translationsList) {
      let data = {
        file: this.props.currentSelectPaper.fileName,
        version: this.props.version,
        language: item.language,
        content: item.content
      }
      let result = await userData.saveTranslate(data)
      console.log('result', result)
    }
  }

  getTranslate(key, e) {
    console.log('key', key)
    console.log(e)
    for (let item of this.state.translationsList) {
      console.log(111, item.language, key)
      if (item.language === key) {
        item.content = e.target.value
        break
      }
    }
    console.log('result', this.state.translationsList)
  }

  initTranslationsList(languages, defaultLanguage) {
    console.log('lallalal', defaultLanguage)
    let result = []
    for (let language of languages) {
      if (language !== defaultLanguage) {
        result.push({ language, content: this.props.translate[language] })
      }
    }
    this.setState({
      translationsList: result
    })
  }

  componentDidMount() {
    this.initTranslationsList(this.props.languages, this.props.defaultLanguage)
  }

  render() {
    let { content, languages, defaultLanguage } = this.props
    console.log('this.props.translate', this.props.translate)
    return (
      <div className="translation-block">
        <div className="block-head">
          <span>{content}</span>
          <div className="save-btn">
            <button onClick={this.handleClick.bind(this)}>保存</button>
          </div>
        </div>
        <div className="block-body">
          {languages.map(
            (key, index) =>
              key !== defaultLanguage ? (
                <div key={index} className="block-content">
                  <span>{key}:</span>
                  <input
                    type="text"
                    defaultValue={this.props.translate[key] ? this.props.translate[key] : ''}
                    onChange={this.getTranslate.bind(this, key)}
                  />
                </div>
              ) : (
                ''
              )
          )}
        </div>
      </div>
    )
  }
}
