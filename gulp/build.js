let gulp = require('gulp')
,   path = require('path')
,   package_manager = require('./package_manager')
,   distro = require('../distro')
,   rjs = require('requirejs')
,   _ = require('underscore');

let config = {}
,   shimConfig = package_manager.getShimConfig('javascript')
,   distribution_path = path.relative(process.cwd(), package_manager.getDistFolderPath())
,   requireConfigFile = 'require_config'
,   requireConfigFile_Ext = 'require_config.js'
,   appEntrypointsFileModuleId = 'Application.Starter.Entrypoints';

exportFile = path.join(distribution_path, package_manager.getExportFile());
config.shim = shimConfig || {};

/**
 * @method getRequireConfigTemplate  Returns a configuration template file which is supported by require.js
 * @param {Object} config
 * @returns {String}
 */
 function getRequireConfigTemplate(config){
    let template = _.template(
        "require.config(<%= require_config %>);\n" +
        "require([\'Application\'], function(Application){\n" +
        "\t" + "var application = new Application();\n" +
        "\t" + "application.start();\n" + 
        "});"
    );

    let starter_content = template({
        require_config: JSON.stringify(config, null, '\t')
    });

    return starter_content;
}

/**
 * @method generateAppEntryPointsTemplate  Creates and returns the "Application.Starter.Entrypoints.js" template which contains all initial dependency to start application on browser.
 * @returns {String}
 */
 function generateAppEntryPointsTemplate() {
    let entry_points = distro['javascript'] && distro['javascript'].entrypoints
    ,   template = _.template(`define('${appEntrypointsFileModuleId}'\n,\t[<%= entry_points %>]\n,\tfunction(<%= args %>){\n 
        var _modules = Array.prototype.slice.call(arguments); 
        return function loadModules(application)
        {
            _modules && _modules.forEach( _module => { typeof(_module) == "function" ? _module.call(this,application) : (void 0); },this);

        }\n\t}\n)`)
    ,   contents = template({
            entry_points: _.map(entry_points || [], (ep) => { return '\'' + ep + '\''; })
        ,   args: _.map(entry_points || [], (ep, i) => { return 'a' + i; })
        });
    
    return contents;
}

/**
 * @method templateToStartApp   Returns a template to overwrite the codes of requirejs config during optimization.
 * @returns {String}
 */
 function templateToStartApp(){
    return ("require([\'Application\'], function(Application){\n" +
    "\t" + "var application = new Application();\n" +
    "\t" + "application.start();\n" + 
    "});");
}

/**
 * @method amdOptimize  Wrap all dependency modules into single file based on specified configuration using require.js optimizer.
 * @param {Function} cb
 */
 function amdOptimize(cb){
    let contents = generateAppEntryPointsTemplate({})
    ,   rawText = {}
    ,   requireConfigFile_path = distribution_path + '/' + requireConfigFile
    ,   requireConfigFile_Ext_path = distribution_path + '/' + requireConfigFile_Ext
    //You can include your own amd-loader, but add the file to workspace and it's path to distro before using it here.
    ,   path_to_almond = distro.amdLoader.almond;
    
    rawText[appEntrypointsFileModuleId] = contents;

    rjs.optimize({
        baseUrl: '.'
    ,   mainConfigFile: requireConfigFile_Ext_path
    ,   include: [path_to_almond, requireConfigFile_path]
    ,   optimize: 'uglify'
    ,   preserveLicenseComments: false
    ,   generateSourceMaps: true
    ,   out: exportFile
    ,   wrap: false
    ,   rawText: rawText
    ,   onBuildWrite: function(moduleName, path, contents){
            return moduleName != requireConfigFile_path ? contents : templateToStartApp();
        }
    }, function(buildResponse){
        // console.log('build response', buildResponse);
        cb();
    }, cb);
}

function build(){
    return gulp.src(['precompiled/*','precompiled/**/*'])
    .pipe(package_manager.generateMainConfigFile(_.extend(config || {}, {exportFile: requireConfigFile_Ext}), getRequireConfigTemplate))
    .on('end', amdOptimize);
}

module.exports = build;