# VibeLens Mobile Client

Yapay zeka destekli yüz analizi ile anlık duygu durumunu tespit eden ve kullanıcıya uygun Film, Dizi, Müzik veya Kitap önerileri sunan React Native uygulaması.

[![Expo](https://img.shields.io/badge/Expo-SDK_50+-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.73-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/Tailwind_CSS-NativeWind-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)

![General App Preview](./docs/screenshots/general.jpeg)

---

## Proje Hakkında

VibeLens, kullanıcıların selfie çekerek o anki duygusal durumlarını analiz etmelerini sağlayan bir mobil istemcidir. Uygulama, arka planda çalışan Python tabanlı bir API ile iletişim kurarak yüz ifadelerinden baskın ve ikincil duyguları tespit eder. Analiz sonucuna göre kürate edilmiş içerik önerileri sunar.

Arayüz tasarımı karanlık mod (dark mode) esas alınarak geliştirilmiş olup, NativeWind kullanılarak şekillendirilmiştir.

---

## Özellikler

* **Duygu Analizi:** Yüz ifadelerinden baskın (örn: Mutluluk) ve ikincil (örn: Heyecan) duyguların tespiti.
* **Kamera Arayüzü:** Yüz hizalama kılavuzları içeren özelleştirilmiş kamera modülü.
* **İçerik Önerileri:** Tespit edilen ruh haline uygun film, dizi, müzik ve kitap tavsiyeleri.
* **Kullanıcı Arayüzü:** Neon vurgulara sahip modern ve minimalist tasarım.
* **Performans:** Expo Router ile dosya tabanlı yönlendirme ve Zustand ile durum yönetimi.

---

## Ekran Görüntüleri

| Ana Ekran | Kamera | Önizleme |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/home.PNG" width="250" /> | <img src="./docs/screenshots/camera_overlay.PNG" width="250" /> | <img src="./docs/screenshots/preview.PNG" width="250" /> |

| Analiz Süreci | Sonuçlar (Detay) | Sonuçlar (Öneri) |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/loading.PNG" width="250" /> | <img src="./docs/screenshots/results_analysis.PNG" width="250" /> | <img src="./docs/screenshots/results_recommendation.PNG" width="250" /> |

---

## Teknoloji Yığını

* **Framework:** React Native (Expo SDK 50+)
* **Dil:** TypeScript
* **Stil:** NativeWind (Tailwind CSS)
* **Navigasyon:** Expo Router
* **Durum Yönetimi:** Zustand
* **Ağ İstekleri:** Axios

---

## Kurulum

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip edin.

### Gereksinimler

* Node.js (LTS sürümü önerilir)
* Expo Go uygulaması (Fiziksel cihaz testi için) veya iOS Simulator / Android Emulator

### Adımlar

1. Repoyu klonlayın:
   ```bash
   git clone [https://github.com/kullaniciadi/vibelens-mobile.git](https://github.com/kullaniciadi/vibelens-mobile.git)
   cd vibelens-mobile

```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install

```


3. Çevresel değişkenleri yapılandırın:
Kök dizinde `.env` dosyası oluşturun ve API adresini tanımlayın.
```env
EXPO_PUBLIC_API_URL=http://LOCALHOST_IP:8000
EXPO_PUBLIC_USE_MOCK_DATA=false

```


4. Uygulamayı başlatın:
```bash
npx expo start

```


---

## Proje Yapısı

Proje, Expo Router yapısına uygun olarak düzenlenmiş olup, kaynak kodları `src` dizini altında modüler hale getirilmiştir.

```text
VibeLens-Frontend/
├── app/                      # Expo Router sayfa ve yönlendirme tanımları
│   ├── (tabs)/               # Alt navigasyon sekmeleri (varsa)
│   ├── _layout.tsx           # Ana düzen ve provider tanımları
│   ├── analyzing.tsx         # Analiz animasyon ekranı
│   ├── camera.tsx            # Fotoğraf çekim ekranı
│   ├── index.tsx             # Karşılama ve kategori seçim ekranı
│   ├── modal.tsx             # Modal pencereler
│   └── results.tsx           # Analiz sonuçları ve öneri ekranı
├── src/                      # Uygulama mantığı ve yardımcı dosyalar
│   ├── components/           # Yeniden kullanılabilir UI bileşenleri
│   ├── constants/            # Tema, renkler ve sabit veriler
│   ├── screens/              # Sayfa özelindeki mantıksal bileşenler
│   ├── services/             # API çağrıları ve dış servis entegrasyonları
│   ├── store/                # Zustand durum yönetimi (State management)
│   └── types/                # TypeScript tip tanımları
├── components/               # Proje genelinde kullanılan temel UI elementleri
├── assets/                   # Görseller ve font dosyaları
└── docs/                     # Dokümantasyon materyalleri

```

---

## Lisans

Bu proje MIT lisansı altında dağıtılmaktadır.