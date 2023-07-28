const initialPriceRequest = (input) => {
    fetch("http://localhost:8000/initial-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(input),
      }).then(function (response) {
        return response.json();
      });
}

export default initialPriceRequest;