import React, { Component } from 'react'
import { connect } from 'react-redux'
import MarkdownExchange from '../../util/translation'
import { getData } from '../../api/fetchData'
import TranslationBlock from '../translationBlock/translationBlock'
import './mainTranslation.scss'

@connect(state => ({
  currentPaperContent: state.data.getIn(['currentPaperContent']),
  sentenceList: [],
  languages: state.data.getIn(['languages']),
  defaultLanguage: state.data.getIn(['defaultLanguage'])
}))
export default class MainTranslation extends Component {
  getValueFromObject(Object, version) {
    for (let value in Object) {
      if (value.toString() === 'value') {
        this.props.sentenceList.push({ value: Object[value], version })
        return
      } else if (value.toString() === 'children') {
        for (let item of Object[value]) {
          this.getValueFromObject(item, version)
        }
      }
    }
  }

  getData() {
    let data = new MarkdownExchange(this.props.currentPaperContent.markdown)
    let { children } = data.ast
    console.log('kkkk', children)
    for (let item of children) {
      this.getValueFromObject(item, item.version)
    }
  }
  render() {
    this.getData()
    return (
      <div className="main-translation">
        {this.props.sentenceList.map((key, index) => (
          <TranslationBlock
            key={index}
            content={key.value}
            version={key.version}
            languages={this.props.languages}
            defaultLanguage={this.props.defaultLanguage}
          />
        ))}
      </div>
    )
  }
}
