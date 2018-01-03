import React, { Component } from 'react'
import { connect } from 'react-redux'
import MarkdownExchange from '../../util/translation'
import { getData } from '../../api/fetchData'

@connect(state => ({
  currentPaperContent: state.data.getIn(['currentPaperContent']),
  sentenceList: []
}))
export default class MainTranslation extends Component {
  getValueFromObject(Object) {
    for (let value in Object) {
      if (value.toString() === 'value') {
        this.props.sentenceList.push(Object[value])
        return
      } else if (value.toString() === 'children') {
        for (let item of Object[value]) {
          this.getValueFromObject(item)
        }
      }
    }
  }

  getData() {
    let data = new MarkdownExchange(this.props.currentPaperContent.markdown)
    console.log(data)
    let { children } = data.ast
    for (let item of children) {
      this.getValueFromObject(item)
    }
  }
  render() {
    this.getData()
    return (
      <div className="main-translation">
        <ul>
          {this.props.sentenceList.map((key, index) => (
            <li id={index} key={index} className="main-Translation-item">
              <a>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
