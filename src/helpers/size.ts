export const countSize = (size: number) => {
  const sizeLength = size.toString().length;
  if (sizeLength < 4) {
    return size + ' B';
  }
  if (sizeLength < 8) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return (size / (1024 * 1024)).toFixed(2) + ' MB';
};
