import { getSavedNameStyleId, getNameStyleById } from "../utils/nameStyle";

/**
 * PlayerName — kullanıcı adını seçilen stille gösterir.
 * styleId prop'u verilirse onu, yoksa localStorage'dan okur.
 */
export default function PlayerName({ name, styleId, style: extraStyle = {} }) {
  const id = styleId ?? getSavedNameStyleId();
  const ns = getNameStyleById(id);

  return (
    <span style={{ display: "inline-block", ...ns.style, ...extraStyle }}>
      {name}
    </span>
  );
}
