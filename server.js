const express = require('express');
const app = express();
const jade = require('pug');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/',(req,res) => {
    res.render('index.pug');
})
app.get('/rsa',(req,res) => {
    res.render('rsa.pug');
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

app.post('/tim_nghich_dao_modulo', urlencodedParser, function(req,res){
	var n = req.body.n;
	var a = req.body.a;
	console.log(req.body);
	res.send(tim_nghich_dao_modulo(n,a));
});

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

function tim_nghich_dao_modulo(n,a){
	var A1 = 1, A2 = 0, A3 = n;
	var B1 = 0, B2 = 1, B3 = a;
	var T1 = 0, T2 = 0, T3 = 0;
	var Q = 0;
	var html = "<table class='table table-bordered'><tr><td>Q</td><td>A1</td><td>A2</td><td>A3</td><td>B1</td><td>B2</td><td>B3</td><td>T1</td><td>T2</td><td>T3</td></tr>";
	html = html + "<tr><td>" + Q + "</td><td>" + A1 + "</td><td>" + A2 + "</td><td>" + A3+ "</td><td>" + B1 + "</td><td>" + B2 + "</td><td>" + B3 + "</td><td>" + T1 + "</td><td>" + T2 + "</td><td>" + T3 + "</td></tr>";
	while (B3 != 10){
		if (B3 == 0) return A3 + ", khong ton tai.";
		else if (B3 == 1) break;
		else {
			Q = Math.floor(A3/B3);
			T1 = A1 - Q*B1;
			T2 = A2 - Q*B2;
			T3 = A3 - Q*B3;
			A1 = B1;
			A2 = B2;
			A3 = B3;
			B1 = T1;
			B2 = T2;
			B3 = T3;
			html = html + "<tr><td>" + Q + "</td><td>" + A1 + "</td><td>" + A2 + "</td><td>" + A3+ "</td><td>" + B1 + "</td><td>" + B2 + "</td><td>" + B3 + "</td><td>" + T1 + "</td><td>" + T2 + "</td><td>" + T3 + "</td></tr>";
		}
	}
	html = html + "</table>";
	return html;
}