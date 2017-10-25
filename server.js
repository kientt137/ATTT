const express = require('express');
const app = express();
const jade = require('pug');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var prime_number = require('./functions/prime_number');
var modulo = require('./functions/modulo');
var text_number = require('./functions/text_number');
app.use(express.static('public'));
app.get('/',(req,res) => {
    res.render('index.pug');
})
app.get('/rsa',(req,res) => {
    res.render('rsa.pug');
})
app.get('/content',(req,res) => {
    res.render('content.pug');
})
app.get('/ma_hoa_co_dien',(req,res) => {
    res.render('ma_hoa_co_dien.pug');
})

app.get('/show_table_number_text', (req,res) => {
	res.send(text_number.tao_bang());
})
app.get('/love', (req,res) => {
	res.render('index3.pug');
})
app.post('/convert_text_to_number', urlencodedParser, (req,res) => {
	var vanban = req.body.vanban;
	console.log(vanban);
	res.send(text_number.text_to_number(vanban));
})
server = app.listen(process.env.PORT || 5000, () => {
            console.log("Server is running");
        });
app.post('/check_prime_number', urlencodedParser, function(req,res){
	var option = req.body.option;
	var num = req.body.number;
	if (option == 1){
		if(prime_number.check_prime_number(num)){
			res.send(num + ' là số nguyên tố');
		}
		else
			res.send(num + ' không là số nguyên tố');
	}
	else if (option == 2){
		var kq = prime_number.find_prime_number_more_than(num);
		res.send(kq + ' là số nguyên tố lớn hơn ' + num + ' gần nhất');
	}
	else{
		var kq = prime_number.find_prime_number_less_than(num);
		res.send(kq + ' là số nguyên tố nhỏ hơn ' + num + ' gần nhất');
	}
})

app.post('/parser_prime_number', urlencodedParser, function(req,res){
	var num = req.body.number;
	var kq = prime_number.parser_a_number_to_multiple_of_prime(num);
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
	res.send(modulo.tim_nghich_dao_modulo(n,a));
});

app.post('/modulo_power_calculate', urlencodedParser, function(req,res){
	var num = req.body.number;
	var pow = req.body.pow;
	var mod = req.body.modulo;
	console.log(req.body);
	var kq = modulo.modulo_power_calculate(num, pow, mod);
	res.send('Ket qua: ' + kq);
})

