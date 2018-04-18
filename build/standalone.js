// Import fs and path module for resolution and output
var fs = require('fs');
var path = require('path');
// Import mkdirp to create the directory if non-existent yet
var mkdirp = require('mkdirp');
// Import Browserify and Tsify
var browserify = require('browserify');
var tsify = require('tsify');

// Resolve the path for outputting the bundle.js
var bundleFolderPath = path.resolve(__dirname, '../dist/browser')
var bundlePath = bundleFolderPath + '/bundle.js';
// Create the output directory if needed
mkdirp(bundleFolderPath, function() {
    // Create the output file (bundle.js) if required
    var bundleStream = fs.createWriteStream(bundlePath);
    // Wait for stream to be ready
    bundleStream.on('open', function() {
        // Browserify standalone.js into standalone js module and pipe it to bundle.js
        browserify()
            .add('./lib/standalone.js')
            .plugin(tsify, { noImplicitAny: true })
            .bundle()
            .on('error', function(err) { console.error(err.toString()); })
            .pipe(bundleStream);
    });
}); 