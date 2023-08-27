function isNullOrWhitespace(input) {
  //   return input?.length > 0
  //     ? input.forEach((field) => {
  //         if (/^\s*$/.test(field))
  //           return { status: true, msg: `${field} can not empty!!!` };
  //       })
  //     : /^\s*$/.test(input);
  if (input.length > 0) {
    for (const field of input) {
      if (/^\s*$/.test(field)) {
        return { status: true, msg: `Field can not empty!!!` };
      }
    }
    return { status: false };
  } else {
    return /^\s*$/.test(input);
  }
}

module.exports = isNullOrWhitespace;
