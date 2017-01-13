const Masonry = (() => {

  // Setup options
  let options = {
    growItems: false,
    disableGrowItemsOneColumn: false,
    itemSelector: '.item',
    mediaQueries: {
      '500': 2,
      '800': 4,
      '1100': 6,
      '1400': 8
    },
    minHeight: 300 // Only when one column
  };

  // Other variables we need
  let mediaQueries = {};
  let colsData = {
    currentXColumns: 1,
    currentYColumns: 1,
    ycols: [{xcols: new Array(1)}]
  }

  /**
   * Helper to sort numbers
   */
  function sortNumber (a, b) {
    return a - b;
  }

  /**
   * Function to sort mediaQueries as they might not be in order
   */
  function sortMediaQueries () {
    let mqKeys = [];

    for (let key in options.mediaQueries) {
      mqKeys.push(key);
    }

    mqKeys.sort(sortNumber);

    for (let i = 0; i < mqKeys.length; i++) {
      let k = mqKeys[i];
      mediaQueries[mqKeys[i]] = options.mediaQueries[mqKeys[i]];
    }
  }

  /**
   * [setAndGetCurrentColumns description]
   */
  function setAndGetCurrentColumns () {
    let currentWidth = parseInt(window.getComputedStyle(options.container).getPropertyValue('width'));
    colsData.currentXColumns = 1;

    for (let key in mediaQueries) {
      if (currentWidth > parseInt(key)) {
        colsData.currentXColumns = mediaQueries[key];
      }
    }

    colsData.ycols = [{xcols: new Array(colsData.currentXColumns)}];

    return colsData.currentXColumns;
  }

  /**
   * [windowResize description]
   */
  function windowResize () {
    let cols = colsData.currentXColumns;
    if (cols !== setAndGetCurrentColumns()) {
      arrangeItems();
    }
  }

  /**
   * [arrangeItems description]
   */
  function arrangeItems () {
    let items = options.container.querySelectorAll(options.itemSelector);
    [].slice.call(items).forEach((item) => {
      // This is easy, lets just print them with a minheight for now
      if (colsData.currentXColumns === 1) {
        item.style.position = 'relative';
        item.style.width = '100%';
        item.style.minHeight = options.minHeight + 'px';
      } else {
        item.style.position = 'absolute';

        let itemPosition = getItemPosition(item.getAttribute('data-cols'));

        item.style.left = ((100 / colsData.currentXColumns) * itemPosition.x) + '%';
        item.style.top = ((100 / colsData.currentYColumns) * itemPosition.y) + '%';
        item.style.width = ((100 / colsData.currentXColumns) * item.getAttribute('data-cols')) + '%';
      }
    });

    options.container.style.height = (colsData.currentYColumns * (parseInt(window.getComputedStyle(options.container).getPropertyValue('width')) / colsData.currentXColumns)) + 'px';
  }


  function checkRow (i) {
    for (n = 0; n < colsData.ycols[i].xcols.length; n++) {
      //if (canItOccupy(i, n))
    }
  }
  function getItemPosition (num) {

  }

  //  Basically the main goal is to check if a given item with size, 1x1, 2x2, 3x3 and so forth
  //  can occupy a space in a dynamic grid.
  //  The grid can span from 1*1 to inf*inf
  //


  /**
   * [getItemPosition description]
   * @param  {[type]} numCols [description]
   * @return {[type]}         [description]
   */
  /*function getItemPosition (numCols) {
    let occupy = [];
    let occupyX = [];
    let occupyY = [];

    let neededY = numCols;
    let neededX = numCols;

    // Loop through the y-axis
    for (let i = 0; i < colsData.ycols.length; i++) {
      // Loop through the x-axis
      for (let n = 0; n < colsData.ycols[i].xcols.length; n++) {
        if (canItOccupy(i, n)) {
          if (neededY == 1 && neededX == 1) {
            colsData.ycols[i].xcols[n] = true;

            occupyX.push(n);
            occupyY.push(i);
            break;
          }
        }
      }

      if ((neededY == occupyY.length) && (neededX == occupyX.length)) {
        return {
          x: (occupyX.length === 1) ? occupyX[0] : occupyX,
          y: (occupyY.length === 1) ? occupyY[0] : occupyY,
        }
      }
    }
  }

  function canItOccupy (y, x) {
    if (typeof colsData.ycols[y] === 'undefined') {
      return true;
    } else if (typeof colsData.ycols[y].xcols[x] === 'undefined') {
      return true;
    } else {
      return false;
    }
  }*/

  const Masonry = function (container, opts) {
    // Extend options
    Object.assign(options, opts)
    options.container = container;

    // Boot things up
    this.init = function () {
      sortMediaQueries();
      setAndGetCurrentColumns();
      arrangeItems();

      window.addEventListener('resize', windowResize, false);
    }
  }

  return Masonry;

})();
