import React, { Component } from 'react'
import { connect } from 'react-redux'
import './addLanguageNotice.scss'
import userData from '../../action/userData'
import ui from '../../action/uiAction'

@connect(
  state => ({
    show: state.ui.getIn(['showAddLanguageNotice']),
    defaultLanguage: state.data.getIn(['defaultLanguage']),
    languages: state.data.getIn(['languages'])
  }),
  { getLanguages: userData.getLanguages }
)
export default class addLanguageNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async handleClick() {}

  checkLanguage(e) {
    console.log(e.target)
    console.log(e.target.checked)
    console.log(e.target.parentNode.innerText)
    console.log('defaultLanguage', this.props.defaultLanguage)
  }

  getExlanguages(data, languages) {
    let result = []
    for (let item of data) {
      if (languages.indexOf(item) !== -1) {
        result.push({
          language: item,
          own: true
        })
      } else {
        result.push({
          language: item,
          own: false
        })
      }
    }
    return result
  }

  render() {
    let { defaultLanguage, languages = [] } = this.props
    let data = ['en', 'zh']
    let exlanguages = this.getExlanguages(data, languages)
    let { show } = this.props
    console.log('exlanguages', exlanguages)
    return (
      <div className="choice-language-notice" style={{ display: show ? 'flex' : 'none' }}>
        <div className="notice-body">
          <form action="">
            <label title="该语言为默认语言">{defaultLanguage}</label>
            {exlanguages.map(
              (key, index) =>
                key.language !== defaultLanguage ? (
                  <label key={index}>
                    <input type="checkbox" defaultChecked={key.own} onChange={this.checkLanguage.bind(this)} />
                    {key.language}
                  </label>
                ) : (
                  ''
                )
            )}
          </form>
        </div>
        <div className="notice-btn">
          <button>确定</button>
        </div>
      </div>
    )
  }
}
