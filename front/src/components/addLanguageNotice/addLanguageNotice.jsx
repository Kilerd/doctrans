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
      newLanguageList: [],
      currentLanguageList: []
    }
  }

  componentWillReceiveProps(nextProps) {

    let allSupportedLanguages = ['en', 'zh', 'bb']
    let { languages:selectedLanguages = [] } = nextProps
    
    let result = this.getExlanguages(allSupportedLanguages, selectedLanguages)
    this.setState({
      currentLanguageList: result
    })

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

  getExlanguages(supported, current) {
    this.state.newLanguageList = [...current]
    let result = []
    for (let item of supported) {
      if (current.includes(item)) {
        result.push({ language: item, checked: true })
      } else {
        result.push({ language: item, checked: false })
      }
    }
    return result
  }

  render() {
    let { defaultLanguage } = this.props
    let { show } = this.props

    console.log('render props', this.props)
    return (
      <div className="choice-language-notice" style={{ display: show ? 'flex' : 'none' }}>
        <div className="notice-body">
          <form action="">
            <label title="该语言为默认语言">{defaultLanguage}</label>
            {this.state.currentLanguageList.map(
              (key, index) =>
                key.language !== defaultLanguage ? (
                  <label key={index}>
                    <input
                      name={index}
                      type="checkbox"
                      onChange={this.checkLanguage.bind(this)}
                      defaultChecked={key.checked ? true : ''}
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
