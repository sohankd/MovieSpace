var {src,dest} = require('gulp')
,   _ = require('underscore')
,   package_manager = require('./package_manager')
,   concat = require('gulp-concat')
,   requirejsOptimizer = require('gulp-requirejs-optimize');

var config = {};
var { globs, exportFile, shimConfig } = package_manager.getConfig('template','js');
config = _.extend(config,package_manager.config);
config.exportFile = exportFile;
config.shim = shimConfig || {};
config.wrap = true;
config.optimize = 'none';
config.build = 'local';

function generateConfigContent(config){
    var template = _.template(`try{\nrequire.config(<%= require_config %>);}\ncatch(e){};`);
    
    var starter_content = template({
        require_config: JSON.stringify(config,null,'\t')
    });

    return starter_content;
}


function template(){
    return src(globs)
    .pipe(package_manager.generateMainConfigFile(config,generateConfigContent))
    .pipe(requirejsOptimizer(config).on('error',function(err){ console.log(err); }))
    .pipe(concat(exportFile))
    .pipe(dest( package_manager.getDistFolderPath(config.build) ));
}

exports.template = template;