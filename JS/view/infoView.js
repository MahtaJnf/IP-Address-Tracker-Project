// this module will be responsible for rendering the change coming from the IP searched

class InfoView {
  // update all the UI info for the IP serached
  renderInfo(ip, address, time, isp) {
    document.querySelector(".ip").textContent = ip;
    document.querySelector(".address").textContent = address;
    document.querySelector(".time").textContent = time;
    document.querySelector(".isp").textContent = isp;
  }
}
export default new InfoView();
