import React, { Component } from 'react'
import { connect } from 'react-redux'
import './translationBlock.scss'

@connect(state => ({
  currentSelectPaper: state.data.getIn(['currentSelectPaper'])
}))
export default class TranslationBlock extends Component {
  handleClick() {
    console.log('papap', this.props.currentSelectPaper)
    console.log('kakaka', this.props.version)
  }

  render() {
    let { content, languages, defaultLanguage } = this.props
    console.log('mmmlala', defaultLanguage)
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
                  <input type="text" />
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
