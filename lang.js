// Kalbos parinkimas abiem puslapiams (index.html ir news.html).
//
// Tvarka: ?lang= (taip atidaro pati programa, kur kalba gali būti pasirinkta
// rankiniu būdu) → naršyklės kalba (lietuviška → LT, ispaniška → ES) → EN.
//
// Kraunamas <head> be defer SĄMONINGAI: atributas turi atsirasti ant <html>
// PRIEŠ piešiant turinį, kitaip lietuviškos naršyklės naudotojas akimirkai
// pamatytų anglišką tekstą (CSS slepia kitos kalbos blokus pagal šį atributą).
(function () {
  function pickLanguage() {
    var query = new URLSearchParams(window.location.search).get("lang");
    if (query === "lt" || query === "en" || query === "es") return query;
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).toLowerCase();
      if (code.indexOf("lt") === 0) return "lt";
      if (code.indexOf("es") === 0) return "es";
    }
    return "en";
  }

  function apply(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang;
    var buttons = document.querySelectorAll(".toggle button");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-lang") === lang;
      buttons[i].classList.toggle("active", isActive);
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  apply(pickLanguage());

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".toggle button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        apply(this.getAttribute("data-lang"));
      });
    }
    // Mygtukai atsiranda tik dabar - pažymim aktyvų iš naujo.
    apply(document.documentElement.getAttribute("data-lang") || "en");
  });
})();
