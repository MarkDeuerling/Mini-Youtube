/**
 * This is the delegator.
 *
 * @author: Mark Deuerling, Jörg Kandziroa und Evgenij Relin
 */

define(['backbone', 'jquery', 'underscore', 'views/videoV'], function(Backbone, $, _, VideosView) {
    var VideosListView = Backbone.View.extend({
        el: '#content', // set in dom
        template: undefined,
        render: function() {
            this.$el.empty(); // $el is jquery
            this.collection.each(function(video) { // loop through collection
                var videosView = new VideosView({model: video}); // allocate VideoV and pass video (in initialize?)
                this.$el.prepend(videosView.render().el); // look at videoV.js return this in render, more in SU 8
            }, this);
            return this;
        },
        initialize: function() {
            this.listenTo(this.collection,'add', this.render);
        }
    });
    return VideosListView;
});

// set in dom -> look at index.html