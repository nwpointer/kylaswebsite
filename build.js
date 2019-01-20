var Metalsmith  = require('metalsmith');
var inplace = require('metalsmith-in-place');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var {
    templateConfig,
    maybeWatch,
    simplePublished,
    collectionLayout
} = require('./middleware');

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
    .use(collectionLayout({ posts: 'post.njk' }))
    .use(simplePublished())
    .use(inplace(templateConfig))
    .use(layouts(templateConfig))
    .use(permalinks())
    .use(maybeWatch())
    .build(function(err, files) {
        if (err) { throw err; }
        console.log('done')
    });

