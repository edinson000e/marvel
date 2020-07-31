export const replaceUrl = url => {
  const regex = /http/gi;
  return url.replace(regex, "https");
};
