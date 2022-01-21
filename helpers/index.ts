export const getExtension = (contentType?: string[]) => {
  if (!contentType?.length) {
    return null;
  }

  if (contentType.join('/') === 'text/plain') {
    return 'txt';
  }
  if (contentType[0] === 'image') {
    return contentType[1];
  }
  return null;
};
