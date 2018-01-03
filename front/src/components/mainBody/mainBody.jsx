import React, { Component } from 'react'
import './mainBody.scss'
import { Route } from 'react-router-dom'
import mainEditor from '../mainEditor/mainEditor'
import { connect } from 'react-redux'
import AddPaperNotice from '../addPaperNotice/addPaperNotice'
import mainTranslation from '../mainTranslation/mainTranslation'

const defaultStyle = () => <p>请选择文档或者添加文档</p>

export default class MainBody extends Component {
  render() {
    return (
      <div className="main-block">
        <AddPaperNotice />
        <Route exact path="/" component={defaultStyle} />
        <Route path="/main/paper" component={mainEditor} />
        <Route path="/main/translation" component={mainTranslation} />
      </div>
    )
  }
}
