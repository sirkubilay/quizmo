export const FONTS = [
  { id: "nunito",      name: "Nunito",      family: "'Nunito', sans-serif",       preview: "Merhaba 123",  premium: false },
  { id: "poppins",     name: "Poppins",     family: "'Poppins', sans-serif",      preview: "Merhaba 123",  premium: true  },
  { id: "raleway",     name: "Raleway",     family: "'Raleway', sans-serif",      preview: "Merhaba 123",  premium: true  },
  { id: "orbitron",    name: "Orbitron",    family: "'Orbitron', sans-serif",     preview: "ORBITRON",     premium: true  },
  { id: "pacifico",    name: "Pacifico",    family: "'Pacifico', cursive",        preview: "Pacifico",     premium: true  },
  { id: "press-start", name: "Pixel",       family: "'Press Start 2P', cursive",  preview: "Pixel",        premium: true  },
  { id: "roboto-slab", name: "Roboto Slab", family: "'Roboto Slab', serif",       preview: "Merhaba 123",  premium: true  },
  { id: "exo",         name: "Exo 2",       family: "'Exo 2', sans-serif",        preview: "Merhaba 123",  premium: true  },
];

export function getSavedFontId() {
  return localStorage.getItem("quizmo_font") || "nunito";
}

export function applyFont(id) {
  const font = FONTS.find(f => f.id === id) || FONTS[0];
  let styleEl = document.getElementById("quizmo-font-override");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "quizmo-font-override";
    document.head.appendChild(styleEl);
  }
  if (id === "nunito") {
    styleEl.textContent = "";
  } else {
    styleEl.textContent = `body, body * { font-family: ${font.family} !important; }`;
  }
  localStorage.setItem("quizmo_font", id);
}
