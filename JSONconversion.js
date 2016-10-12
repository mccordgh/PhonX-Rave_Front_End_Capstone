JSON.stringify(fadeTimingEvents[0].notes
  .map(function(item,i,array) {
    var newItem = []
    if (i !== 0)
    {
      newItem.push((item[0] - array[i-1][0]).toFixed(0));
    }
    else {
      newItem.push(item[0]);
    }

    newItem.push(item[1]);

    return newItem;
}));