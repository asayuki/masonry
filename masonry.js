(function () {
  'use strict';

  var Masonry = function (opt) {
    container = document.querySelector(opt.container);
    options = opt;
    this.init();
  };

  var
    container = null,
    options = null,
    currentItemWidth = null,
    gridValues = {            // 12-grid system. Please change this if you'd like any other. We need the right value when we're multiplying
      '8': '8.3333333333',
      '9': '9.0909090909',
      '10': '10',
      '11': '11.111111111',
      '13': '12.5',
      '14': '14,285714286',
      '17': '16,666666667',
      '20': '20',
      '25': '25',
      '33': '33.333333333',
      '50': '50',
      '100': '100'
    };

  function windowResize () {
    var newItemWidth = getItemPercentage();
    if (currentItemWidth !== newItemWidth) {
      currentItemWidth = newItemWidth;
      arrangeItems();
    } else {
      if (typeof options.growItems !== 'undefined' && options.growItems)
        arrangeItems(true);
    }
  }

  // As its ineffeciant to get the css-style value, we will
  // just calculate the percentage by the first item's current width
  // and the container's width. Might be a better way, and this
  // might be slow, but hey.
  function getItemPercentage () {
    return Math.round((parseInt(window.getComputedStyle(container.firstElementChild, null).getPropertyValue('width')) / parseInt(window.getComputedStyle(container, null).getPropertyValue('width'))) * 100);
  }

  /**
   * Set left & toppositions of items
   * @param {bool} ignoreLeft - Set to true if it should not calculate leftposition
   */
  function arrangeItems (ignoreLeft) {
    var
      columnsHeights = [],
      columns = Math.round(100/currentItemWidth),
      items = container.querySelectorAll(options.itemSelector),
      n = 0,
      sc = 0;

    [].slice.call(items).forEach(function (item, i) {
      // Set position absolute on the item
      item.style.position = 'absolute';

      // Check which column is the shortest
      // And set the top to that columns height
      // We don't however do this on the first row
      // As they just need to be 0
      if (i > (columns - 1)) {
        sc = columnsHeights.indexOf(Math.min.apply(null, columnsHeights));
        item.style.top = columnsHeights[sc] + 'px';
      } else {
        sc = n;
        item.style.top = '';
      }

      // Set left & height of item if not ignoring
      if (typeof ignoreLeft === 'undefined' || (typeof ignoreLeft !== 'undefined' && ignoreLeft === false)) {
        item.style.left = (gridValues['' + currentItemWidth + ''] * sc) + '%';
      }

      // Let the items grow in height as they grow in width
      // Their height as stated in the CSS is ignored, and is instead calculated by width multiplying by data-heightmultiplication set on the item
      if (typeof options.growItems !== 'undefined' && options.growItems) {
        if (columns === 1 && (typeof options.disableGrowItemsOneColumn !== 'undefined' && options.disableGrowItemsOneColumn === true)) {
          item.style.height = '';
        } else {
          var heightMultiplication = item.getAttribute('data-heightmultiplication');
          item.style.height = (parseInt(window.getComputedStyle(item, null).getPropertyValue('width')) * (heightMultiplication === null ? 1 : heightMultiplication) ) + 'px';
        }
      }

      // Add item-height to its column
      columnsHeights[sc] = (item.offsetTop + item.offsetHeight);

      n = (n === columns - 1) ? 0 : (n+1);
    });

    // Lets set the container to the height of the longest column
    [].slice.call(columnsHeights).forEach(function (ch, i) {
      if (i === 0) {
        container.style.height = ch + 'px';
      } else {
        if (ch > parseInt(container.style.height))
          container.style.height = columnsHeights[i] + 'px';
      }
    });
  }

  Masonry.prototype.init = function () {
    this.repaint();
    window.addEventListener('resize', windowResize, false);
  },

  Masonry.prototype.repaint = function () {
    currentItemWidth = getItemPercentage();
    arrangeItems();
  }

  window.Masonry = Masonry;

})(typeof window !== 'undefined' ? window : this);
