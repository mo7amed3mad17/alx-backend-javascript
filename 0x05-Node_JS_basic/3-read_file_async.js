const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error('Cannot load the database');
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      if (lines.length <= 1) {
        console.log('No valid student data found');
        resolve();
        return;
      }

      let numberOfStudents = 0;
      const fieldCounts = {};
      const fieldLists = {};

      for (let i = 1; i < lines.length; i++) {
        const [firstname, lastname, age, field] = lines[i].split(',');

        if (!firstname || !lastname || !age || !field) continue;

        numberOfStudents++;

        if (!fieldCounts[field]) {
          fieldCounts[field] = 0;
          fieldLists[field] = [];
        }

        fieldCounts[field]++;
        fieldLists[field].push(firstname);
      }

      console.log(`Number of students: ${numberOfStudents}`);

      for (const field in fieldCounts) {
        const count = fieldCounts[field];
        const list = fieldLists[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${list}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
