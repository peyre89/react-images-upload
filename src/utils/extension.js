const extensionIsValid = (file, accept) => {
  const { name, type } = file;

  const fileName = name || ''
  const mimeType = type.toLowerCase() || ''
  const baseMimeType = mimeType.replace(/\/.*$/, '')

  return accept.some(type => {
    const validType = type.trim().toLowerCase()

    console.log(baseMimeType, validType.replace(/\/.*$/, ''))

    if (validType.charAt(0) === '.') {
      return fileName.toLowerCase().endsWith(validType)
    } else if (validType.endsWith('/*')) {
      // This is something like a image/* mime type
      return baseMimeType === validType.replace(/\/.*$/, '')
    }

    return mimeType === validType
  })
}

export { extensionIsValid };
