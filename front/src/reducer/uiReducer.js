import immutable from 'immutable'

const initState = immutable.fromJS({
  showTranslateSideBar: false,
  showAddPaperNotice: false,
  showAddLanguageNotice: false
})

function reducer(state = initState, action) {
  switch (action.type) {
    case 'WritingPaper': {
      return state.set('showTranslateSideBar', true)
    }

    case 'ShowTranslateSideBar': {
      return state.set('showTranslateSideBar', true)
    }

    case 'CloseTranslateSideBar': {
      return state.set('showTranslateSideBar', false)
    }

    case 'ShowAddPaperNotice': {
      return state.set('showAddPaperNotice', true)
    }

    case 'CloseAddPaperNotice': {
      return state.set('showAddPaperNotice', false)
    }

    case 'ShowAddLanguageNotice': {
      return state.set('showAddLanguageNotice', true)
    }

    case 'CloseAddLanguageNotice': {
      return state.set('showAddLanguageNotice', false)
    }

    default: {
      return state
    }
  }
}

export default reducer
