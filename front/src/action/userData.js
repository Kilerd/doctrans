import Store from '../store'
import { getData, postData } from '../api/fetchData'

const dispatch = Store.dispatch

const actions = {
  createPaper: function(data) {
    return async dispatch => {
      let result = await postData('/articles', data)
      dispatch({
        type: 'CreatePaper',
        data: {
          name: data.name,
          file: data.file
        }
      })
      return result
    }
  },

  getPaperList: function() {
    return async dispatch => {
      let result = await getData('/config')
      console.log(4444, result)
      dispatch({
        type: 'GetPaperList',
        data: result.data.articles
      })
      return result
    }
  },

  getPaperContent: function(file) {
    return async dispatch => {
      let result = await getData(`/articles/${file}`)
      console.log(9999, result)
      dispatch({
        type: 'GetPaperContent',
        data: result.data
      })
      return result
    }
  },

  changePaperContent: async function(data) {
    let result = await postData('/articles', data)
    return result
  },

  getSentenceList: () => dispatch({ type: 'GetSentenceList' })
}

export default actions
