import { FC } from "react";
import "./ForbiddenWord.css";

type Props = {
  children: React.ReactNode;
};

export const ForbiddenWordSpan: FC<Props> = ({ children }) => (
  <span className="forbidden-word">{children}</span>
);
