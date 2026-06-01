import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";

const SECTIONS = [
  {
    title: "1. Veri Sorumlusu",
    content: `Bu Gizlilik Politikası, Altay Interactive tarafından geliştirilen Quizmo uygulaması ("Uygulama") kapsamında uygulanmaktadır. Kişisel verilerinizin işlenmesine ilişkin sorumlu taraf Altay Interactive'dir. İletişim: kubilaybayrak5@gmail.com`,
  },
  {
    title: "2. Toplanan Veriler",
    content: `Uygulama aşağıdaki verileri toplar ve işler:\n\n• Kullanıcı adı (isteğe bağlı, siz belirlersiniz)\n• Oyun skorları ve haftalık sıralama verisi (Firebase Firestore'da saklanır)\n• Oyun istatistikleri, başarımlar, XP verisi (yalnızca cihazınızda yerel olarak saklanır)\n• Avatar tercihi (yalnızca cihazınızda yerel olarak saklanır)\n\nUygulama; gerçek ad, e-posta adresi, telefon numarası veya konum bilgisi toplamaz.`,
  },
  {
    title: "3. Verilerin Kullanım Amacı",
    content: `Toplanan veriler şu amaçlarla kullanılır:\n\n• Haftalık sıralama tablosunun oluşturulması ve gösterilmesi\n• Oyun deneyiminin kişiselleştirilmesi (avatar, kullanıcı adı)\n• Kullanıcı başarımlarının ve ilerleme verilerinin saklanması\n• Uygulama performansının iyileştirilmesi`,
  },
  {
    title: "4. Verilerin Saklanması",
    content: `Oyun istatistikleri, başarımlar, XP ve tercihler yalnızca cihazınızın yerel depolama alanında (localStorage) tutulur; sunuculara aktarılmaz.\n\nHaftalık sıralama verileri (kullanıcı adı ve skor) Google Firebase Firestore altyapısında saklanır. Firebase'in gizlilik politikasına firebase.google.com/support/privacy adresinden ulaşabilirsiniz.`,
  },
  {
    title: "5. Üçüncü Taraflarla Paylaşım",
    content: `Kişisel verileriniz üçüncü taraflarla satılmaz, kiralanmaz veya ticari amaçla paylaşılmaz.\n\nUygulama, altyapı hizmetleri için Google Firebase'i kullanmaktadır. Firebase, Google LLC tarafından işletilmekte olup kendi gizlilik politikasına tabidir.`,
  },
  {
    title: "6. Çerez ve İzleme",
    content: `Uygulama, tarayıcı çerezi (cookie) kullanmaz. Cihaz tanımlaması için yalnızca rastgele oluşturulan ve cihazda saklanan anonim bir kimlik kullanılmaktadır. Bu kimlik kullanıcıyı kişisel olarak tanımlamaz.`,
  },
  {
    title: "7. Çocukların Gizliliği",
    content: `Uygulama, 13 yaşın altındaki çocuklardan bilerek kişisel veri toplamaz. Eğer 13 yaş altı bir kullanıcıya ait verilerin sistemde bulunduğunu fark ederseniz lütfen bizimle iletişime geçin; söz konusu veriler derhal silinecektir.`,
  },
  {
    title: "8. Kullanıcı Hakları",
    content: `6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:\n\n• Verilerinizin işlenip işlenmediğini öğrenme\n• İşlenen verileriniz hakkında bilgi talep etme\n• Verilerinizin silinmesini veya yok edilmesini isteme\n• Verilerinizin düzeltilmesini talep etme\n\nHesabınızdaki tüm yerel verileri, Profil > Ayarlar > Hesabımı Sil seçeneğiyle istediğiniz zaman silebilirsiniz.`,
  },
  {
    title: "9. İletişim",
    content: `Gizlilik politikamıza ilişkin soru, öneri veya talepleriniz için:\n\nE-posta: kubilaybayrak5@gmail.com\n\nBaşvurularınız en geç 30 gün içinde yanıtlanacaktır.`,
  },
  {
    title: "10. Politika Güncellemeleri",
    content: `Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler uygulama içinde bildirilecektir. Politikanın güncel haline her zaman bu sayfadan ulaşabilirsiniz.\n\nSon güncelleme: Haziran 2026`,
  },
];

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Particles />
      <div style={{ position: "fixed", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "36px 20px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
          <button onClick={() => navigate(-1)} className="btn-secondary" style={{ padding: "10px 16px", flexShrink: 0 }}>
            ← Geri
          </button>
          <div>
            <h1 style={{ fontWeight: 900, fontSize: "1.6rem", margin: 0 }}>🔒 Gizlilik Sözleşmesi</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "4px" }}>
              Quizmo — Altay Interactive
            </p>
          </div>
        </div>

        {/* Giriş */}
        <div className="glass-card" style={{ padding: "22px 24px", marginBottom: "20px", background: "linear-gradient(135deg,rgba(124,58,237,0.14),rgba(99,102,241,0.08))", border: "1px solid rgba(124,58,237,0.25)" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
            Quizmo'yu kullandığınız için teşekkür ederiz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar. Uygulamayı kullanarak bu politikayı kabul etmiş sayılırsınız.
          </p>
        </div>

        {/* Bölümler */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {SECTIONS.map((sec) => (
            <div key={sec.title} className="glass-card" style={{ padding: "22px 24px" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: "12px", color: "#c084fc" }}>
                {sec.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: "36px", textAlign: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>
            © 2026 Quizmo. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </div>
  );
}
