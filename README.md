VisibilityWatcher
===========

![Screenshot](http://fcartegnie.github.com/VisibilityWatcher/Capture-1.png)

VisibilityWatcher is an event or poll based DOM element visibility detection class.

How to Use
----------

	#JS
	new VisibilityWatcher($('target'),
	{
  		'enteredscreen': function(){
				alert('Element is on screen');
		}
	});

Events will happen when the element is scrolled in or out of the viewport, and depends on scroll events.
If you need to detect an element when there's no scroll event (no user action, animated by scripts) you can use the `poll` method.

	#JS
	new VisibilityWatcher($$('.watched'),
	{
  		'enteredscreen': function(el){
				alert('Element ' + el.id + 'is on screen');
		}
	},
	{ 'method': 'poll' }
	);

You can also discard 'fast scrolling' events by only triggering the event when the element stays in the same state for more than the specified `delay` value.
The `delta_px` allows extending the detection area. Can be used to trigger the event when the element is close to enter screen.

	#JS
	new VisibilityWatcher($$('.watched'),
	{
  		'enteredscreen': function(el){
				alert('Element ' + el.id + 'is on screen');
		}
	},
	{
		'delay': 2000,  /* Only trigger event if the element is on screen for more than 2 seconds */
		'delta_px': 300  /* Assume element is on screen when it enters a 300px range around viewport */
	}
	);

You can also detect element's position relatively to the viewport.

	#JS
	$('target').store('visibilitywatcher',
		new VisibilityWatcher($('target'),
		{
  			'updatedvisibilitystatus': function(){
  					var viswatcher = $('target').retrieve('visibilitywatcher');
					alert('we are ' + viswatcher.getVisibility()['x'] + ' element on x-axis and ' + viswatcher.getVisibility()['y'] + ' on y-axis');
			}
		})
	);

Return value `on` of `getVisibility()` has the same meaning as a fired `enteredscreen` event.
Return values `before` and `after` of `getVisibility()` have the same meaning as a fired `leftscreen` event.
