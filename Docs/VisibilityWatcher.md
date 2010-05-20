VisibilityWatcher {#VisibilityWatcher}
======================================

Event and poll based DOM element visibility detection class.

### Events:

* enteredscreen - target element has entered screen;
* leftscreen - target element has left screen;
* updatedvisibilitystatus - scrolling or polling event has occured.

VisibilityWatcher Method: constructor {#VisibilityWatcher:constructor}
------------------------------------------------------

### Syntax:

	VisibilityWatcher(target, events, options);

### Arguments:

1. target - (*element*) the watched element.
2. events - (*function* array) Event handlers to be registered on initialization.
3. options - (*object* optional) see below.

### Options:

* method - (*string*, defaults to 'event')  Detection method. Values are `poll` or `event`.
* poll_interval - (*integer*, defaults to `2000`) Polling interval (in milliseconds) when doing poll based detection.
* event_source - (*element*, defaults to `window`) Source for scrolling events. Must be a scrollable element.

### Returns:

	(object) A new VisibilityWatcher instance.

### Example: 

	var foo =  
	new VisibilityWatcher($('target'), 
		{
  			'enteredscreen': function(){ ... },
	  		'leftscreen': function(){ ... }
		},
		{ poll_interval: 500, method: 'poll' }
	);
	
VisibilityWatcher Method: startWatching {#VisibilityWatcher:startWatching}
--------------------------------------------------

Starts detection. (automatically done on initialization) 

### Syntax:

	VisibilityWatcher.stopWatching();

VisibilityWatcher Method: startWatching {#VisibilityWatcher:stopWatching}
--------------------------------------------------

Stops detection. 

### Syntax:

	VisibilityWatcher.stopWatching();


VisibilityWatcher Method: getVisibility {#VisibilityWatcher:getVisibility}
--------------------------------------------------

Returns viewport's position relatively to the target element. 

### Syntax:

	VisibilityWatcher.getVisibility();

### Returns:

	(array) `['x': ., 'y': .]` of (string) `before`, `on` or `after`

