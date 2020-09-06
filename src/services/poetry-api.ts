const baseUrl = 'https://poetry-app-api.herokuapp.com/poetry';
// const baseUrl = 'http://localhost:3000/poetry';

const store = {
  serverIsWoke: false,
  setServerIsWoke(value: boolean) {
    this.serverIsWoke = value;
  },
};

export default {
  baseUrl,
  store,
};
