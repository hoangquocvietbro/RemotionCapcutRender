import { useEffect, useRef } from "react";

const TextLayer: React.FC<{
  id: string;
  content?: string;
  style?: React.CSSProperties;
}> = ({ id, content, style = {} }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selection = window.getSelection();
    selection?.removeAllRanges();
  }, []);

  return (
    <div
      ref={divRef}
      data-text-id={id}
      dangerouslySetInnerHTML={{ __html: content }}
      contentEditable={false}
      style={{
        height: '100%',
        boxShadow: 'none',
        outline: 'none',
        ...style,
        whiteSpace: 'normal',
        width: '100%',
      }}
      className="designcombo_textLayer"
    />
  );
};

export default TextLayer;