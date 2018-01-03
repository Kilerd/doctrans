import immutable from 'immutable'

const initState = immutable.fromJS({})

function reducer(state = initState, action) {
  switch (action.type) {
    case 'GetPaperList': {
      return state.set('paperList', action.data)
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
    default: {
      return state
    }
  }
}

export default reducer
