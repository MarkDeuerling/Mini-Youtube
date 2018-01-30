/**
 * This script contains the Model and Collection.
 * Will be used in appclient.js as 'Video'
 *
 * @author: Mark Deuerling, Jörg Kandziroa und Evgenij Relin.
 */

define(['backbone', 'underscore'], function(Backbone, _) {
    // container for model and collection for returning
    var items = {};

    var videoModel = Backbone.Model.extend({
        urlRoot: '/videos',
        idAttribute: '_id',
        defaults: {
            description: '',
            playcount: null,
            ranking: ''
        },
        initialize: function() {
            // todo
        },
        validate: function(attr) { // will be called
            if ( _.isEmpty(attr.title) ) {
                console.error("Missing title");
                return "Missing title";
            }
            if (_.isEmpty(attr.src)) {
                console.error("Missing src");
                return "Missing src";
            }
        }
    });

    var videoModelCollection = Backbone.Collection.extend({
        model: videoModel,
        url: '/videos',
        initialize: function() {
            this.on('event', function(video) {
                // todo
            });
        }
    });

    items.Model = videoModel;
    items.Collection = videoModelCollection;

    return items;
});