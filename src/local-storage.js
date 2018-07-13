export const loadToken = () => {
  try {
    const token = localStorage.getItem('access_token');
    if (token === null) {
      return undefined;
    }
    return JSON.parse(token);
  } catch (err) {
    return undefined;
  }
};

export const saveToken = (state) => {
  try {
    const token = JSON.stringify(state);
    localStorage.setItem('access_token_t', token);
  } catch (err) {
    // ignore
  }
};
