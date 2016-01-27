/**
 * @file RoutesServer
 * @author ycy
 */

import multer from 'multer';
import fs from 'fs';
import {spawn} from 'child_process';

let upload = multer({
    dest: './uploads/'
});

let Routes = (app) => {
    app.post('/', upload.single('file'), (req, res) => {
        fs.readFile(req.file.path, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {
                throw err;
            }

            try {
                let jsonData = JSON.parse(data);
                res.json(jsonData);
            }
            catch (ex) {
                console.log(ex);
            }
        });
    });

    app.post('/crawler', (req, res) => {
        const {value} = req.body;
        let python = spawn('python3', ['python/main.py', value]);

        python.stdout.on('data', (data) => {
            // console.log('stdout: ' + data);
        });

        python.stderr.on('data', (data) => {
            // console.log('stderr: ' + data);
        });

        python.on('close', (code) => {
            // console.log('child process exited with code ' + code);
        });
    });

    app.post('/logger', (req, res) => {
        const {value} = req.body;
        let logger = `${value.split(' ').join('_')}.log`;
        let array = fs.readFileSync(`log/${logger}`).toString().split('\n');

        res.json(array);
    });
};

export default Routes;
