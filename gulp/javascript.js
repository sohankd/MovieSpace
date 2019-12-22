var {src,dest} = require('gulp')
,   _ = require('underscore')
,   concat = require('gulp-concat')
,   package_manager = require('./package_manager')
,   requirejsOptimizer = require('gulp-requirejs-optimize')
,   distro = require('../distro')
,   through = require('through')
,   fs = require('fs')
,   path = require('path')
,   gulp_config = require('./gulp-config');

var config = {};
var { globs, exportFile, shimConfig } = package_manager.getConfig('javascript','js');
config = _.extend(config,package_manager.config);
config.baseUrl = `http://localhost:${gulp_config.port}/`
config.shim = shimConfig || {}
config.build = 'local';
config.wrap = true;
config.optimize = 'none';
config.preserveLicenseComment = false;
config.exportFile = exportFile;

function generateConfigContent(config){
    var template = _.template(`try{\nrequire.config(<%= require_config %>);
    require([\'Application\'],function(Application){
        var application = new Application();
        application.start();
    })}\ncatch(e){};`);

    var starter_content = template({
        require_config: JSON.stringify(config,null,'\t')
    });

    return starter_content;
}

function generateEntrypointFile(){

    onFile = function(file){
        
        if(config && config['paths'] && !config['paths']['Application.Starter.Entrypoints'])
        {
            var { build_folder_path, file_name } = _generateEntrypointFile(config);
            config['paths']['Application.Starter.Entrypoints'] = path.join(path.relative(process.cwd(),build_folder_path),file_name).replace(/\\/g,'/').replace(/\.js$/,'');
        }
        this.emit('data',file);
    }

    return through(onFile);
}

function _generateEntrypointFile(config){
    
    var entry_points = distro['javascript'] && distro['javascript'].entrypoints
    ,   template = _.template(`define('Application.Starter.Entrypoints'\n,\t[<%= entry_points %>]\n,\tfunction(<%= args %>){\n 
        var _modules = Array.prototype.slice.call(arguments); 
        return function loadModules(application)
        {
            _modules && _modules.forEach( _module => { typeof(_module) == "function" ? _module.call(this,application) : (void 0); },this);

        }\n\t}\n)`)
    ,   entrypoint_content = template({
        entry_points: _.map(entry_points||[], (ep) => { return '\''+ep+'\''; })
    ,   args: _.map(entry_points||[], (ep,i) => { return 'a'+i; })
    });
    
    var build_type = config['build']
    ,   build_folder_path = package_manager.getDistFolderPath(build_type);
    
    if( !fs.existsSync(build_folder_path) )
        fs.mkdirSync(build_folder_path);

    fs.writeFileSync(path.join(build_folder_path,'Application.Starter.Entrypoints.js'), Buffer.from(entrypoint_content));
    return { build_folder_path, file_name:'Application.Starter.Entrypoints.js' };
}


function javascript(){
    return src(globs)
    .pipe(generateEntrypointFile())
    .pipe(package_manager.generateMainConfigFile(config,generateConfigContent))
    .pipe(requirejsOptimizer(config).on('error',function(err){ console.log(err) }))
    .pipe(concat('config.js'))
    .pipe(dest( package_manager.getDistFolderPath(config.build) ));
}

exports.javascript = javascript;
