const fs = require('fs');

module.exports = class FileStorageService {
    constructor(fileName, primaryKey) {
        this.fileContext = fileName;
        if (!primaryKey) {
            throw new Error('Primary key must be specified');
        }
        this.primaryKey = primaryKey;
    }

    getData() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileContext, 'utf8', (err, data) => {
                if (err) {
                    reject({message: `No accounts created yet`});
                    return;
                }

                resolve(JSON.parse(data));
            });
        });
    }

    async create(passedData) {
        return new Promise(async (resolve, reject) => {
            if (!passedData[this.primaryKey]) {
                reject({message: `Key ${this.primaryKey} must be specified`});
                return;
            }

            let generalData = [];

            try {
                const savedData = await this.getData();

                generalData = [...savedData];
            } catch (e) {
            }

            try {
                generalData.forEach(item => {
                    if (item[this.primaryKey] === passedData[this.primaryKey]) {
                        throw new Error(
                            `Key ${this.primaryKey} must be unique`);
                    }
                });
                generalData.push(passedData);

                fs.writeFile(this.fileContext, JSON.stringify(generalData), err => {
                        if (err) {
                            throw new Error('Something went wrong');
                        }

                        resolve();
                    });
            } catch (e) {
                reject(e);
            }
        });
    }

    findOne(passedData) {
        return new Promise(async (resolve, reject) => {
            let users;

            try {
                users = await this.getData();
            } catch (e) {
                reject(e);
                return;
            }

            users.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (passedData.hasOwnProperty(key) && item[key] === passedData[key]) {
                        resolve(item);
                    }
                });
            });

            reject({message: 'User not Found'});
        });
    }
};
