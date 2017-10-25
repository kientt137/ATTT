module.exports = {
	tao_bang: function(){
		var html = draw_table(characters, numbers);
		return html;
	},

	text_to_number: function(s){
		var str = s.toUpperCase();
		var char_arr = str.split("");
		var num_arr = new Array();
		for (var i = 0; i < char_arr.length; i++){
			for(var j = 0; j < characters.length; j++){
				if(char_arr[i] == characters[j]){
					num_arr[i] = numbers[j];
					break;
				}
			}
		}
		var html = draw_table(char_arr, num_arr);
		return html;
	}

}

const characters = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ');
const numbers = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26);

function draw_table(char, num) {
	var html = "<table class='table table-bordered'><tr>";
	for (var i = 0; i < char.length; i ++){
		html = html + "<td>" + char[i] + "</td>"
	}
	html = html + "</tr><tr>";
	for (var i = 0; i < num.length; i ++){
		html = html + "<td>" + num[i] + "</td>"
	}
	html = html + "</tr><table>";
	return html;
}