export const makeFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  const response = await fetch(input, init);
  if (response.status >= 500) {
    throw new Error(await response.text());
  }
  if (response.status >= 400) {
    throw new Error(JSON.stringify(await response.json()));
  }
  return response;
};
