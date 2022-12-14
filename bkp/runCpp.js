const { execFile } = require('child_process');
const path = require('path')
var fs = require('fs');

module.exports = async (req, res) => {
    let file1 = req.files.file1;
    await file1.mv(path.resolve(__dirname, '../uploads', file1.name))

    let file2 = req.files.file2;
    await file2.mv(path.resolve(__dirname, '../uploads', file2.name))

    const child = execFile('./a.out', ['./uploads/' + file1.name, './uploads/' + file2.name], (error, stdout, stderr) => {
        if (error) {
        throw error;
        }
        console.log(stdout);
        fs.readFile('./file3', 'utf8', function(err, data) {
            if (err){
                res.render('error', { error: err });
            }
            else
            {
                res.render('submitted', { data });
            }
            //return res.end();
        });
    });
}

