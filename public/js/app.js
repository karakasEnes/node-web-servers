const weatherForm = document.querySelector("form");
const userInput = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInputValue = userInput.value;
  console.log(userInputValue);
  const url = `/weather?address=${userInputValue}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let markup;

      if (data.errorMessage) {
        markup = `<h2>${data.errorMessage}</h2>`;
      } else {
        markup = `
                      <h2>${data.address}
                      </h2>
                      <p>${data.forecast}
                      </p>
                      <p>${data.location}
                      </p>`;
      }

      //   weatherForm.insertAdjacentText("beforeend", markup);
      weatherForm.innerHTML = "";
      weatherForm.insertAdjacentHTML("beforeend", markup);
    })
    .catch((err) => console.log(err));
});
