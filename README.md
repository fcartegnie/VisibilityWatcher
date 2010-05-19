VisibilityWatcher
===========

![Screenshot](http://VisibilityWatcher.github.com/Capture-1.png)

How to Use
----------

VisibilityWatcher is an event or poll based DOM element visibility detection class.

	#JS
	new VisibilityWatcher($('target'),
	{
  		'enteredscreen': function(){
				alert('Element is on screen');
		}
	}

Events will happen when the element is scrolled in or out of the viewport, and depends on scroll events.
If you need to detect an element when there's no scroll event (no user action, animated by scripts) you can use the `poll` method.

	#JS
	new VisibilityWatcher($('target'),
	{
  		'enteredscreen': function(){
				alert('Element is on screen');
		},
		{ 'method': 'poll' }
	}

You can also detect element's position relatively to the viewport.

	#JS
	new VisibilityWatcher($('target'),
	{
  		'updatedvisibilitystatus': function(e){
				alert(e.getVisibility());
		}
	}

Return value `on` of `getVisibility()` has the same meaning as a fired `enteredscreen` event.
Return values `before` and `after` of `getVisibility()` have the same meaning as a fired `leftscreen` event.
