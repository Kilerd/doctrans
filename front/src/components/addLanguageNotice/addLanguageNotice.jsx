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
    this.state = {
      newLanguageList: []
    }
  }

  async handleClick() {
    console.log(this.state.newLanguageList)
    let result = await userData.setLanguages({ language: this.state.newLanguageList })
    console.log(result)
    await ui.closeAddLanguageNotice()
    await this.props.getLanguages()
  }

  checkLanguage(e) {
    if (e.target.checked) {
      this.state.newLanguageList.push(e.target.parentNode.innerText)
      console.log('afterPush', this.state.newLanguageList)
    } else {
      let index = this.state.newLanguageList.indexOf(e.target.parentNode.innerText)
      this.state.newLanguageList.splice(index, 1)
      console.log('afterSlice', this.state.newLanguageList)
    }
  }

  getExlanguages(data, languages) {
    this.state.newLanguageList = [...languages]
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
    let data = ['en', 'zh', 'bb']
    let exlanguages = this.getExlanguages(data, languages)
    let { show } = this.props
    console.log('languages', exlanguages)
    return (
      <div className="choice-language-notice" style={{ display: show ? 'flex' : 'none' }}>
        <div className="notice-body">
          <form action="">
            <label title="该语言为默认语言">{defaultLanguage}</label>
            {exlanguages.map(
              (key, index) =>
                key.language !== defaultLanguage ? (
                  <label key={index}>
                    <input
                      name={index}
                      type="checkbox"
                      onChange={this.checkLanguage.bind(this)}
                      defaultChecked={key.own ? true : ''}
                    />
                    {key.language}
                  </label>
                ) : (
                  ''
                )
            )}
          </form>
        </div>
        <div className="notice-btn">
          <button onClick={this.handleClick.bind(this)}>确定</button>
        </div>
      </div>
    )
  }
}
