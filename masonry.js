var Masonry = (function () {

  var options = null;

  var Masonry = function (opts) {
    var that = this;

    that.options = opts;
    that.gridValues = {
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

    that.repaint = function () {
      that.currentWidth = getItemPercentage();
      if (that.currentWidth === 0) {
        that.options.container.style.height = '0px';
      } else {
        arrangeItems();
      }
    }

    function windowResize () {
      var newWidth = getItemPercentage();
      if (that.currentWidth !== newWidth) {
        that.currentWidth = newWidth;
        arrangeItems();
      } else {
        if ((typeof that.options.growItems !== 'undefined' && that.options.growItems) || (that.currentWidth === 100 && ((typeof that.options.disableGrowItemsOneColumn === 'undefined') || (that.options.disableGrowItemsOneColumn !== 'undefined' && that.options.disableGrowItemsOneColumn === false)))) {
          arrangeItems(true);
        }
      }
    }

    function getItemPercentage () {
      if (that.options.container.firstElementChild !== null) {
        return Math.round((parseInt(window.getComputedStyle(that.options.container.firstElementChild, null).getPropertyValue('width')) / parseInt(window.getComputedStyle(that.options.container, null).getPropertyValue('width'))) * 100);
      } else {
        return 0;
      }
    }

    function arrangeItems (ignoreLeft) {
      var columnsHeights = [];
      var columns = Math.round(100 / that.currentWidth);
      var items = that.options.container.querySelectorAll(that.options.itemSelector);
      var n = 0;
      var sc = 0;
      var firstWidth = 0;

      [].slice.call(items).forEach(function (item, i) {

        if (i === 0) {
          firstWidth = window.getComputedStyle(item, null).getPropertyValue('width');
        }

        item.style.position = 'absolute';

        if (i > (columns - 1)) {
          sc = columnsHeights.indexOf(Math.min.apply(null, columnsHeights));
          item.style.top = columnsHeights[sc] + 'px';
        } else {
          sc = n;
          item.style.top = '';
        }

        if (typeof ignoreLeft === 'undefined' || (typeof ignoreLeft !== 'undefined' && ignoreLeft === false)) {
          item.style.left = (that.gridValues['' + that.currentWidth + ''] * sc) + '%';
        }

        if (typeof that.options.growItems !== 'undefined' && that.options.growItems) {
          if (columns === 1 && (typeof that.options.disableGrowItemsOneColumn !== 'undefined' && that.options.disableGrowItemsOneColumn === true)) {
            item.style.height = '';
          } else {
            var heightMultiplication = item.getAttribute('data-heightmultiplication');
            item.style.height = (parseInt(firstWidth) * (heightMultiplication === null ? 1 : heightMultiplication) ) + 'px';
          }
        }

        columnsHeights[sc] = (item.offsetTop + item.offsetHeight);

        n = (n === columns - 1) ? 0 : (n+1);
      });

      [].slice.call(columnsHeights).forEach(function (ch, i) {
        if (i === 0) {
          that.options.container.style.height = ch + 'px';
        } else {
          if (ch > parseInt(that.options.container.style.height)) {
            that.options.container.style.height = columnsHeights[i] + 'px';
          }
        }
      });
    }

    function repaint () {
      that.currentWidth = getItemPercentage();
      if (that.currentWidth === 0) {
        that.options.container.style.height = '0px';
      } else {
        arrangeItems();
      }
    }

    that.repaint();

    window.addEventListener('resize', windowResize, false);

  };

  return Masonry;

})();
