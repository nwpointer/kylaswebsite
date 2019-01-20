var watch = require('metalsmith-watch');

const templateConfig = {
    engineOptions: {
        filters: {
            toUpper: s=> s.toUpperCase(),
            spaceToDash: s => s.replace(/\s+/g, "-"),
            link: path => path.split('.')[0],
            title: path => path.split('.')[0].split('/')[1]
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
            console.log(data,)
            if(!pub){
                delete files[file];
            }
        })
        done()
    }
}
function collectionLayout(opts){
    opts = opts || {};
    return function (files, metalsmith, done) {
        Object.keys(files).map((file)=>{
            var data = files[file];
            var collection = data.collection[0]
            if(collection){
                data.layout = opts[collection]
            }
        })
        done()
    }
}

module.exports = {
    templateConfig,
    maybeWatch,
    simplePublished,
    collectionLayout
}