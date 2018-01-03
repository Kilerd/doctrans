import Store from '../store'

const dispatch = Store.dispatch

const actions = {
  writingPaper: () => dispatch({ type: 'WritingPaper' }),
  showTranslateSideBar: () => dispatch({ type: 'ShowTranslateSideBar' }),
  closeTranslateSideBar: () => dispatch({ type: 'CloseTranslateSideBar' }),
  showAddPaperNotice: () => dispatch({ type: 'ShowAddPaperNotice' }),
  closeAddPaperNotice: () => dispatch({ type: 'CloseAddPaperNotice' })
}

export default actions
