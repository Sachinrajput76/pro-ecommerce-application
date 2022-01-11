import formidable from 'formidable';
import { reject, times } from 'lodash';
import { resolve } from 'path';

const moment = require("moment")
const fs = require("fs")

export const config = {
    api: {
        bodyParser: false
    }
}
export default async (req, res) => {
    const timeStamp = moment().format("DD-MM-YYYY");
    fs.mkdir(`./public/${timeStamp}`, { recursive: true }, function (err) {
        return console.log(err);
    });

    const form = formidable({
        multiples: true,
        uploadDir: `./public/${timeStamp}`
    })
    form.keepExtensions = true;
    form.keepFileName = true;
    form.on("fileBegin", function (name, file) {
        file.path = path.join(`public/${timeStamp}`, slugify(file.name))
    })
    form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve(files)
    })
    res.json(data)
    console.log("hit post request")
}