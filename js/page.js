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
   * 📱 모바일 플립북에서 사용할 "스와이프" 네비게이션
   * - 페이지(iframe) 안쪽에서 좌↔우로 스윽 미는 제스처를 감지
   * - 좌/우 스와이프 방향만 부모(메인 플립북)에 전달
   * - 실제 이전/다음 페이지 이동 여부는 부모 쪽(app.js)에서
   *   "현재가 모바일 뷰인지"를 확인한 뒤 결정
   */
  let touchStartX = null;
  let touchStartY = null;

  document.addEventListener(
    "touchstart",
    function (event) {
      if (!event.touches || event.touches.length === 0) return;
      const t = event.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    function (event) {
      try {
        if (
          touchStartX == null ||
          touchStartY == null ||
          !event.changedTouches ||
          event.changedTouches.length === 0
        ) {
          return;
        }

        const t = event.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = Math.abs(t.clientY - touchStartY);

        // 세로로 많이 움직였거나, 가로 이동이 너무 짧으면 무시
        const MIN_SWIPE_DISTANCE = 40; // px
        const MAX_VERTICAL_DRIFT = 80; // px
        if (Math.abs(dx) < MIN_SWIPE_DISTANCE || dy > MAX_VERTICAL_DRIFT) {
          touchStartX = null;
          touchStartY = null;
          return;
        }

        let side = null;
        if (dx < 0) {
          // 오른쪽으로 넘기기 (→)
          side = "right";
        } else if (dx > 0) {
          // 왼쪽으로 넘기기 (←)
          side = "left";
        }

        if (side && window.parent && window.parent !== window) {
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
      } finally {
        touchStartX = null;
        touchStartY = null;
      }
    },
    { passive: true }
  );
})();