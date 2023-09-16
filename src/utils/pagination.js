const { requestResponse } = require("../utils/requestResponse");
const pagination = (pageNumber, pageSize, totalItems) => {
  const skip = (pageNumber - 1) * pageSize;

  const totalPages = Math.ceil(totalItems / pageSize);

  if (pageNumber < 1 || pageNumber > totalPages) {
    return {
      ...requestResponse.bad_request,
      message:
        "Invalid page number. Page number must be a positive integer greater than or equal to 1.",
    };
  }
  console.log({ totalPages });
  return { skip, totalPages, code: 1 };
};

module.exports = pagination;
