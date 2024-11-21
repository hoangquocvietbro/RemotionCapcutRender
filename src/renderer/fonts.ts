export interface IFont {
  postScriptName: string;
  url: string;
}

export const loadFonts = (fonts: IFont[]) => {
  const promisesList = fonts.map((font) => {
    const fontFace = new FontFace(font.postScriptName, `url(${font.url})`);
    return fontFace.load();
  });

  return new Promise((resolve, reject) => {
    Promise.all(promisesList)
      .then((res) => {
        res.forEach((uniqueFont) => {
          if (uniqueFont && uniqueFont.family) {
            document.fonts.add(uniqueFont);
            resolve(true);
          }
        });
      })
      .catch((err) => {
        console.log("error loading fonts", err);
        reject(err);
      });
  });
};
