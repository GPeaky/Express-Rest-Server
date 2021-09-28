const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, extensionsValids = ['jpg', 'jpeg', 'png', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const split = file.name.split('.');
        const extension = split[split.length - 1];
    
        // Validate extension
        if (!extensionsValids.includes(extension)) return reject(`Extension: ${extension} its not a valid extension`);
    
        const tempName = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);
      
        file.mv(uploadPath, err => {
            if (err) return reject(err);
      
            return resolve(tempName);
        });
    })
}

module.exports = {
    uploadFile
}