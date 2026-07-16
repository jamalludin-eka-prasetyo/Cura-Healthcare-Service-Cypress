const { defineConfig } = require("cypress");
const fs = require('fs');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 1920, 
    viewportHeight: 1080,
    
    setupNodeEvents(on, config) {
      const usersData = JSON.parse(fs.readFileSync('cypress/fixtures/login-data.json', 'utf8'))
      console.log(usersData.users);

      const dataAppointment = JSON.parse(fs.readFileSync('cypress/fixtures/make-appointment-data.json'))
      console.log(dataAppointment.dataUsers)
      
      config.env.users = usersData.users; 
      config.env.dataUsers = dataAppointment.dataUsers
      // implement node event listeners here

      return config;
    },
  },
});
