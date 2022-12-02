const url = require('url');
const qs = require('qs');
const BaseController = require("./base.controller");
const _handle = require("../../handler/handle");

class StudentController extends BaseController {
    async showFormAdd(req, res) {
        let data = await _handle.getTemplate('./view/add.html')
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }

    addStudent(req, res) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', async () => {
            const student = qs.parse(data);
            const sql = `INSERT INTO students (studentname, studentclass, theorymark, practicemark, evaluate, description)
                         values ("${student.nameAdd}",
                                 "${student.classAdd}",
                                 +${student.theorymarkAdd},
                                 +${student.practicemarkAdd},
                                 "${student.evaluateAdd}",
                                 "${student.descriptionAdd}")`;
            await this.querySQL(sql);
            res.writeHead(301, {'Location': '/'});
            return res.end();
        });
    }

    async showListStudent(req, res) {
        const sql = 'SELECT id, studentname, studentclass,evaluate FROM students limit 10';
        let students = await this.querySQL(sql);
        let html = '';
        students.forEach((item, index) => {
            html += `<tr>`;
            html += `<th>${index+1}</th>`
            html += `<th>${item.studentname}</th>`
            html += `<th>${item.studentclass}</th>`
            html += `<th>${item.evaluate}</th>`
            html += `<th><a href="/delete?ID=${item.id}" class="btn btn-primary m-1">Delete</a>
            <a href="/update?ID=${item.id}" class="btn btn-danger m-1">Update</a>
            <a href="/details?ID=${item.id}" class="btn btn-primary m-1">Detail</a></th>`
            html += `</tr>`
        })
        let data = await _handle.getTemplate('./view/list.html');
            data = data.replace('{list-student}', html);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
    }
    async showFormUpdate(req,res){
        let data = await _handle.getTemplate('./view/update.html')
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
    updateStudent(req, res){
        let parseUrl = url.parse(req.url, true);
        let queryStringObject = parseUrl.query;
        let id = queryStringObject.ID;
        let data = '';
        req.on('data', chunk => data += chunk)
        req.on('end', async () => {
            let student = qs.parse(data);
            const sql = `UPDATE students
                     SET studentname = '${student.nameUpdate}',
                         studentclass = '${student.classUpdate}',
                         theorymark = +${student.theorymarkUpdate},
                         practicemark = +${student.practicemarkUpdate},
                         evaluate = '${student.evaluateUpdate}',
                         description ='${student.descriptionUpdate}'
                     WHERE ID = '${id}';`
            await this.querySQL(sql);
            res.writeHead(301,{'Location': '/'});
            res.end();
        })
    }
    async deleteStudent(req, res){
        let parseUrl = url.parse(req.url, true);
        let queryStringObject = parseUrl.query;
        let id = queryStringObject.ID;
        const sql = `DELETE
                     FROM students
                     WHERE id = '${id}'`;
        await this.querySQL(sql);
        res.writeHead(301, {'Location': '/'})
        res.end();
    }
    
}
module.exports = StudentController;