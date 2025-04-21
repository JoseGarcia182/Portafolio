
// Titulo cambiante
const frases = [
  "desarrollador web. ",
  "amante de la pizza. ",
  "gamer. ",
  "estudiante de ingenieria. ",
  "fanático del café. "
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;
const typedText = document.querySelector(".typed-text");

function type() {
  if (!typedText) return; // protección por si el elemento no existe

  if (!isDeleting && j <= frases[i].length) {
    currentText = frases[i].substring(0, j++);
    typedText.textContent = currentText;
  }

  if (isDeleting && j >= 0) {
    currentText = frases[i].substring(0, j--);
    typedText.textContent = currentText;
  }

  if (!isDeleting && j === frases[i].length) {
    isDeleting = true;
    setTimeout(type, 1500); // pausa antes de borrar
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % frases.length;
  }

  setTimeout(type, isDeleting ? 50 : 100); // esta línea siempre se ejecuta
}




// Boton de scroll up
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 500); // pequeña demora para arrancar
});

const scrollBtn = document.querySelector(".scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });



  