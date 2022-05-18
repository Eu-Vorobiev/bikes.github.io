document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector(".nav");
  let menuBtn = document.querySelector(".menu-btn");
  let overlay = document.querySelector(".overlay");
  let header = document.querySelector(".header");
  let aside = document.querySelector(".marketplace__aside");
  let asideProfile = document.querySelector(".filters--profile");

  menuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("active");
    header.classList.toggle("b-bottom");
    overlay.classList.toggle("active");
    overlay.classList.remove("filter-page");
    document.body.classList.toggle("no-scroll");
    /*
    if (menu.classList.contains("active")) {
      disableScroll();
    } else {
      enableScroll();
    }
    */
    if (aside && aside.classList.contains("active")) {
      aside.classList.remove("active");
      overlay.classList.add("active");
    };
    if (asideProfile && asideProfile.classList.contains("active")) {
      asideProfile.classList.remove("active");
    }
  });

  const disableScroll = () => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dataset.scrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: ${-(window.scrollY)}px;
        padding-right: ${(scrollBarWidth)}px;
        `;
    header.style.cssText = `
          width: 99.9889%;
        `;
  };

  const enableScroll = () => {
    document.body.style.cssText = '';
    header.style.cssText = '';
    window.scroll({
      top: document.body.dataset.scrollY
    });
    document.body.dataset.scrollY = '';
  };
  /*
  let inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener("keyup", function () {
      this.value = this.value.replace(/[\\d]/g, '');
    }, "paste", function () {
      return false;
    });
  });
  */
});