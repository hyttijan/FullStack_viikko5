const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case 'GOOD':
      newState.good = newState.good+1
      break
    case 'OK':
      newState.ok = newState.ok+1
      break
    case 'BAD':
      newState.bad = newState.bad+1
      break
    case 'ZERO':
      newState.good = 0
      newState.ok = 0
      newState.bad = 0
      break
    default:
      break
  }
  return newState
}

export default counterReducer