/**
 * 플립북 iframe 페이지용 공통 스크립트
 * ?flipbook=1 일 때 body/페이지 스타일 및 A4 스케일 조정, resize/postMessage 처리
 */
(function () {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("flipbook") !== "1") return;

  const A4_WIDTH_PX = 210 * 3.7795;
  const A4_HEIGHT_PX = 297 * 3.7795;

  function adjustForFlipbook() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "white";
    document.body.style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    const pageElement = document.querySelector(".page");
    if (pageElement) {
      pageElement.style.margin = "0";
      pageElement.style.border = "none";

      const iframeWidth = window.innerWidth;
      const iframeHeight = window.innerHeight;
      const scaleX = iframeWidth / A4_WIDTH_PX;
      const scaleY = iframeHeight / A4_HEIGHT_PX;
      const scale = Math.min(scaleX, scaleY);

      document.body.style.transform = "scale(" + scale + ")";
      document.body.style.transformOrigin = "top left";
      document.body.style.width = A4_WIDTH_PX + "px";
      document.body.style.height = A4_HEIGHT_PX + "px";
    }
  }

  function applyResizeMessage(event) {
    if (event.data && event.data.type === "flipbook-resize") {
      const newScaleX = event.data.width / A4_WIDTH_PX;
      const newScaleY = event.data.height / A4_HEIGHT_PX;
      const newScale = Math.min(newScaleX, newScaleY);
      document.body.style.transform = "scale(" + newScale + ")";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", adjustForFlipbook);
  } else {
    adjustForFlipbook();
  }

  window.addEventListener("message", applyResizeMessage, false);

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjustForFlipbook, 100);
  });
})();