import React, { Component } from 'react'
import { connect } from 'react-redux'
import './translateCatalog.scss'
import MarkdownExchange from '../../util/translation'
import { getData } from '../../api/fetchData'

@connect(state => ({
  currentPaperContent: state.data.getIn(['currentPaperContent']),
  sentenceList: []
}))
export default class TranslateCatalog extends Component {
  getValueFromObject(Object, index) {
    for (let value in Object) {
      if (value.toString() === 'value') {
        this.props.sentenceList[index] += Object[value]
        return
      } else if (value.toString() === 'children') {
        for (let item of Object[value]) {
          this.getValueFromObject(item, index)
        }
      }
    }
  }

  getData() {
    let data = new MarkdownExchange(this.props.currentPaperContent.markdown)
    console.log(data)
    let { children } = data.ast
    let i = 0
    for (let item of children) {
      if (item) {
        this.props.sentenceList[i] = ''
        this.getValueFromObject(item, i)
        i++
      }
    }
  }

  handleClick() {}

  render() {
    this.getData()
    return (
      <div className="translate-catalog-content">
        <ul>
          {this.props.sentenceList.map((key, index) => (
            <li id={index} key={index} className="file-catalog-item" onClick={this.handleClick.bind(this)}>
              <a>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
