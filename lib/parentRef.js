const Schema = require('mongoose').Schema

function parentRef(schema, options) {
    const onDelete = (options && options.onDelete) || 'REPARENT'; // or 'DELETE'
    const idType = (options && options.idType) || Schema.ObjectId;
    const pathSeparator = (options && options.pathSeparator) || '#';
    const pathSeparatorRegex = '[' + pathSeparator + ']';

    schema.add({
        parent: {
            index: true,
            set: (value) =>
                value instanceof Object && value._id ? value._id : value,
            type: idType,
        }
    });

    schema.methods.getParent = async function (fields, options) {
        const conditions = { _id: this.parent };

        fields = fields || null;
        options = options || {};

        this.model(this.constructor.modelName).findOne(
            conditions,
            fields,
            options
        );
    };

    schema.methods.getAncestors = async function (conditions, fields, options) {
        conditions = conditions || {};
        fields = fields || null;
        options = options || {};

        let result = [];

        let currentDoc = this;

        while (currentDoc?.parent != null) {
            let currentDoc = await this.model(
                this.constructor.modelName
            ).findOne({ ...conditions, _id: currentDoc._id }, fields, options);
            result.push(currentDoc);
        }

        return result;
    };

    schema.methods.getChildren = async function (
        conditions,
        fields,
        options
    ) {};
}

module.exports = parentRef;
