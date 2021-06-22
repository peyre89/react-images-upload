const sizeIsValid = (file, max) => {
  const { size } = file;

  if (size > max) {
    alert('The file is too large.')
    return false;
  }

  return true;
}

export { sizeIsValid };
