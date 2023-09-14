function isNullOrWhitespace(input) {
  const emptyFileds = [];

  for (const field in input) {
    console.log({ field });
    if (!field || /^\s*$/.test(input[field])) {
      emptyFileds.push(field);
    }
  }
  if (emptyFileds.length > 0)
    return {
      status: true,
      msg: `Fields [${emptyFileds.join(", ")}] cannot empty!!!`,
    };
  return { status: false };
}

module.exports = isNullOrWhitespace;
