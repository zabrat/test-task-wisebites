import { FC, useEffect, useState } from "react";
import { Editor, EditorState, CompositeDecorator } from "draft-js";

import { forbiddenWordsDecorator } from "../../lib/forbiddenWordsDecorator";
import "draft-js/dist/Draft.css";
import "./Description.css";

interface Props {
  maxLimit?: number;
  label?: string;
  forbiddenWords?: string[];
  onChange?: (value: string) => void;
  isError?: boolean;
  helpText?: string;
}

export const Description: FC<Props> = ({
  maxLimit = 1000,
  label,
  forbiddenWords,
  onChange,
  isError,
  helpText,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [textLength, setTextLength] = useState(0);
  const [isLimitError, setIsLimitError] = useState(false);

  const onEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    const text = newState.getCurrentContent().getPlainText("");
    setTextLength(text.length);
    onChange?.(text);
  };

  useEffect(() => {
    if (isError && forbiddenWords?.length) {
      const decorator = new CompositeDecorator([
        forbiddenWordsDecorator(forbiddenWords),
      ]);
      const newState = EditorState.set(editorState, { decorator });
      setEditorState(newState);
    }
  }, [isError, forbiddenWords]);

  useEffect(() => {
    if (isLimitError && textLength < maxLimit) setIsLimitError(false);
    else if (textLength > maxLimit) setIsLimitError(true);
  }, [textLength]);

  return (
    <div className="description" data-test-id="description">
      {label && <p>{label}</p>}
      <div
        className={`description__textarea description__textarea${
          isError || isLimitError ? "--error" : ""
        }`}
      >
        <Editor editorState={editorState} onChange={onEditorChange} />
        <div
          className="description__counter"
          data-test-id="text-length-counter"
        >
          {textLength}
        </div>
      </div>
      {isError && helpText && (
        <p
          className={`description__help-text description__help-text${
            isError ? "--error" : ""
          }`}
        >
          {helpText}
        </p>
      )}
      {isLimitError && (
        <p
          className={` description__help-text${isLimitError ? "--error" : ""}`}
        >
          {`Max symbols limit is ${maxLimit}`}
        </p>
      )}
    </div>
  );
};
