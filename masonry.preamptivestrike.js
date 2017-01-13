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

    function getItemPercentagee (item) {
      return Math.round((parseInt(window.getComputedStyle(item, null).getPropertyValue('width')) / parseInt(window.getComputedStyle(that.options.container, null).getPropertyValue('width'))) * 100);
    }

    function getItemColWidth (item) {
      return Math.round((parseInt(window.getComputedStyle(item, null).getPropertyValue('width')) / parseInt(window.getComputedStyle(that.options.container, null).getPropertyValue('width'))) * 100);
    }

    function arrangeItems (ignoreLeft) {

      var columnsNum = Math.round(100 / that.currentWidth); // Black voodoo
      var columnsHeights = [];
      var columnsWidth = [];

      var items = that.options.container.querySelectorAll(that.options.itemSelector);
      var itemWidth = 0;
      var itemHeight = 0;
      var itemCalculatedHeight = 0;

      [].slice.call(items).forEach(function (item, index) {

        itemWidth = window.getComputedStyle(item, null).getPropertyValue('width');

        item.style.position = 'absolute';

        console.log(getItemPercentagee(item));
        console.log(getItemColWidth(item));

        //console.log(itemWidth);
        //console.log(that.currentWidth);

        //console.log(parseInt(itemWidth) / 5);

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
