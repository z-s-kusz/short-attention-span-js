const baseUrl = 'https://poetry-app-api.herokuapp.com/poetry';
// const baseUrl = 'http://localhost:3000/poetry';

const store = {
  serverIsWoke: false,
  setServerIsWoke(value: boolean) {
    this.serverIsWoke = value;
  },
};

function trimToCharLimit(string: string): string {
  const maxLength = 50;
  if (string.length > maxLength) return string.substring(0, maxLength);
  return string;
}

export default {
  baseUrl,
  store,
  trimToCharLimit,
};
