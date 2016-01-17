$.extend({
    unique : function(array) {
        return $.grep(array,function(el,index){
            return index === $.inArray(el,array);
        });
    }
});
$.extend({
    timeParse : function(timeString) {
        var result = new Date();
        var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
        result.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
        result.setMinutes( parseInt(time[2]) || 0 );
        return result;
    }
});
