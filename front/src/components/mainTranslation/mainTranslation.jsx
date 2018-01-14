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
        let hasThisItem = false
        for (let item of this.props.sentenceList) {
          if (item.version === version) {
            item.value = item.value.toString() + Object[value].toString()
            hasThisItem = true
            break
          }
        }
        if (!hasThisItem) {
          let { translations } = this.props.currentPaperContent
          let translate = ''
          for (let value in translations) {
            if (value === version) {
              translate = translations[value]
            }
          }
          this.props.sentenceList.push({ value: Object[value], version, translate })
        }
        return
      } else if (value.toString() === 'children') {
        for (let item of Object[value]) {
          this.getValueFromObject(item, version)
        }
      }
    }
  }

  getData() {
    console.log('this.props.currentPaperContent', this.props.currentPaperContent)
    let data = new MarkdownExchange(this.props.currentPaperContent.markdown)
    let { children } = data.ast
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
            translate={key.translate}
            languages={this.props.languages}
            defaultLanguage={this.props.defaultLanguage}
          />
        ))}
      </div>
    )
  }
}
