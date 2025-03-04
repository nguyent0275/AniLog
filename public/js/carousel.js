const thumbnails = document.getElementsByClassName("thumbnail");
const carousel = document.querySelector(".carousel");

carousel.addEventListener("click", (e) => {
  // selects the <section> container for sliding effect
  let slider = e.target.parentNode.childNodes.tagName.contains("section");
  if (e.target.classList.contains("slide-left")) {
    scrollAmount = 0;
    let slideTimer = setInterval(() => {
      slider.scrollLeft -= 10;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  } else if (e.target.classList.contains("slide-right")) {
    scrollAmount = 0;
    let slideTimer = setInterval(() => {
      slider.scrollLeft += 10;
      scrollAmount += 10;
      if (scrollAmount >= 100) {
        window.clearInterval(slideTimer);
      }
    }, 25);
  }
});

// Slider Width values
// scrollWidth is the total width of the slider
// scrollLeft is the position of the slider on the X axis
// clientWidth is the visible part of the slider on the browser

// Auto Play Function
function autoPlay(e) {
  // reset position at the end of the slider
  // have to take into account that scrollLeft measures the left most position of the slider, and only the right side of the slider hits the scrollWidth when we want to reset.
  // therefore we need to subtract the scrollWidth from the clienWidth and 1 (good measure) to register  when the scrollLeft hits it's furthest point

  let sliderArray = document.querySelectorAll("#slider");
  sliderArray.forEach((e) => {
    if (e.scrollLeft >= e.scrollWidth - e.clientWidth - 1) {
      e.scrollLeft = 0;
    } else {
      e.scrollLeft += 1;
    }
  });
}

let play = setInterval(autoPlay, 10);

// Pause slider on hover
// loop through HTML collection of thumbnails and adds a mouseover and mouseout event
// mouseover pauses slider, mouseout resumes slider
for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("mouseover", () => {
    clearInterval(play);
  });
  thumbnails[i].addEventListener("mouseout", () => {
    return (play = setInterval(autoPlay, 10));
  });
}
