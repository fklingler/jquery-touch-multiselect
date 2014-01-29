This jQuery plugin is able to transform a classic ```<select multiple="multiple">``` input field of a form into a nice foldable list with easily selected elements, even for a touch device like a smartphone.

You can look at the demo folder to watch a working use of this plugin.


Usage
-----

You can simply use this plugin by creating a standard ```<select multiple="multiple">``` list :

```html
<select multiple="multiple">
  <option value="1" selected="selected">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3" selected="selected">Java</option>
  <option value="4">Option 4</option>
</select>
```

Then in a javascript script, you can simply use this function :

```javascript
$('select').touchMultiSelect();
```


Parameters
----------

Some parameters can be passed to the function to customize the behavior of the plugin :

- __noneButtonPresent__  
Determines if a 'none' button must be included in the list  
_default value : true_

- __noneButtonText__  
Determines the text of the 'none' button if there is one  
_default value : 'None'_

- __noneButtonAtBeginning__  
Determines if the 'none' button must be prepended (true) or appended (false) to the list  
_default value : true_

- __permitNoSelectedButton__  
If there is no 'none' button, determines if we can deselect an option if there is no other selected option  
_default value : false_

- __maximumNumberSelections__
Limits how many options can be selected; default is no limitation (null)
_default value : null_


### Example

```javascript
$('select').touchMultiSelect({
  noneButtonPresent: false,
  permitNoSelectedButton: true
});
```


Information
-----------

This plugin has been made as a part of my work at [Novelys](https://github.com/novelys).


License
-------

MIT License. Copyright 2012 Novelys.
