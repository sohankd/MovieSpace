var through = require('through')
,   path = require('path')
,   _ = require('underscore')
,   distro = require('../distro')
,   fs = require('fs')
,   File = require('vinyl');

var config = {};

function folderName(filetype){
    if(filetype)
        return distro[filetype] ? distro[filetype].folder : '';
    return;
}

function moduleName(_module, filetype, extType){
    if(_module)
    {
        var modulePath = path.join(_module, folderName(filetype),'\\');

        if(fs.existsSync(modulePath))
        {
            return path.join(_module, folderName(filetype), (extType ? '*.'+extType :'\\'));
        }
        else
         return path.join(_module, (extType ? '*.'+extType :'\\'));
    }
    return;
}

function getDistFolderPath(build_type){
    var build_folder_name = distro["modulePath"] && distro["modulePath"][build_type]
    ,   build_folder_path = path.join(process.cwd(),build_folder_name||'/');

    return build_folder_path || process.cwd();
}

function localModulesFullPath(filetype,extType){
    
    var modulePaths = distro.modulePath && _.keys(distro.modulePath)
    ,   modules = distro.modules || [];
    
    return _.map(modules, function(_module){

       var f_key = _.find(modulePaths, (modulePath)=>{
            return _module.search(modulePath) != -1;
        })
        ,   srcPath = distro.modulePath[f_key];

        _module = srcPath ? _module.replace(f_key,srcPath) : _module;

        return moduleName(_module,filetype,extType);
    });
}

function getExportFile(filetype){
    return distro[filetype] && distro[filetype].exportFile;
}

function getShimConfig(filetype){
    return distro[filetype] && distro[filetype].amdConfig && distro[filetype].amdConfig['shim'];
}

function getConfig(filetype,extType){
    return {
        globs: localModulesFullPath(filetype,extType)
    ,   shimConfig: getShimConfig(filetype)
    ,   exportFile: getExportFile(filetype)
    };
}

function generateMainConfigFile(config,fn){

    config = _.isObject(config) ? config : {}
    config.paths = _.has(config,"paths") && _.isObject(config.paths) ? config.paths : {};
    
    onFile = function(file){
        var moduleName = path.basename(file.path,path.extname(file.path))
        ,   modulePath = path.relative(process.cwd(),file.path).replace(/\\/g,'/').replace(new RegExp(path.extname(file.path),'g'),'');
        config.paths[moduleName] = modulePath;
    }

    onEnd = function(){
        var starter_content = fn(config)
        ,   build_folder_path;

        if( !fs.existsSync(getDistFolderPath(config['build'])) )
        {
            fs.mkdirSync(getDistFolderPath(config['build']));
       }
       build_folder_path = path.join(getDistFolderPath(config['build']),config.exportFile);
       
        var file = new File({
            path: build_folder_path
        ,   contents: Buffer.from(starter_content)
        });
    
        fs.writeFileSync(build_folder_path,file.contents);
        
        this.emit('data',file);
        this.emit('end');
    }

    return through(onFile,onEnd);
}

exports.getConfig = getConfig;
exports.generateMainConfigFile = generateMainConfigFile;
exports.getDistFolderPath = getDistFolderPath;
exports.config = this.config;