var Utils = {
    // [0, cap)
    randomInt: function(cap) {
        return Math.floor(Math.random() * cap);
    },

    shuffle: function (arr) {
        var i, j;
        var box;
        for (i = arr.length - 1; i > 0; i--) {
            j = this.randomInt(i + 1);
            box = arr[i];
            arr[i] = arr[j];
            arr[j] = box;
        }
        return arr;
    },

    remove: function(arr, e) {
        var index = arr.indexOf(e);
        if (index >= 0) {
          arr.splice(index, 1);
        }
    },

    random: function(arr) {
        return arr[this.randomInt(arr.length)];
    },

    randomExcept: function(arr, except) {
        var element;
        do {
            element = this.random(arr);
        } while (except.indexOf(element) >- 1);
        return element;
    }
}