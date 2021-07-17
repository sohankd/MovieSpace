let through = require('through')
,   path = require('path')
,   _ = require('underscore')
,   distro = require('../distro')
,   fs = require('fs')
,   Vinyl = require('vinyl');

/**
 * @method folderName   Returns the name of the folder that contains the files to be processed.
 * For example, for .js & .hbs files, it will return JavaScript & Template respectively (As per current setup). This can be customized.
 * @param {String} filetype
 * @returns {String|undefined}
 */
function folderName(filetype){
    return filetype && distro[filetype] ? distro[filetype].folder : '';
}
/**
 * @method moduleName   Returns the name of the Module that contains different type of files.
 * @param {String} _module 
 * @param {String} filetype 
 * @param {String} extType 
 * @returns {String|undefined}
 */
function moduleName(_module, filetype, extType){
    if(_module){
        let modulePath = path.join(_module, folderName(filetype), '\\');
        return (
            fs.existsSync(modulePath)
            ? path.join(_module, folderName(filetype), (extType ? '*.' + extType : '\\'))
            : path.join(_module, (extType ? '*.' + extType : '\\'))
        );
    }
    return;
}
/**
 * @method getDistFolderPath    Returns the absolute path of distribution folder where processed files will be stored.
 * @returns {String}
 */
function getDistFolderPath(){
    let build_folder_name = distro["modulePath"] && distro["modulePath"]['DistributionFolder']
    ,   build_folder_path = path.join(process.cwd(), build_folder_name || '/');

    return build_folder_path || process.cwd();
}
/**
 * @method absoluteModulePath   Returns absolute path of module.
 * @param {String} filetype 
 * @param {String} extType 
 * @returns {<String>Array}
 */
function absoluteModulePath(filetype, extType){
    let modulePaths = distro.modulePath && _.keys(distro.modulePath)
    ,   modules = distro.modules || [];
    
    return _.map(modules, function(_module){

       let f_key = _.find(modulePaths, (modulePath) => _module.search(modulePath) != -1 )
        ,   srcPath = distro.modulePath[f_key];

        _module = srcPath ? _module.replace(f_key, srcPath) : _module;

        return moduleName(_module, filetype, extType);
    });
}
/**
 * @method getExportFile	Returns the name of file into which processed contents will be exported.
 * @param {String} filetype 
 * @returns {String|undefined}
 */
function getExportFile(filetype){
    return distro[filetype] && distro[filetype].exportFile;
}
/**
 * @method getShimConfig	Returns the shim configuration object for the libraries that do not support AMD modules.
 * @param {String} filetype 
 * @returns {Object|undefined}
 */
function getShimConfig(filetype){
    return distro[filetype] && distro[filetype].amdConfig && distro[filetype].amdConfig['shim'];
}
/**
 * @method getConfig	Returns an object that contains globs, export file name & shim configuration object.
 * @param {String} filetype 
 * @param {String} extType 
 * @returns {Object}
 */
function getConfig(filetype, extType){
    let config = {};
    config['globs'] = absoluteModulePath(filetype, extType);
    config['exportFile'] = getExportFile(filetype);
    filetype == "javascript" && (config['shimConfig'] = getShimConfig(filetype))
    return config;
}
/**
 * @method generateMainConfigFile	Helps to create a requirejs supported config file & returns a stream.
 * @param {Object} config 
 * @param {Function} fn 
 * @returns {<Readable|Writable>Stream}
 */
function generateMainConfigFile(config, fn){
    config = _.isObject(config) ? config : {}
    config.paths = _.has(config, "paths") && _.isObject(config.paths) ? config.paths : {};
    
    onFile = function(file){
        let moduleName = path.basename(file.path, path.extname(file.path))
        ,   modulePath = path.relative(process.cwd(), file.path).replace(/\\/g, '/').replace(new RegExp(path.extname(file.path), 'g'), '');
        config.paths[moduleName] = modulePath;

        let starter_content = fn(_.omit(config, 'exportFile'))
        ,   build_folder_path;

        !fs.existsSync(getDistFolderPath()) && fs.mkdirSync(getDistFolderPath());
        build_folder_path = path.join(getDistFolderPath(), config.exportFile);
       
        file = new Vinyl({
            path: build_folder_path
        ,   contents: Buffer.from(starter_content)
        });
    
        fs.writeFileSync(build_folder_path, file.contents);
        this.queue(file);
    }

    return through(onFile);
}

exports.getConfig = getConfig;
exports.generateMainConfigFile = generateMainConfigFile;
exports.getDistFolderPath = getDistFolderPath;