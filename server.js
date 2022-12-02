const PORT = 8080;
const http = require('http');
const url = require("url");
const StudentController = require('./src/controllers/student.controller');
let studentController = new StudentController();

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    switch (urlPath) {
        case '/':
            studentController.showListStudent(req, res);
            break;
        case '/add':
            if (req.method === 'GET') {
                studentController.showFormAdd(req, res);
            } else {
                studentController.addStudent(req, res)
            }
            break;
        case '/update':
            if (req.method === 'GET') {
                studentController.showFormUpdate(req, res);
            } else {
                studentController.updateStudent(req, res);
            }
            break;
        case '/delete':
            studentController.deleteStudent(req, res);
            break;
        default:
            res.end();
    }
})
server.listen(PORT, 'localhost', () => {
    console.log(`listening on http://localhost:${PORT}`);
})