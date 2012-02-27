String.prototype.format = function(args){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 0);
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

String.prototype.trim= function(){
   return this.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}

Array.prototype.map= function(iterator){
    for(var i=0,len=this.length;i<len;i++){
        this[i] = iterator.call(this,this[i]);
    }
    return this;
}