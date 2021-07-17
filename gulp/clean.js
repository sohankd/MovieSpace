let del = require('del')
,   package_manager = require('./package_manager');

function clean(){
    return del(package_manager.getDistFolderPath(), {force: true});
};

module.exports = clean;