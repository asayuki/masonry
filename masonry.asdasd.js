const Masonry = (() => {

  let options = {
    columnQueries: {
      '1400': 7,
      '1200': 5,
      '800': 4,
      '500': 3
    },
    minHeight: 300
  };

  let columnQueries = {};
  let currentColumns = 1;
  let currentWidth = 0;
  // Lets start with one available col..
  let availableCols = [
    {
      top: 0,
      cols: new Array(currentColumns)
    }
  ];

  const Masonry = function (opts) {
    Object.assign(options, opts);

    /**
     *  Lets sort the columnQueries by value
     *  Ugly delux...
     */
    let cqKeys = [];
    for (let key in options.columnQueries) {
      cqKeys.push(key);
    }
    cqKeys.sort();
    for (let i = 0; i < cqKeys.length; i++) {
      let k = cqKeys[i];
      columnQueries[cqKeys[i]] = options.columnQueries[cqKeys[i]];
    }

    /**
     * Repaint masonry
     */
    this.repaint = function () {
      arrangeItems();
    }

    /**
     * [arrangeItems description]
     * @param  {Boolean} ignoreLeft Only if we know that x-axis will be untouched
     */
    function arrangeItems (ignoreLeft) {
      let items = options.container.querySelectorAll(options.itemSelector);
      let oneColWidth = 0;
      let itemCols = 0;

      console.log(availableCols);

      [].slice.call(items).forEach((item) => {
        if (currentColumns === 1) {
          item.style.position = 'relative';
          item.style.width = '100%';

          if (options.disableGrowItemsOneColumn !== 'undefined' && options.disableGrowItemsOneColumn === true) {
            item.style.height = options.minHeight + 'px';
          } else {
            item.style.minHeight = window.getComputedStyle(item, null).getPropertyValue('width');
          }
        } else {
          oneColWidth = (currentWidth / currentColumns);
          itemCols = (parseInt(item.getAttribute('data-cols')) > currentColumns) ? currentColumns : item.getAttribute('data-cols');

          item.style.position = 'absolute';
          item.style.minHeight = 'auto';
          item.style.width = (oneColWidth * itemCols) + 'px';
          item.style.minHeight = item.style.width;

          // Lets try and position them where they are suppose to be.. YAY
          // This will be a monster.. most def..
          let positions = positionItem(item.getAttribute('data-cols'));

          item.style.top = positions.y + 'px';
          item.style.left = (oneColWidth * positions.x) + 'px';
        }
      });
    }

    function positionItem (numCols) {

      console.log(currentColumns);

      let returnData = {};

      // This one is easy
      if (numCols == 1) {
        for(var i = 0; i < availableCols[0].cols.length; i++) {
          if (typeof availableCols[0].cols[i] === 'undefined') {
            availableCols[0].cols[i] = true;
            returnData.y = availableCols[0].top;
            returnData.x = i;
            break;
          }
        }
      } else {
        if (availableCols.length === 1) {
          let concurrentMax = 0;
          let concurrentMaxStart = null;
          let concurrentCols = 0;
          let concurrentStart = null;
          for (var i = 0; i < availableCols[0].cols.length; i++) {
            if (typeof availableCols[0].cols[i] === 'undefined') {
              concurrentStart = (concurrentStart === null) ? i : concurrentStart;
              concurrentCols++;
            } else {
              console.log('-', i);
              concurrentMax = (concurrentCols > concurrentMax) ? concurrentCols : concurrentMax;
              concurrentMaxStart = (concurrentCols > concurrentMax) ? concurrentStart : concurrentMaxStart;
              concurrentCols = 0;
              concurrentStart = null;
            }
          }

          console.log(concurrentStart);
          console.log(concurrentCols);
          console.log(concurrentMax);
          console.log(concurrentMaxStart);
        }
      }

      return returnData;

    }

    /**
     * Get number of available column in x-axis
     * @return {Integer}
     */
    function getCurrentColumns () {
      let currentWidth = parseInt(window.getComputedStyle(options.container).getPropertyValue('width'));
      currentColumns = 1;
      for (let key in columnQueries) {
        if (currentWidth > parseInt(key)) {
          currentColumns = columnQueries[key];
        }
      }

      availableCols = [
        {
          top: 0,
          cols: new Array(currentColumns)
        }
      ];

      return currentColumns;
    }

    /**
     * Windowresize event
     * @param  {Object} ev
     */
    function windowResize (ev) {
      currentWidth = parseInt(window.getComputedStyle(options.container, null).getPropertyValue('width'));
      getCurrentColumns();
      arrangeItems();
    }

    // We can do better
    window.addEventListener('resize', windowResize, false);
    currentWidth = parseInt(window.getComputedStyle(options.container, null).getPropertyValue('width'));
    getCurrentColumns();
    this.repaint();
  }

  return Masonry;

})();
