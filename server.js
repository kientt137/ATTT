const express = require('express');
const app = express();
const jade = require('pug');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',(req,res) => {
    res.render('index.pug');
})
server = app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running");
        });
app.post('/check_prime_number', urlencodedParser, function(req,res){
	var option = req.body.option;
	var num = req.body.number;
	if (option == 1){
		if(check_prime_number(num)){
			res.send(num + ' là số nguyên tố');
		}
		else
			res.send(num + ' không là số nguyên tố');
	}
	else if (option == 2){
		var kq = find_prime_number_more_than(num);
		res.send(kq + ' là số nguyên tố lớn hơn ' + num + ' gần nhất');
	}
	else{
		var kq = find_prime_number_less_than(num);
		res.send(kq + ' là số nguyên tố nhỏ hơn ' + num + ' gần nhất');
	}
})

app.post('/parser_prime_number', urlencodedParser, function(req,res){
	var num = req.body.number;
	var kq = parser_a_number_to_multiple_of_prime(num);
	res.send(kq + '1');
})

function check_prime_number(n){
// Neu n < 2 thi khong phai la SNT
    if (n < 2){
        return false;
    }       
     
    // Neu n = 2 la SNT
    if (n == 2){
        return true;
    }
     
    // Neu n la so chan thi ko phai la SNT
    if (n % 2 == 0){
        return false;   
    }
     
    // Lap qua cac so le
    for (var i = 3; i < (n - 1); i += 2){
        if (n % i == 0){
            return false;
        }   
    }     
    return true;
}

function find_prime_number_more_than(n){
	for(var i = 0; i < n; i++){
		var m = n;
		if(!check_prime_number(m)){
			n++;
			console.log(m);
		}
		else return m;
	}
}

function find_prime_number_less_than(n){
	for(var i = n; i >= 0; i--){
		var m = n;
		if(!check_prime_number(m)){
			n--;
		}
		else return m;
	}
}

function parser_a_number_to_multiple_of_prime(n){
	var text = 'Ket qua bang = ';
	for(var i = 2; i <= n ; i++){
		if (n%i == 0){
			n = n/i;
			text = text + i + '*';
			i--;
		}
	}
	return text;
}