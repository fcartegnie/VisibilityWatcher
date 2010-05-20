/*
---
description: VisibilityWatcher class.

license: MIT-style

authors:
- Francois Cartegnie

requires:
- core/1.2.3: '*'

provides: [VisibilityWatcher]

...
*/

var VisibilityWatcher = new Class({
	Implements: [Options, Events],

	options: {
		poll_interval: 2000,
		method: 'event', /* poll or scroll event based */
		event_source: window /* scrollable element */
	},

	initialize: function(el, events, options){
		this.last_state = new Array();
		this.setOptions(options);
		this.addEvents(events);
		this.setTarget(el);
		this.visibilityChangedCheck();
		this.startWatching();
	},

	getVisibility: function(){
		var elementPosition = this.targetElement.getPosition();
		var elementSize = this.targetElement.getSize();
		var returned_array = new Array();

		['x', 'y'].each( function(el, index){
			if ( document.getScroll()[el] > (elementPosition[el] + elementSize[el]) )
				returned_array[el] = 'after';
			else
			if ( (document.getScroll()[el] + window.getSize()[el]) > elementPosition[el] )
				returned_array[el] = 'on';
			else
				returned_array[el] = 'before';
		} );
		return returned_array;
	},

	startWatching: function() {
		if ( this.options['method'] == 'poll' )
		{
			this.interval_id = this.visibilityChangedCheck.periodical(this.options['poll_interval'], this);
		} else {
			document.id(this.options['event_source']).addEvent('scroll', this.visibilityChangedCheck.bind(this));
		}
	},

	stopWatching: function() {
		if ( this.options['method'] == 'poll' )
		{
			this.interval_id = $clear(this.interval_id);
		} else {
			document.id(this.options['event_source']).removeEvent('scroll', this.visibilityChangedCheck.bind(this));
		}
	},

	setTarget: function(targetElement){ this.targetElement = targetElement; },

	visibilityChangedCheck: function(){
		var cur_state = this.getVisibility();
		if ( ! ['x', 'y'].every( function(el, index){ return (cur_state[el] == this.last_state[el]); }, this) )
		{
			this.last_state = cur_state;
			if ( ['x', 'y'].every( function(el, index){ return( cur_state[el] == 'on'); }) )
				this.fireEvent('enteredscreen');
			else
				this.fireEvent('leftscreen');
		}
		this.fireEvent('updatedvisibilitystatus');
	}
});//!Class