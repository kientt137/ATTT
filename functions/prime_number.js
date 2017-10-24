module.exports = {
    check_prime_number: function (n){
        return is_prime_number(n);
    },
    //tim so nguyen to lon hon gan nhat
    find_prime_number_more_than: function (n){
        for(var i = 0; i < n; i++){
            var m = n;
            if(!is_prime_number(m)){
                n++;
                console.log(m);
            }
            else return m;
        } 
    },
    //tim so nguyen to be hon gan nhat
    find_prime_number_less_than: function (n){
        for(var i = n; i >= 0; i--){
            var m = n;
            if(!is_prime_number(m)){
                n--;
            }
            else return m;
        } 
    },
    //phan tich 1 so thanh thua so nguyen to tra ve mot mang
    parser_a_number_to_multiple_of_prime: function(n){
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
    return kq; 
}

}

function is_prime_number(n){
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
    return true;    //kiem tra 1 so co phai snt ko
}