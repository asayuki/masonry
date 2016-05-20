(function (window) {

  this.Masonry = function (opt) {
    container = document.querySelector(opt.container);
    options = opt;

    this.init();
  };

  // 12 grid system
  // Just so we get the right values when we're multiplying
  var gridValues = {
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

  // Set some other globals
  var
    container = null,
    options = null,
    currentItemWidth = null;

  function windowResize () {
    var newItemWidth = getItemPercentage();
    if (currentItemWidth !== newItemWidth) {
      // We need to rearrange some items it seems
      currentItemWidth = newItemWidth;
      rearrangeItems(true);
    } else {
      rearrangeItems(false);
    }
  }

  // As its ineffeciant to get the css-style value, we will
  // just calculate the percentage by the items current width
  // and the containers width. Might be a better way, and this
  // might be slow, but hey.
  function getItemPercentage () {
    return Math.round((parseInt(window.getComputedStyle(container.firstElementChild, null).getPropertyValue('width')) / parseInt(window.getComputedStyle(container, null).getPropertyValue('width'))) * 100);
  }

  function rearrangeItems (all) {
    var
      columnsHeights = [],
      columns = Math.round(100/currentItemWidth),
      items = container.querySelectorAll(options.itemSelector),
      n = 0;

    [].slice.call(items).forEach(function (item, i) {
      if (all) {
        item.style.position = 'absolute';
        item.style.left = (gridValues['' + currentItemWidth + ''] * n) + '%';
      }

      // Let them grow, let them grooow
      // Let them take over the flow
      if (typeof options.itemsGrow !== 'undefined' && options.itemsGrow) {
        var heightMultiplication = item.getAttribute('data-heightmultiplication');
        item.style.height = (parseInt(window.getComputedStyle(item, null).getPropertyValue('width')) * heightMultiplication) + 'px';
      }

      // Now we need to add some top to the next elements
      if (i > (columns - 1))
        item.style.top = (items[i - columns].offsetTop + items[i - columns].offsetHeight) + 'px';
      else
        item.style.top = '';

      columnsHeights[n] = (item.offsetTop + item.offsetHeight);

      if (n === (columns - 1))
        n = 0
      else
        n++;
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

  Masonry.prototype.init = function (opt) {
    currentItemWidth = getItemPercentage();
    rearrangeItems(true);

    window.addEventListener('resize', windowResize, false);
  },

  Masonry.prototype.repaint = function () {
    currentItemWidth = getItemPercentage();
    rearrangeItems(true);
  }
})(typeof window !== 'undefined' ? window : this);
