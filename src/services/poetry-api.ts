const baseUrl = process.env.VUE_APP_POETRY_BASE_URL;

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
