var Metalsmith  = require('metalsmith');
var inplace = require('metalsmith-in-place');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var watch = require('metalsmith-watch');

const templateConfig = {
    engineOptions: {
        filters: {
            toUpper: s=> s.toUpperCase(),
            spaceToDash: s => s.replace(/\s+/g, "-"),
            link: path => path.split('.')[0]
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
    .use(collections({ posts: 'posts/*.md' }))
    .use(simplePublished())
    .use(inplace(templateConfig))
    .use(layouts(templateConfig))
    .use(permalinks())
    .use(maybeWatch())
    .build(function(err, files) {
        if (err) { throw err; }
        console.log('done')
    });

