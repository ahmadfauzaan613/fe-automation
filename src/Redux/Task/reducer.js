const initialstate = {
  allEntity: [],
  entity: {},
}

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'ALL_ENTITY':
      return {
        ...state,
        allEntity: action.payload,
      }
    case 'SET_ENTITY':
      return {
        ...state,
        entity: action.payload,
      }
    default:
      return state
  }
}
