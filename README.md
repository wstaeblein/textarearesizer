# TextArea Resizer

Vanilla JS class to make a textarea's height grow according to it's contents.

##### [Check out the DEMO](https://wstaeblein.github.io/textarearesizer/)


## Features

- Very small size and footprint
- No dependencies
- Can be used in as many textareas as needed, just instantiate for each one.
- Responsive. The height will adjust if the textarea's size change.
- Can be properly destroyed. Will remove all events and structure.
- Is aware of max-height and adjust accordingly, enabling scrollbars when growing is no longer possible.


## Usage & Code Examples

Add the following file to your project:
- textarearesizer.js


```javascript
let ele = document.getElementById('textareaElement');
let taResizer = new textHighlight(ele);
```

The code above is enough to set it up and your textarea will now grow with it's contents from its min-height to it's max-height.

Should you need to update the textarea call the method below.

```javascript
taResizer.update();
```


Should you need to access the height of the textarea, it's text and max-height, call the method below. 

```javascript
taResizer.getHeight();
```

It will return an object as such:

```javascript
{
    textarea: 150, 
    text: 220, 
    max: 400 
}
```

When it falls out of scope, just call the destroy method and all will be as it was before instantiation.

```javascript
hilite.destroy();
```


## About

This class was born from my need of such functionality for an ongoing project. 

This class was tested in Brave 117 and Firefox 117.



## Licence

This project is licensed under the [MIT Licence](https://github.com/wstaeblein/texthighlighter/blob/main/LICENSE)