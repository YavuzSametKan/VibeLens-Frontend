# VibeLens Mobile Client
Yapay zeka destekli yüz analizi ile anlık duygu durumunuzu tespit eden ve size en uygun Film, Dizi, Müzik veya Kitap önerileri sunan React Native uygulaması.

[![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/Tailwind_CSS-NativeWind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)

---

## Ekran Görüntüleri

| **Ana Ekran** | **Kamera & Tarama** | **Önizleme & Onay** |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/home.PNG" width="250" alt="Home Screen" /> | <img src="./docs/screenshots/camera_overlay.PNG" width="250" alt="Camera Scan" /> | <img src="./docs/screenshots/preview.PNG" width="250" alt="Preview Screen" /> |
| *Kategori Seçimi* | *Yüz Tespiti* | *Fotoğraf Onayı* |

| **Yükleniyor** | **Sonuçlar (Analiz)** | **Sonuçlar (Öneri)** |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/loading.PNG" width="250" alt="Loading State" /> | <img src="./docs/screenshots/results_analysis.PNG" width="250" alt="Analysis Result" /> | <img src="./docs/screenshots/results_recommendation.PNG" width="250" alt="Recommendation" /> |
| *AI Analiz Süreci* | *Duygu Raporu* | *İçerik Önerisi* |

---

## Proje Hakkında

**VibeLens**, kullanıcıların selfie çekerek o anki duygusal durumlarını (Mutluluk, Üzgünlük, Öfke, Küçümseme vb.) analiz etmelerini sağlar. Arka planda çalışan güçlü bir Python API (DeepFace & Gemini AI) ile iletişim kurarak, tespit edilen duyguya özel kürate edilmiş içerik önerileri sunar.

Uygulama, **Cyberpunk/Dark Mode** estetiği ile tasarlanmış olup, akıcı animasyonlar ve modern bir kullanıcı deneyimi sunar.

---

## Özellikler

* **AI Destekli Duygu Analizi:** Yüz ifadelerinden baskın ve ikincil duyguları (örn: *Eleştirel Mesafe ve Serinkanlı Küçümseme*) tespit eder.
* **Gelişmiş Kamera Arayüzü:** Yüz çerçeveleme kılavuzları ile entegre kamera deneyimi.
* **Dinamik Öneriler:**
    * Filmler
    * Diziler
    * Müzik
    * Kitaplar
* **Modern UI/UX:** NativeWind ile oluşturulmuş, Neon vurgulu şık karanlık mod tasarımı.
* **⚡ Performans:** Expo Router ile hızlı sayfa geçişleri ve Zustand ile optimize edilmiş durum yönetimi.

---

## Teknoloji Yığını

* **Framework:** React Native (via Expo)
* **Dil:** TypeScript
* **Styling:** NativeWind (Tailwind CSS)
* **Navigasyon:** Expo Router (File-based routing)
* **State Management:** Zustand
* **Networking:** Axios
* **Icons:** Lucide React Native
* **Fonts:** Custom Google Fonts (Inter / Poppins)

---

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Hazırlık

* Node.js (v18+)
* Expo Go (Mobil cihazınızda) veya iOS Simulator / Android Emulator

### Adım 1: Repoyu Klonlayın

```bash
git clone [https://github.com/kullaniciadi/vibelens-mobile.git](https://github.com/kullaniciadi/vibelens-mobile.git)
cd vibelens-mobile

```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install

```

### Adım 3: Çevresel Değişkenleri Ayarlayın

Kök dizinde `.env` dosyası oluşturun ve backend API adresinizi girin:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:8000
EXPO_PUBLIC_USE_MOCK_DATA=false

```

### Adım 4: Uygulamayı Başlatın

```bash
npx expo start

```

QR kodu telefonunuzdaki **Expo Go** uygulaması ile taratın veya `i` tuşuna basarak iOS Simulator'da başlatın.

---

## Proje Yapısı

```
VibeLensMobile/
├── app/                 # Expo Router sayfaları (Screens)
│   ├── (tabs)/          # Tab navigasyonu (varsa)
│   ├── camera/          # Kamera ve Tarama ekranları
│   ├── results/         # Sonuç ekranları
│   └── index.tsx        # Ana giriş
├── src/
│   ├── components/      # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Button.tsx
│   │   ├── MoodCard.tsx
│   │   └── ...
│   ├── services/        # API servisleri (api.ts)
│   ├── stores/          # Zustand store'ları (useMoodStore.ts)
│   ├── types/           # TypeScript tipleri
│   └── utils/           # Yardımcı fonksiyonlar
├── assets/              # Fontlar ve Resimler
├── docs/                # Dokümantasyon görselleri
└── ...

```

---

## Katkıda Bulunma

1. Bu repoyu Forklayın.
2. Yeni bir feature branch oluşturun (`git checkout -b feature/AmazingFeature`).
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`).
4. Branch'inizi Pushlayın (`git push origin feature/AmazingFeature`).
5. Bir Pull Request oluşturun.

---

## Lisans

Bu proje [MIT](https://www.google.com/search?q=LICENSE) lisansı altında lisanslanmıştır.