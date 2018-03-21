define(function(require) {
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var helperExtensionView = Backbone.View.extend({
	
		events: {
			"click .trickle-button-inner button": "helperButtonClicked",
			"click .helper-popup .helper-popup-close-button": "closeButtonClicked"
		},
		
		className: 'helper-popup',
		
		initialize: function() {
			this.render();
		},
		
		render: function() {
			var data = this.model.toJSON();
			var template = Handlebars.templates["helper"];
			
			this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')));
			_.defer(_.bind(this.postRender, this));
		},
			
		postRender: function() {
			this.listenTo(Adapt, 'remove', this.remove);
		},
		
		helperButtonClicked: function(event) {
			if (event) event.preventDefault();
			
			$(".helper-popup").removeClass('helper-popup-wondow-closed');
			$(".helper-popup").addClass('helper-popup-window-opened');
			return false;
		},
		
		closeButtonClicked: function(event) {
			if (event) event.preventDefault();

			$(".helper-popup").removeClass('helper-popup-wondow-opened');
			$(".helper-popup").addClass('helper-popup-window-closed');
		}
	});
	
	Adapt.on('componentView:postRender', function(view) {
		if (view.model.has('_helper') && view.model.get('_helper').length > 0) {
			new helperExtensionView({
				model: view.model
			});
		}
	});
});