const defaultState = { totalIncome: 0.0, partnerStatus: false };

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEND_TOTAL_INCOME':
      return Object.assign({}, state, { totalIncome: action.payload });
    case 'SEND_PARTNER_STATUS':
      return Object.assign({}, state, { partnerStatus: action.payload });
    default:
      return state;
  }
};

export default mainReducer;
