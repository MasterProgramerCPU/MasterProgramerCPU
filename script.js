const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, idx) => {
  item.style.transitionDelay = `${Math.min(idx * 90, 320)}ms`;
  revealObserver.observe(item);
});

const cursorGlow = document.getElementById("cursorGlow");

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener("pointerdown", () => {
    cursorGlow.style.opacity = "0.85";
  });

  window.addEventListener("pointerup", () => {
    cursorGlow.style.opacity = "0.6";
  });
}

const typeLine = document.getElementById("typeLine");
const phrases = [
  "sudo chicken-fight --network",
  "injecting quahog.exe into mainframe",
  "compiling chaos... done",
  "deploying memes to production"
];

if (typeLine) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];

    if (!deleting) {
      charIndex += 1;
      typeLine.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        deleting = true;
        setTimeout(tick, 1100);
        return;
      }
    } else {
      charIndex -= 1;
      typeLine.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, deleting ? 32 : 58);
  };

  tick();
}
