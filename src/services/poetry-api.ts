const baseUrl = process.env.VUE_APP_POETRY_BASE_URL;

function trimToCharLimit(string: string): string {
  const maxLength = 50;
  if (string.length > maxLength) return string.substring(0, maxLength);
  return string;
}

export default {
  baseUrl,
  trimToCharLimit,
};
