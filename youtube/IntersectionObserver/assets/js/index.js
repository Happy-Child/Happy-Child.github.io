document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".card");

  const options = {
    threshold: 0.2,
  };

  function loadImage(tag, src) {
    const newImage = new Image();

    newImage.addEventListener("load", function () {
      tag.src = src;
    });

    newImage.src = src;
  }

  function callback(entries, observer) {
    entries.forEach(entry =>  {
      if (entry.isIntersecting) {
        const el = entry.target;
        const img = el.querySelector("img");

        el.classList.add("card_animation");

        loadImage(img, img.dataset.src);
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);
  cards.forEach(card =>  observer.observe(card));

});
