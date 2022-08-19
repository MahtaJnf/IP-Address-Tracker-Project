import { loadIP, loadMap } from "./JS/model/model.js";
import SearchView from "./JS/view/searchView.js";
import InfoView from "./JS/view/infoView.js";
import "./scss/index.scss";
// to use images: use copy-webpack-plugin
import "./images/icon-arrow.svg";

const controlSearchResults = async function () {
  try {
    // Get search ip
    const ip = SearchView.getQuery();

    if (!ip) return;

    console.log(ip);
    const data = await loadIP(ip);

    // Render results: update the box
    InfoView.renderInfo(
      data.ip,
      `${data.location.city},${data.location.region} ${data.location.postalCode}`,
      data.location.timezone,
      data.isp
    );

    // after search, empty the search tab
    document.querySelector(".search-msg").value = "";

    console.log(data.ip);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  loadMap();
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
