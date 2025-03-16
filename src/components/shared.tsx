import { FC } from "react";

type TextProps = {
  text: string;
  isError?: boolean;
  isCentered?: boolean;
};

export const EcText: FC<TextProps> = ({ isError, text, isCentered }) => {
  const textColor = isError ? "text-red-500" : "text-gray-500";
  const centerStyle = isCentered ? "text-center" : "";

  return (
    <div className={`text-center ${textColor} ${centerStyle}`}>{text}</div>
  );
};
