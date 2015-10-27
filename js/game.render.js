function render () {
	texts.timer.setText(getFormattedTime());
}

function getFormattedTime(){
	var minutes = Math.floor(timer.time / 60);
	var seconds = Math.ceil(timer.time % 60);
	if(minutes < 10)
		minutes = '0' + minutes;
	if(seconds < 10)
		seconds = '0' + seconds;
	return minutes + ':' + seconds;
}