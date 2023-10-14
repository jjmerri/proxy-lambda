import axios from "axios";

// Handler
export const handler = async function (event) {
  if (event.requestContext.http.method != "GET") {
    return { error: true, message: "Method not allowed!" };
  }
  return await getRequestData(event.requestContext.http.path.substring(1));
};

const getRequestData = async function (path) {
  if (path == undefined) {
    return { status: 400, message: "path is required" };
  }
  let response = null;
  try {
    let httpResponse = await axios.get(path, {
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
    });
    httpResponse.request = null;
    response = JSON.stringify(httpResponse);
  } catch (e) {
    console.log(e);
    response = {
      errors: ["'An error occured while fetching URL'", e],
    };
  }
  return response;
};
