/**
 * This is the creator.
 * This is used in video-list.js as 'VideosView'
 *
 * @ author: Mark Deuerling, Jörg Kandziroa und Evgenij Relin
 */

define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    var VideosView = Backbone.View.extend({
        tagName: 'div', // default value
        className: 'video-box', // set in dom
        template: _.template($('#video-template').text()), // set in dom, look at SU 8
        render: function() {
            this.$el.empty();
            this.$el.html(this.template(this.model.attributes)); // look at SU 8
            return this; // look at video-list.js, render will add to el.
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render); // look at SU 8
        }
    });
    return VideosView;
});

// set in dom -> look at index.html