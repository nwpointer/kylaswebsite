var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var watch = require('metalsmith-watch');

Metalsmith(__dirname)
    .metadata({
        title: "My Static Site & Blog",
        description: "It's about saying »Hello« to the World.",
        generator: "Metalsmith",
        url: "http://www.metalsmith.io/"
    })
    .source('./src')
    .destination('./dist')
    .clean(false)
    .use(markdown())
    .use(permalinks({ relative: true }))
    .use(collections({
        posts: 'posts/*.md'
    }))
    .use(layouts())
    .use(maybeWatch())
    .build(function(err, files) {
        if (err) { throw err; }
        console.log('done')
    });

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