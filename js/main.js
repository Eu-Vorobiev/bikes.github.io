document.addEventListener("DOMContentLoaded", function () {
  let header = document.querySelector(".header"); 
  let overlay = document.querySelector(".overlay");
  let cryptoItemBtns = document.querySelectorAll(".crypto-item__btn");
  let catalogCards = document.querySelectorAll("#catalog-card");
  let profileCards = document.querySelectorAll("#profile-card");
  let cryptoModal = document.querySelector(".cryptobox-modal");
  let cardBuyModal = document.querySelector("#buy-modal");
  let cardSellModal = document.querySelector("#sell-modal");
  let modalClose = document.querySelector("#modal-close");
  let filterBtn = document.querySelectorAll(".accordion__btn");
  let filterItem = document.querySelectorAll(".accordion__item");
  let asideBtn = document.querySelector("#aside-btn");
  let profileAsideBtn = document.querySelector("#profile-aside-btn");
  let aside = document.querySelector(".marketplace__aside");
  let asideProfile = document.querySelector(".filters--profile");

  // Accordion
  if (filterBtn) {
    for (i = 0; i < filterItem.length; i++) {
      filterItem[i].className = 'accordion__item close';
      filterItem[0].className = 'accordion__item open';
    }

    function toggleItem() {
      let itemClass = this.parentNode.className;
      if (itemClass == 'accordion__item close') {
        this.parentNode.className = 'accordion__item open';
      } else {
        this.parentNode.className = 'accordion__item close';
      }
    }
    for (i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener('click', toggleItem);
    }

    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let filterInfo = this.parentNode.querySelector(".accordion__info");
        if (filterInfo.style.maxHeight) {
          filterInfo.style.maxHeight = null;
          filterInfo.classList.remove("shown");
        } else {
          filterInfo.style.maxHeight = (filterInfo.scrollHeight + 20) + "px";
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

  if (asideProfile) {
    profileAsideBtn.addEventListener("click", function () {
      asideProfile.classList.toggle("active");
    })
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
        header.style.cssText = `
          padding-right: 1px;
        `;
        document.body.classList.add("no-scroll");
        // disableScroll();
      });
    });
  }

  showModal(cryptoItemBtns, cryptoModal);
  showModal(catalogCards, cardBuyModal);
  showModal(profileCards, cardSellModal);

  function removeModal(modal) {
    if (modalClose) {
      modalClose.addEventListener("click", function () {
        if (modal) {
          modal.classList.remove("visible");
          // enableScroll();
          header.style.cssText = `
          `;
          document.body.classList.remove("no-scroll");
        }
      });
    }
    document.addEventListener("keydown", function (e) {
      e.preventDefault();
      if (e.key === "Escape" && modal) {
        modal.classList.remove("visible");
        // enableScroll();
        header.style.cssText = `
        `;
        document.body.classList.remove("no-scroll");
      }
    })
  }

  removeModal(cryptoModal);
  removeModal(cardBuyModal);
  removeModal(cardSellModal);

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
  const rangeInputs = document.querySelectorAll('input.range');

  if (rangeInputs) {
    function handleInputChange(e) {
      let target = e.target
      // if (e.target.type !== 'range') {
      //   target = document.getElementById('range')
      // }
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 5px';
    }

    rangeInputs.forEach(function (input) {
      input.addEventListener('input', handleInputChange);
    });
  }

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
});