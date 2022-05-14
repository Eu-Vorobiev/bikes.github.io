document.addEventListener("DOMContentLoaded", function () {
  let cryptoItemBtns = document.querySelectorAll(".crypto-item__btn");
  let catalogCards = document.querySelectorAll(".catalog-card");
  let cryptoModal = document.querySelector(".cryptobox-modal");
  let cardBuyModal = document.querySelector(".buy-modal");
  let cardSellModal = document.querySelector(".sell-modal");
  let modalClose = document.querySelector("#modal-close");
  let menu = document.querySelector(".nav");
  let menuBtn = document.querySelector(".menu-btn");
  let overlay = document.querySelector(".overlay");
  let header = document.querySelector(".header");
  let filterBtn = document.querySelectorAll(".accordion__btn");
  let asideBtn = document.querySelector("#aside-btn");
  let aside = document.querySelector(".marketplace__aside");

  menuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("active");
    header.classList.toggle("b-bottom");
    overlay.classList.toggle("active");
    overlay.classList.remove("filter-page");
    if (menu.classList.contains("active")) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (aside && aside.classList.contains("active")) {
      aside.classList.remove("active");
      overlay.classList.add("active");
    };
  });

  const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        width: 100%;
        height: 100vh;
        top: ${-window.scrollY}px;
        overflow: hidden;
        padding-right: ${(scrollBarWidth)}px;
      `;
  };

  const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dataset.scrollY
    });
    document.body.dataset.scrollY = '';
  };

  // Accordion
  if (filterBtn) {
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let filterInfo = this.parentNode.querySelector(".accordion__info");
        if (filterInfo.style.maxHeight) {
          filterInfo.style.maxHeight = null;
          filterInfo.classList.remove("shown");
        } else {
          filterInfo.style.maxHeight = filterInfo.scrollHeight + "px";
          filterInfo.classList.add("shown");
        }
      });
    };
  }

  // Show filters marketplace
  if (aside) {
    asideBtn.addEventListener("click", function () {
      aside.classList.toggle("active");
      overlay.classList.toggle("active");
      overlay.classList.toggle("filter-page");
    });
  }

  // Counter
  let counter = document.querySelector(".counter");
  let counterInner = document.querySelector('.count');
  let plusBtn = document.querySelector(".plus");
  let minusBtn = document.querySelector(".minus");

  if (counter) {
    let count = 1;
    counterInner.innerHTML = `${count}`;

    function plus() {
      count += 1;
      counterInner.innerHTML = `${count}`;
    }

    function minus() {
      if (count == 1) {
        return false;
      }
      count -= 1;
      counterInner.innerHTML = `${count}`;
    }

    plusBtn.addEventListener("click", plus);
    minusBtn.addEventListener("click", minus);
  }

  // Modals
  function showModal(btnArray, modal) {

    btnArray.forEach(btn => {
      btn.addEventListener("click", function () {
        modal.classList.add("visible");
        document.body.classList.add("no-scroll");
      });
    });

  }

  showModal(cryptoItemBtns, cryptoModal);
  showModal(catalogCards, cardBuyModal);

  function removeModal(modal) {
    if (modalClose) {
      modalClose.addEventListener("click", function () {
        if (modal) {
          modal.classList.remove("visible");
          document.body.classList.remove("no-scroll");
        }
      });
    }
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "Escape" && modal) {
        modal.classList.remove("visible");
        document.body.classList.remove("no-scroll");
      }
    })
  }

  removeModal(cryptoModal);
  removeModal(cardBuyModal);

  // Tabs
  let tabBtn = document.querySelectorAll(".tab__item");
  let tabContent = document.querySelectorAll(".tab__content");

  tabBtn.forEach(elem => {
    elem.addEventListener("click", function () {
      showTabContent(elem.dataset.tabindex);
      tabBtn.forEach(elem => {
        elem.classList.remove("active");
      });
      this.classList.add("active");
    });
  });

  let hideTabContent = () => {
    for (let i = 1; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
  };

  hideTabContent();

  function showTabContent(tabindex) {
    for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].classList.add("hidden");
    };
    tabContent[tabindex - 1].classList.remove("hidden");
  }

  // Range Inputs
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  if (rangeInputs) {
    function handleInputChange(e) {
      let target = e.target
      if (e.target.type !== 'range') {
        target = document.getElementById('range')
      }
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 5px';
    }

    rangeInputs.forEach(input => {
      input.addEventListener('input', handleInputChange);
      // let numberInput = input.nextElementSibling.classList(".range-value");
      // numberInput.value == input.value;
    });
  }
});

// Catalog Slider
let swiperBikes = document.querySelector(".catalog-bikes__slider");

if (swiperBikes) {
  swiperBikesSlider = new Swiper(swiperBikes, {
    loop: true,

    pagination: {
      el: '.catalog-bikes-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.catalog-bikes__slider-nextBtn',
      prevEl: '.catalog-bikes__slider-prevBtn',
    },

  });
}

let swiperItems = document.querySelector(".catalog-items__slider");
if (swiperItems) {
  swiperItemsSlider = new Swiper(swiperItems, {
    loop: true,

    pagination: {
      el: '.catalog-items-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.catalog-items__slider-nextBtn',
      prevEl: '.catalog-items__slider-prevBtn',
    },

  });
}