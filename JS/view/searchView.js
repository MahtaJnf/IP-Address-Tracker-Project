class SearchView {
  getQuery() {
    const ip = document.querySelector(".search-msg").value;

    return ip;
  }

  addHandlerSearch(handler) {
    //   event listener on click
    document
      .querySelector(".arrow-img")
      .addEventListener("click", function (e) {
        e.preventDefault();

        handler();
      });
    //   event listener on enter
    document
      .querySelector(".search-msg")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();

          handler();
        }
      });
  }
}

export default new SearchView();
