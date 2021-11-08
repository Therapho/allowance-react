export const ExtractErrorMessage = (error: any) => {
  let message = "";

  if (error.response && error.response.data) message = error.response.data;
  else if (error.message) message = error.message;

  return message;
};
