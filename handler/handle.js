const fs = require('fs');

const _handle = {}

_handle.getTemplate = (filePath)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath,"utf-8",(err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
module.exports =_handle;