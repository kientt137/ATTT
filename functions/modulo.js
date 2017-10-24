module.exports = {
	//tinh ket qua phep tinh num^pow MOD mod
	modulo_power_calculate: function(num, pow, mod){
		if(num == 0) return 0;
		else if (pow == 0) return 1;
		else if (pow == 1) return num%mod;
		else {
			var kq = modfun(num, pow, mod);
			console.log(kq);
			return kq%mod;
		}
	},

	//tim b de a*b MOD n = 1
	tim_nghich_dao_modulo: function(n,a){
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
	},
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