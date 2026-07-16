const { defineConfig } = require("cypress");
const fs = require('fs');
const Papa = require('papaparse');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://katalon-demo-cura.herokuapp.com/",
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
