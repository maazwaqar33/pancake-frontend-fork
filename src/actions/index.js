export const sendTotalIncome = totalIncome => {
  return {
    type: 'SEND_TOTAL_INCOME',
    payload: totalIncome,
  };
};

export const sendPartnerStatus = val => {
  return {
    type: 'SEND_PARTNER_STATUS',
    payload: val,
  };
};
