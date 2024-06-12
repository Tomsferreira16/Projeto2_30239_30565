const loadNavBar = () => {
  fetch("/static/templates/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementsByTagName("body")[0]
        .insertAdjacentHTML("afterbegin", data);
    });
};

const loadFooter = () => {
  fetch("/static/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document
        .getElementsByTagName("body")[0]
        .insertAdjacentHTML("beforeend", data);
    });
};
