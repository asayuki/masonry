function arrangeItems (ignoreLeft) {
  var columnsHeights = [];
  var columns = Math.round(100 / that.currentWidth);
  var items = that.options.container.querySelectorAll(that.options.itemSelector);
  var n = 0;
  var sc = 0;
  var firstWidth = 0;
  var calculatedHeight = 0;

  console.log(columns);

  [].slice.call(items).forEach(function (item, i) {

    //if (i === 0) {
      firstWidth = window.getComputedStyle(item, null).getPropertyValue('width');
    //}

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
        calculatedHeight = (parseInt(firstWidth) * (heightMultiplication === null ? 1 : heightMultiplication) );
        if (typeof that.options.maxHeight !== 'undefined') {
          item.style.height = (parseInt(calculatedHeight) <= that.options.maxHeight) ? calculatedHeight + 'px' : that.options.maxHeight + 'px';
        } else {
          item.style.height = calculatedHeight + 'px';
        }
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
