import { BASEURL } from "./constants";

export const get = async (url) => {
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

export const post = async (url, postData) => {
  return fetch(`${BASEURL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type based on your API requirements
      // Add any other headers if needed
    },
    body: JSON.stringify(postData), // Convert the data to JSON format
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Assuming the response is in JSON format
    })
    .then((data) => {
      // Handle the successful response data here
      console.log("Response data:", data);
      return data;
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
};

export const put = async (url, putData) => {
  // Send a PUT request to update the task
  fetch(`${BASEURL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(putData),
  })
    .then((response) => response.json())
    .then((updatedTask) => {
      console.log("Task updated successfully:", updatedTask);
      return updatedTask;
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
};

export const deleted = (url) => {
  // Send a DELETE request to delete the task
  fetch(`${BASEURL}${url}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return "deleted success";
      } else {
        console.error("Error deleting task:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
};
