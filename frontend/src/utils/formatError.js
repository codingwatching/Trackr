const formatError = (error) => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  } else if (error?.message) {
    return error.message;
  }

  return "";
};

export default formatError;
