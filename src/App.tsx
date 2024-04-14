import { useGetForbiddenWordsMutation } from "./api/forbiddenWordsApi";
import { Description } from "./components/Description/ui/Description/Description";
import { debounce } from "./utils";
import "./App.css";

function App() {
  const [getForbiddenWords, { error, isError }] =
    useGetForbiddenWordsMutation();
  const debouncedGetForbiddenWords = debounce(getForbiddenWords, 500);

  const onDescriptionChange = (value: string) => {
    debouncedGetForbiddenWords(value);
  };

  return (
    <div className="main">
      <Description
        isError={isError}
        label={"Description"}
        onChange={onDescriptionChange}
        forbiddenWords={error?.data.forbiddenWords}
        maxLimit={1000}
      />
    </div>
  );
}

export default App;
