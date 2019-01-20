var Metalsmith  = require('metalsmith');
var inplace = require('metalsmith-in-place');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var watch = require('metalsmith-watch');

const toUpper = function (string) {
    return string.toUpperCase();
};

const spaceToDash = function (string) {
    return string.replace(/\s+/g, "-");
};

const templateConfig = {
    engineOptions: {
        filters: {
            toUpper: toUpper,
            spaceToDash: spaceToDash
        }
    },
    suppressNoFilesError: true
};


function maybeWatch(){
    const active = process.argv.includes('-w') || process.argv.includes('watch')
    if(active){
        return watch({
            paths: {
                "${source}/**/*": true,
                "layouts/**/*": "**/*.md",
            },
            livereload: true,
        })
    }
}

function simplePublished(opts){
    opts = opts || {};
    return function (files, metalsmith, done) {
        Object.keys(files).map((file)=>{
            var data = files[file];
            var pub = typeof data.published !== 'undefined' ? data.published : true;
            console.log({
                file,
                q: typeof data.published !== 'undefined'
            })
            if(!pub){
                delete files[file];
            }
        })
        done()
    }
}

Metalsmith(__dirname)
    .metadata({
        title: "My Static Site & Blog",
        description: "It's about saying »Hello« to the World.",
        generator: "Metalsmith",
        url: "http://www.metalsmith.io/"
    })
    .source('./src')
    .destination('./dist')
    .clean(true)
    .use(simplePublished())
    .use(permalinks({ relative: true }))
    .use(collections({ posts: 'posts/*.md' }))
    .use(inplace(templateConfig))
    .use(layouts(templateConfig))
    .use(maybeWatch())
    .build(function(err, files) {
        if (err) { throw err; }
        console.log('done')
    });

