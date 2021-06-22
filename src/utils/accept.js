const acceptToString = accept => {
  const list = accept.map(type => {
    return type.charAt(0) === '.' ? `.${type}` : type
  })

  return list.join(', ')
}

export { acceptToString };
