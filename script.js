const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev-slide");
const next = document.querySelector(".next-slide");

let index = 0;

function updateSlideWidth() {
    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);
    return slideWidth;
}

function updateSlider() {
    const slideWidth = updateSlideWidth();
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});

window.addEventListener("resize", updateSlider);