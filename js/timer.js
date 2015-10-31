function timer() {

    this.time = 0;
    var self = this;

    this.updateTime = function(){
    	self.time++;
    };

    this.getFormattedTime = function(){
    	var minutes = Math.floor(self.time / 60);
		var seconds = Math.ceil(self.time % 60);
		if(minutes < 10)
			minutes = '0' + minutes;
		if(seconds < 10)
			seconds = '0' + seconds;
		return minutes + ':' + seconds;
    };

}