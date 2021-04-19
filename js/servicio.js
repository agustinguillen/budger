function apiExchange () {
   
    if($('#moneda1').val() !== undefined || $('#moneda2').val() !== undefined){
        
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://currency-exchange.p.rapidapi.com/exchange?from=${$('#moneda1').val()}&to=${$('#moneda2').val()}&q=1.0`,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "dd8c9b746cmsh16c2dbc5f41e74cp1765d2jsnd8b477815ac0",
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
            }
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            let resultado = parseInt($('#input-moneda1').val()) * parseFloat(response);
            console.log(resultado)
            $("#input-moneda2").val(resultado)
        });
    
    }
  }


