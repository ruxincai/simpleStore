(function(global) {

    var ngVer = '@2.0.0-rc.1';

    //map tells the System loader where to look for things
    var  map = {
        'app':                        'app',

        '@angular':                   'node_modules/@angular', // sufficient if we didn't pin the version
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api', // get latest
        'rxjs':                       'node_modules/rxjs',
        'ts':                         'node_modules/plugin-typescript/lib/plugin.js',
        'typescript':                 'node_modules/typescript/lib/typescript.js'
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];

    // Add map entries for each angular package
    // only because we're pinning the version with `ngVer`.
    ngPackageNames.forEach(function(pkgName) {
        map['@angular/'+pkgName] = 'node_modules/@angular/' + pkgName;
    });

    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {

        // Bundled (~40 requests):
        packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };

        // Individual files (~300 requests):
        //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
            tsconfig: true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        map: map,
        packages: packages
    };

    System.config(config);

})(this);