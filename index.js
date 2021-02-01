const parentRef = require('./lib/parentRef');
const childRef = require('./lib/childRef');
const ancestorArray = require('./lib/ancestorArray');
const materializedPath = require('./lib/materializedPath');
const nestedSets = require('./lib/nestedSets');

function treePlugin(schema, options) {
    if (options.treeType) {
        switch (options.treeType) {
            case 'ParentRef':
                parentRef(schema, options);
                break;
            case 'ChildRef':
                childRef(schema, options);
                break;
            case 'AncestorArray':
                ancestorArray(schema, options);
                break;
            case 'MaterializedPath':
                materializedPath(schema, options);
                break;
            case 'NestedSets':
                nestedSets(schema, options);
                break;
            default:
                throw new Error(
                    `The treeType ${options.treeType} is not supported`
                );
                break;
        }
    } else {
        throw new Error('You must specify the tree type');
    }
}

module.exports = treePlugin;
