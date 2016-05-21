# Masonry

A very simple masonry that fills up the space beneath a element in one column instead of aligning it with another elements bottom position from the column before/next.

## Initialize

``` js
var masonry = new Masonry({
  itemSelector: '.item',
  container: '.container',
  growItems: false,
  itemsGrowOneColumn: true,
});
```

## Options

* `container` - CSS-selector of the container that holds the items
* `itemSelector` - CSS-selector of the items
* `growItems` - Bool-value if items should grow in height as they grow in width. [Read more here here.](#itemsgrow)
* `disableGrowItemsOneColumn` - Basically disabled item height growth when it's only one column.

### ItemsGrow

If you should set `itemsGrow` in options to `true` you would also need to add some information to your HTML.

You would need to add a data-attribute with the name of `data-heightmultiplication` with a number you would like your item grow with. For example: if you would like the item to grow 1.5x in height of the width, you would set `data-heightmultiplication` to `1.5`.

`itemGrow` will set its own height, there for height from CSS will be ignored/overwritten. But it could be wise so set a defaultheight in CSS in case of javascriptfailure or javascript not enabled.

``` html
<div class="container">
  <div data-heightmultiplication="1" class="blue item">1</div>
  <div data-heightmultiplication="1" class="red item">2</div>
  <div data-heightmultiplication="1" class="violet item">3</div>
  <div data-heightmultiplication="1" class="pink item">4</div>
  <div data-heightmultiplication="1" class="green item">5</div>
  <div data-heightmultiplication="1" class="blue item">6</div>
  <div data-heightmultiplication="1" class="red item">7</div>
  <div data-heightmultiplication="1" class="violet item">8</div>
  <div data-heightmultiplication="1" class="blue item">9</div>
  <div data-heightmultiplication="1" class="green item">10</div>
</div>
```

## Changelog

* Items now fill up spaces in columns that are shorter than the rest.

## Todo

* When itemgrow is enabled and onecolumngrowth is disabled - we can optimize this more efficiently buy not using JS anymore.
