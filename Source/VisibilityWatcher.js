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
		this.targetElements = new Array();
		this.setOptions(options);
		this.addEvents(events);
		this.add(el);
		this.visibilityChangedCheck();
		this.startWatching();
	},

	getVisibility: function(targetElement){
		if ( targetElement == 'undefined' )
			targetElement = this.targetElements[0].element;

		var elementPosition = targetElement.getPosition();
		var elementSize = targetElement.getSize();
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
		return this;
	},

	stopWatching: function() {
		if ( this.options['method'] == 'poll' )
		{
			this.interval_id = $clear(this.interval_id);
		} else {
			document.id(this.options['event_source']).removeEvent('scroll', this.visibilityChangedCheck.bind(this));
		}
		return this;
	},

	add: function(targetElement){
		$splat( targetElement ).each( function(el, index){
			this.targetElements.push( {'element': document.id( el ), 'last_state': new Array()} );
		}.bind(this) );
		return this;
	},

	visibilityChangedCheck: function(){
		this.targetElements.each( function(targetElement, index){
			var cur_state = this.getVisibility( targetElement.element );
			if ( ! ['x', 'y'].every( function(axis, index){ return (cur_state[axis] == targetElement.last_state[axis]); }, this) )
			{
				targetElement.last_state = cur_state;
				if ( ['x', 'y'].every( function(axis, index){ return( cur_state[axis] == 'on'); }) )
					this.fireEvent('enteredscreen', targetElement.element);
				else
					this.fireEvent('leftscreen', targetElement.element);
			}
		}.bind(this) );

		this.fireEvent('updatedvisibilitystatus');
		return this;
	}
});//!Class