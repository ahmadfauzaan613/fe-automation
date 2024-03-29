const initialstate = {
  User: {},
  allEntity: [],
  entity: {},
}

export const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'ALL_USER':
      return {
        ...state,
        allUser: action.payload,
      }
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
