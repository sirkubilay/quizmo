const PROFILE_KEY = "quizmo_profile_name";
const GUEST_ID_KEY = "quizmo_guest_id";

/* Benzersiz 5 haneli misafir ID'si — cihaz başına bir kere üretilir */
function getGuestId() {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = String(Math.floor(10000 + Math.random() * 90000));
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

/* Kaydedilmiş profil adını döner; yoksa Misafir+5hane */
export function getPlayerName() {
  const saved = (localStorage.getItem(PROFILE_KEY) || "").trim();
  if (saved.length >= 2) return saved;
  return `Misafir${getGuestId()}`;
}

/* Misafir mi? (profil adı set edilmemiş) */
export function isGuest() {
  return (localStorage.getItem(PROFILE_KEY) || "").trim().length < 2;
}
