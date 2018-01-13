import immutable from 'immutable'

const initState = immutable.fromJS({})

function reducer(state = initState, action) {
  switch (action.type) {
    case 'GetPaperList': {
      let { articles, defaultLanguage, languages } = action.data
      state = state
        .set('paperList', articles)
        .set('defaultLanguage', defaultLanguage)
        .set('languages', languages)
      return state
    }

    case 'CreatePaper': {
      let { file, name } = action.data
      let data = state.getIn(['paperList'])
      let newData = JSON.parse(JSON.stringify(data))
      newData[file] = name
      return state.set('paperList', newData)
    }

    case 'GetSentenceList': {
      const sentences = ['1111', '22222', '33333']
      return state.set('sentenceList', sentences)
    }

    case 'GetPaperContent': {
      return state.set('currentPaperContent', action.data)
    }

    case 'GetLanguages': {
      return state.update('languages', value => (value = action.data))
    }

    case 'SetCurrentSelectPaper': {
      return state.set('currentSelectPaper', action.data)
    }

    default: {
      return state
    }
  }
}

export default reducer
