# CURA Healthcare Service - Cypress E2E Testing

![Cypress](https://img.shields.io/badge/Cypress-15.18.1-green?style=flat&logo=cypress)
![Node](https://img.shields.io/badge/Node.js-%3E%3D14-blue?style=flat&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

Automated end-to-end testing suite for CURA Healthcare Service using Cypress framework.

## 📝 Description

This project contains comprehensive automated tests for the CURA Healthcare Service web application (https://katalon-demo-cura.herokuapp.com/). The test suite covers critical user journeys including authentication, appointment booking, and form validation with both positive and negative test scenarios.

## ✨ Features

- **Data-Driven Testing** - Parameterized tests using JSON fixtures for multiple test scenarios
- **Custom Commands** - Reusable Cypress commands for common actions
- **Page Validation** - Complete coverage of UI elements and user flows
- **Positive & Negative Testing** - Both valid and invalid scenarios covered
- **CI/CD Integration** - Automated testing via GitHub Actions
- **Test Artifacts** - Automatic screenshot and video capture on failures

## 🚀 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Cura-Healthcare-Service-Cypress
```

2. Install dependencies:
```bash
npm install
```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)
Open the Cypress Test Runner with a graphical interface:
```bash
npx cypress open
```

### Headless Mode
Run all tests in headless mode:
```bash
npx cypress run
```

### Browser-Specific Testing
Run tests in a specific browser:
```bash
# Chrome
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge
```

### Headed Mode
Run tests with browser UI visible:
```bash
npx cypress run --headed
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/make-appointment.cy.js"
```

## 📁 Project Structure

```
Cura-Healthcare-Service-Cypress/
├── cypress/
│   ├── e2e/                          # Test files
│   │   ├── home-page.cy.js           # Home page validation tests
│   │   ├── book-appointment.cy.js    # Login functionality tests
│   │   └── make-appointment.cy.js    # Appointment form tests
│   ├── fixtures/                     # Test data files
│   │   ├── login-data.json           # Login credentials (valid & invalid)
│   │   ├── make-appointment-data.json # Appointment test scenarios
│   │   └── example.json              # Sample fixture file
│   └── support/                      # Support files
│       ├── commands.js               # Custom Cypress commands
│       └── e2e.js                    # Global configuration
├── .github/
│   └── workflows/
│       └── cypress.yml               # GitHub Actions CI/CD workflow
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Project dependencies
├── .gitignore                        # Git ignore rules
└── README.md                         # Project documentation
```

## 📊 Test Coverage

### 1. Home Page Tests (`home-page.cy.js`)
- ✅ Header validation - "CURA Healthcare Service" title presence
- ✅ Toggle menu button verification
- ✅ Footer information validation (location, phone, email)

### 2. Login Tests (`book-appointment.cy.js`)
**Data-Driven Testing with 6 scenarios:**

| ID | Username | Password | Expected Result |
|----|----------|----------|-----------------|
| 1 | John Doe | ThisIsNotAPassword | Valid - Login successful |
| 2 | Johnattan Doe | ThisIsAPassword | Invalid - Login failed |
| 3 | Doe Lawan | ThisPassword | Invalid - Login failed |
| 4 | !@#!$!%!@$!@# | ThisIsNotAPassword | Invalid - Login failed |
| 5 | Admin | Admin123 | Invalid - Login failed |
| 6 | Leak Morrow | ThisIsNotAPassword | Invalid - Login failed |

**Test Coverage:**
- ✅ Navigation to login page via "Make Appointment" button
- ✅ Valid credential authentication
- ✅ Invalid credential rejection
- ✅ Error message display for failed attempts

### 3. Make Appointment Tests (`make-appointment.cy.js`)
**Data-Driven Testing with 5 scenarios:**

| ID | Facility | Readmission | Program | Date | Comment | Expected |
|----|----------|-------------|---------|------|---------|----------|
| 1 | Tokyo CURA Healthcare Center | Yes | Medicare | 15/08/2026 | Positive case - full data | Success |
| 2 | Hongkong CURA Healthcare Center | No | Medicaid | 20/08/2026 | Positive case - no readmission | Success |
| 3 | Seoul CURA Healthcare Center | Yes | None | 25/08/2026 | Positive case - no program | Success |
| 4 | Seoul CURA Healthcare Center | No | None | (empty) | Negative case - empty date | Validation Error |
| 5 | Tokyo CURA Healthcare Center | Yes | Medicare | (empty) | Negative case - empty date | Validation Error |

**Test Coverage:**
- ✅ Form presence validation
- ✅ Facility dropdown selection
- ✅ Hospital readmission checkbox handling
- ✅ Healthcare program radio button selection (Medicare/Medicaid/None)
- ✅ Visit date validation (required field)
- ✅ Comment field input
- ✅ Form submission with complete data
- ✅ Form validation for empty required fields
- ✅ Appointment summary verification

## 🔧 Custom Commands

This project includes reusable custom commands defined in `cypress/support/commands.js`:

### `cy.ClickBtnMakeAppointment()`
Clicks the "Make Appointment" button and verifies navigation to login page.

**Usage:**
```javascript
cy.ClickBtnMakeAppointment()
```

### `cy.login()`
Performs login with default valid credentials (John Doe / ThisIsNotAPassword).

**Usage:**
```javascript
cy.login()
```

### `cy.fillFormAppointment(data)`
Fills the appointment form with provided data object.

**Parameters:**
- `data` (object) - Appointment data containing:
  - `facility` (string) - Healthcare facility name
  - `readmission` (boolean) - Hospital readmission status
  - `healthcare_program` (string) - Program type: 'Medicare', 'Medicaid', or 'None'
  - `date` (string) - Visit date in DD/MM/YYYY format
  - `comment` (string) - Additional comments

**Usage:**
```javascript
cy.fillFormAppointment({
  facility: 'Tokyo CURA Healthcare Center',
  readmission: true,
  healthcare_program: 'Medicare',
  date: '15/08/2026',
  comment: 'Regular checkup'
})
```

## 🧩 Test Data

Test data is stored in JSON files located in `cypress/fixtures/`:

### `login-data.json`
Contains user credentials for authentication testing:

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
Contains appointment scenarios for form testing:

```json
{
  "dataUsers": [
    {
      "id": 1,
      "facility": "Tokyo CURA Healthcare Center",
      "readmission": true,
      "healthcare_program": "Medicare",
      "date": "15/08/2026",
      "comment": "Positive case - full data filled correctly"
    }
  ]
}
```

## 🤖 CI/CD Integration

This project is integrated with **GitHub Actions** for continuous testing.

**Workflow File:** `.github/workflows/cypress.yml`

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Configuration:**
- Runs on: Ubuntu Latest
- Browser: Chrome
- Automatic dependency installation
- Test execution in headless mode

## 🔗 Application Under Test

**URL:** https://katalon-demo-cura.herokuapp.com/

**Valid Test Credentials:**
- **Username:** `John Doe`
- **Password:** `ThisIsNotAPassword`

**Available Facilities:**
- Tokyo CURA Healthcare Center
- Hongkong CURA Healthcare Center
- Seoul CURA Healthcare Center

**Healthcare Programs:**
- Medicare
- Medicaid
- None

## 👥 Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

## 📞 Contact
For questions, issues, or feedback, please contact:

- **WhatsApp:** +6285156031610
- **Email:** jamalludin.eka.prasetyo@gmail.com

---

**Last Updated:** July 2026
**Cypress Version:** 15.18.1
