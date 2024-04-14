import { ContentBlock } from "draft-js";
import { ForbiddenWordSpan } from "../ui/ForbiddenWord/ForbiddenWord";

function findWithRegex(
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
): void {
  const text = contentBlock.getText();
  let matchArr;
  let start: number;

  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export function forbiddenWordsDecorator(forbiddenWords: string[]): any {
  const regex = new RegExp(`\\b(${forbiddenWords.join("|")})\\b`, "gi");
  return {
    strategy: function (
      contentBlock: ContentBlock,
      callback: (start: number, end: number) => void
    ) {
      if (forbiddenWords.length > 0) {
        findWithRegex(regex, contentBlock, callback);
      }
    },
    component: ForbiddenWordSpan,
  };
}
