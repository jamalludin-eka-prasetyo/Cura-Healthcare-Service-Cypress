# CURA Healthcare Service - Cypress E2E Testing

![Cypress](https://img.shields.io/badge/Cypress-15.18.1-green?style=flat&logo=cypress)
![Node](https://img.shields.io/badge/Node.js-%3E%3D14-blue?style=flat&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

Suite automated end-to-end testing untuk CURA Healthcare Service menggunakan framework Cypress.

> **🌐 Bahasa:** [English](README.md) | **Indonesia**

## 📝 Deskripsi

Project ini berisi automated test yang komprehensif untuk aplikasi web CURA Healthcare Service (https://katalon-demo-cura.herokuapp.com/). Suite testing ini mencakup user journey kritis termasuk autentikasi, booking appointment, dan validasi form dengan skenario positive dan negative testing.

## ✨ Fitur

- **Data-Driven Testing** - Test berparameter menggunakan JSON fixtures untuk multiple test scenarios
- **Custom Commands** - Cypress commands yang reusable untuk aksi-aksi umum
- **Page Validation** - Coverage lengkap untuk elemen UI dan user flows
- **Positive & Negative Testing** - Skenario valid dan invalid tercakup
- **Integrasi CI/CD** - Automated testing melalui GitHub Actions
- **Test Artifacts** - Screenshot dan video otomatis saat test gagal

## 🚀 Prasyarat

Sebelum menjalankan project ini, pastikan Anda telah menginstall:

- **Node.js** (versi 14 atau lebih tinggi)
- **npm** (tersedia bersama Node.js)

## 📦 Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd Cura-Healthcare-Service-Cypress
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Menjalankan Test

### Mode Interaktif (Cypress Test Runner)
Buka Cypress Test Runner dengan antarmuka grafis:
```bash
npx cypress open
```

### Mode Headless
Jalankan semua test dalam mode headless:
```bash
npx cypress run
```

### Testing dengan Browser Spesifik
Jalankan test di browser tertentu:
```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

### Mode Headed
Jalankan test dengan UI browser terlihat:
```bash
npx cypress run --headed
```

### Jalankan File Test Tertentu
```bash
npx cypress run --spec "cypress/e2e/make-appointment.cy.js"
```

## 📁 Struktur Project

```
Cura-Healthcare-Service-Cypress/
├── cypress/
│   ├── e2e/                          # File test
│   │   ├── home-page.cy.js           # Test validasi home page
│   │   ├── book-appointment.cy.js    # Test fungsi login
│   │   └── make-appointment.cy.js    # Test form appointment
│   ├── fixtures/                     # File data test
│   │   ├── login-data.json           # Kredensial login (valid & invalid)
│   │   ├── make-appointment-data.json # Skenario test appointment
│   │   └── example.json              # Contoh file fixture
│   └── support/                      # File support
│       ├── commands.js               # Custom Cypress commands
│       └── e2e.js                    # Konfigurasi global
├── .github/
│   └── workflows/
│       └── cypress.yml               # Workflow CI/CD GitHub Actions
├── cypress.config.js                 # Konfigurasi Cypress
├── package.json                      # Dependencies project
├── .gitignore                        # Aturan Git ignore
└── README.md                         # Dokumentasi project
```

## 📊 Cakupan Test

### 1. Test Home Page (`home-page.cy.js`)
- ✅ Validasi header - keberadaan judul "CURA Healthcare Service"
- ✅ Verifikasi tombol toggle menu
- ✅ Validasi informasi footer (lokasi, telepon, email)

### 2. Test Login (`book-appointment.cy.js`)
**Data-Driven Testing dengan 6 skenario:**

| ID | Username | Password | Hasil yang Diharapkan |
|----|----------|----------|----------------------|
| 1 | John Doe | ThisIsNotAPassword | Valid - Login berhasil |
| 2 | Johnattan Doe | ThisIsAPassword | Invalid - Login gagal |
| 3 | Doe Lawan | ThisPassword | Invalid - Login gagal |
| 4 | !@#!$!%!@$!@# | ThisIsNotAPassword | Invalid - Login gagal |
| 5 | Admin | Admin123 | Invalid - Login gagal |
| 6 | Leak Morrow | ThisIsNotAPassword | Invalid - Login gagal |

**Cakupan Test:**
- ✅ Navigasi ke halaman login via tombol "Make Appointment"
- ✅ Autentikasi dengan kredensial valid
- ✅ Penolakan kredensial invalid
- ✅ Tampilan pesan error untuk percobaan login yang gagal

### 3. Test Make Appointment (`make-appointment.cy.js`)
**Data-Driven Testing dengan 5 skenario:**

| ID | Fasilitas | Readmission | Program | Tanggal | Komentar | Hasil Diharapkan |
|----|-----------|-------------|---------|---------|----------|------------------|
| 1 | Tokyo CURA Healthcare Center | Ya | Medicare | 15/08/2026 | Kasus positif - data lengkap | Sukses |
| 2 | Hongkong CURA Healthcare Center | Tidak | Medicaid | 20/08/2026 | Kasus positif - tanpa readmission | Sukses |
| 3 | Seoul CURA Healthcare Center | Ya | None | 25/08/2026 | Kasus positif - tanpa program | Sukses |
| 4 | Seoul CURA Healthcare Center | Tidak | None | (kosong) | Kasus negatif - tanggal kosong | Error Validasi |
| 5 | Tokyo CURA Healthcare Center | Ya | Medicare | (kosong) | Kasus negatif - tanggal kosong | Error Validasi |

**Cakupan Test:**
- ✅ Validasi keberadaan form
- ✅ Pemilihan dropdown fasilitas
- ✅ Handling checkbox hospital readmission
- ✅ Pemilihan radio button healthcare program (Medicare/Medicaid/None)
- ✅ Validasi tanggal kunjungan (field wajib)
- ✅ Input field komentar
- ✅ Pengiriman form dengan data lengkap
- ✅ Validasi form untuk field wajib yang kosong
- ✅ Verifikasi ringkasan appointment

## 🔧 Custom Commands

Project ini menyertakan custom commands yang reusable, didefinisikan di `cypress/support/commands.js`:

### `cy.ClickBtnMakeAppointment()`
Klik tombol "Make Appointment" dan verifikasi navigasi ke halaman login.

**Penggunaan:**
```javascript
cy.ClickBtnMakeAppointment()
```

### `cy.login()`
Melakukan login dengan kredensial valid default (John Doe / ThisIsNotAPassword).

**Penggunaan:**
```javascript
cy.login()
```

### `cy.fillFormAppointment(data)`
Mengisi form appointment dengan object data yang disediakan.

**Parameter:**
- `data` (object) - Data appointment yang berisi:
  - `facility` (string) - Nama fasilitas healthcare
  - `readmission` (boolean) - Status hospital readmission
  - `healthcare_program` (string) - Tipe program: 'Medicare', 'Medicaid', atau 'None'
  - `date` (string) - Tanggal kunjungan dalam format DD/MM/YYYY
  - `comment` (string) - Komentar tambahan

**Penggunaan:**
```javascript
cy.fillFormAppointment({
  facility: 'Tokyo CURA Healthcare Center',
  readmission: true,
  healthcare_program: 'Medicare',
  date: '15/08/2026',
  comment: 'Pemeriksaan rutin'
})
```

## 🧩 Data Test

Data test disimpan dalam file JSON yang terletak di `cypress/fixtures/`:

### `login-data.json`
Berisi kredensial user untuk testing autentikasi:

```json
{
  "users": [
    {
      "id": 1,
      "username": "John Doe",
      "password": "ThisIsNotAPassword",
      "validity": "Valid"
    }
  ]
}
```

### `make-appointment-data.json`
Berisi skenario appointment untuk testing form:

```json
{
  "dataUsers": [
    {
      "id": 1,
      "facility": "Tokyo CURA Healthcare Center",
      "readmission": true,
      "healthcare_program": "Medicare",
      "date": "15/08/2026",
      "comment": "Kasus positif - data lengkap terisi dengan benar"
    }
  ]
}
```

## 🤖 Integrasi CI/CD

Project ini terintegrasi dengan **GitHub Actions** untuk continuous testing.

**File Workflow:** `.github/workflows/cypress.yml`

**Trigger:**
- Push ke branch `main`
- Pull request ke branch `main`

**Konfigurasi:**
- Berjalan di: Ubuntu Latest
- Browser: Chrome
- Instalasi dependency otomatis
- Eksekusi test dalam mode headless

## 📸 Test Artifacts

Cypress secara otomatis menghasilkan test artifacts untuk debugging:

### Screenshots
- **Lokasi:** `cypress/screenshots/`
- **Dibuat:** Saat test gagal
- **Format:** Gambar PNG
- **Penamaan:** `<spec-name>/<test-name> (failed).png`

### Videos
- **Lokasi:** `cypress/videos/`
- **Dibuat:** Untuk semua test run
- **Format:** File video MP4
- **Konten:** Rekaman lengkap eksekusi test

**Catatan:** Direktori ini dikecualikan dari version control melalui `.gitignore`.

## 🔗 Aplikasi yang Ditest

**URL:** https://katalon-demo-cura.herokuapp.com/

**Kredensial Test Valid:**
- **Username:** `John Doe`
- **Password:** `ThisIsNotAPassword`

**Fasilitas yang Tersedia:**
- Tokyo CURA Healthcare Center
- Hongkong CURA Healthcare Center
- Seoul CURA Healthcare Center

**Program Healthcare:**
- Medicare
- Medicaid
- None

## 👥 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi pada project ini:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/nama-fitur-anda`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur tertentu'`)
4. Push ke branch (`git push origin feature/nama-fitur-anda`)
5. Buat Pull Request

### Standar Coding
- Ikuti style dan konvensi kode yang ada
- Tulis nama test yang deskriptif
- Jaga test tetap independen dan terisolasi
- Update dokumentasi untuk fitur baru

## 📞 Kontak

Untuk pertanyaan, masalah, atau feedback, silakan hubungi:

- **WhatsApp:** [Nomor WhatsApp Anda]
- **Email:** [Alamat Email Anda]

---

**Terakhir Diperbarui:** Juli 2026

**Versi Cypress:** 15.18.1

**Dipelihara oleh:** [Nama Anda/Tim]
