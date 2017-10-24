const express = require('express');
const app = express();
const jade = require('pug');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',(req,res) => {
    res.render('index.pug');
})
app.get('/content',(req,res) => {
    res.render('content.pug');
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
	var text = "Ket qua = " + kq[0];
	for (var i = 1; i < kq.length; i++){
		text = text + "*" + kq[i];
	}
	res.send(text);
})

app.post('/modulo_calculate', urlencodedParser, function(req,res){
	var num = req.body.number;
	var pow = req.body.pow;
	var mod = req.body.modulo;
	console.log(req.body);
	var kq = modulo_calculate(num, pow, mod);
	res.send('Ket qua: ' + kq);
})
function check_prime_number(n){
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
    return true;	//kiem tra 1 so co phai snt ko
}

function find_prime_number_more_than(n){
	for(var i = 0; i < n; i++){
		var m = n;
		if(!check_prime_number(m)){
			n++;
			console.log(m);
		}
		else return m;
	} //tim so nguyen to lon hon gan nhat
}

function find_prime_number_less_than(n){
	for(var i = n; i >= 0; i--){
		var m = n;
		if(!check_prime_number(m)){
			n--;
		}
		else return m;
	} //tim so nguyen to be hon gan nhat
}

function parser_a_number_to_multiple_of_prime(n){
	var kq = [];
	var k = 0;
	for(var i = 2; i <= n ; i++){
		if (n%i == 0){
			n = n/i;
			kq[k] = i;
			k++; 
			i--;
		}
	}
	return kq; //phan tich 1 so thanh thua so nguyen to tra ve mot mang
}

function modulo_calculate(num, pow, mod){
	if(num == 0) return 0;
	else if (pow == 0) return 1;
	else if (pow == 1) return num%mod;
	else {
		var kq = modfun(num, pow, mod);
		console.log(kq);
		return kq%mod;
	}
}

function modfun(num, pow, mod){
	var result = 1;
	while (pow > 0){
		if (pow & 1)
		{
			num = num%mod;
			result = (result * num)%mod;
			result = result%mod;
		}
		pow = pow >> 1;
		num = num % mod;
		num = (num*num)%mod;
		num = num%mod;
	}
	return result;
}