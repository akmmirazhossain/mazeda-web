const { AdminJS } = require("adminjs");
const { readFile } = require("fs").promises; // Import necessary modules for reading JSON files

const adminJsOptions = {
  resources: [
    {
      resource: {
        name: "YourResourceName",
        getData: async () => {
          // Read JSON data from file
          const jsonData = await readFile("../pages/api/data.json", "utf-8");
          return JSON.parse(jsonData);
        },
      },
    },
    // Add more resources as needed
  ],
};

module.exports = adminJsOptions;
