document.addEventListener("DOMContentLoaded", function () {


  const input = {
    backgroundColor: document.querySelector("input[name='backgroundColor']"),
    borderColor: document.querySelector("input[name='borderColor']"),
    src: document.querySelector("select[name='src']"),
  };

  function setEventToElements() {
    for (const key in input) {
      if (input[key]) {
        input[key].addEventListener("change", function ({ target }) {
          const value = target.value;
          const inputType = target.getAttribute("name");
          const elSelector = target.getAttribute("data-el");
          const el = document.querySelector(elSelector);

          if (elSelector === ".content__img") {
            el.src = value;
          }
          else {
            el.style[inputType] = value;
          }

          setDataToStorage({
            [inputType]: value,
          });
        });
      }
    }
  }

  function setDataToElements(dataObj) {
    for (const key in dataObj) {
      if (dataObj[key]) {
        const elSelector = document.querySelector(`[name='${key}']`).getAttribute("data-el");
        const el = document.querySelector(elSelector);

        if (elSelector === ".content__img") {
          el.src = dataObj[key];
        }
        else {
          el.style[key] = dataObj[key];
        }

        input[key].value = dataObj[key];
      }
    }
  }

  function getDataFromStorage() {
    return {
      backgroundColor: JSON.parse(localStorage.getItem("backgroundColor")),
      borderColor: JSON.parse(localStorage.getItem("borderColor")),
      src: JSON.parse(localStorage.getItem("src")),
    }
  }

  function setDataToStorage(dataObj) {
    for (const key in dataObj) {
      localStorage.setItem(key, JSON.stringify(dataObj[key]))
    }
  }


  setEventToElements();
  const dataFromStorage = getDataFromStorage();
  setDataToElements(dataFromStorage);


});
