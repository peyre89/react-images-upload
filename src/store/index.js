export const initialState = {
  imagesAccepted: [],
  imagesRejected: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return {
        imagesAccepted: [...state.imagesAccepted, ...action.imagesAccepted],
        imagesRejected: [...state.imagesRejected, ...action.imagesRejected],
      }
    case 'replace':
      return {
        imagesAccepted: action.imagesAccepted,
        imagesRejected: action.imagesRejected
      }
    default:
      return state
  }
}
