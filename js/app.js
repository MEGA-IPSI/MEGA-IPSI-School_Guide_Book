const PAGE_FILES = [
  'pages/00.표지/title.html',
  'pages/01.목차/list.html',
  'pages/02.파트/001.파트1/part1-01.html',
  'pages/02.파트/001.파트1/part1-02.html',
  'pages/02.파트/001.파트1/part1-03.html',
  'pages/02.파트/001.파트1/part1-04.html',
  'pages/02.파트/001.파트1/part1-05.html',
  'pages/02.파트/001.파트1/part1-06.html',
  'pages/02.파트/002.파트2/part2-01.html',
  'pages/02.파트/002.파트2/part2-02.html',
  'pages/02.파트/002.파트2/part2-03.html',
  'pages/02.파트/002.파트2/part2-04.html',
  'pages/02.파트/002.파트2/part2-05.html',
  'pages/02.파트/002.파트2/part2-06.html',
  'pages/02.파트/002.파트2/part2-07.html',
  'pages/02.파트/003.파트3/part3-01.html',
  'pages/02.파트/003.파트3/part3-02.html',
  'pages/02.파트/003.파트3/part3-03.html',
  'pages/02.파트/003.파트3/part3-04.html',
  'pages/02.파트/003.파트3/part3-05.html',
  'pages/02.파트/003.파트3/part3-06.html',
  'pages/02.파트/003.파트3/part3-07.html',
  'pages/02.파트/003.파트3/part3-08.html',
  'pages/02.파트/003.파트3/part3-09.html',
  'pages/02.파트/004.파트4/part4-01.html',
  'pages/02.파트/004.파트4/part4-02.html',
  'pages/02.파트/004.파트4/part4-03.html',
  'pages/02.파트/004.파트4/part4-04.html',
  'pages/02.파트/004.파트4/part4-05.html',
  'pages/02.파트/004.파트4/part4-06.html',
  'pages/02.파트/005.파트5/part5-01.html',
  'pages/02.파트/005.파트5/part5-02.html',
  'pages/02.파트/005.파트5/part5-03.html',
  'pages/02.파트/005.파트5/part5-04.html',
  'pages/02.파트/005.파트5/part5-05.html',
  'pages/02.파트/005.파트5/part5-06.html',
  'pages/02.파트/005.파트5/part5-07.html',
  'pages/02.파트/005.파트5/part5-08.html',
  'pages/02.파트/006.파트6/part6-01.html',
  'pages/02.파트/006.파트6/part6-02.html',
  'pages/02.파트/006.파트6/part6-03.html',
  'pages/02.파트/006.파트6/part6-04.html',
  'pages/03.부록/001.부록1/appendix1-01.html',
  'pages/03.부록/001.부록1/appendix1-02.html',
  'pages/03.부록/001.부록1/appendix1-03.html',
  'pages/03.부록/001.부록1/appendix1-04.html',
  'pages/03.부록/001.부록1/appendix1-05.html',
  'pages/03.부록/002.부록2/appendix2-01.html',
  'pages/03.부록/002.부록2/appendix2-02.html',
  'pages/03.부록/002.부록2/appendix2-03.html',
  'pages/03.부록/002.부록2/appendix2-04.html',
  'pages/03.부록/002.부록2/appendix2-05.html',
  'pages/03.부록/002.부록2/appendix2-06.html',
  'pages/03.부록/003.부록3/appendix3-01.html',
  'pages/03.부록/004.부록4/appendix4-01.html',
  'pages/03.부록/004.부록4/appendix4-02.html',
  'pages/03.부록/004.부록4/appendix4-03.html',
  'pages/03.부록/004.부록4/appendix4-04.html',
  'pages/03.부록/004.부록4/appendix4-05.html',
  'pages/03.부록/004.부록4/appendix4-06.html',
  'pages/03.부록/004.부록4/appendix4-07.html',
  'pages/03.부록/004.부록4/appendix4-08.html',
  'pages/03.부록/004.부록4/appendix4-09.html'
];

// ✅ 3단계 breakpoint
const BP_MOBILE_MAX = 767;   // mobile: 1page
const BP_TABLET_MAX = 1024;  // tablet: 2page
// desktop: 2page

let bookInitialized = false;

function getViewMode() {
  const w = window.innerWidth;
  if (w <= BP_MOBILE_MAX) return "mobile";
  if (w <= BP_TABLET_MAX) return "tablet";
  return "desktop";
}

function isMobileView() {
  return getViewMode() === "mobile";
}

function isDesktopOnly() {
  return getViewMode() === "desktop"; // desktop(1025px~)만 true
}

// ✅ 태블릿(768~1024) + 세로(portrait)면 모바일처럼 취급
function isTabletPortrait() {
  const w = window.innerWidth;
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  return (w > BP_MOBILE_MAX && w <= BP_TABLET_MAX && isPortrait);
}

function setupIframeLoadHandler(iframe) {
  const $iframe = $(iframe);
  if ($iframe.attr("data-handler-setup") === "true") return;
  $iframe.attr("data-handler-setup", "true");

  iframe.addEventListener("load", function() {
    function markReady() {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          $iframe.attr("data-ready", "true");
        });
      });
    }

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      function checkImagesLoaded() {
        const images = iframeDoc.querySelectorAll('img');
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
          markReady();
          return;
        }

        images.forEach(function(img) {
          if (img.complete) {
            loadedCount++;
          } else {
            img.addEventListener('load', function() {
              loadedCount++;
              if (loadedCount === totalImages) markReady();
            });
            img.addEventListener('error', function() {
              loadedCount++;
              if (loadedCount === totalImages) markReady();
            });
          }
        });

        if (loadedCount === totalImages) markReady();
      }

      if (iframeDoc.readyState === 'complete') {
        if (iframeDoc.fonts && iframeDoc.fonts.ready) {
          iframeDoc.fonts.ready.then(function() {
            setTimeout(checkImagesLoaded, 100);
          });
        } else {
          setTimeout(checkImagesLoaded, 200);
        }
      } else {
        iframeDoc.addEventListener('readystatechange', function() {
          if (iframeDoc.readyState === 'complete') {
            if (iframeDoc.fonts && iframeDoc.fonts.ready) {
              iframeDoc.fonts.ready.then(function() {
                setTimeout(checkImagesLoaded, 100);
              });
            } else {
              setTimeout(checkImagesLoaded, 200);
            }
          }
        });
      }
    } catch (e) {
      setTimeout(function() {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            $iframe.attr("data-ready", "true");
          });
        });
      }, 300);
    }
  }, { once: true });
}

function createPages() {
  const $flipbook = $("#flipbook");

  PAGE_FILES.forEach((pageFile, index) => {
    const pageNum = index + 1;

    // ✅ iframe은 src 없이 생성 (lazy attach)
    const iframe = $("<iframe></iframe>")
      .attr("data-src", pageFile + "?flipbook=1")
      .attr("loading", "lazy")
      .css({
        "pointer-events": "auto",
        "transform": "translateZ(0)"
      });

    setupIframeLoadHandler(iframe[0]);

    const pageClass = (pageNum % 2 === 0) ? "even" : "odd";

    const $page = $("<div></div>")
      .addClass("page " + pageClass)
      .attr("data-page", pageNum)
      .append(iframe);

    $page.appendTo($flipbook);
  });
}

function ensurePageLoaded(pageNum) {
  if (!pageNum || pageNum < 1 || pageNum > PAGE_FILES.length) return;

  const $page = $("#flipbook .page[data-page='" + pageNum + "']");
  const $iframe = $page.find("iframe");

  if (!$iframe.length) return;
  if ($iframe.attr("data-src-loaded") === "true") return;

  const src = $iframe.attr("data-src");
  if (!src) return;

  $iframe.attr("src", src);
  $iframe.attr("data-src-loaded", "true");
}

function getPreloadRadius() {
  return getViewMode() === "desktop" ? 3 : 2;
}

function preloadAround(page, radius) {
  radius = radius == null ? getPreloadRadius() : radius;
  for (let p = page - radius; p <= page + radius; p++) {
    ensurePageLoaded(p);
  }
}

function updatePageUI(page, view) {
  let pageNumberText = "";
  if (view && view.length > 1) {
    const pages = view.filter(p => p && p <= PAGE_FILES.length);
    if (pages.length === 0 || pages[0] === pages[pages.length - 1]) {
      pageNumberText = `${page || 1}`;
    } else {
      pageNumberText = `${pages[0]}-${pages[pages.length - 1]}`;
    }
  } else if (page) {
    pageNumberText = `${page}`;
  }

  const $pageLabel = $("#pageLabel");
  const $existingNumber = $pageLabel.find(".page-number");
  
  if ($existingNumber.length) {
    $existingNumber.text(pageNumberText);
    $pageLabel.find(".page-total").text(PAGE_FILES.length);
  } else {
    $pageLabel.html(
      `<span class="page-number">${pageNumberText}</span>` +
      `<span class="page-slash">/</span>` +
      `<span class="page-total">${PAGE_FILES.length}</span>`
    );
  }
  
  /* ✅ 여기 2줄 추가 */
  const totalDigits = String(PAGE_FILES.length).length;
  document.documentElement.style.setProperty('--total-digits', totalDigits);
  
  const currentPage = page || 1;
  const $slider = $("#pageSlider");
  if ($slider.length) {
    const max = PAGE_FILES.length;
    const rightPage = (view && view.length)
      ? Math.max(...view.filter(p => p && p <= max), 1)
      : currentPage;
    const sliderPage = Math.min(rightPage, max);
    $slider.val(sliderPage);
    const pct = max > 1 ? ((sliderPage - 1) / (max - 1)) * 100 : 0;
    $slider[0].style.setProperty("--slider-progress", pct + "%");
  }
}

function updateFlipbookLayout() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const mode = getViewMode();            // mobile/tablet/desktop
  const isMobile = (mode === "mobile") || isTabletPortrait();  // ✅ 모바일 + 태블릿 세로는 single

  const bottomBarHeight = 40;
  const verticalMargin = 20;

  const maxBookWidth = viewportWidth * 0.95;
  const maxBookHeight = viewportHeight - bottomBarHeight - verticalMargin;

  // ✅ A4 비율 유지
  const A4_RATIO = 297 / 210;

  let pageWidth, pageHeight, bookWidth, bookHeight, displayMode;

  if (isMobile) {
    // ✅ 모바일: 1페이지
    pageWidth = maxBookWidth;
    pageHeight = Math.round(pageWidth * A4_RATIO);

    if (pageHeight > maxBookHeight) {
      pageHeight = maxBookHeight;
      pageWidth = Math.round(pageHeight / A4_RATIO);
    }

    bookWidth = pageWidth;
    bookHeight = pageHeight;
    displayMode = "single";

    const scaleFactor = 0.97; // 모바일은 살짝 여유
    bookWidth = Math.round(bookWidth * scaleFactor);
    bookHeight = Math.round(bookHeight * scaleFactor);
    pageWidth = Math.round(pageWidth * scaleFactor);
    pageHeight = Math.round(pageHeight * scaleFactor);

  } else {
    // ✅ 태블릿/PC: 2페이지
    const maxPageWidth = maxBookWidth / 2;
    const maxPageHeight = maxBookHeight;

    if (maxPageWidth * A4_RATIO <= maxPageHeight) {
      pageWidth = maxPageWidth;
      pageHeight = Math.round(pageWidth * A4_RATIO);
    } else {
      pageHeight = maxPageHeight;
      pageWidth = Math.round(pageHeight / A4_RATIO);
    }

    bookWidth = pageWidth * 2;
    bookHeight = pageHeight;
    displayMode = "double";

    // 태블릿은 2페이지 유지 안정화를 위해 조금 더 축소
    const scaleFactor = (mode === "tablet") ? 0.94 : 0.97;

    bookWidth = Math.round(bookWidth * scaleFactor);
    bookHeight = Math.round(bookHeight * scaleFactor);
    pageWidth = Math.round(pageWidth * scaleFactor);
    pageHeight = Math.round(pageHeight * scaleFactor);
  }

  $(".flipbook-wrapper").css({ width: bookWidth, height: bookHeight });
  $("#flipbook").css({ width: bookWidth, height: bookHeight });
  $("#flipbook .page").css({ width: pageWidth, height: pageHeight });
  /* 하단바: 플립북 좌우 길이만큼 무조건 차지 (리사이즈 시마다 동일하게 갱신) */
  $(".bottom-bar").css({ width: bookWidth });

  // iframe 내부 A4 컨텐츠 리사이즈 메시지 유지
  setTimeout(function() {
    $("#flipbook .page iframe[data-ready='true']").each(function() {
      try {
        if (this.contentWindow) {
          this.contentWindow.postMessage({
            type: 'flipbook-resize',
            width: pageWidth,
            height: pageHeight
          }, '*');
        }
      } catch (e) {}
    });
  }, 300);

  if (!bookInitialized) {
    $("#flipbook").turn({
      width: bookWidth,
      height: bookHeight,
      display: displayMode,
      autoCenter: true,
      elevation: getViewMode() === "desktop" ? 0 : 1,
      gradients: false,
      duration: getViewMode() === "desktop" ? 1000 : 650,
      acceleration: true,
      when: {
        turning: function(event, page, view) {
          $(".flipbook-wrapper").addClass("turning");

          // ✅ 전환 직전: 다음/이전 페이지 미리 로드 (반경은 모드별)
          preloadAround(page, getPreloadRadius());

          $("#flipbook .page").removeClass("even odd");
          $("#flipbook .page").each(function(index) {
            if ((index + 1) % 2 === 0) $(this).addClass("even");
            else $(this).addClass("odd");
          });
        },
        turned: function(event, page, view) {
          // ✅ 전환 완료 후에도 주변 페이지 추가 로드 (연속 넘길 때 대비)
          preloadAround(page, getPreloadRadius());

          const currentPages = view || [page];
          let allReady = true;

          currentPages.forEach(function(p) {
            const $page = $("#flipbook .page[data-page='" + p + "']");
            const $iframe = $page.find("iframe");
            if ($iframe.length && !$iframe.attr("data-ready")) {
              allReady = false;
            }
          });

          function finalize() {
            requestAnimationFrame(function() {
              $(".flipbook-wrapper").removeClass("turning");
              $("#flipbook .page").removeClass("even odd");
              $("#flipbook .page").each(function(index) {
                if ((index + 1) % 2 === 0) $(this).addClass("even");
                else $(this).addClass("odd");
              });
              updatePageUI(page, view);
            });
          }

          if (allReady) finalize();
          else setTimeout(finalize, 100);
        }
      }
    });

    $("#flipbook .page").each(function(index) {
      if ((index + 1) % 2 === 0) $(this).addClass("even");
      else $(this).addClass("odd");
    });

    bookInitialized = true;
  } else {
    $("#flipbook").turn("size", bookWidth, bookHeight);
    $("#flipbook").turn("display", displayMode);

    $("#flipbook .page").removeClass("even odd");
    $("#flipbook .page").each(function(index) {
      if ((index + 1) % 2 === 0) $(this).addClass("even");
      else $(this).addClass("odd");
    });
  }

  const page = $("#flipbook").turn("page") || 1;
  const view = $("#flipbook").turn("view");
  updatePageUI(page, view);

  const $slider = $("#pageSlider");
  if ($slider.length) {
    $slider.attr("max", PAGE_FILES.length);
  }
}

// 전체화면
function requestFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen().catch(()=>{});
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

function isFullscreen() {
  return !!(document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement);
}

$(document).ready(function () {
  createPages();

  // ✅ 첫 화면은 1페이지 주변만 로드 (반경은 모드별)
  preloadAround(1, getPreloadRadius());

  updateFlipbookLayout();
  $(".flipbook-wrapper").removeClass("turning");

  function onFullscreenChange() {
    document.body.classList.toggle("fullscreen-active", isFullscreen());
  }
  document.addEventListener("fullscreenchange", onFullscreenChange);
  document.addEventListener("webkitfullscreenchange", onFullscreenChange);
  document.addEventListener("mozfullscreenchange", onFullscreenChange);
  document.addEventListener("MSFullscreenChange", onFullscreenChange);

  /* 전체화면: PC·태블릿·모바일 모두 동작 */
  $("#fullscreenBtn").on("click", function(e) {
    e.preventDefault();
    if (isFullscreen()) exitFullscreen();
    else requestFullscreen();
  });

  $("#bottomPrevBtn").click(function() {
    $("#flipbook").turn("previous");
  });

  $("#bottomNextBtn").click(function() {
    $("#flipbook").turn("next");
  });

  $("#firstPageBtn").click(function() {
    preloadAround(1, getPreloadRadius());
    $("#flipbook").turn("page", 1);
  });

  $("#lastPageBtn").click(function() {
    const lastPage = PAGE_FILES.length;
    preloadAround(lastPage, getPreloadRadius());
    $("#flipbook").turn("page", lastPage);
  });

  /* 페이지 번호 클릭/탭 후 입력: PC·태블릿·모바일 모두 동작 */
  $(document).on("click", ".page-number", function(e) {
    e.stopPropagation();
    const $numberSpan = $(this);
    if ($numberSpan.attr("contenteditable") === "true") return;

    const currentPage = $("#flipbook").turn("page") || 1;
    const originalText = $numberSpan.text();

    // 범위(8-9)면 첫 숫자만
    const firstPage = parseInt(originalText.split('-')[0], 10) || currentPage;

    $numberSpan
      .attr("contenteditable", "true")
      .text(firstPage)
      .focus();

    const range = document.createRange();
    range.selectNodeContents($numberSpan[0]);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });

  $(document).on("keydown", ".page-number[contenteditable='true']", function(e) {
    const $numberSpan = $(this);
    const maxPage = PAGE_FILES.length;

    if (e.key === "Enter") {
      e.preventDefault();
      const pageNum = parseInt($numberSpan.text(), 10);
      if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage) {
        preloadAround(pageNum, getPreloadRadius());
        $("#flipbook").turn("page", pageNum);
      }
      $numberSpan.attr("contenteditable", "false");
    } else if (e.key === "Escape") {
      e.preventDefault();
      const currentPage = $("#flipbook").turn("page") || 1;
      $numberSpan.text(currentPage);
      $numberSpan.attr("contenteditable", "false");
    }
  });

  $(document).on("blur", ".page-number[contenteditable='true']", function() {
    const $numberSpan = $(this);
    const maxPage = PAGE_FILES.length;
    const pageNum = parseInt($numberSpan.text(), 10);

    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPage) {
      preloadAround(pageNum, getPreloadRadius());
      $("#flipbook").turn("page", pageNum);
    } else {
      const currentPage = $("#flipbook").turn("page") || 1;
      $numberSpan.text(currentPage);
    }

    $numberSpan.attr("contenteditable", "false");
  });

  (function() {
    var resizeScheduled = false;
    $(window).on("resize", function() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(function() {
        resizeScheduled = false;
        updateFlipbookLayout();
        setTimeout(function() {
          $("#flipbook .page").removeClass("even odd");
          $("#flipbook .page").each(function(index) {
            if ((index + 1) % 2 === 0) $(this).addClass("even");
            else $(this).addClass("odd");
          });
        }, 100);
      });
    });
  })();

  updatePageUI(1, [1]);
});