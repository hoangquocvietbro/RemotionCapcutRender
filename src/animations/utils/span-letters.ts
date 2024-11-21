export const spanLetters = (className: string) => {
  const container = document.getElementsByClassName(className)[0];
  if (!container) return;

  const textWrapper = container.querySelector('.designcombo_textLayer');
  if (!textWrapper) return;
  const existingLetters = textWrapper.querySelectorAll('.letter');
  if (existingLetters.length > 0) {
    console.log('existe', className);
    return;
  }
  const text = textWrapper.textContent;
  if (!text) return;
  textWrapper.innerHTML = '';
  const words = text.split(' ');
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    word.split('').forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'letter';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });
    textWrapper.appendChild(wordSpan);
    if (wordIndex < words.length - 1) {
      textWrapper.appendChild(document.createTextNode(' '));
    }
  });
};
