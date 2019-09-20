export const includes = (a: string, b: string) =>
  a.toLowerCase().includes(b.toLowerCase());

export const decodeDataURI = (dataURI: string) => {
  const [, base64] = dataURI.split('data:image/svg+xml;base64,');
  return window.atob(base64);
};
