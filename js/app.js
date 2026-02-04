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

    // 모바일(single) vs 그 외(double) 기준 슬라이더 매핑
    function pageToSliderPos(page, isMobile) {
      if (isMobile) return Math.max(1, Math.min(page || 1, PAGE_FILES.length));
      if (page === 1) return 1;
      return Math.ceil((page - 1) / 2) + 1;
    }

    function sliderPosToPage(sliderPos, isMobile) {
      if (isMobile) return Math.max(1, Math.min(sliderPos || 1, PAGE_FILES.length));
      if (sliderPos === 1) return 1;
      return (sliderPos - 1) * 2;
    }

    function getSliderMax(isMobile) {
      if (isMobile) return PAGE_FILES.length;
      if (PAGE_FILES.length === 1) return 1;
      return Math.ceil((PAGE_FILES.length - 1) / 2) + 1;
    }

    function updateSliderProgress() {
      const $slider = $("#pageSlider");
      const value = parseInt($slider.val(), 10) || 1;
      const max = parseInt($slider.attr("max"), 10) || 1;
      const progress = max > 1 ? ((value - 1) / (max - 1)) * 100 : 0;
      document.documentElement.style.setProperty('--slider-progress', progress + '%');
    }

    function updatePageUI(page, view) {
      const isMobile = isMobileView();
      const sliderMax = getSliderMax(isMobile);

      $("#pageSlider").attr("max", sliderMax);

      const sliderPos = pageToSliderPos(page || 1, isMobile);
      $("#pageSlider").val(sliderPos);

      updateSliderProgress();

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
    }

    function updateFlipbookLayout() {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const mode = getViewMode();            // mobile/tablet/desktop
      const isMobile = (mode === "mobile");  // ✅ 모바일만 single

      const SCREEN_MARGIN = 10;
      const ARROW_WIDTH = 44;

      // PC는 기존 여백 유지, 태블릿/모바일은 조금 줄여 화면 효율 ↑
      const ARROW_MARGIN = (mode === "desktop") ? 30 : 18;

      const navBtnSpace = (ARROW_MARGIN + ARROW_WIDTH + SCREEN_MARGIN) * 2;

      const bottomBarHeight = 40;
      const verticalMargin = 20;

      const maxBookWidth = Math.max(viewportWidth - navBtnSpace, viewportWidth * 0.9);
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
                  const isMobileCheck = isMobileView();
                  $("#pageSlider").attr("max", getSliderMax(isMobileCheck));
                  updatePageUI(page, view);
                  requestAnimationFrame(updateNavButtonPosition);
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
      $("#pageSlider").attr("max", getSliderMax(isMobile));
      updatePageUI(page, view);
      updateNavButtonPosition();
    }

    function updateNavButtonPosition() {
      const mode = getViewMode();
      const isMobile = isMobileView();
      const ARROW_MARGIN = (mode === "desktop") ? 30 : 18;
      const ARROW_SIZE = 44;
      const MIN_SCREEN_MARGIN = 10;
      const MOBILE_TOP_MARGIN = 18;

      const $flipbookWrapper = $(".flipbook-wrapper");
      const $prevBtn = $("#prevBtn");
      const $nextBtn = $("#nextBtn");

      if (!$flipbookWrapper.length || !$prevBtn.length || !$nextBtn.length) return;

      const wrapperRect = $flipbookWrapper[0].getBoundingClientRect();
      const wrapperLeft = wrapperRect.left;
      const wrapperRight = wrapperRect.right;
      const wrapperTop = wrapperRect.top;
      const wrapperHeight = wrapperRect.height;

      const viewportWidth = window.innerWidth;

      if (isMobile) {
        // 모바일: 화살표를 페이지 위쪽·중앙 쪽에 배치 (두 버튼이 가운데로 모이도록)
        const topY = wrapperTop - MOBILE_TOP_MARGIN - ARROW_SIZE;
        const centerX = (wrapperLeft + wrapperRight) / 2;
        const MOBILE_ARROW_GAP = 12;  // 두 화살표 사이 간격
        let prevLeft = centerX - MOBILE_ARROW_GAP - ARROW_SIZE;
        let nextLeft = centerX + MOBILE_ARROW_GAP;
        if (prevLeft < MIN_SCREEN_MARGIN) prevLeft = MIN_SCREEN_MARGIN;
        if (nextLeft + ARROW_SIZE > viewportWidth - MIN_SCREEN_MARGIN) {
          nextLeft = viewportWidth - ARROW_SIZE - MIN_SCREEN_MARGIN;
        }
        $prevBtn.css({
          left: prevLeft + 'px',
          top: Math.max(MIN_SCREEN_MARGIN, topY) + 'px',
          transform: 'translateY(0)'
        });
        $nextBtn.css({
          left: nextLeft + 'px',
          top: Math.max(MIN_SCREEN_MARGIN, topY) + 'px',
          transform: 'translateY(0)'
        });
      } else {
        // PC/태블릿: 양쪽 페이지 바깥에 배치
        let prevLeft = wrapperLeft - ARROW_MARGIN - ARROW_SIZE;
        let nextLeft = wrapperRight + ARROW_MARGIN;
        if (prevLeft < MIN_SCREEN_MARGIN) prevLeft = MIN_SCREEN_MARGIN;
        if (nextLeft + ARROW_SIZE > viewportWidth - MIN_SCREEN_MARGIN) {
          nextLeft = viewportWidth - ARROW_SIZE - MIN_SCREEN_MARGIN;
        }
        $prevBtn.css({
          left: prevLeft + 'px',
          top: (wrapperTop + wrapperHeight / 2) + 'px',
          transform: 'translateY(-50%)'
        });
        $nextBtn.css({
          left: nextLeft + 'px',
          top: (wrapperTop + wrapperHeight / 2) + 'px',
          transform: 'translateY(-50%)'
        });
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

      const isMobile = isMobileView();
      $("#pageSlider").attr("max", getSliderMax(isMobile)).val(1);

      updateFlipbookLayout();
      $(".flipbook-wrapper").removeClass("turning");

      $("#fullscreenBtn").on("click", function(e) {
        if (!isDesktopOnly()) {
          e.preventDefault();
          return;
        }
        if (isFullscreen()) exitFullscreen();
        else requestFullscreen();
      });

      $("#prevBtn").click(function() {
        $("#flipbook").turn("previous");
      });

      $("#nextBtn").click(function() {
        $("#flipbook").turn("next");
      });

      $("#pageSlider").on("input change", function () {
        const sliderPos = parseInt($(this).val(), 10);
        const isMobile = isMobileView();
        const targetPage = sliderPosToPage(sliderPos, isMobile);
        updateSliderProgress();
        preloadAround(targetPage, getPreloadRadius());
        $("#flipbook").turn("page", targetPage);
      });

      $(document).on("click", ".page-number", function(e) {
        // ✅ PC에서만 입력 이동 기능 허용
        if (!isDesktopOnly()) return;

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
        // ✅ PC에서만 동작 (혹시 다른 환경에서 contenteditable이 켜졌을 때 대비)
        if (!isDesktopOnly()) {
          $(this).attr("contenteditable", "false");
          return;
        }

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
        // ✅ PC에서만 동작
        if (!isDesktopOnly()) {
          $(this).attr("contenteditable", "false");
          return;
        }

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
            const isMobile = isMobileView();
            $("#pageSlider").attr("max", getSliderMax(isMobile));
            const currentPage = $("#flipbook").turn("page") || 1;
            const currentSliderPos = pageToSliderPos(currentPage, isMobile);
            $("#pageSlider").val(currentSliderPos);
            updateSliderProgress();
            updateFlipbookLayout();
            setTimeout(function() {
              $("#flipbook .page").removeClass("even odd");
              $("#flipbook .page").each(function(index) {
                if ((index + 1) % 2 === 0) $(this).addClass("even");
                else $(this).addClass("odd");
              });
            }, 100);
            setTimeout(updateNavButtonPosition, 100);
          });
        });
      })();

      updatePageUI(1, [1]);
      setTimeout(updateNavButtonPosition, 200);
    });