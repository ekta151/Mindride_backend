const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, '../../music');

const getMusicList = async (req, res) => {
    // Debugging: Log the resolved music directory path
    console.log('Music directory path:', musicDir);

    try {
        const files = fs.readdirSync(musicDir);
        // Debugging: Log the files read from the directory (before filtering)
        console.log('Files read from directory:', files);

        const musicFiles = files.filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return ['.mp3', '.wav', '.ogg'].includes(ext);
        });
        // Debugging: Log the music files after filtering
        console.log('Music files after filtering:', musicFiles);

        if (musicFiles.length === 0) {
            return res.status(404).send('No music files found');
        }

        res.json(musicFiles);

    } catch (err) {
        console.error('Error reading music directory:', err);
        return res.status(500).send('Internal Server Error');
    }
};

const streamMusicFile = (req, res) => {
    const musicId = req.params.id;
    const filePath = path.join(musicDir, musicId);

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
                'Content-Type': `audio/${path.extname(musicId).slice(1)}`,
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': `audio/${path.extname(musicId).slice(1)}`,
            };

            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    });
};

module.exports = {
    getMusicList,
    streamMusicFile,
}; 