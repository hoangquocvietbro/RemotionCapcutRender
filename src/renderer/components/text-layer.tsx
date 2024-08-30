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
      dangerouslySetInnerHTML={{ __html: content }}
      data-text-id={id}
      contentEditable={false}
      style={{
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        outline: 'none',
        ...style,
      }}
      className="designcombo_textLayer"
    />
  );
};

export default TextLayer;
