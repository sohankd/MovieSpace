let package_manager = require('./gulp/package_manager')
,   {local, setAppRoot} = require('./gulp/local')
,   dist_folder = package_manager.getDistFolderPath();

setAppRoot(dist_folder);

exports.local = local;