export default (element, defaultHeight) => {
  if (element) {
    // Support passing an event and a raw element via React ref;
    const target = element.target ? element.target : element;
    target.style.height = defaultHeight;
    target.style.height = `${target.scrollHeight}px`;
  }
};
