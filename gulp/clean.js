let del = require('del')
,   package_manager = require('./package_manager')
,   distro = require('../distro.json');

let compiled_files_folder = distro['compiledFilesFolder'] || 'precompiled'
function clean(){
    return del([package_manager.getDistFolderPath(), compiled_files_folder], {force: true});
};

module.exports = clean;