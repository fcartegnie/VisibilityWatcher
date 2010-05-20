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
	new VisibilityWatcher($('target'),
	{
  		'enteredscreen': function(){
				alert('Element is on screen');
		}
	},
	{ 'method': 'poll' }
	);

You can also detect element's position relatively to the viewport.

	#JS
	new VisibilityWatcher($('target'),
	{
  		'updatedvisibilitystatus': function(e){
				alert('we are ' + e.getVisibility()['x'] + 'element on x-axis and ' + e.getVisibility()['y'] + 'on y-axis');
		}
	});

Return value `on` of `getVisibility()` has the same meaning as a fired `enteredscreen` event.
Return values `before` and `after` of `getVisibility()` have the same meaning as a fired `leftscreen` event.
