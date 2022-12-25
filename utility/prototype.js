export default (() => {
  Object.defineProperty(String, "capitalize", {
    value: function () {
      return this.charAt(0).toUpperCase().concat(this.slice(1));
    },
  });
})();
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
export function getImageUrl(name) {
  return new URL(name, import.meta.url).href;
}
