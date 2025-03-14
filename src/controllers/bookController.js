const fs = require('fs');
const path = require('path');

const bookDir = path.join(__dirname, '../../book'); // Path to book directory

const getBookList = async (req, res) => {
    const booksDir = bookDir; // Use bookDir for book files

    fs.readdir(booksDir, (err, files) => {
        if (err) {
            console.error('Error reading book directory:', err);
            return res.status(500).send('Internal Server Error');
        }

        const bookFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return ['.pdf'].includes(ext); // Filter for PDF files
        });

        if (bookFiles.length === 0) {
            return res.status(404).send('No book files found');
        }

        res.json(bookFiles); // Send the list of book files to the frontend
    });
};

const streamBookFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(bookDir, filename); // Use bookDir for book files

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', err);
            return res.status(404).send('File not found');
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = end - start + 1;
            const file = fs.createReadStream(filePath, { start, end });

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'application/pdf', // Content type for PDF
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'application/pdf', // Content type for PDF
            };

            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    });
};

module.exports = {
    getBookList,
    streamBookFile,
}; 