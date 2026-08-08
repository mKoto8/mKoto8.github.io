/* =========================================================
   共通スクリプト：ハンバーガーメニュー / お知らせ一覧の描画
   ========================================================= */

/**
 * NEWS_ITEMS（news-data.js で定義）を指定のリストへ描画する。
 * @param {string} containerId - 描画先の <ul id="..."> の id
 * @param {number|null} limit  - 表示件数の上限（null なら全件）
 */
function renderEntries(containerId, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (typeof NEWS_ITEMS === "undefined" || NEWS_ITEMS.length === 0) {
    el.innerHTML = '<li class="entry__empty">お知らせはまだありません。</li>';
    return;
  }

  const items = limit ? NEWS_ITEMS.slice(0, limit) : NEWS_ITEMS;

  el.innerHTML = items.map(function (item) {
    const tag = item.tag
      ? '<span class="entry__tag">' + item.tag + '</span>'
      : "";
    return (
      '<li class="entry">' +
        '<div class="entry__date">' + item.date + '</div>' +
        '<div class="entry__body">' + tag + '<h3>' + item.title + '</h3></div>' +
      '</li>'
    );
  }).join("");
}

document.addEventListener("DOMContentLoaded", function () {

  /* ---- ハンバーガーメニューの開閉 ---- */
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = nav.getAttribute("data-state") === "open";
      nav.setAttribute("data-state", isOpen ? "closed" : "open");
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        nav.setAttribute("data-state", "closed");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.setAttribute("data-state", "closed");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- 現在のページをナビゲーションに反映 ---- */
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav__link").forEach(function (link) {
    if (link.getAttribute("href") === current) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---- お知らせ一覧の描画 ---- */
  if (document.getElementById("homeNewsList")) {
    renderEntries("homeNewsList", 5);   // Home: 上から5件のみ
  }
  if (document.getElementById("infoNewsList")) {
    renderEntries("infoNewsList", null); // Information: 全件
  }
});
