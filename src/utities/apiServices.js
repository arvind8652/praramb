import { BASEURL } from "./constants";

export const get = async (url) => {
  //   const resp = await fetch(`${BASEURL}${url}`, {
  //     mode: "no-cors",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       accept: "*/*",
  //     },
  //   });
  //   const result = await resp.json();
  //   return result;

  //   fetch(`https://jsonplaceholder.typicode.com/todos/1`)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json(); // or response.text(), etc.
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });

  return fetch(`${BASEURL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // or response.text() depending on the response type
    })
    .then((data) => {
      //   console.log(data); // Log the mock data received from Mockoon
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
