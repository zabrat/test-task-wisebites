import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

mock.onPost("/forbidden-words").reply((config) => {
  const requestBody = JSON.parse(config.data);
  const text = requestBody.text;
  const forbiddenWords = ["example", "forbidden", "words"];
  const foundForbiddenWords = forbiddenWords.filter((word) =>
    text.includes(word)
  );

  if (foundForbiddenWords.length > 0) {
    return [400, { forbiddenWords: foundForbiddenWords }];
  } else {
    return [200, { forbiddenWords: [] }];
  }
});

export default axiosInstance;
