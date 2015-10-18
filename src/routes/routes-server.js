/**
 * @file RoutesServer
 * @author ycy
 */

import multer from 'multer';
import fs from 'fs';

let upload = multer({
    dest: '../../uploads/'
});

let Routes = (app) => {
    app.post('/', upload.single('file'), (req, res) => {
        fs.readFile(req.file.path, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {
                throw err;
            }
            let jsonData = JSON.parse(data);
            res.json(jsonData);
        });
    });
};

export default Routes;
