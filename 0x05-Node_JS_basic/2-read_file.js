const fs = require('fs');

function countStudents(path) {
    try {
        // Read the file synchronously
        const data = fs.readFileSync(path, 'utf8');
        const lines = data.trim().split('\n'); // Split lines and trim to remove empty lines

        if (lines.length <= 1) {
            console.log('Number of students: 0');
            return;
        }

        // Extract headers and rows
        const headers = lines[0].split(','); // First line is the header
        const rows = lines.slice(1);

        // Initialize counts and field groupings
        const studentsByField = {};
        let totalStudents = 0;

        rows.forEach((line) => {
            if (!line.trim()) return; // Skip empty lines
            const values = line.split(',');
            const firstName = values[0];
            const field = values[3];

            if (field) {
                // Count the student in their field
                studentsByField[field] = studentsByField[field] || [];
                studentsByField[field].push(firstName);
                totalStudents += 1;
            }
        });

        // Log the total number of students
        console.log(`Number of students: ${totalStudents}`);

        // Log each field's students
        for (const [field, students] of Object.entries(studentsByField)) {
            console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
        }
    } catch (error) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
