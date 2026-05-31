const dunyaTarihi1 = [
  {
    id: 1,
    question: "Tarihte yazıyı icat ederek tarih çağlarını başlatan ilk uygarlık hangisidir?",
    options: ["Sümerler", "Mısırlılar", "Babiller", "Hititler"],
    answer: "Sümerler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 2,
    question: "Avrupa'da derebeylik sistemini bitiren, feodal kaleleri yıkabilecek ateşli silah gücünü ortaya çıkaran teknolojik gelişme hangisidir?",
    options: ["Barutun ateşli silahlarda kullanılması", "Matbaanın icadı", "Pusulanın geliştirilmesi", "Buhar makinesinin icadı"],
    answer: "Barutun ateşli silahlarda kullanılması",
    difficulty: "medium",
    points: 20
  },
  {
    id: 3,
    question: "İngiltere'de 1215 yılında imzalanan, kralın yetkilerini ilk kez kısıtlayarak Avrupa'da demokrasi tarihinin başlangıcı sayılan belge hangisidir?",
    options: ["Magna Carta", "İnsan Hakları Beyannamesi", "Versay Antlaşması", "Bill of Rights"],
    answer: "Magna Carta",
    difficulty: "hard",
    points: 30
  },
  {
    id: 4,
    question: "Giza Piramitleri, sfenksleri ve hiyeroglif yazısıyla ünlü antik çağ medeniyeti hangisidir?",
    options: ["Mısır Medeniyeti", "Mezopotamya Medeniyeti", "İnka Medeniyeti", "Yunan Medeniyeti"],
    answer: "Mısır Medeniyeti",
    difficulty: "easy",
    points: 10
  },
  {
    id: 5,
    question: "Avrupa'da insan gücünden makine gücüne geçişi sağlayan Sanayi Devrimi ilk olarak hangi ülkede başlamıştır?",
    options: ["İngiltere", "Fransa", "Almanya", "İtalya"],
    answer: "İngiltere",
    difficulty: "medium",
    points: 20
  },
  {
    id: 6,
    question: "MÖ 490 yılında Persler ile Atinalılar arasında yapılan ve günümüzdeki uzun mesafe koşusuna adını veren ünlü antik savaş hangisidir?",
    options: ["Maraton Savaşı", "Termofil Savaşı", "Salamis Savaşı", "Platea Savaşı"],
    answer: "Maraton Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 7,
    question: "Orta Çağ'da Avrupalı Hıristiyanların, Müslümanların elindeki kutsal toprakları geri almak amacıyla düzenlediği askeri seferlere ne ad verilir?",
    options: ["Haçlı Seferleri", "Coğrafi Keşifler", "Yüzyıl Savaşları", "Kavimler Göçü"],
    answer: "Haçlı Seferleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 8,
    question: "Japonya'da yüzlerce yıl boyunca imparatorun arkasında ülkeyi askeri olarak yöneten feodal diktatörlere verilen unvan hangisidir?",
    options: ["Şogun", "Samuray", "Kamikaze", "Daimyo"],
    answer: "Şogun",
    difficulty: "medium",
    points: 20
  },
  {
    id: 9,
    question: "14. yüzyılda Avrupa nüfusunun neredeyse üçte birinin ölümüne neden olan, feodalizmin çöküşünü hızlandıran 'Kara Ölüm' lakaplı salgın hastalık hangisidir?",
    options: ["Veba", "Kolera", "Çiçek Hastalığı", "Sıtma"],
    answer: "Veba",
    difficulty: "hard",
    points: 30
  },
  {
    id: 10,
    question: "Soğuk Savaş döneminde Berlin'i ikiye bölen, Doğu ve Batı blokları arasındaki ayrılığın sembolü olan Berlin Duvarı hangi yıl yıkılmıştır?",
    options: ["1989", "1945", "1961", "1991"],
    answer: "1989",
    difficulty: "easy",
    points: 10
  },
  {
    id: 11,
    question: "Tarihte ilk atom bombası İkinci Dünya Savaşı'nın sonlarında, Amerika Birleşik Devletleri tarafından hangi ülkeye atılmıştır?",
    options: ["Japonya", "Almanya", "Rusya", "Vietnam"],
    answer: "Japonya",
    difficulty: "medium",
    points: 20
  },
  {
    id: 12,
    question: "Hindistan'da İngiliz sömürge yönetimine karşı pasif direniş, açlık grevleri ve sivil itaatsizlik hareketini başlatan efsanevi ruhani lider kimdir?",
    options: ["Mahatma Gandi", "Cevahirlal Nehru", "Subhas Chandra Bose", "Rabindranath Tagore"],
    answer: "Mahatma Gandi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 13,
    question: "Hıristiyanlık dinini resmi olarak kabul eden ve Akdeniz havzasına yüzlerce yıl hükmeden ilk büyük Avrupa imparatorluğu hangisidir?",
    options: ["Roma İmparatorluğu", "Kutsal Roma Cermen İmparatorluğu", "İngiliz İmparatorluğu", "Frank Krallığı"],
    answer: "Roma İmparatorluğu",
    difficulty: "easy",
    points: 10
  },
  {
    id: 14,
    question: "Fransız İhtilali'nin ardından yayılan milliyetçilik akımı dünyada en çok hangi devlet yapısını olumsuz etkilemiştir?",
    options: ["Çok uluslu imparatorlukları", "Tek uluslu krallıkları", "Şehir devletlerini", "Sömürge kolonilerini"],
    answer: "Çok uluslu imparatorlukları",
    difficulty: "medium",
    points: 20
  },
  {
    id: 15,
    question: "I. Dünya Savaşı'nı İttifak Devletleri adına resmi olarak bitiren, Almanya'ya çok ağır askeri ve ekonomik yaptırımlar getiren ünlü antlaşma hangisidir?",
    options: ["Versay Antlaşması", "Triyanon Antlaşması", "Saint-Germain Antlaşması", "Nöyyi Antlaşması"],
    answer: "Versay Antlaşması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 16,
    question: "Tarihte parayı ilk kez basıp ticari hayatta takas usulüne son veren Anadolu antik çağ uygarlığı hangisidir?",
    options: ["Lidyalılar", "Frigler", "Urartular", "İyonlar"],
    answer: "Lidyalılar",
    difficulty: "easy",
    points: 10
  },
  {
    id: 17,
    question: "Modern matbaayı icat ederek Avrupa'da kitapların hızla basılmasını, Rönesans ve Reform hareketlerinin yayılmasını sağlayan Alman mucit kimdir?",
    options: ["Johannes Gutenberg", "Galileo Galilei", "Isaac Newton", "Albert Einstein"],
    answer: "Johannes Gutenberg",
    difficulty: "medium",
    points: 20
  },
  {
    id: 18,
    question: "Tarihteki en büyük yüzölçümüne sahip, kesintisiz kara sınırlarına ulaşmış imparatorluk hangisidir?",
    options: ["Moğol İmparatorluğu", "Roma İmparatorluğu", "Britanya İmparatorluğu", "Rus İmparatorluğu"],
    answer: "Moğol İmparatorluğu",
    difficulty: "hard",
    points: 30
  },
  {
    id: 19,
    question: "Amerika Birleşik Devletleri, hangi Avrupa devletinin 13 kolonisine karşı verdiği bağımsızlık savaşı sonucunda kurulmuştur?",
    options: ["İngiltere", "Fransa", "İspanya", "Portekiz"],
    answer: "İngiltere",
    difficulty: "easy",
    points: 10
  },
  {
    id: 20,
    question: "1789 yılında halkın krallık yönetimine karşı isyan ederek Bastille Hapishanesi'ni basmasıyla başlayan küresel olay hangisidir?",
    options: ["Fransız İhtilali", "Sanayi Devrimi", "Amerikan Bağımsızlık Savaşı", "Yüzyıl Savaşları"],
    answer: "Fransız İhtilali",
    difficulty: "medium",
    points: 20
  },
  {
    id: 21,
    question: "Tarihte ilk yazılı hukuk kuralları olarak bilinen, 'Göze göz, dişe diş' esasına dayanan sert kanunlar hangi Babil kralına aittir?",
    options: ["Hammurabi", "Nebukadnezar", "Sargon", "Urnammu"],
    answer: "Hammurabi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 22,
    question: "Dünya tarihinde I. Dünya Savaşı'nın patlak vermesine neden olan kıvılcım, hangi ülkenin veliahdının Saraybosna'da suikasta uğramasıdır?",
    options: ["Avusturya-Macaristan İmparatorluğu", "Almanya", "Rusya", "İngiltere"],
    answer: "Avusturya-Macaristan İmparatorluğu",
    difficulty: "easy",
    points: 10
  },
  {
    id: 23,
    question: "1492 yılında İspanya kralının desteğiyle atlas okyanusunu aşan, ancak ulaştığı Amerika kıtasını Hindistan zanneden denizci kimdir?",
    options: ["Kristof Kolomb", "Amerigo Vespucci", "Macellan", "Vasco da Gama"],
    answer: "Kristof Kolomb",
    difficulty: "medium",
    points: 20
  },
  {
    id: 24,
    question: "Dünya turuna çıkarak dünyanın yuvarlak olduğunu bilimsel ve fiziki olarak kanıtlayan ancak sefer sırasında Filipinler'de ölen denizci kimdir?",
    options: ["Ferdinand Macellan", "Kristof Kolomb", "Bartolomeu Dias", "Vasco da Gama"],
    answer: "Ferdinand Macellan",
    difficulty: "hard",
    points: 30
  },
  {
    id: 25,
    question: "İkinci Dünya Savaşı sırasında Adolf Hitler liderliğindeki Nazi Almanyası'nın ideolojik ve askeri ittifak kurduğu blok hangisidir?",
    options: ["Mihver Devletler", "Müttefik Devletler", "İtilaf Devletleri", "NATO Bloku"],
    answer: "Mihver Devletler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 26,
    question: "Orta Çağ Avrupa'sında kilisenin bilimsel düşünceyi reddeden, her şeyi İncil'e dayandıran dogmatik ve baskıcı düşünce sistemine ne ad verilir?",
    options: ["Skolastik Düşünce", "Hümanizm", "Rasyonalizm", "Pozitivizm"],
    answer: "Skolastik Düşünce",
    difficulty: "medium",
    points: 20
  },
  {
    id: 27,
    question: "Antik Yunanistan'da, Pers istilasına karşı 300 Spartalı askerin Kral Leonidas komutasında dar bir geçitte kahramanca direndiği ünlü savaş hangisidir?",
    options: ["Termofil Savaşı", "Maraton Savaşı", "Salamis Deniz Savaşı", "Platea Savaşı"],
    answer: "Termofil Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 28,
    question: "1917 yılında Rusya'da gerçekleşen, Çarlık rejimini yıkarak Sovyetler Birliği'nin kurulmasına yol açan tarihi devrim hangisidir?",
    options: ["Bolşevik Devrimi", "Fransız Devrimi", "Kültür Devrimi", "Meiji Restorasyonu"],
    answer: "Bolşevik Devrimi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 29,
    question: "Avrupa'da edebiyat, sanat ve bilim alanında 15. ve 16. yüzyıllarda İtalya merkezli başlayan 'Yeniden Doğuş' dönemine ne ad verilir?",
    options: ["Rönesans", "Reform", "Aydınlanma Çağı", "Sanayi Devrimi"],
    answer: "Rönesans",
    difficulty: "medium",
    points: 20
  },
  {
    id: 30,
    question: "Almanya'da Martin Luther'in öncülüğünde başlayan, Katolik Kilisesi'nin otoritesini sarsarak Avrupa'da Protestanlık gibi yeni mezheplerin doğmasını sağlayan hareket hangisidir?",
    options: ["Reform", "Rönesans", "Aydınlanma Çağı", "Rasyonalizm"],
    answer: "Reform",
    difficulty: "hard",
    points: 30
  },
  {
    id: 31,
    question: "İkinci Dünya Savaşı'nın ardından Batı Bloku ülkelerinin askeri savunma amacıyla kurduğu, Türkiye'nin de üye olduğu küresel örgüt hangisidir?",
    options: ["NATO", "Varşova Paktı", "Birleşmiş Milletler", "Avrupa Konseyi"],
    answer: "NATO",
    difficulty: "easy",
    points: 10
  },
  {
    id: 32,
    question: "1337-1453 yılları arasında İngiltere ile Fransa arasında topraksal egemenlik yüzünden yaşanan ve Jan Dark'ın da kahramanlaştığı savaşların genel adı nedir?",
    options: ["Yüzyıl Savaşları", "Otuz Yıl Savaşları", "Güller Savaşı", "Napolyon Savaşları"],
    answer: "Yüzyıl Savaşları",
    difficulty: "medium",
    points: 20
  },
  {
    id: 33,
    question: "Avrupa'da mezhep savaşlarını bitiren, devletlerin kendi dinini seçme ve iç işlerine karışmama esası getiren 1648 tarihli antlaşma hangisidir?",
    options: ["Vestfalya Antlaşması", "Augsburg Antlaşması", "Utrecht Antlaşması", "Nantes Fermanı"],
    answer: "Vestfalya Antlaşması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 34,
    question: "Asya ve Avrupa'yı birbirine bağlayan, Çin'den başlayıp Akdeniz limanlarına kadar uzanan antik çağın en ünlü ticaret yolu hangisidir?",
    options: ["İpek Yolu", "Baharat Yolu", "Kral Yolu", "Kürk Yolu"],
    answer: "İpek Yolu",
    difficulty: "easy",
    points: 10
  },
  {
    id: 35,
    question: "Hindistan'dan başlayarak deniz yoluyla Kızıldeniz ve Mısır üzerinden Avrupa'ya ulaşan, Coğrafi Keşiflerle önemi azalan ticaret yolu hangisidir?",
    options: ["Baharat Yolu", "İpek Yolu", "Kral Yolu", "Amber Yolu"],
    answer: "Baharat Yolu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 36,
    question: "Tarihte ilk yazılı antlaşma olarak bilinen, MÖ 1274'te Suriye toprakları için Hitit İmparatorluğu ile Antik Mısır arasında imzalanan antlaşma hangisidir?",
    options: ["Kadeş Antlaşması", "Babil Sözleşmesi", "Ninova Antlaşması", "Asur Barışı"],
    answer: "Kadeş Antlaşması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 37,
    question: "İkinci Dünya Savaşı'nın müttefik devletlerin zaferiyle bitmesinin ardından, küresel barışı korumak amacıyla kurulan günümüzün en büyük uluslararası örgütü hangisidir?",
    options: ["Birleşmiş Milletler", "Milletler Cemiyeti", "Avrupa Birliği", "NATO"],
    answer: "Birleşmiş Milletler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 38,
    question: "Tarihte 'Güneş Batmayan İmparatorluk' unvanıyla anılan, dünyanın dört bir yanında sömürgelere sahip olmuş Avrupalı devlet hangisidir?",
    options: ["Büyük Britanya", "Fransa", "İspanya", "Hollanda"],
    answer: "Büyük Britanya",
    difficulty: "medium",
    points: 20
  },
  {
    id: 39,
    question: "MÖ 3. yüzyılda Kartaca ile Roma Cumhuriyeti arasında Akdeniz ticareti ve egemenliği için yapılan, Hannibal'ın filleriyle Alp Dağları'nı aştığı savaşların adı nedir?",
    options: ["Pön Savaşları", "Peloponnes Savaşları", "Pers Savaşları", "Galya Savaşları"],
    answer: "Pön Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 40,
    question: "Antik Roma'da gladyatör dövüşlerinin ve büyük halk gösterilerinin yapıldığı, günümüzde İtalya'nın sembolü olan devasa amfitiyatronun adı nedir?",
    options: ["Kolezyum", "Panteon", "Akropol", "Partenon"],
    answer: "Kolezyum",
    difficulty: "easy",
    points: 10
  },
  {
    id: 41,
    question: "Amerika Birleşik Devletleri'nde 1860'lı yıllarda köleliğin kaldırılması tartışmaları yüzünden Kuzey ve Güney eyaletleri arasında çıkan iç savaşın adı nedir?",
    options: ["Amerikan İç Savaşı", "Bağımsızlık Savaşı", "Yedi Yıl Savaşları", "Koloni Savaşı"],
    answer: "Amerikan İç Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 42,
    question: "Amerikan İç Savaşı sırasında köleliği resmi olarak kaldıran, ülkenin birliğini koruyan ve suikast sonucu öldürülen ünlü ABD Başkanı kimdir?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "Andrew Jackson"],
    answer: "Abraham Lincoln",
    difficulty: "hard",
    points: 30
  },
  {
    id: 43,
    question: "İkinci Dünya Savaşı'nın dönüm noktalarından biri olan, Müttefik ordularının Nazi işgali altındaki Fransa kıyılarına yaptığı devasa çıkarma harekatının adı nedir?",
    options: ["Normandiya Çıkarması", "Stalingrad Kuşatması", "Barbarossa Harekatı", "Pearl Harbor Baskını"],
    answer: "Normandiya Çıkarması",
    difficulty: "easy",
    points: 10
  },
  {
    id: 44,
    question: "1941 yılında Japon savaş uçaklarının büyük bir baskın düzenleyerek ABD'nin Pasifik filosunu vurduğu ve ABD'nin II. Dünya Savaşı'na girmesine neden olan askeri üssün adı nedir?",
    options: ["Pearl Harbor", "Midway", "Guam", "Okinawa"],
    answer: "Pearl Harbor",
    difficulty: "medium",
    points: 20
  },
  {
    id: 45,
    question: "Antik Yunanistan'da Atina liderliğindeki Attika-Delos Deniz Birliği ile Sparta liderliğindeki Peloponnes Birliği arasında geçen 27 yıllık iç savaşın adı nedir?",
    options: ["Peloponnes Savaşları", "Pers Savaşları", "Makedonya Savaşları", "Truva Savaşları"],
    answer: "Peloponnes Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 46,
    question: "Fırtınalı denizleri aşarak Ümit Burnu'nu keşfeden, Afrika kıtasının en güney ucuna ulaşarak Hindistan deniz yolunu aralayan Avrupalı denizci kimdir?",
    options: ["Bartolomeu Dias", "Vasco da Gama", "Kristof Kolomb", "Amerigo Vespucci"],
    answer: "Bartolomeu Dias",
    difficulty: "easy",
    points: 10
  },
  {
    id: 47,
    question: "Ümit Burnu'nu geçerek Afrika'yı kıyıdan dolaşan ve 1498'de Hindistan'a doğrudan deniz yoluyla ulaşan ilk Avrupalı kaşif kimdir?",
    options: ["Vasco da Gama", "Bartolomeu Dias", "Macellan", "Kristof Kolomb"],
    answer: "Vasco da Gama",
    difficulty: "medium",
    points: 20
  },
  {
    id: 48,
    question: "I. Dünya Savaşı'ndan çekilmek zorunda kalan Sovyet Rusya'nın, İttifak Devletleri ile imzalayarak Doğu Cephesi'ni kapattığı 1918 tarihli antlaşma hangisidir?",
    options: ["Brest-Litovsk Antlaşması", "Versay Antlaşması", "Londra Antlaşması", "Mondros Antlaşması"],
    answer: "Brest-Litovsk Antlaşması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 49,
    question: "Tarihte ilk demokratik anayasa kabul edilen 'On İki Levha Kanunları' hangi antik uygarlıkta patriciler ile plebler arasındaki sınıfsal çatışmayı bitirmek için hazırlanmıştır?",
    options: ["Roma Uygarlığı", "Yunan Uygarlığı", "Mısır Uygarlığı", "Babil Uygarlığı"],
    answer: "Roma Uygarlığı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 50,
    question: "Adolf Hitler'in II. Dünya Savaşı sırasında Sovyetler Birliği'ni tamamen işgal etmek amacıyla başlattığı, dünya tarihinin en büyük askeri kara harekatının adı nedir?",
    options: ["Barbarossa Harekâtı", "Stalingrad Taarruzu", "Citadel Harekâtı", "Kayıp Ordu Seferi"],
    answer: "Barbarossa Harekâtı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 51,
    question: "Dünyanın yedi harikasından biri olan ve günümüzde de ayakta kalmayı başaran tek yapı hangisidir?",
    options: ["Giza Piramidi", "Babil'in Asma Bahçeleri", "Artemis Tapınağı", "İskenderiye Feneri"],
    answer: "Giza Piramidi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 52,
    question: "Rönesans döneminin en büyük dehalarından olan, 'Mona Lisa' ve 'Son Akşam Yemeği' tablolarıyla tanınan ünlü İtalyan ressam ve mucit kimdir?",
    options: ["Leonardo da Vinci", "Michelangelo", "Rafael", "Donatello"],
    answer: "Leonardo da Vinci",
    difficulty: "medium",
    points: 20
  },
  {
    id: 53,
    question: "1756-1763 yılları arasında Avrupa devletleri ile kolonileri arasında yaşanan ve İngiltere'nin Fransa'yı yenerek sömürge lideri olmasını sağlayan savaşların adı nedir?",
    options: ["Yedi Yıl Savaşları", "Otuz Yıl Savaşları", "Yüzyıl Savaşları", "Veraset Savaşları"],
    answer: "Yedi Yıl Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 54,
    question: "Fransız İhtilali'nin ardından kurulan terör döneminin liderliğini yapan, ancak daha sonra kendisi de giyotinle idam edilen Jakoben lider kimdir?",
    options: ["Maximilien Robespierre", "Jean-Paul Marat", "Georges Danton", "Napoleon Bonaparte"],
    answer: "Maximilien Robespierre",
    difficulty: "medium",
    points: 20
  },
  {
    id: 55,
    question: "MÖ 4. yüzyılda Yunanistan'dan başlayarak Hindistan'a kadar uzanan devasa bir imparatorluk kuran ve 'Helenizm' kültürünü doğuran ünlü Makedon kral kimdir?",
    options: ["Büyük İskender", "Kral Filippos", "Julius Sezar", "Perikles"],
    answer: "Büyük İskender",
    difficulty: "easy",
    points: 10
  },
  {
    id: 56,
    question: "Aydınlanma Çağı'nın en önemli düşünürlerinden olan, güçler ayrılığı ilkesini ortaya atarak modern demokrasilerin temelini atan Fransız filozof kimdir?",
    options: ["Montesquieu", "Jean-Jacques Rousseau", "Voltaire", "John Locke"],
    answer: "Montesquieu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 57,
    question: "Dünya tarihinin akışını değiştiren matbaanın geliştirilmesi, ilk olarak Asya'da hangi uygarlıkta ahşap kalıplarla uygulanmaya başlanmıştır?",
    options: ["Çin Uygarlığı", "Hint Uygarlığı", "Mısır Uygarlığı", "İnka Uygarlığı"],
    answer: "Çin Uygarlığı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 58,
    question: "1618-1648 yılları arasında Avrupa'da Katolikler ve Protestanlar arasında yaşanan, Kutsal Roma İmparatorluğu'nun parçalanmasına zemin hazırlayan savaşların genel adı nedir?",
    options: ["Otuz Yıl Savaşları", "Yüzyıl Savaşları", "Güller Savaşları", "Yedi Yıl Savaşları"],
    answer: "Otuz Yıl Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 59,
    question: "Soğuk Savaş döneminde, SSCB'nin 1957 yılında uzaya fırlattığı ve insanlık tarihinin ilk yapay uydusu olma unvanını kazanan uydunun adı nedir?",
    options: ["Sputnik 1", "Vostok 1", "Apollo 11", "Explorer 1"],
    answer: "Sputnik 1",
    difficulty: "medium",
    points: 20
  },
  {
    id: 60,
    question: "İkinci Dünya Savaşı'nın patlak vermesine neden olan doğrudan askeri gelişme, 1 Eylül 1939'da Almanya'nın hangi ülkeyi işgal etmesidir?",
    options: ["Polonya", "Fransa", "Çekoslovakya", "Avusturya"],
    answer: "Polonya",
    difficulty: "easy",
    points: 10
  },
  {
    id: 61,
    question: "Soğuk Savaş döneminde uzaya giden ilk insan olma unvanını, 1961 yılında Vostok 1 kapsülüyle elde eden Sovyet kozmonot kimdir?",
    options: ["Yuri Gagarin", "Neil Armstrong", "Aleksey Leonov", "John Glenn"],
    answer: "Yuri Gagarin",
    difficulty: "medium",
    points: 20
  },
  {
    id: 62,
    question: "1962 yılında ABD ve SSCB'yi nükleer bir savaşın eşiğine getiren, Soğuk Savaş'ın en sıcak diplomatik ve askeri krizi aşağıdakilerden hangisidir?",
    options: ["Küba Füze Krizi", "Berlin Ablukası", "Süveyş Krizi", "U-2 Casus Uçak Krizi"],
    answer: "Küba Füze Krizi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 63,
    question: "İnsanlık tarihinde tarımsal üretime geçilen, hayvanların evcilleştirildiği ve yerleşik köy hayatının başladığı tarih öncesi çağ hangisidir?",
    options: ["Neolitik Çağ", "Paleolitik Çağ", "Mezoliter Çağ", "Kalkolitik Çağ"],
    answer: "Neolitik Çağ",
    difficulty: "easy",
    points: 10
  },
  {
    id: 64,
    question: "Sanayi Devrimi'nin temelini oluşturan buhar makinesini geliştirerek endüstriyel üretime uygun hale getiren İskoç mucit kimdir?",
    options: ["James Watt", "Thomas Newcomen", "George Stephenson", "Robert Fulton"],
    answer: "James Watt",
    difficulty: "medium",
    points: 20
  },
  {
    id: 65,
    question: "Fransa ile İngiltere arasında yapılan Yüzyıl Savaşları sırasında, Orleans kuşatmasını kırarak Fransız ordusuna ilham veren efsanevi kadın halk kahramanı kimdir?",
    options: ["Jeanne d'Arc", "Marie Antoinette", "Kraliçe Elizabeth", "Catherine de Medici"],
    answer: "Jeanne d'Arc",
    difficulty: "hard",
    points: 30
  },
  {
    id: 66,
    question: "Birinci Dünya Savaşı'nın ardından küresel barışı korumak amacıyla kurulan ancak II. Dünya Savaşı'nın çıkmasını engelleyemeyen cemiyetin adı nedir?",
    options: ["Milletler Cemiyeti", "Birleşmiş Milletler", "Varşova Paktı", "Lahey Adalet Divanı"],
    answer: "Milletler Cemiyeti",
    difficulty: "easy",
    points: 10
  },
  {
    id: 67,
    question: "15. yüzyılın sonlarında Ümit Burnu'nu aşarak Hindistan deniz yolunu bulan Portekizli kaşif aşağıdakilerden hangisidir?",
    options: ["Vasco da Gama", "Bartolomeu Dias", "Kristof Kolomb", "Amerigo Vespucci"],
    answer: "Vasco da Gama",
    difficulty: "medium",
    points: 20
  },
  {
    id: 68,
    question: "Güney Amerika'daki İnka İmparatorluğu'nu 16. yüzyılda acımasızca işgal ederek yıkan ünlü İspanyol fatih kimdir?",
    options: ["Francisco Pizarro", "Hernán Cortés", "Diego de Almagro", "Vasco Núñez de Balboa"],
    answer: "Francisco Pizarro",
    difficulty: "hard",
    points: 30
  },
  {
    id: 69,
    question: "Meksika ve Orta Amerika topraklarında büyük tapınaklar, takvimler ve gelişmiş bir yazı sistemi kuran, Coğrafi Keşifler öncesi ünlü uygarlık hangisidir?",
    options: ["Maya Uygarlığı", "İnka Uygarlığı", "Aztek Uygarlığı", "Mısır Uygarlığı"],
    answer: "Maya Uygarlığı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 70,
    question: "16. yüzyılda Meksika topraklarındaki devasa Aztek İmparatorluğu'nu işgal ederek ortadan kaldıran İspanyol komutan kimdir?",
    options: ["Hernán Cortés", "Francisco Pizarro", "Pedro de Alvarado", "Juan Ponce de León"],
    answer: "Hernán Cortés",
    difficulty: "medium",
    points: 20
  },
  {
    id: 71,
    question: "19. yüzyılın başlarında Avrupa'nın altını üstüne getiren, 'Waterloo Savaşı'ndaki mağlubiyetinin ardından Saint Helena adasına sürgün edilen Fransız imparator kimdir?",
    options: ["Napoleon Bonaparte", "Kral XVI. Louis", "Kral X. Charles", "III. Napoleon"],
    answer: "Napoleon Bonaparte",
    difficulty: "hard",
    points: 30
  },
  {
    id: 72,
    question: "Antik Roma'da Cumhuriyet döneminin sonlarında diktatörlüğünü ilan eden ve meclis binasında suikasta uğrayarak 'Sen de mi Brütüs?' sözünü söyleyen lider kimdir?",
    options: ["Julius Sezar", "Sezar Augustus", "Neron", "Marcus Aurelius"],
    answer: "Julius Sezar",
    difficulty: "easy",
    points: 10
  },
  {
    id: 73,
    question: "Antik Çağ'da 'Tarihin Babası' olarak anılan, Pers Savaşları'nı anlattığı dev eseriyle modern tarih yazıcılığının temelini atan Yunan yazar kimdir?",
    options: ["Herodot", "Thukididis", "Homeros", "Aristo"],
    answer: "Herodot",
    difficulty: "medium",
    points: 20
  },
  {
    id: 74,
    question: "19. yüzyılda Almanya'nın küçük prensliklerden kurtulup tek bir büyük imparatorluk haline gelmesini sağlayan 'Demir Şansölye' lakaplı devlet adamı kimdir?",
    options: ["Otto von Bismarck", "Klemens von Metternich", "Kaiser Wilhelm", "Krupp"],
    answer: "Otto von Bismarck",
    difficulty: "hard",
    points: 30
  },
  {
    id: 75,
    question: "İkinci Dünya Savaşı sırasında faşist İtalya'nın diktatör liderliğini yapan ve 'Kara Gömlekliler' hareketiyle iktidara gelen isim kimdir?",
    options: ["Benito Mussolini", "Adolf Hitler", "Francisco Franco", "Philippe Pétain"],
    answer: "Benito Mussolini",
    difficulty: "easy",
    points: 10
  },
  {
    id: 76,
    question: "1945 yılında ABD, İngiltere ve SSCB liderlerinin katıldığı, İkinci Dünya Savaşı sonrası dünyanın yeni düzenini ve nüfuz alanlarını belirleyen ünlü konferans hangisidir?",
    options: ["Yalta Konferansı", "Tahran Konferansı", "Potsdam Konferansı", "Casablanca Konferansı"],
    answer: "Yalta Konferansı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 77,
    question: "1955 yılında Soğuk Savaş döneminde NATO'ya karşı Doğu Bloku komünist ülkelerinin kurduğu askeri savunma ittifakı hangisidir?",
    options: ["Varşova Paktı", "Kominform", "Comecon", "Bağdat Paktı"],
    answer: "Varşova Paktı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 78,
    question: "19. yüzyılın ortalarında İtalya'daki küçük devletçikleri birleştirerek modern İtalya Krallığı'nın kurulmasını sağlayan halk kahramanı kimdir?",
    options: ["Giuseppe Garibaldi", "Camillo Cavour", "Mazzini", "II. Victor Emmanuel"],
    answer: "Giuseppe Garibaldi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 79,
    question: "Aydınlanma Çağı'nın babalarından kabul edilen, 'Yöntem Üzerine Konuşma' adlı eseriyle 'Düşünüyorum, öyleyse varım' sözünü dünyaya kazandıran Fransız filozof kimdir?",
    options: ["René Descartes", "John Locke", "Immanuel Kant", "Baruch Spinoza"],
    answer: "René Descartes",
    difficulty: "medium",
    points: 20
  },
  {
    id: 80,
    question: "Antik Roma'da MÖ 73 yılında kölelerin ve gladyatörlerin haklarını almak amacıyla Roma Cumhuriyeti'ne karşı başlattığı dev isyanın lideri kimdir?",
    options: ["Spartaküs", "Crixus", "Gannicus", "Vercingetorix"],
    answer: "Spartaküs",
    difficulty: "hard",
    points: 30
  },
  {
    id: 81,
    question: "Orta Çağ'da feodal beylerin topraklarında karın tokluğuna çalışan, hiçbir hakkı bulunmayan ve toprağa bağlı yaşayan köylülere ne ad verilirdi?",
    options: ["Serf", "Vasal", "Süzeren", "Burjuva"],
    answer: "Serf",
    difficulty: "easy",
    points: 10
  },
  {
    id: 82,
    question: "1929 yılında ABD'de New York Borsası'nın çökmesiyle başlayan, tüm dünyayı sarsan ve işsizliğe yol açan ekonomik krizin adı nedir?",
    options: ["Büyük Buhran", "Hiperenflasyon Krizi", "Petrol Şoku", "Mali Çöküş"],
    answer: "Büyük Buhran",
    difficulty: "medium",
    points: 20
  },
  {
    id: 83,
    question: "İkinci Dünya Savaşı sırasında Nazi Almanyası'nın Yahudilere ve diğer azınlıklara yönelik uyguladığı sistemli soykırım hareketine verilen isim hangisidir?",
    options: ["Holokost", "Pogrom", "Etnik Temizlik", "Büyük Tasfiye"],
    answer: "Holokost",
    difficulty: "hard",
    points: 30
  },
  {
    id: 84,
    question: "Tarihte bilinen ilk yazılı destan olma özelliğini taşıyan ve ölümsüzlüğü arayan bir kralı anlatan Mezopotamya eseri hangisidir?",
    options: ["Gılgamış Destanı", "Yaratılış Destanı", "Odissea", "İlyada"],
    answer: "Gılgamış Destanı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 85,
    question: "İkinci Dünya Savaşında Nazi Almanyası'nın yenilgiye uğratılmasında dönüm noktası sayılan, tarihin en kanlı şehir kuşatması ve savaşı hangisidir?",
    options: ["Stalingrad Savaşı", "Kursk Savaşı", "Berlin Savaşı", "Moskova Kuşatması"],
    answer: "Stalingrad Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 86,
    question: "1947 yılında ABD'nin komünizm tehdidi altındaki ülkelere askeri ve ekonomik yardım yapmasını öngören doktrin hangisidir?",
    options: ["Truman Doktrini", "Marshall Planı", "Monroe Doktrini", "Eisenhower Doktrini"],
    answer: "Truman Doktrini",
    difficulty: "hard",
    points: 30
  },
  {
    id: 87,
    question: "ABD'nin İkinci Dünya Savaşı'nın ardından Avrupa ülkelerinin ekonomik olarak kalkınması ve komünizme kapılmaması amacıyla uyguladığı dev yardım planı hangisidir?",
    options: ["Marshall Planı", "Truman Doktrini", "Molotov Planı", "Schuman Bildirgesi"],
    answer: "Marshall Planı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 88,
    question: "MÖ 13. yüzyılda gerçekleşen, Truva atı efsanesiyle bilinen ve Homeros'un İlyada destanına konu olan ünlü antik savaş hangisidir?",
    options: ["Truva Savaşı", "Pers Savaşı", "Peloponnes Savaşı", "Babil Savaşı"],
    answer: "Truva Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 89,
    question: "1950-1953 yılları arasında yaşanan, Türkiye'nin de NATO'ya girmek amacıyla asker gönderdiği Soğuk Savaş dönemi sıcak çatışması hangisidir?",
    options: ["Kore Savaşı", "Vietnam Savaşı", "Süveyş Savaşı", "Körfez Savaşı"],
    answer: "Kore Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 90,
    question: "Soğuk Savaş'ın sembol isimlerinden olan, Güney Afrika'daki ırkçı 'Apartayd' rejimine karşı verdiği mücadele yüzünden 27 yıl hapis yatan ve ülkenin ilk siyahi devlet başkanı seçilen efsanevi lider kimdir?",
    options: ["Nelson Mandela", "Malcolm X", "Martin Luther King", "Kofi Annan"],
    answer: "Nelson Mandela",
    difficulty: "easy",
    points: 10
  },
  {
    id: 91,
    question: "1991 yılında parçalanarak Soğuk Savaş'ın resmen bitmesine ve dünyadaki iki kutuplu düzenin sona ermesine yol açan devasa komünist devlet hangisidir?",
    options: ["Sovyetler Birliği", "Yugoslavya", "Çekoslovakya", "Doğu Almanya"],
    answer: "Sovyetler Birliği",
    difficulty: "medium",
    points: 20
  },
  {
    id: 92,
    question: "1960'lı ve 70'li yıllarda ABD'nin komünist yayılmayı engellemek amacıyla asker gönderdiği, ancak ağır kayıplar vererek geri çekilmek zorunda kaldığı asya ülkesi hangisidir?",
    options: ["Vietnam", "Kore", "Kamboçya", "Laos"],
    answer: "Vietnam",
    difficulty: "hard",
    points: 30
  },
  {
    id: 93,
    question: "1453 yılında Fatih Sultan Mehmet tarafından fethedilen, Doğu Roma İmparatorluğu'nun başkenti olan tarihi şehir hangisidir?",
    options: ["İstanbul", "Roma", "Atina", "İskenderiye"],
    answer: "İstanbul",
    difficulty: "easy",
    points: 10
  },
  {
    id: 94,
    question: "Rönesans döneminde Michelangelo tarafından İtalya'da yapılan, anatomi ve estetik dehasını gösteren dünyanın en ünlü mermer heykel başyapıtı hangisidir?",
    options: ["Davud Heykeli", "Musa'nın Hükmü", "Pietà", "Düşünen Adam"],
    answer: "Davud Heykeli",
    difficulty: "medium",
    points: 20
  },
  {
    id: 95,
    question: "1914 yılında I. Dünya Savaşı başladığında, İngiltere, Fransa ve Rusya'nın oluşturduğu askeri ittifak bloğuna ne ad verilirdi?",
    options: ["İtilaf Devletleri", "İttifak Devletleri", "Mihver Devletler", "Müttefikler"],
    answer: "İtilaf Devletleri",
    difficulty: "hard",
    points: 30
  },
  {
    id: 96,
    question: "Birinci Dünya Savaşı'nda Almanya, Avusturya-Macaristan ve Osmanlı İmparatorluğu'nun yer aldığı askeri bloğa ne ad verilirdi?",
    options: ["İttifak Devletleri", "İtilaf Devletleri", "Mihver Devletler", "Müttefik Devletler"],
    answer: "İttifak Devletleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 97,
    question: "1969 yılında Apollo 11 uzay aracıyla Ay'a ayak basan ve 'İnsan için küçük, insanlık için dev bir adım' sözünü söyleyen Amerikalı astronot kimdir?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    answer: "Neil Armstrong",
    difficulty: "medium",
    points: 20
  },
  {
    id: 98,
    question: "1980'li yıllarda SSCB lideri Mihail Gorbaçov tarafından uygulanan, Sovyet sistemini dışa açmayı ve yeniden yapılandırmayı hedefleyen reform politikalarının adları nedir?",
    options: ["Glasnost ve Perestroyka", "Gomulka ve Titoizm", "Détente ve Ostpolitik", "Kominform ve Comecon"],
    answer: "Glasnost ve Perestroyka",
    difficulty: "hard",
    points: 30
  },
  {
    id: 99,
    question: "Birinci Dünya Savaşı'nın ardından ABD Başkanı Woodrow Wilson tarafından yayımlanan, sömürgeciliğe karşı çıkan ve ulusların kendi kaderini tayin etmesini öngören ilkelerin adı nedir?",
    options: ["Wilson İlkeleri", "Marshall Planı", "Balfour Deklarasyonu", "Monroe Doktrini"],
    answer: "Wilson İlkeleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 100,
    question: "Dünya tarihinin bilinen ilk kütüphanesi olan Asurbanipal Kütüphanesi hangi kadim Mezopotamya uygarlığına aittir?",
    options: ["Asurlar", "Sümerler", "Babiller", "Akadlar"],
    answer: "Asurlar",
    difficulty: "easy",
    points: 10
  },
  {
    id: 101,
    question: "Tarihte ilk düzenli ve sürekli orduyu kurarak Mezopotamya'da ilk imparatorluğu inşa eden uygarlık hangisidir?",
    options: ["Akadlar", "Elamlar", "Babiller", "Sümerler"],
    answer: "Akadlar",
    difficulty: "medium",
    points: 20
  },
  {
    id: 102,
    question: "Antik Roma'da Sezar'ın ölümünün ardından kurulan 2. Triumvirlik ittifakında Octavianus ve Lepidus ile birlikte yer alan ünlü Romalı general kimdir?",
    options: ["Marcus Antonius", "Pompeius", "Crassus", "Brutus"],
    answer: "Marcus Antonius",
    difficulty: "hard",
    points: 30
  },
  {
    id: 103,
    question: "Tarihte 'Pax Romana' olarak bilinen, imparatorluğun en istikrarlı ve geniş sınırlara ulaştığı dönemi başlatan ilk Roma imparatoru kimdir?",
    options: ["Augustus", "Julius Sezar", "Neron", "Traianus"],
    answer: "Augustus",
    difficulty: "medium",
    points: 20
  },
  {
    id: 104,
    question: "Antik Yunanistan'da felsefenin kurucularından sayılan, öğrencilerinden Platon'u yetiştiren ve düşünceleri yüzünden ölüme mahkûm edilen filozof kimdir?",
    options: ["Sokrat", "Aristo", "Epikür", "Diyojen"],
    answer: "Sokrat",
    difficulty: "easy",
    points: 10
  },
  {
    id: 105,
    question: "Aydınlanma Çağı'nda 'Toplum Sözleşmesi' adlı eseri yazarak Fransız İhtilali'nin halk egemenliği fikrine en büyük ilhamı veren filozof kimdir?",
    options: ["Jean-Jacques Rousseau", "John Locke", "Voltaire", "Thomas Hobbes"],
    answer: "Jean-Jacques Rousseau",
    difficulty: "medium",
    points: 20
  },
  {
    id: 106,
    question: "17. yüzyılda İngiltere'de krallık rejimini yıkarak kısa süreliğine cumhuriyet ilan eden ve ülkeyi 'Askeri Diktatör' olarak yöneten lider kimdir?",
    options: ["Oliver Cromwell", "I. Charles", "II. Charles", "William Orange"],
    answer: "Oliver Cromwell",
    difficulty: "hard",
    points: 30
  },
  {
    id: 107,
    question: "Rönesans'ın en parlak döneminde Sistina Şapeli'nin tavan fresklerini boyayan ve ünlü 'Adam'ın Yaratılışı' eserini üreten İtalyan sanatçı kimdir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Sandro Botticelli"],
    answer: "Michelangelo",
    difficulty: "easy",
    points: 10
  },
  {
    id: 108,
    question: "Avrupa'da feodal beylerin gücünü kırarak mutlak krallıkların kurulmasını sağlayan, derebeylerin şatolarını yıkan askeri teknoloji hangisidir?",
    options: ["Büyük Kuşatma Topları", "Arbalet", "Zırhlı Süvariler", "Barutlu Savaş Gemileri"],
    answer: "Büyük Kuşatma Topları",
    difficulty: "medium",
    points: 20
  },
  {
    id: 109,
    question: "Coğrafi Keşifler sırasında, Amerika kıtasının yeni bir kıta olduğunu fark eden ve bu 'Yeni Dünya'ya adı verilen İtalyan denizci kimdir?",
    options: ["Amerigo Vespucci", "Kristof Kolomb", "Ferdinand Macellan", "John Cabot"],
    answer: "Amerigo Vespucci",
    difficulty: "hard",
    points: 30
  },
  {
    id: 110,
    question: "Birinci Dünya Savaşı'nı resmen başlatan veliaht suikastı, 1914 yılında hangi Balkan şehrinde gerçekleşmiştir?",
    options: ["Saraybosna", "Belgrad", "Üsküp", "Sofya"],
    answer: "Saraybosna",
    difficulty: "easy",
    points: 10
  },
  {
    id: 111,
    question: "19. yüzyılda sömürgecilik yarışının zirveye ulaşmasıyla Avrupalı devletlerin Afrika topraklarını kendi aralarında masada paylaştığı tarihi konferans hangisidir?",
    options: ["Berlin Konferansı", "Viyana Kongresi", "Paris Barış Konferansı", "Londra Konferansı"],
    answer: "Berlin Konferansı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 112,
    question: "İkinci Dünya Savaşı'nın Pasifik cephesinde, ABD'nin nükleer bombaları fırlatmadan önce Japonya ile yaptığı tarihin en büyük ve kanlı ada savunma savaşı hangisidir?",
    options: ["Okinawa Savaşı", "Iwo Jima Savaşı", "Guadalcanal Savaşı", "Midway Savaşı"],
    answer: "Okinawa Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 113,
    question: "Soğuk Savaş döneminde nükleer silahların gölgesinde mücadele eden iki süper güç hangi devletlerdir?",
    options: ["ABD - SSCB", "İngiltere - Almanya", "ABD - Çin", "Fransa - Rusya"],
    answer: "ABD - SSCB",
    difficulty: "easy",
    points: 10
  },
  {
    id: 114,
    question: "1961 yılında Doğu Almanya'dan Batı'ya kaçışları engellemek amacıyla bir gecede örülmeye başlanan ve Soğuk Savaş'ın 'Utanç Duvarı' olan yapı hangisidir?",
    options: ["Berlin Duvarı", "Demir Perde Duvarı", "Avrupa Sınır Duvarı", "Gediz Duvarı"],
    answer: "Berlin Duvarı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 115,
    question: "Soğuk Savaş döneminde uzay yarışını başlatan SSCB'nin uzaya gönderdiği ilk canlı olan efsanevi köpeğin adı nedir?",
    options: ["Laika", "Belka", "Strelka", "Sputnik"],
    answer: "Laika",
    difficulty: "hard",
    points: 30
  },
  {
    id: 116,
    question: "Tarihte insan haklarının ilk yazılı taslağı kabul edilen ve Babil'i fetheden Pers kralı tarafından yayımlanan silindirik belge hangisidir?",
    options: ["Cyrus Silindiri", "Hammurabi Kanunları", "Urnammu Kitabesi", "Rosetta Taşı"],
    answer: "Cyrus Silindiri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 117,
    question: "Sanayi Devrimi'nin lokomotif gücü olan kömür ve demir yataklarına sahip olmak için Fransa ile Almanya arasında yüzyıllar boyu krize neden olan tarihi bölge hangisidir?",
    options: ["Alsas-Loren", "Rur Bölgesi", "Südetler", "Silezya"],
    answer: "Alsas-Loren",
    difficulty: "medium",
    points: 20
  },
  {
    id: 118,
    question: "Fransız İhtilali'nin simgesi olan ve siyasi suçluların, aydınların kapatıldığı, halk isyanıyla 14 Temmuz 1789'da yıkılan ünlü kalenin adı nedir?",
    options: ["Bastille Hapishanesi", "Versay Sarayı", "Tuileries Sarayı", "Conciergerie"],
    answer: "Bastille Hapishanesi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 119,
    question: "Dünya savaşları tarihinde ilk kez tankların ve kimyasal gazların yoğun olarak kullanıldığı, siper savaşlarıyla bilinen küresel çatışma hangisidir?",
    options: ["Birinci Dünya Savaşı", "İkinci Dünya Savaşı", "Napolyon Savaşları", "Yedi Yıl Savaşları"],
    answer: "Birinci Dünya Savaşı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 120,
    question: "14. yüzyılda İngiltere tahtı üzerinde hak iddia eden York ve Lancaster hanedanları arasında yaşanan, 'Güller Savaşı' olarak bilinen iç savaş hangi ülkede gerçekleşmiştir?",
    options: ["İngiltere", "Fransa", "İskoçya", "Almanya"],
    answer: "İngiltere",
    difficulty: "medium",
    points: 20
  },
  {
    id: 121,
    question: "Napolyon Savaşları'nın ardından 1815 yılında toplanan ve Avrupa'nın sınırlarını krallıkları koruyacak şekilde yeniden çizen tarihi kongre hangisidir?",
    options: ["Viyana Kongresi", "Berlin Kongresi", "Paris Konferansı", "Aachen Kongresi"],
    answer: "Viyana Kongresi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 122,
    question: "İkinci Dünya Savaşı'nın Avrupa cephesini tamamen bitiren tarihi olay aşağıdakilerden hangisidir?",
    options: ["Berlin'in düşmesi ve Nazi Almanyası'nın koşulsuz teslim olması", "Normandiya Çıkarması", "Atom bombasının atılması", "Stalingrad Zaferi"],
    answer: "Berlin'in düşmesi ve Nazi Almanyası'nın koşulsuz teslim olması",
    difficulty: "easy",
    points: 10
  },
  {
    id: 123,
    question: "1919 yılında I. Dünya Savaşı'nın galip devletleri tarafından Paris Barış Konferansı'nda kurulan, sömürgeciliğin yeni adı olan sistem hangisidir?",
    options: ["Manda ve Himaye Sistemi", "Açık Kapı Politikası", "Merkantilizm", "Asimilasyon"],
    answer: "Manda ve Himaye Sistemi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 124,
    question: "Coğrafi Keşifler sırasında, dünyanın çevresini dolaşan ilk seferi başlatan ancak Filipinler'de yerlilerle yaptığı savaşta ölen Macellan'ın ardından seferi tamamlayan denizci kimdir?",
    options: ["Juan Sebastián Elcano", "Vasco da Gama", "Bartolomeu Dias", "Amerigo Vespucci"],
    answer: "Juan Sebastián Elcano",
    difficulty: "hard",
    points: 30
  },
  {
    id: 125,
    question: "Antik Mısır yazısı olan hiyerogliflerin okunmasını sağlayan, Napolyon'un Mısır seferi sırasında bulunan ünlü üç dilli taş hangisidir?",
    options: ["Rosetta Taşı", "Hammurabi Steli", "Behistun Kitabesi", "Moab Taşı"],
    answer: "Rosetta Taşı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 126,
    question: "19. yüzyılda İtalya'nın birliğini sağlamak amacıyla kurulan ve Avusturya işgaline karşı 'Kırmızı Gömlekliler' ordusuyla savaşan efsanevi ulusal kahraman kimdir?",
    options: ["Giuseppe Garibaldi", "Count Cavour", "Mazzini", "Victor Emmanuel"],
    answer: "Giuseppe Garibaldi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 127,
    question: "1648 yılında Otuz Yıl Savaşları'nı bitiren Vestfalya Antlaşması'nın dünya siyaset tarihi açısından en önemli sonucu aşağıdakilerden hangisidir?",
    options: ["Modern ulus devletler sisteminin ve egemenlik ilkelerinin temelinin atılması", "Papalığın gücünün artması", "Sömürgeciliğin tamamen bitmesi", "Almanya'nın tek bir devlet olması"],
    answer: "Modern ulus devletler sisteminin ve egemenlik ilkelerinin temelinin atılması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 128,
    question: "Orta Çağ boyunca Asya'dan gelen ipekli kumaşların ve porselenlerin Avrupa'ya taşındığı, kervanların geçtiği tarihi ticaret yolu hangisidir?",
    options: ["İpek Yolu", "Baharat Yolu", "Kral Yolu", "Kürk Yolu"],
    answer: "İpek Yolu",
    difficulty: "easy",
    points: 10
  },
  {
    id: 129,
    question: "15. yüzyılda Avrupa'da kilisenin endüljans ve aforoz gibi uygulamalarına karşı Wittenberg Kilisesi'nin duvarına 95 maddelik bildiri asan din adamı kimdir?",
    options: ["Martin Luther", "Jean Calvin", "John Knox", "Erasmus"],
    answer: "Martin Luther",
    difficulty: "medium",
    points: 20
  },
  {
    id: 130,
    question: "Coğrafi Keşifler öncesinde, 16. yüzyılın başlarında Güney Amerika'nın Peru dağlarında devasa bir imparatorluk ve taş şehirler kuran gizemli medeniyet hangisidir?",
    options: ["İnka Medeniyeti", "Aztek Medeniyeti", "Maya Medeniyeti", "Olmek Medeniyeti"],
    answer: "İnka Medeniyeti",
    difficulty: "hard",
    points: 30
  },
  {
    id: 131,
    question: "Antik Roma'da halkın eğlenmesi için gladyatörlerin vahşi hayvanlarla dövüştürüldüğü, günümüze kadar ulaşan dev amfitiyatronun adı nedir?",
    options: ["Kolezyum", "Panteon", "Partenon", "Forum Roma"],
    answer: "Kolezyum",
    difficulty: "easy",
    points: 10
  },
  {
    id: 132,
    question: "1929 yılında New York Borsası'nın çökmesiyle başlayan ve tüm sanayi ülkelerini vurarak milyonlarca insanı işsiz bırakan küresel krizin adı nedir?",
    options: ["Büyük Buhran", "Hiperenflasyon Şoku", "Petrol Krizi", "Kara Çarşamba Enflasyonu"],
    answer: "Büyük Buhran",
    difficulty: "medium",
    points: 20
  },
  {
    id: 133,
    question: "İkinci Dünya Savaşı sırasında Nazi Almanyası'nın işgal ettiği Fransa'da kurulan ve Nazilerle işbirliği yapan işbirlikçi hükümetin adı nedir?",
    options: ["Vichy Hükümeti", "Direniş Cephesi", "Özgür Fransa Hükümeti", "Petain Rejimi"],
    answer: "Vichy Hükümeti",
    difficulty: "hard",
    points: 30
  },
  {
    id: 134,
    question: "1945 yılında kurulan Birleşmiş Milletler'in dünya barışını korumakla görevli, beş daimi üyenin veto hakkına sahip olduğu en güçlü organı hangisidir?",
    options: ["BM Güvenlik Konseyi", "BM Genel Kurulu", "Uluslararası Adalet Divanı", "BM Ekonomik Konseyi"],
    answer: "BM Güvenlik Konseyi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 135,
    question: "Soğuk Savaş döneminde, ABD'nin liderliğindeki Batı Bloku'na karşı Doğu Bloku komünist ülkelerinin 1955'te kurduğu askeri savunma ittifakı hangisidir?",
    options: ["Varşova Paktı", "NATO", "Kominform", "Sadabat Paktı"],
    answer: "Varşova Paktı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 136,
    question: "1947 yılında yayımlanan ve ABD'nin komünizm tehdidi altındaki devletlere nükleer ve mali destek vermesini öngören dış politika doktrini hangisidir?",
    options: ["Truman Doktrini", "Marshall Planı", "Monroe Doktrini", "Eisenhower Planı"],
    answer: "Truman Doktrini",
    difficulty: "hard",
    points: 30
  },
  {
    id: 137,
    question: "İkinci Dünya Savaşı'nın dönüm noktası kabul edilen, Müttefik ordularının 1944 yılında Fransa'yı Nazilerden kurtarmak için düzenlediği devasa deniz operasyonu hangisidir?",
    options: ["Normandiya Çıkarması", "Barbarossa Harekatı", "Stalingrad Taarruzu", "Pearl Harbor Baskını"],
    answer: "Normandiya Çıkarması",
    difficulty: "easy",
    points: 10
  },
  {
    id: 138,
    question: "1969 yılında Apollo 11 uzay aracıyla Ay'a ilk ayak basan insan olma unvanını kazanan Amerikalı astronot kimdir?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    answer: "Neil Armstrong",
    difficulty: "medium",
    points: 20
  },
  {
    id: 139,
    question: "1980'li yıllarda SSCB'nin çöküşünü hızlandıran, Gorbaçov tarafından uygulanan 'Glasnost' politikasının yanındaki ekonomik 'Yeniden Yapılandırma' ilkesinin adı nedir?",
    options: ["Perestroyka", "Kominform", "Comecon", "Détente"],
    answer: "Perestroyka",
    difficulty: "hard",
    points: 30
  },
  {
    id: 140,
    question: "Dünya tarihinde I. Dünya Savaşı'nın ardından mağlup devletlerin toprak bütünlüğünü hiçe sayan sömürgeci paylaşım planlarına zemin hazırlayan ABD Başkanı belgesi hangisidir?",
    options: ["Wilson İlkeleri", "Truman Doktrini", "Marshall Planı", "Monroe Bildirisi"],
    answer: "Wilson İlkeleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 141,
    question: "Antik Çağ'da Anadolu ile İran arasında kurulan, Pers İmparatorluğu'nun ticaret ve haberleşme ağını güçlendiren ünlü yol hangisidir?",
    options: ["Kral Yolu", "İpek Yolu", "Baharat Yolu", "Amber Yolu"],
    answer: "Kral Yolu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 142,
    question: "MÖ 3. yüzyılda Kartaca'nın efsanevi generali Hannibal'ın fillerle Alp Dağları'nı aşarak Roma Cumhuriyeti topraklarını işgal ettiği ünlü savaşların adı nedir?",
    options: ["Pön Savaşları", "Peloponnes Savaşları", "Pers Savaşları", "Galya Savaşları"],
    answer: "Pön Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 143,
    question: "Rönesans döneminin zirvesinde İtalya'da yapılan, anatomi, estetik ve oran harikası kabul edilen dünyaca ünlü 'Davud' heykelinin heykeltıraşı kimdir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Rafael"],
    answer: "Michelangelo",
    difficulty: "easy",
    points: 10
  },
  {
    id: 144,
    question: "1950-1953 yılları arasında yaşanan, Türkiye'nin de NATO ittifakına üye olabilmek amacıyla asker göndererek tugay düzeyinde savaştığı Uzak Doğu ülkesi hangisidir?",
    options: ["Kore", "Vietnam", "Kamboçya", "Tayland"],
    answer: "Kore",
    difficulty: "medium",
    points: 20
  },
  {
    id: 145,
    question: "19. yüzyılın ikinci yarısında dağınık haldeki Alman prensliklerini tek çatı altında toplayarak modern Alman İmparatorluğu'nu kuran 'Demir Şansölye' lakaplı lider kimdir?",
    options: ["Otto von Bismarck", "Klemens von Metternich", "Adolf Hitler", "Kaiser Wilhelm"],
    answer: "Otto von Bismarck",
    difficulty: "hard",
    points: 30
  },
  {
    id: 146,
    question: "Güney Afrika'da ırkçı Apartayd rejimine karşı verdiği epik mücadeleyle bilinen, 27 yıl hapis yatan ve ülkenin ilk siyahi devlet başkanı olan lider kimdir?",
    options: ["Nelson Mandela", "Malcolm X", "Martin Luther King", "Desmond Tutu"],
    answer: "Nelson Mandela",
    difficulty: "easy",
    points: 10
  },
  {
    id: 147,
    question: "1991 yılında ekonomik açmazlar ve siyasi çözülmeler sonucunda resmen dağılarak Soğuk Savaş'ı bitiren dev komünist devlet hangisidir?",
    options: ["Sovyetler Birliği", "Yugoslavya", "Çekoslovakya", "Doğu Almanya"],
    answer: "Sovyetler Birliği",
    difficulty: "medium",
    points: 20
  },
  {
    id: 148,
    question: "1945 yılında II. Dünya Savaşı sonrasında Nazi suçlularının yargılanması ve uluslararası savaş hukukunun tescillenmesi amacıyla kurulan mahkeme hangisidir?",
    options: ["Nürnberg Mahkemeleri", "Lahey Adalet Divanı", "Tokyo Mahkemesi", "Versay Konseyi"],
    answer: "Nürnberg Mahkemeleri",
    difficulty: "hard",
    points: 30
  },
  {
    id: 149,
    question: "1960'lı yıllarda ABD'nin komünizm yayılımını engellemek amacıyla asker çıkardığı, orman savaşları ve protestolarla tarihe geçen sıcak çatışma bölgesi neresidir?",
    options: ["Vietnam", "Kore", "Küba", "Afganistan"],
    answer: "Vietnam",
    difficulty: "easy",
    points: 10
  },
  {
    id: 150,
    question: "Tarihte batıya doğru yelken açarak Hindistan'a ulaşabileceğini savunan ve 1492'de Amerika kıtasına ayak basan Cenovalı kaptan kimdir?",
    options: ["Kristof Kolomb", "Amerigo Vespucci", "Hernan Cortes", "Vasco da Gama"],
    answer: "Kristof Kolomb",
    difficulty: "easy",
    points: 10
  },
  {
    id: 151,
    question: "1789 Fransız İhtilali'nin ardından yayımlanan ve 'İnsanlar haklar bakımından hür ve eşit doğarlar' ilkesini dünyaya duyuran tarihi beyanname hangisidir?",
    options: ["İnsan ve Yurttaş Hakları Bildirisi", "Magna Carta", "Amerikalı Bağımsızlık Bildirgesi", "Vestfalya Sözleşmesi"],
    answer: "İnsan ve Yurttaş Hakları Bildirisi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 152,
    question: "Fransız İhtilali sırasında mutlak monarşinin sembolü olan kraliyet ailesinin halk tarafından saraydan çıkarılarak tutuklandığı tarihi saray baskını hangisidir?",
    options: ["Tuileries Sarayı Baskını", "Versay Sarayı Yürüyüşü", "Bastille Baskını", "Elysée Sarayı Kuşatması"],
    answer: "Tuileries Sarayı Baskını",
    difficulty: "hard",
    points: 30
  },
  {
    id: 153,
    question: "Sanayi Devrimi sürecinde, kömür madenlerinden su pompalamak amacıyla ilk buharlı makineyi icat eden ve James Watt'a ilham veren İngiliz mucit kimdir?",
    options: ["Thomas Newcomen", "James Watt", "George Stephenson", "Robert Fulton"],
    answer: "Thomas Newcomen",
    difficulty: "medium",
    points: 20
  },
  {
    id: 154,
    question: "Dünya tarihinde buharlı lokomotifi icat ederek demiryolu ulaşım çağını başlatan İngiliz mühendis kimdir?",
    options: ["George Stephenson", "James Watt", "Robert Fulton", "Thomas Newcomen"],
    answer: "George Stephenson",
    difficulty: "easy",
    points: 10
  },
  {
    id: 155,
    question: "Coğrafi Keşifler sırasında, Afrika kıtasının en güney ucu olan ve fırtınalı sularıyla bilinen Ümit Burnu'nu ilk keşfeden Portekizli denizci kimdir?",
    options: ["Bartolomeu Dias", "Vasco da Gama", "Kristof Kolomb", "Ferdinand Macellan"],
    answer: "Bartolomeu Dias",
    difficulty: "medium",
    points: 20
  },
  {
    id: 156,
    question: "1517 yılında Almanya'da Katolik Kilisesi'nin endüljans uygulamasına karşı çıkan Martin Luther, ünlü 95 maddelik bildirisini hangi kilisenin kapısına asmıştır?",
    options: ["Wittenberg Saray Kilisesi", "Köln Katedrali", "Aziz Petrus Bazilikası", "Notre Dame Katedrali"],
    answer: "Wittenberg Saray Kilisesi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 157,
    question: "Avrupa'da Reform hareketlerinin başlamasının ardından Katolik Kilisesi'nden ayrılarak Almanya'da doğan ilk büyük Protestan mezhebi hangisidir?",
    options: ["Lüteriyenizm", "Kalvinizm", "Anglikanizm", "Ortodoksluk"],
    answer: "Lüteriyenizm",
    difficulty: "easy",
    points: 10
  },
  {
    id: 158,
    question: "Soğuk Savaş döneminde, SSCB liderliğindeki komünist devletlerin nükleer, askeri ve ideolojik olarak dış dünyaya kapanmasını sembolize eden 'Demir Perde' terimini ilk kez kullanan İngiliz devlet adamı kimdir?",
    options: ["Winston Churchill", "Harry Truman", "Franklin Roosevelt", "Neville Chamberlain"],
    answer: "Winston Churchill",
    difficulty: "medium",
    points: 20
  },
  {
    id: 159,
    question: "1945 yılında II. Dünya Savaşı'nı bitiren ve müttefik liderlerin Almanya'nın işgal bölgelerini, savaş tazminatlarını ve yeni sınırları belirlediği son büyük konferans hangisidir?",
    options: ["Potsdam Konferansı", "Yalta Konferansı", "Tahran Konferansı", "Casablanca Konferansı"],
    answer: "Potsdam Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 160,
    question: "Tarihte Mezopotamya bölgesinde Fırat ve Dicle nehirleri arasında kalan topraklarda kurulan, çivi yazısını ve tekerleği insanlığa kazandıran ilk kadim uygarlık hangisidir?",
    options: ["Sümerler", "Akadlar", "Babiller", "Asurlar"],
    answer: "Sümerler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 161,
    question: "Antik Roma'da Cumhuriyet rejiminden İmparatorluk rejimine geçişi sağlayan, Julius Sezar'ın evlatlık oğlu ve ilk resmi Roma İmparatoru olan lider kimdir?",
    options: ["Augustus", "Neron", "Marcus Aurelius", "Traianus"],
    answer: "Augustus",
    difficulty: "medium",
    points: 20
  },
  {
    id: 162,
    question: "Antik Yunan dünyasında Atina demokrasisinin altın çağını yaşatan, Partenon tapınağının inşasını başlatan ve Peloponnes Savaşları sırasında vefat eden devlet adamı kimdir?",
    options: ["Perikles", "Solon", "Klistenes", "Aristid"],
    answer: "Perikles",
    difficulty: "hard",
    points: 30
  },
  {
    id: 163,
    question: "Rönesans döneminde Floransa'da sanatı ve sanatçıları maddi olarak destekleyerek İtalya'da kültürel patlamayı sağlayan ünlü bankacı aile hangisidir?",
    options: ["Medici Ailesi", "Borgia Ailesi", "Sforza Ailesi", "Habsburg Ailesi"],
    answer: "Medici Ailesi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 164,
    question: "Coğrafi Keşiflerin ardından Amerika kıtasından Avrupa'ya taşınan ve Avrupa'da tarımsal üretimi kökten değiştirerek kıtlığı bitiren temel gıda ürünü hangisidir?",
    options: ["Patates", "Buğday", "Pirinç", "Zeytin"],
    answer: "Patates",
    difficulty: "easy",
    points: 10
  },
  {
    id: 165,
    question: "17. yüzyılda İngiltere'de parlamento güçleri ile kraliyet yanlıları arasında çıkan iç savaşta, parlamento ordusuna liderlik ederek krallığı deviren askeri lider kimdir?",
    options: ["Oliver Cromwell", "I. Charles", "George Monck", "William Orange"],
    answer: "Oliver Cromwell",
    difficulty: "medium",
    points: 20
  },
  {
    id: 166,
    question: "19. yüzyılda İngiltere'nin sömürge imparatorluğunun zirvesine ulaştığı, sanayileşmenin ve küresel gücün sembolü olan efsanevi kraliçe dönemi hangisidir?",
    options: ["Viktorya Dönemi", "I. Elizabeth Dönemi", "Anne Dönemi", "II. Elizabeth Dönemi"],
    answer: "Viktorya Dönemi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 167,
    question: "İlk Çağ'da Anadolu ile İran arasında uzanan, Pers İmparatorluğu'nun ticareti, askeri lojistiği ve haberleşmeyi hızlandırmak için kurduğu ünlü tarihi yol hangisidir?",
    options: ["Kral Yolu", "İpek Yolu", "Baharat Yolu", "Kürk Yolu"],
    answer: "Kral Yolu",
    difficulty: "easy",
    points: 10
  },
  {
    id: 168,
    question: "İkinci Dünya Savaşı sırasında Pasifik cephesinde, ABD'nin nükleer bombaları fırlatmasından önce deniz uçak savaşlarıyla Japon donanmasına ilk büyük darbeyi vurduğu dönüm noktası savaşı hangisidir?",
    options: ["Midway Savaşı", "Pearl Harbor", "Iwo Jima", "Okinawa"],
    answer: "Midway Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 169,
    question: "1945'te kurulan Birleşmiş Milletler'in uluslararası hukuki anlaşmazlıkları çözmekle görevli olan ve Hollanda'nın Lahey kentinde bulunan ana yargı organı hangisidir?",
    options: ["Uluslararası Adalet Divanı", "BM Güvenlik Konseyi", "BM Genel Kurulu", "Uluslararası Ceza Mahkemesi"],
    answer: "Uluslararası Adalet Divanı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 170,
    question: "Soğuk Savaş döneminde Berlin'i ikiye bölerek komünist ve kapitalist dünyayı ayıran Berlin Duvarı hangi yılda örülmeye başlanmıştır?",
    options: ["1961", "1945", "1953", "1989"],
    answer: "1961",
    difficulty: "easy",
    points: 10
  },
  {
    id: 171,
    question: "1957 yılında uzaya fırlatılan Sputnik 1 uydusuyla uzay çağını resmen başlatan ve ABD ile büyük bir uzay yarışına giren devlet hangisidir?",
    options: ["Sovyetler Birliği", "Almanya", "İngiltere", "Çin"],
    answer: "Sovyetler Birliği",
    difficulty: "medium",
    points: 20
  },
  {
    id: 172,
    question: "19. yüzyılda İtalya'daki küçük prenslikleri ve devletçikleri diplomatik dehasıyla birleştirerek modern İtalya Krallığı'nın kurulmasını sağlayan ünlü başbakan kimdir?",
    options: ["Camillo Cavour", "Giuseppe Garibaldi", "Mazzini", "Francesco Crispi"],
    answer: "Camillo Cavour",
    difficulty: "hard",
    points: 30
  },
  {
    id: 173,
    question: "Antik Roma'da gladyatörlerin ve esirlerin özgürlüklerini almak amacıyla MÖ 73 yılında Roma Cumhuriyeti'ne karşı başlattığı dev köle isyanının lideri kimdir?",
    options: ["Spartaküs", "Crixus", "Gannicus", "Vercingetorix"],
    answer: "Spartaküs",
    difficulty: "easy",
    points: 10
  },
  {
    id: 174,
    question: "1929 yılında New York Borsası'nın çökmesiyle başlayan, tüm sanayi ülkelerini vurarak milyonlarca insanı işsiz bırakan küresel ekonomik krizin adı nedir?",
    options: ["Büyük Buhran", "Hiperenflasyon Şoku", "Mali İflas", "Kara Cuma Enflasyonu"],
    answer: "Büyük Buhran",
    difficulty: "medium",
    points: 20
  },
  {
    id: 175,
    question: "İkinci Dünya Savaşı sırasında Nazi Almanyası'nın işgal ettiği Fransa'da kurulan ve işgalcilerle işbirliği yapan, başbakanlığını Philippe Pétain'in yürüttüğü hükümet hangisidir?",
    options: ["Vichy Hükümeti", "Özgür Fransa Cephesi", "Direniş Hükümeti", "Paris Rejimi"],
    answer: "Vichy Hükümeti",
    difficulty: "hard",
    points: 30
  },
  {
    id: 176,
    question: "1980'li yıllarda SSCB lideri Mihail Gorbaçov tarafından uygulanan, Sovyet sistemini dışa açmayı hedefleyen reform politikasının adı nedir?",
    options: ["Glasnost", "Perestroyka", "Kominform", "Détente"],
    answer: "Glasnost",
    difficulty: "hard",
    points: 30
  },
  {
    id: 177,
    question: "1914-1918 yılları arasında gerçekleşen Birinci Dünya Savaşı'nı İttifak Devletleri adına resmi olarak bitiren ve Almanya'ya ağır şartlar dayatan ünlü barış antlaşması hangisidir?",
    options: ["Versay Antlaşması", "Saint-Germain Antlaşması", "Trianon Antlaşması", "Sevr Antlaşması"],
    answer: "Versay Antlaşması",
    difficulty: "easy",
    points: 10
  },
  {
    id: 178,
    question: "Coğrafi Keşifler sırasında, dünyanın çevresini dolaşan ilk seferi başlatan ancak Filipinler'de yerlilerle yaptığı savaşta ölen Portekizli kaşif kimdir?",
    options: ["Ferdinand Macellan", "Kristof Kolomb", "Vasco da Gama", "Bartolomeu Dias"],
    answer: "Ferdinand Macellan",
    difficulty: "medium",
    points: 20
  },
  {
    id: 179,
    question: "MÖ 3. yüzyılda Kartaca'nın efsanevi generali Hannibal'ın fillerle Alp Dağları'nı aşarak Roma Cumhuriyeti topraklarını işgal ettiği ünlü antik savaşların adı nedir?",
    options: ["Pön Savaşları", "Peloponnes Savaşları", "Pers Savaşları", "Galya Savaşları"],
    answer: "Pön Savaşları",
    difficulty: "hard",
    points: 30
  },
  {
    id: 180,
    question: "Rönesans döneminin zirvesinde İtalya'da yapılan, anatomi ve estetik harikası kabul edilen dünyaca ünlü 'Davud' heykelinin heykeltıraşı kimdir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Donatello", "Rafael"],
    answer: "Michelangelo",
    difficulty: "easy",
    points: 10
  },
  {
    id: 181,
    question: "1950-1953 yılları arasında yaşanan, Türkiye'nin de NATO ittifakına üye olabilmek amacıyla asker göndererek katıldığı Uzak Doğu savaşı hangisidir?",
    options: ["Kore Savaşı", "Vietnam Savaşı", "Kamboçya Savaşı", "Körfez Savaşı"],
    answer: "Kore Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 182,
    question: "Orta Çağ boyunca Çin'den başlayarak Orta Asya üzerinden Akdeniz limanlarına kadar uzanan, ipek ve porselen ticaretinin yapıldığı tarihi kervan yolu hangisidir?",
    options: ["İpek Yolu", "Baharat Yolu", "Kral Yolu", "Kürk Yolu"],
    answer: "İpek Yolu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 183,
    question: "1648 yılında Avrupa'da Otuz Yıl Savaşları'tını bitiren ve modern uluslararası ilişkiler ile egemenlik ilkelerinin temelini atan antlaşma hangisidir?",
    options: ["Vestfalya Antlaşması", "Augsburg Antlaşması", "Utrecht Antlaşması", "Nantes Fermanı"],
    answer: "Vestfalya Antlaşması",
    difficulty: "hard",
    points: 30
  },
  {
    id: 184,
    question: "MÖ 13. yüzyılda gerçekleşen, Truva atı efsanesiyle bilinen ve Homeros'un ünlü İlyada destanına konu olan savaş hangisidir?",
    options: ["Truva Savaşı", "Pers Savaşı", "Peloponnes Savaşı", "Pön Savaşları"],
    answer: "Truva Savaşı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 185,
    question: "Antik Roma'da halkın eğlenmesi ve gladyatör dövüşlerinin yapılması amacıyla inşa edilen, İtalya'nın başkenti Roma'da bulunan dev amfitiyatronun adı nedir?",
    options: ["Kolezyum", "Panteon", "Partenon", "Forum Roma"],
    answer: "Kolezyum",
    difficulty: "medium",
    points: 20
  },
  {
    id: 186,
    question: "1947 yılında yayımlanan ve ABD'nin komünizm tehdidi altındaki devletlere askeri ve mali destek vermesini öngören doktrin hangisidir?",
    options: ["Truman Doktrini", "Marshall Planı", "Monroe Doktrini", "Eisenhower Planı"],
    answer: "Truman Doktrini",
    difficulty: "hard",
    points: 30
  },
  {
    id: 187,
    question: "ABD'nin İkinci Dünya Savaşı'nın ardından harap olan Avrupa ülkelerinin ekonomik olarak kalkınması amacıyla uyguladığı dev yardım planının adı nedir?",
    options: ["Marshall Planı", "Truman Doktrini", "Molotov Planı", "Schuman Bildirgesi"],
    answer: "Marshall Planı",
    difficulty: "easy",
    points: 10
  },
  {
    id: 188,
    question: "Tarihte 'Güneş Batmayan İmparatorluk' unvanıyla anılan, dünyanın dört bir yanında sömürgelere sahip olmuş Avrupalı kolonyal güç hangisidir?",
    options: ["Büyük Britanya", "Fransa", "İspanya", "Hollanda"],
    answer: "Büyük Britanya",
    difficulty: "medium",
    points: 20
  },
  {
    id: 189,
    question: "1980'li yıllarda SSCB lideri Gorbaçov tarafından uygulanan ve Sovyet sistemini ekonomik olarak yeniden yapılandırmayı hedefleyen ilkenin adı nedir?",
    options: ["Perestroyka", "Glasnost", "Kominform", "Comecon"],
    answer: "Perestroyka",
    difficulty: "hard",
    points: 30
  },
  {
    id: 190,
    question: "Birinci Dünya Savaşı'nın ardından ABD Başkanı Woodrow Wilson tarafından yayımlanan ve ulusların kendi kaderini tayin etmesini öngören ilkelerin adı nedir?",
    options: ["Wilson İlkeleri", "Marshall Planı", "Balfour Deklarasyonu", "Monroe Doktrini"],
    answer: "Wilson İlkeleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 191,
    question: "İkinci Dünya Savaşı'nda müttefik devletlerin zaferiyle sonuçlanan sürecin ardından, küresel barışı korumak amacıyla 1945'te kurulan en büyük uluslararası örgüt hangisidir?",
    options: ["Birleşmiş Milletler", "Milletler Cemiyeti", "Avrupa Birliği", "NATO"],
    answer: "Birleşmiş Milletler",
    difficulty: "medium",
    points: 20
  },
  {
    id: 192,
    question: "Tarihte ilk yazılı antlaşma olarak bilinen, MÖ 1274'te Hitit İmparatorluğu ile Antik Mısır arasında imzalanan barış antlaşması hangisidir?",
    options: ["Kadeş Antlaşması", "Babil Sözleşmesi", "Ninova Antlaşması", "Asur Barışı"],
    answer: "Kadeş Antlaşması",
    difficulty: "easy",
    points: 10
  },
  {
    id: 193,
    question: "Tarihte çivi yazısını bularak insanlık adına yazılı tarihi başlatan ilk Mezopotamya uygarlığı hangisidir?",
    options: ["Sümerler", "Akadlar", "Asurlar", "Babiller"],
    answer: "Sümerler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 194,
    question: "MÖ 5. yüzyılda Atina ile Sparta arasında Yunan dünyasının liderliği için yapılan ünlü iç savaşların genel adı nedir?",
    options: ["Peloponnes Savaşları", "Pers Savaşları", "Pön Savaşları", "Truva Savaşları"],
    answer: "Peloponnes Savaşları",
    difficulty: "medium",
    points: 20
  },
  {
    id: 195,
    question: "MÖ 218 yılında İkinci Pön Savaşı'nda fillerden oluşan ordusuyla Alpleri aşarak Roma'yı sarsan efsanevi Kartacalı komutan kimdir?",
    options: ["Hannibal Barca", "Hamilcar Barca", "Scipio Africanus", "Hasdrubal"],
    answer: "Hannibal Barca",
    difficulty: "hard",
    points: 30
  },
  {
    id: 196,
    question: "1215 yılında İngiltere'de Kral Yurtsuz John'un yetkilerini kısıtlayan ve modern anayasal düzenin ilk basamağı sayılan belge hangisidir?",
    options: ["Magna Carta Libertatum", "Haklar Bildirgesi", "Versay Sözleşmesi", "Utrecht Antlaşması"],
    answer: "Magna Carta Libertatum",
    difficulty: "easy",
    points: 10
  },
  {
    id: 197,
    question: "Orta Çağ Avrupa'sında Katolik Kilisesi'nin kendi doktrinlerine karşı çıkanları, heretikleri yargılamak için kurduğu korkulan mahkeme sistemi hangisidir?",
    options: ["Engizisyon Mahkemeleri", "Lahey Divanı", "Feodal Konsey", "Yüce Meclis"],
    answer: "Engizisyon Mahkemeleri",
    difficulty: "medium",
    points: 20
  },
  {
    id: 198,
    question: "1455-1485 yılları arasında İngiltere tahtı için York ve Lancaster hanedanları arasında yaşanan iç savaşa ne ad verilir?",
    options: ["Güller Savaşı", "Yüzyıl Savaşları", "Otuz Yıl Savaşları", "Yedi Yıl Savaşları"],
    answer: "Güller Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 199,
    question: "15. ve 16. yüzyıllarda Avrupa'da bilim, sanat ve edebiyatta yaşanan büyük 'Yeniden Doğuş' hareketine verilen isim hangisidir?",
    options: ["Rönesans", "Reform", "Aydınlanma Çağı", "Sanayi Devrimi"],
    answer: "Rönesans",
    difficulty: "easy",
    points: 10
  },
  {
    id: 200,
    question: "Avrupa'da mezhep savaşlarını bitiren ve modern ulus-devlet egemenliği anlayışının temelini atan 1648 tarihli antlaşma hangisidir?",
    options: ["Vestfalya Antlaşması", "Augsburg Antlaşması", "Nantes Fermanı", "Utrecht Antlaşması"],
    answer: "Vestfalya Antlaşması",
    difficulty: "medium",
    points: 20
  },
  {
    id: 201,
    question: "Aydınlanma Çağı'nda 'Devlet adlı yapıtında güçler ayrılığı ilkesini savunarak modern demokrasilerin hukuk yapısını şekillendiren Fransız düşünür kimdir?",
    options: ["Montesquieu", "Jean-Jacques Rousseau", "Voltaire", "Denis Diderot"],
    answer: "Montesquieu",
    difficulty: "hard",
    points: 30
  },
  {
    id: 202,
    question: "1789 yılında Fransa'da mutlak monarşinin sembolü olan ve halk isyanıyla basılarak yıkılan ünlü hapishanenin adı nedir?",
    options: ["Bastille Hapishanesi", "Versay Kalesi", "Tuileries Sarayı", "Conciergerie"],
    answer: "Bastille Hapishanesi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 203,
    question: "Fransız İhtilali'nin ardından ordunun başına geçerek Avrupa'yı fethetmeye girişen ve Waterloo Savaşı'nda kesin olarak yenilen imparator kimdir?",
    options: ["Napoleon Bonaparte", "XVI. Louis", "XVIII. Louis", "III. Napoleon"],
    answer: "Napoleon Bonaparte",
    difficulty: "medium",
    points: 20
  },
  {
    id: 204,
    question: "Napolyon Savaşları'nın ardından 1815'te toplanan ve Avrupa haritasını monarşileri koruyacak şekilde yeniden çizen uluslararası kongre hangisidir?",
    options: ["Viyana Kongresi", "Berlin Kongresi", "Paris Konferansı", "Aachen Kongresi"],
    answer: "Viyana Kongresi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 205,
    question: "Sanayi Devrimi'nin başlamasında en büyük rolü oynayan, James Watt tarafından geliştirilen teknolojik icat hangisidir?",
    options: ["Buhar Makinesi", "Matbaa", "Telgraf", "Dokuma Mekiği"],
    answer: "Buhar Makinesi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 206,
    question: "19. yüzyılda Alman prensliklerini birleştirerek modern Alman İmparatorluğu'nun kurulmasını sağlayan, 'Demir Şansölye' lakaplı devlet adamı kimdir?",
    options: ["Otto von Bismarck", "Kaiser Wilhelm", "Klemens von Metternich", "Friedrich Ebert"],
    answer: "Otto von Bismarck",
    difficulty: "medium",
    points: 20
  },
  {
    id: 207,
    question: "1884-1885 yıllarında toplanan ve Avrupalı sömürgeci güçlerin Afrika kıtasını harita üzerinde paylaştığı tarihi konferans hangisidir?",
    options: ["Berlin Konferansı", "Londra Konferansı", "Brüksel Kongresi", "Paris Konferansı"],
    answer: "Berlin Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 208,
    question: "1914 yılında Birinci Dünya Savaşı'nın patlak vermesine neden olan suikast hangi Balkan şehrinde gerçekleşmiştir?",
    options: ["Saraybosna", "Belgrad", "Sofya", "Atina"],
    answer: "Saraybosna",
    difficulty: "easy",
    points: 10
  },
  {
    id: 209,
    question: "Birinci Dünya Savaşı'nı İtilaf Devletleri adına kazanan ve yenilen Almanya'ya çok ağır ekonomik ve askeri şartlar yükleyen antlaşma hangisidir?",
    options: ["Versay Antlaşması", "Saint-Germain Antlaşması", "Trianon Antlaşması", "Sevr Antlaşması"],
    answer: "Versay Antlaşması",
    difficulty: "medium",
    points: 20
  },
  {
    id: 210,
    question: "1917 yılında Rusya'da gerçekleşen ve Çarlık rejimini yıkarak yerine Sovyetler Birliği'nin kurulmasına zemin hazırlayan devrimin lideri kimdir?",
    options: ["Vladimir Lenin", "Leon Troçki", "Josef Stalin", "Aleksandr Kerenski"],
    answer: "Vladimir Lenin",
    difficulty: "hard",
    points: 30
  },
  {
    id: 211,
    question: "1929 yılında New York Borsası'nın çökmesiyle başlayan ve tüm dünyayı sarsan küresel ekonomik buhrana ne ad verilir?",
    options: ["Büyük Buhran", "Kara Çarşamba", "Hiperenflasyon Krizi", "Petrol Şoku"],
    answer: "Büyük Buhran",
    difficulty: "easy",
    points: 10
  },
  {
    id: 212,
    question: "İkinci Dünya Savaşı öncesinde İtalya'da 'Kara Gömlekliler' adlı örgütüyle faşist bir diktatörlük kuran lider kimdir?",
    options: ["Benito Mussolini", "Adolf Hitler", "Francisco Franco", "Antonio Salazar"],
    answer: "Benito Mussolini",
    difficulty: "medium",
    points: 20
  },
  {
    id: 213,
    question: "İkinci Dünya Savaşı sırasında Nazi Almanyası'nın SSCB'yi istila etmek amacıyla başlattığı, tarihin en büyük askeri kara harekatının kod adı nedir?",
    options: ["Barbarossa Harekâtı", "Overlord Harekâtı", "Deniz Aslanı Harekâtı", "Bulge Harekâtı"],
    answer: "Barbarossa Harekâtı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 214,
    question: "7 Aralık 1941'de Japonya'nın düzenlediği ve ABD'nin İkinci Dünya Savaşı'na resmen girmesine neden olan askeri baskın hangisidir?",
    options: ["Pearl Harbor Baskını", "Midway Savaşı", "Okinawa Çıkarması", "Hiroşima Saldırısı"],
    answer: "Pearl Harbor Baskını",
    difficulty: "easy",
    points: 10
  },
  {
    id: 215,
    question: "İkinci Dünya Savaşı'nın Avrupa cephesindeki gidişatını değiştiren, 1944 yılında müttefiklerin Fransa kıyılarına yaptığı devasa çıkarma hangisidir?",
    options: ["Normandiya Çıkarması", "Sicilya Çıkarması", "Dunkirk Tahliyesi", "Anzio Kuşatması"],
    answer: "Normandiya Çıkarması",
    difficulty: "medium",
    points: 20
  },
  {
    id: 216,
    question: "1945 yılında II. Dünya Savaşı sonrasında savaş suçlularını yargılamak amacıyla kurulan ve uluslararası ceza hukukunun miladı sayılan mahkeme hangisidir?",
    options: ["Nürnberg Mahkemeleri", "Lahey Adalet Divanı", "Tokyo Askeri Ceza Mahkemesi", "Versay Konseyi"],
    answer: "Nürnberg Mahkemeleri",
    difficulty: "hard",
    points: 30
  },
  {
    id: 217,
    question: "İkinci Dünya Savaşı'nın ardından küresel barışı korumak ve anlaşmazlıkları çözmek amacıyla 1945'te kurulan uluslararası örgüt hangisidir?",
    options: ["Birleşmiş Milletler", "Milletler Cemiyeti", "NATO", "Avrupa Konseyi"],
    answer: "Birleşmiş Milletler",
    difficulty: "easy",
    points: 10
  },
  {
    id: 218,
    question: "Soğuk Savaş döneminde nükleer bir savaş riskini en üst düzeye çıkaran, 1962 yılında ABD ile SSCB'yi karşı karşıya getiren diplomatik kriz hangisidir?",
    options: ["Küba Füze Krizi", "Berlin Ablukası", "Süveyş Krizi", "U-2 Casus Uçak Krizi"],
    answer: "Küba Füze Krizi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 219,
    question: "1955 yılında nükleer silahlara ve bloklaşmaya karşı olan, sömürgecilikten yeni kurtulmuş Asya ve Afrika ülkelerinin toplandığı, 'Bağlantısızlar Hareketi'nin temelini atan konferans hangisidir?",
    options: ["Bandung Konferansı", "Kahire Konferansı", "Tahran Konferansı", "Belgrad Konferansı"],
    answer: "Bandung Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 220,
    question: "Soğuk Savaş'ın simgesi olan ve komünist blok ile batı dünyasını ayıran Berlin Duvarı hangi yıl yıkılmıştır?",
    options: ["1989", "1991", "1985", "1993"],
    answer: "1989",
    difficulty: "easy",
    points: 10
  },
  {
    id: 221,
    question: "1980'li yıllarda SSCB'nin çöküşünü engellemek için Mihail Gorbaçov tarafından ortaya atılan, 'Açıklık' anlamına gelen politikanın adı nedir?",
    options: ["Glasnost", "Perestroyka", "Détente", "Kominform"],
    answer: "Glasnost",
    difficulty: "medium",
    points: 20
  },
  {
    id: 222,
    question: "Güney Afrika Cumhuriyeti'nde uygulanan ırkçı 'Apartayd' rejimine karşı mücadelesiyle bilinen ve ülkenin ilk siyahi devlet başkanı olan lider kimdir?",
    options: ["Nelson Mandela", "Desmond Tutu", "Kofi Annan", "Patrice Lumumba"],
    answer: "Nelson Mandela",
    difficulty: "hard",
    points: 30
  },
  {
    id: 223,
    question: "Coğrafi Keşifler sırasında Amerika kıtasına ulaşan ilk Avrupalı denizci olmasına rağmen, burayı Hindistan zanneden kaşif kimdir?",
    options: ["Kristof Kolomb", "Amerigo Vespucci", "Vasco da Gama", "Ferdinand Macellan"],
    answer: "Kristof Kolomb",
    difficulty: "easy",
    points: 10
  },
  {
    id: 224,
    question: "Orta Çağ boyunca Asya'dan başlayıp Anadolu ve Akdeniz üzerinden Avrupa'ya uzanan, lüks tüketim mallarının taşındığı tarihi ticaret yolu hangisidir?",
    options: ["İpek Yolu", "Baharat Yolu", "Kral Yolu", "Kürk Yolu"],
    answer: "İpek Yolu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 225,
    question: "MÖ 14. yüzyılda Hitit İmparatorluğu ile Antik Mısır arasında Suriye toprakları için yapılan ve tarihin ilk yazılı barış antlaşmasıyla sonuçlanan savaş hangisidir?",
    options: ["Kadeş Savaşı", "Megiddo Savaşı", "Ninova Savaşı", "Babil Savaşı"],
    answer: "Kadeş Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 226,
    question: "Antik Roma'da gladyatör dövüşlerinin ve halk gösterilerinin yapıldığı, günümüzde Roma'nın en büyük simgesi olan dev amfitiyatro hangisidir?",
    options: ["Kolezyum", "Panteon", "Partenon", "Caracalla Hamamları"],
    answer: "Kolezyum",
    difficulty: "easy",
    points: 10
  },
  {
    id: 227,
    question: "16. yüzyılda Almanya'da Katolik Kilisesi'nin uygulamalarını protesto ederek Hristiyanlıkta Reform hareketini başlatan ilahiyatçı kimdir?",
    options: ["Martin Luther", "Jean Calvin", "Huldrych Zwingli", "Erasmus"],
    answer: "Martin Luther",
    difficulty: "medium",
    points: 20
  },
  {
    id: 228,
    question: "Fransız İhtilali sırasında yürütülen Terör Dönemi'nin mimarı olan ancak daha sonra kendisi de giyotine gönderilen Jakoben lider kimdir?",
    options: ["Maximilien Robespierre", "Georges Danton", "Jean-Paul Marat", "Louis de Saint-Just"],
    answer: "Maximilien Robespierre",
    difficulty: "hard",
    points: 30
  },
  {
    id: 229,
    question: "1969 yılında Apollo 11 misyonuyla Ay'a ayak basan ilk insan olarak tarihe geçen Amerikalı astronot kimdir?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    answer: "Neil Armstrong",
    difficulty: "easy",
    points: 10
  },
  {
    id: 230,
    question: "Soğuk Savaş döneminde Doğu Bloku komünist ülkelerinin askeri ittifak kurmak amacıyla 1955'te imzaladığı pakt hangisidir?",
    options: ["Varşova Paktı", "NATO", "Balkan Paktı", "Sadabat Paktı"],
    answer: "Varşova Paktı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 231,
    question: "1914 yılında I. Dünya Savaşı başladığında; İngiltere, Fransa ve Rusya'nın oluşturduğu askeri bloğun adı nedir?",
    options: ["İtilaf Devletleri", "İttifak Devletleri", "Mihver Devletleri", "Müttefik Devletler"],
    answer: "İtilaf Devletleri",
    difficulty: "hard",
    points: 30
  },
  {
    id: 232,
    question: "Tarihte ilk kez atom bombasının kullanıldığı ve İkinci Dünya Savaşı'nın Pasifik cephesini kapatan askeri saldırı hangi ülkeye yapılmıştır?",
    options: ["Japonya", "Almanya", "İtalya", "Çin"],
    answer: "Japonya",
    difficulty: "easy",
    points: 10
  },
  {
    id: 233,
    question: "Rönesans döneminin en önemli başyapıtlarından olan 'Mona Lisa' ve 'Son Akşam Yemeği' tablolarının yaratıcısı İtalyan dahi kimdir?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    answer: "Leonardo da Vinci",
    difficulty: "medium",
    points: 20
  },
  {
    id: 234,
    question: "1947 yılında yürürlüğe giren ve ABD'nin komünizm tehdidi altındaki Avrupa devletlerine ekonomik kalkınma sağlamak amacıyla yaptığı dev yardım planı hangisidir?",
    options: ["Marshall Planı", "Truman Doktrini", "Monroe Doktrini", "Balfour Deklarasyonu"],
    answer: "Marshall Planı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 235,
    question: "MÖ 4. yüzyılda tahta çıkarak Yunanistan'dan Hindistan'a kadar uzanan bir imparatorluk kuran ve Helenistik dönemi başlatan Makedon kral kimdir?",
    options: ["Büyük İskender", "II. Filippos", "Julius Sezar", "Xerxes"],
    answer: "Büyük İskender",
    difficulty: "easy",
    points: 10
  },
  {
    id: 236,
    question: "Tarihte ilk kez düzenli ve sürekli ordu sistemini kurarak Mezopotamya'da ilk imparatorluğu inşa eden kadim lider kimdir?",
    options: ["Kral Sargon", "Hammurabi", "Asurbanipal", "I. Kiros"],
    answer: "Kral Sargon",
    difficulty: "medium",
    points: 20
  },
  {
    id: 237,
    question: "1950-1953 yılları arasında yaşanan ve Türkiye'nin de NATO'ya üye olabilmek amacıyla tugay seviyesinde asker gönderdiği Soğuk Savaş dönemi sıcak çatışması hangisidir?",
    options: ["Kore Savaşı", "Vietnam Savaşı", "Süveyş Krizi", "Körfez Savaşı"],
    answer: "Kore Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 238,
    question: "1991 yılında resmen dağılarak Soğuk Savaş döneminin kapanmasına ve iki kutuplu dünya düzeninin bitmesine neden olan komünist devlet hangisidir?",
    options: ["Sovyetler Birliği", "Yugoslavya", "Çekoslovakya", "Doğu Almanya"],
    answer: "Sovyetler Birliği",
    difficulty: "easy",
    points: 10
  },
  {
    id: 239,
    question: "Antik Roma Cumhuriyeti'nin son döneminde diktatörlüğünü ilan eden ve senatoda uğradığı suikastla öldürülen dünyaca ünlü Romalı devlet adamı kimdir?",
    options: ["Julius Sezar", "Sezar Augustus", "Neron", "Marcus Aurelius"],
    answer: "Julius Sezar",
    difficulty: "medium",
    points: 20
  },
  {
    id: 240,
    question: "1945 yılında Churchill, Roosevelt ve Stalin'in katılımıyla gerçekleşen ve savaş sonrası Avrupa'nın yeni sınırları ile nüfuz alanlarını belirleyen meşhur konferans hangisidir?",
    options: ["Yalta Konferansı", "Tahran Konferansı", "Potsdam Konferansı", "Casablanca Konferansı"],
    answer: "Yalta Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 241,
    question: "19. yüzyılda üzerinde güneş batmayan imparatorluk olarak anılan ve dünyanın en büyük sömürge gücü haline gelen Avrupa devleti hangisidir?",
    options: ["Büyük Britanya", "Fransa", "İspanya", "Portekiz"],
    answer: "Büyük Britanya",
    difficulty: "easy",
    points: 10
  },
  {
    id: 242,
    question: "1957 yılında fırlatılan ve uzaya gönderilen insan yapımı ilk yapay uydu olma unvanını taşıyan Sovyet uydusunun adı nedir?",
    options: ["Sputnik 1", "Vostok 1", "Explorer 1", "Apollo 11"],
    answer: "Sputnik 1",
    difficulty: "medium",
    points: 20
  },
  {
    id: 243,
    question: "Dünyanın antik yedi harikasından biri olan ve Babil Kralı Nebukadnezar tarafından eşi için yaptırılan efsanevi yapı hangisidir?",
    options: ["Babil'in Asma Bahçeleri", "Giza Piramidi", "İskenderiye Feneri", "Artemis Tapınağı"],
    answer: "Babil'in Asma Bahçeleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 244,
    question: "16. yüzyılda güneş merkezli evren teorisini ortaya atarak kilisenin dünya merkezli evren dogmasını sarsan Polonyalı astronom kimdir?",
    options: ["Nicolaus Copernicus", "Galileo Galilei", "Johannes Kepler", "Isaac Newton"],
    answer: "Nicolaus Copernicus",
    difficulty: "medium",
    points: 20
  },
  {
    id: 245,
    question: "16. yüzyılın başlarında İtalya'da yazdığı 'Prens' adlı eseriyle modern siyaset biliminin ve 'amaca giden her yol mübahttır' anlayışının temelini atan düşünür kimdir?",
    options: ["Niccolò Machiavelli", "Thomas Hobbes", "John Locke", "Jean Bodin"],
    answer: "Niccolò Machiavelli",
    difficulty: "hard",
    points: 30
  },
  {
    id: 246,
    question: "MÖ 3. yüzyılda Çin İmparatorluğu'nu kuzeyden gelen Göktürk ve Hun akınlarına karşı korumak amacıyla inşasına başlanan devasa savunma yapısı hangisidir?",
    options: ["Çin Seddi", "Babil Surları", "Truva Duvarları", "Hadrian Duvarı"],
    answer: "Çin Seddi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 247,
    question: "Orta Çağ Avrupa'sında kilisenin ve senyörlerin baskısından kaçan zanaatkâr ve tüccarların şehirlerde kurduğu, üretimi ve fiyatları denetleyen meslek örgütlerine ne ad verilirdi?",
    options: ["Lonca", "Burjuvazi", "Serf Teşkilatı", "Vasal Meclisi"],
    answer: "Lonca",
    difficulty: "medium",
    points: 20
  },
  {
    id: 248,
    question: "İngiltere'de York ve Lancaster hanedanları arasındaki iç savaşı bitirerek tahta çıkan ve İngiltere'de mutlak monarşi dönemini başlatan ünlü hanedan hangisidir?",
    options: ["Tudor Hanedanı", "Stuart Hanedanı", "Plantagenet Hanedanı", "Windsor Hanedanı"],
    answer: "Tudor Hanedanı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 249,
    question: "Rönesans döneminde Sistina Şapeli'nin duvarlarına 'Son Yargı' freskini yapan ve devasa 'Davud' heykelini yontan ünlü İtalyan sanatçı kimdir?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Sandro Botticelli"],
    answer: "Michelangelo",
    difficulty: "easy",
    points: 10
  },
  {
    id: 250,
    question: "Avrupa'da Otuz Yıl Savaşları'nı bitiren 1648 Vestfalya Antlaşması'yla bağımsızlığı uluslararası alanda resmen tanınan Avrupa devleti hangisidir?",
    options: ["İsviçre", "Almanya", "Fransa", "Avusturya"],
    answer: "İsviçre",
    difficulty: "medium",
    points: 20
  },
  {
    id: 251,
    question: "Aydınlanma Çağı'nda 'Leviathan' adlı eseri yazarak toplumsal sözleşme fikrini ilk kez ortaya atan ve mutlak monarşiyi savunan İngiliz filozof kimdir?",
    options: ["Thomas Hobbes", "John Locke", "Jean-Jacques Rousseau", "Baruch Spinoza"],
    answer: "Thomas Hobbes",
    difficulty: "hard",
    points: 30
  },
  {
    id: 252,
    question: "Fransız İhtilali'nin simgesi olan ve ihtilal döneminde Kral XVI. Louis dahil binlerce kişinin idam edilmesinde kullanılan mekanik infaz aracının adı nedir?",
    options: ["Giyotini", "Darağacı", "Engizisyon Tezgahı", "Elektrikli Sandalye"],
    answer: "Giyotin",
    difficulty: "easy",
    points: 10
  },
  {
    id: 253,
    question: "1805 yılında yapılan ve Napolyon'un askeri dehasıyla Avusturya ve Rusya imparatorluklarını bozguna uğrattığı, tarihe 'Üç İmparator Savaşı' olarak geçen ünlü çatışma hangisidir?",
    options: ["Austerlitz Savaşı", "Waterloo Savaşı", "Leipzig Savaşı", "Borodino Savaşı"],
    answer: "Austerlitz Savaşı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 254,
    question: "1815 Viyana Kongresi'nde alınan kararlarla Avrupa'da krallıkları korumak ve ihtilal fikirlerini bastırmak amacıyla kurulan korumacı sistemin mimarı olan Avusturya başbakanı kimdir?",
    options: ["Klemens von Metternich", "Otto von Bismarck", "Kaiser Franz", "Karl Nesselrode"],
    answer: "Klemens von Metternich",
    difficulty: "hard",
    points: 30
  },
  {
    id: 255,
    question: "Sanayi Devrimi sırasında üretilen fabrikasyon ürünlerin hızla taşınmasını sağlayan, George Stephenson tarafından icat edilen ulaşım aracı hangisidir?",
    options: ["Buharlı Lokomotif", "Buharlı Gemi", "Otomobil", "Zeppelin"],
    answer: "Buharlı Lokomotif",
    difficulty: "easy",
    points: 10
  },
  {
    id: 256,
    question: "19. yüzyılda dağınık haldeki İtalyan devletçiklerini birleştirerek modern İtalya Krallığı'nı kuran ve 'Kırmızı Gömlekliler' ordusuyla bilinen ulusal kahraman kimdir?",
    options: ["Giuseppe Garibaldi", "Camillo Cavour", "Giuseppe Mazzini", "Victor Emmanuel"],
    answer: "Giuseppe Garibaldi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 257,
    question: "19. yüzyılın sonlarında Avrupalı devletlerin sömürge edinmek amacıyla Afrika içlerine yaptığı askeri ve coğrafi akınlara tarih yazımında verilen genel ad nedir?",
    options: ["Afrika Talanı", "Koloni Akını", "Misyonerlik Seferleri", "Büyük Keşifler Dönemi"],
    answer: "Afrika Talanı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 258,
    question: "I. Dünya Savaşı'nı başlatan veliaht suikastı, Avusturya-Macaristan İmparatorluğu veliahdı Frans Ferdinand'a karşı hangi milliyetçi Sırp örgütü üyesi tarafından yapılmıştır?",
    options: ["Kara El", "Genç Sırplar", "Balkan Direniş Cephesi", "Çetnikler"],
    answer: "Kara El",
    difficulty: "easy",
    points: 10
  },
  {
    id: 259,
    question: "Birinci Dünya Savaşı'nın ardından galipler tarafından hazırlanan, Osmanlı İmparatorluğu'nu parçalamayı hedefleyen ancak Türk milleti tarafından reddedilen antlaşma hangisidir?",
    options: ["Sevr Antlaşması", "Versay Antlaşması", "Lozan Antlaşması", "Mondros Mütarekesi"],
    answer: "Sevr Antlaşması",
    difficulty: "medium",
    points: 20
  },
  {
    id: 260,
    question: "1917 Rus Devrimi sırasında Çarlık rejimini deviren ancak daha sonra Lenin liderliğindeki Bolşevikler tarafından devrilen geçici hükümetin başbakanı kimdir?",
    options: ["Aleksandr Kerenski", "Lev Troçki", "Georgi Plehanov", "Nikolay Buharin"],
    answer: "Aleksandr Kerenski",
    difficulty: "hard",
    points: 30
  },
  {
    id: 261,
    question: "1929 yılında tüm dünyayı sarsan Büyük Buhran adlı ekonomik kriz, ilk olarak hangi ülkenin borsasının çökmesiyle başlamıştır?",
    options: ["Amerika Birleşik Devletleri", "İngiltere", "Almanya", "Fransa"],
    answer: "Amerika Birleşik Devletleri",
    difficulty: "easy",
    points: 10
  },
  {
    id: 262,
    question: "Almanya'da 1933 yılında iktidara gelerek 'Üçüncü Reich' dönemini başlatan ve totaliter bir nazi diktatörlüğü kuran lider kimdir?",
    options: ["Adolf Hitler", "Hermann Göring", "Joseph Goebbels", "Heinrich Himmler"],
    answer: "Adolf Hitler",
    difficulty: "medium",
    points: 20
  },
  {
    id: 263,
    question: "İkinci Dünya Savaşı'nın Pasifik cephesinde, ABD donanmasının Japon uçak gemilerini batırarak üstünlüğü ele geçirdiği en kritik deniz savaşı hangisidir?",
    options: ["Midway Deniz Muharebesi", "Pearl Harbor Baskını", "Mercan Denizi Savaşı", "Leyte Körfezi Savaşı"],
    answer: "Midway Deniz Muharebesi",
    difficulty: "hard",
    points: 30
  },
  {
    id: 264,
    question: "İkinci Dünya Savaşı'nı kesin olarak bitirmek amacıyla ABD tarafından tarihte ilk kez atom bombası atılan Japon şehirleri sırasıyla hangileridir?",
    options: ["Hiroşima ve Nagazaki", "Tokyo ve Osaka", "Kyoto ve Yokohama", "Okinawa ve İwo Jima"],
    answer: "Hiroşima ve Nagazaki",
    difficulty: "easy",
    points: 10
  },
  {
    id: 265,
    question: "İkinci Dünya Savaşı'nın ardından, savaşın galibi olan müttefik devletlerin dünyadaki yeni güç dengelerini ve nüfuz alanlarını belirlediği 1945 tarihli meşhur konferans hangisidir?",
    options: ["Yalta Konferansı", "Tahran Konferansı", "Casablanca Konferansı", "Londra Konferansı"],
    answer: "Yalta Konferansı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 266,
    question: "İkinci Dünya Savaşı sonrasında Nazi liderlerinin insanlığa karşı suçlardan yargılandığı Nürnberg Mahkemeleri hangi ülkede kurulmuştur?",
    options: ["Almanya", "Hollanda", "Fransa", "Avusturya"],
    answer: "Almanya",
    difficulty: "hard",
    points: 30
  },
  {
    id: 267,
    question: "1945 yılında kurulan Birleşmiş Milletler'in dünya barışını korumakla görevli, 5 daimi üyenin veto yetkisine sahip olduğu en yetkili organı hangisidir?",
    options: ["BM Güvenlik Konseyi", "BM Genel Kurulu", "Uluslararası Adalet Divanı", "BM Ekonomik Konseyi"],
    answer: "BM Güvenlik Konseyi",
    difficulty: "easy",
    points: 10
  },
  {
    id: 268,
    question: "Soğuk Savaş döneminde, nükleer savaş riskini en üst seviyeye çıkaran, ABD ve SSCB'yi doğrudan karşı karşıya getiren 1962 tarihli küresel kriz hangisidir?",
    options: ["Küba Füze Krizi", "Berlin Ablukası", "Süveyş Krizi", "U-2 Casus Uçak Krizi"],
    answer: "Küba Füze Krizi",
    difficulty: "medium",
    points: 20
  },
  {
    id: 269,
    question: "1955 yılında Endonezya'da toplanan, sömürgeciliğe karşı çıkan Asya ve Afrika ülkelerinin bir araya gelerek 'Bağlantısızlar Hareketi'nin temelini attığı konferans hangisidir?",
    options: ["Bandung Konferansı", "Kahire Konferansı", "Tahran Konferansı", "Belgrad Konferansı"],
    answer: "Bandung Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 270,
    question: "Soğuk Savaş'ın en somut simgelerinden biri olan, Doğu ve Batı Berlin'i ayıran Berlin Duvarı hangi yıl yıkılmıştır?",
    options: ["1989", "1991", "1985", "1993"],
    answer: "1989",
    difficulty: "easy",
    points: 10
  },
  {
    id: 271,
    question: "1980'li yılların sonunda SSCB lideri Gorbaçov tarafından uygulanan, Sovyet sistemini dışa açmayı ve şeffaflığı hedefleyen reform politikasının adı nedir?",
    options: ["Glasnost", "Perestroyka", "Détente", "Kominform"],
    answer: "Glasnost",
    difficulty: "medium",
    points: 20
  },
  {
    id: 272,
    question: "Güney Afrika Cumhuriyeti'nde onlarca yıl uygulanan ırkçı Apartayd rejimini yıkarak ülkenin ilk siyahi devlet başkanı seçilen efsanevi özgürlük lideri kimdir?",
    options: ["Nelson Mandela", "Desmond Tutu", "Kofi Annan", "Steve Biko"],
    answer: "Nelson Mandela",
    difficulty: "hard",
    points: 30
  },
  {
    id: 273,
    question: "Coğrafi Keşifler döneminde İspanya adına batıya yelken açan ancak ulaştığı yeni kıtayı Hindistan zannederek ölen İtalyan denizci kimdir?",
    options: ["Kristof Kolomb", "Amerigo Vespucci", "Vasco da Gama", "Ferdinand Macellan"],
    answer: "Kristof Kolomb",
    difficulty: "easy",
    points: 10
  },
  {
    id: 274,
    question: "İlk Çağ ve Orta Çağ boyunca Çin'den başlayarak Orta Asya üzerinden Akdeniz limanlarına uzanan, ipek ve porselen ticaretinin yapıldığı kervan yolu hangisidir?",
    options: ["İpek Yolu", "Baharat Yolu", "Kral Yolu", "Kürk Yolu"],
    answer: "İpek Yolu",
    difficulty: "medium",
    points: 20
  },
  {
    id: 275,
    question: "MÖ 1274 yılında Hitit İmparatorluğu ile Antik Mısır arasında Suriye topraklarının kontrolü için yapılan ve tarihin ilk yazılı barış antlaşmasıyla biten savaş hangisidir?",
    options: ["Kadeş Savaşı", "Megiddo Savaşı", "Ninova Savaşı", "Babil Savaşı"],
    answer: "Kadeş Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 276,
    question: "Antik Roma'da halkın ve senatonun izlemesi için gladyatör dövüşlerinin yapıldığı, günümüzde İtalya'nın en büyük simgesi olan dev amfitiyatro hangisidir?",
    options: ["Kolezyum", "Panteon", "Partenon", "Forum Roma"],
    answer: "Kolezyum",
    difficulty: "easy",
    points: 10
  },
  {
    id: 277,
    question: "16. yüzyılda Almanya'da Katolik Kilisesi'nin endüljans uygulamasına karşı çıkarak Reform hareketini başlatan ilahiyatçı kimdir?",
    options: ["Martin Luther", "Jean Calvin", "Huldrych Zwingli", "Erasmus"],
    answer: "Martin Luther",
    difficulty: "medium",
    points: 20
  },
  {
    id: 278,
    question: "Fransız İhtilali'nin en radikal aşaması olan Terör Dönemi'nin liderliğini yapan ancak daha sonra kendisi de giyotine gönderilen Jakoben siyasetçi kimdir?",
    options: ["Maximilien Robespierre", "Georges Danton", "Jean-Paul Marat", "Louis de Saint-Just"],
    answer: "Maximilien Robespierre",
    difficulty: "hard",
    points: 30
  },
  {
    id: 279,
    question: "1969 yılında Apollo 11 misyonu kapsamında Ay yüzeyine ayak basan ilk insan olarak dünya tarihine geçen Amerikalı astronot kimdir?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    answer: "Neil Armstrong",
    difficulty: "easy",
    points: 10
  },
  {
    id: 280,
    question: "Soğuk Savaş döneminde, ABD liderliğindeki Batı ittifakına karşı Doğu Bloku komünist ülkelerinin 1955'te kurduğu askeri savunma paktı hangisidir?",
    options: ["Varşova Paktı", "NATO", "Balkan Paktı", "Sadabat Paktı"],
    answer: "Varşova Paktı",
    difficulty: "medium",
    points: 20
  },
  {
    id: 281,
    question: "1914 yılında I. Dünya Savaşı patlak verdiğinde; İngiltere, Fransa ve Rusya İmparatorluğu'nun oluşturduğu askeri ittifak bloğunun adı nedir?",
    options: ["İtilaf Devletleri", "İttifak Devletleri", "Mihver Devletler", "Müttefikler"],
    answer: "İtilaf Devletleri",
    difficulty: "hard",
    points: 30
  },
  {
    id: 282,
    question: "İkinci Dünya Savaşı'nın Pasifik cephesini kapatan, dünya tarihinde ilk kez atom bombasının kullanıldığı askeri saldırı hangi ülkeye düzenlenmiştir?",
    options: ["Japonya", "Almanya", "İtalya", "Çin"],
    answer: "Japonya",
    difficulty: "easy",
    points: 10
  },
  {
    id: 283,
    question: "İtalyan Rönesansı'nın en tanınan başyapıtları olan 'Mona Lisa' ve 'Son Akşam Yemeği' tablolarının yaratıcısı olan dahi sanatçı kimdir?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    answer: "Leonardo da Vinci",
    difficulty: "medium",
    points: 20
  },
  {
    id: 284,
    question: "İkinci Dünya Savaşı'nın ardından ABD'nin harap olan Avrupa devletlerine ekonomik destek sağlamak ve komünizmi engellemek amacıyla başlattığı dev yardım planı hangisidir?",
    options: ["Marshall Planı", "Truman Doktrini", "Monroe Doktrini", "Balfour Deklarasyonu"],
    answer: "Marshall Planı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 285,
    question: "MÖ 4. yüzyılda tahta geçerek Yunanistan'dan Hindistan sınırına kadar uzanan devasa bir imparatorluk kuran ve Helenistik dönemi başlatan Makedon kral kimdir?",
    options: ["Büyük İskender", "II. Filippos", "Julius Sezar", "Darius"],
    answer: "Büyük İskender",
    difficulty: "easy",
    points: 10
  },
  {
    id: 286,
    question: "Tarihte ilk düzenli orduları kurarak Mezopotamya'da tarihin ilk merkezi imparatorluğunu inşa eden kadim kral kimdir?",
    options: ["Kral Sargon", "Hammurabi", "Asurbanipal", "I. Kiros"],
    answer: "Kral Sargon",
    difficulty: "medium",
    points: 20
  },
  {
    id: 287,
    question: "1950-1953 yılları arasında yaşanan ve Türkiye'nin de NATO'ya üye olabilmek amacıyla tugay düzeyinde asker gönderdiği Soğuk Savaş dönemi sıcak çatışması hangisidir?",
    options: ["Kore Savaşı", "Vietnam Savaşı", "Süveyş Krizi", "Körfez Savaşı"],
    answer: "Kore Savaşı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 288,
    question: "1991 yılında ekonomik ve idari olarak parçalanarak Soğuk Savaş'ın resmen bitmesine neden olan dev komünist devlet hangisidir?",
    options: ["Sovyetler Birliği", "Yugoslavya", "Çekoslovakya", "Doğu Almanya"],
    answer: "Sovyetler Birliği",
    difficulty: "easy",
    points: 10
  },
  {
    id: 289,
    question: "Antik Roma Cumhuriyeti'nin son döneminde diktatörlüğünü ilan eden ve senato binasında en yakınları tarafından suikastla öldürülen devlet adamı kimdir?",
    options: ["Julius Sezar", "Sezar Augustus", "Neron", "Marcus Aurelius"],
    answer: "Julius Sezar",
    difficulty: "medium",
    points: 20
  },
  {
    id: 290,
    question: "1945 yılında Churchill, Roosevelt ve Stalin'in katılımıyla yapılan, savaş sonrası dünya düzenini ve nüfuz alanlarını belirleyen konferans hangisidir?",
    options: ["Yalta Konferansı", "Tahran Konferansı", "Potsdam Konferansı", "Casablanca Konferansı"],
    answer: "Yalta Konferansı",
    difficulty: "hard",
    points: 30
  },
  {
    id: 291,
    question: "19. yüzyılda dünyanın dört bir yanındaki sömürgeleri nedeniyle 'Üzerinde Güneş Batmayan İmparatorluk' olarak anılan küresel güç hangisidir?",
    options: ["Büyük Britanya", "Fransa", "İspanya", "Portekiz"],
    answer: "Büyük Britanya",
    difficulty: "easy",
    points: 10
  },
  {
    id: 292,
    question: "1957 yılında fırlatılan ve uzaya gönderilen insan yapımı ilk yapay uydu olma özelliğini taşıyan Sovyet uydusunun adı nedir?",
    options: ["Sputnik 1", "Vostok 1", "Explorer 1", "Apollo 11"],
    answer: "Sputnik 1",
    difficulty: "medium",
    points: 20
  },
  {
    id: 293,
    question: "İkinci Dünya Savaşı'nın Avrupa cephesinde sona erdiği resmi tarih nedir?",
    options: ["8 Mayıs 1945", "2 Eylül 1945", "6 Haziran 1944", "30 Nisan 1945"],
    answer: "8 Mayıs 1945",
    difficulty: "medium",
    points: 20
  },
  {
    id: 294,
    question: "Hiroşima'ya atom bombasının atıldığı tarih nedir?",
    options: ["6 Ağustos 1945", "9 Ağustos 1945", "15 Ağustos 1945", "2 Eylül 1945"],
    answer: "6 Ağustos 1945",
    difficulty: "easy",
    points: 10
  },
  {
    id: 295,
    question: "1789 Fransız Devrimi'nin sembolü olan ve halkın devrimin başlangıcında ele geçirdiği tarihi hapishane nedir?",
    options: ["Bastille", "Versailles", "Louvre", "Notre-Dame"],
    answer: "Bastille",
    difficulty: "easy",
    points: 10
  },
  {
    id: 296,
    question: "Magna Carta hangi yılda İngiltere'de imzalanmış ve hukukun üstünlüğünün temellerini atmıştır?",
    options: ["1215", "1066", "1348", "1453"],
    answer: "1215",
    difficulty: "medium",
    points: 20
  },
  {
    id: 297,
    question: "Amerika Birleşik Devletleri'nin bağımsızlık bildirgesi hangi yılda ilan edilmiştir?",
    options: ["1776", "1783", "1789", "1765"],
    answer: "1776",
    difficulty: "easy",
    points: 10
  },
  {
    id: 298,
    question: "1917 Bolşevik Devrimi'ni gerçekleştiren ve Sovyet Rusya'yı kuran lider kimdir?",
    options: ["Vladimir Lenin", "Josef Stalin", "Leon Troçki", "Nikolay II"],
    answer: "Vladimir Lenin",
    difficulty: "easy",
    points: 10
  },
  {
    id: 299,
    question: "Birinci Dünya Savaşı'nın fitilini ateşleyen suikastle hayatını kaybeden Avusturya-Macaristan Veliaht Prensi kimdir?",
    options: ["Arşidük Franz Ferdinand", "Arşidük Karl", "Prens Maximilian", "Kral Wilhelm"],
    answer: "Arşidük Franz Ferdinand",
    difficulty: "medium",
    points: 20
  },
  {
    id: 300,
    question: "Antik Mısır'ın son firavunu ve Romalı general Marcus Antonius ile aşk yaşayan hükümdar kimdir?",
    options: ["Kleopatra VII", "Nefertiti", "Hatşepsut", "Kleopatra V"],
    answer: "Kleopatra VII",
    difficulty: "easy",
    points: 10
  }
];

export default dunyaTarihi1;