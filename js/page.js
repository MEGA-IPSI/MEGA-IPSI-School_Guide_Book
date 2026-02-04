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

  /**
   * 📱 모바일 플립북에서 사용할 "모서리 탭" 네비게이션
   * - 페이지(iframe) 안쪽에서 좌/우 모서리를 탭하면 부모(메인 플립북)에 메세지를 보냄
   * - 실제 이전/다음 페이지 이동 여부는 부모 쪽(app.js)에서
   *   "현재가 모바일 뷰인지"를 확인한 뒤 결정
   */
  function handleEdgeTap(event) {
    try {
      // 터치/클릭 좌표 추출
      const point =
        (event.changedTouches && event.changedTouches[0]) ||
        (event.touches && event.touches[0]) ||
        event;

      if (!point || typeof point.clientX !== "number") return;

      const x = point.clientX;
      const width = window.innerWidth || document.documentElement.clientWidth;
      if (!width) return;

      const EDGE_RATIO = 0.25; // 좌/우 25% 구역을 "모서리"로 간주

      let side = null;
      if (x <= width * EDGE_RATIO) {
        side = "left";
      } else if (x >= width * (1 - EDGE_RATIO)) {
        side = "right";
      }

      if (!side) return;

      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "flipbook-edge-tap",
            side: side,
          },
          "*"
        );
      }
    } catch (e) {
      // 조용히 무시
    }
  }

  // 전체 문서에 대해 터치/클릭 리스너 등록
  document.addEventListener("click", handleEdgeTap, false);
  document.addEventListener("touchend", handleEdgeTap, false);
})();