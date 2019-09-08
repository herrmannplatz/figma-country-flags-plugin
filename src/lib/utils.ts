export const includes = (a: String, b: String) =>
  a.toLowerCase().includes(b.toLowerCase());

export const decodeDataURI = dataURI => {
  const [, base64] = dataURI.split("data:image/svg+xml;base64,");
  return window.atob(base64);
};
