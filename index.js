var MyForm = {
	validate: function(){
		this.isValid = false;
		this.errorFields = [];

		//три слова
		if(this.getData().fio.match(/(\w+\b)/g).length != 3 ){
			this.errorFields.push('fio');
		}

		/*if(this.getData().fio == null || this.getData().fio.match(/(\w+\b)/g).length != 3){
			this.errorFields.push('fio');
		}*/

		//ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com
		if(this.getData().email.match(/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@(ya\.ru|yandex\.(ru|ua|by|kz|com))$/) == null){
			this.errorFields.push('email');
		}


		//+7(999)999-99-99
		if(this.getData().phone.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/) == null){
			this.errorFields.push('phone');
		}

		var sumPhone = 0;

		for (var i = 0; i < this.getData().phone.length; i++) {
			if(!isNaN(parseInt(this.getData().phone[i]))){
				sumPhone += parseInt(this.getData().phone[i]);
			}
		}

		if(sumPhone >= 30 && this.errorFields.indexOf('phone') == -1){
			this.errorFields.push('phone');
		}

		if(this.errorFields.length > 0){
			this.isValid = false;
		}else{
			this.isValid = true;
		}

		return {'isValid': this.isValid, 'errorFields': this.errorFields};
	},
	getData: function(){
		var form = document.getElementById('myForm');
		this.fields = form.getElementsByTagName('input');

		var arrayFields = new Array();

		for (var i = 0; i < this.fields.length; i++) {
			arrayFields[this.fields[i].name] = this.fields[i].value;
		}

		return arrayFields;
	},
	setData: function(Data){
		document.getElementById('fio').value = Data.fio; 
		document.getElementById('phone').value = Data.phone; 
		document.getElementById('email').value = Data.email; 

		return;
	},
	submit: function(){
		/*console.log(this.validate().isValid);
		console.log(this.validate().errorFields);*/
		this.validate();
		this.setData(this.getData());

		if(this.validate().isValid === false){
			for(prop in this.validate().errorFields){
				document.getElementById(this.validate().errorFields[prop]).style.border = '1px solid red';
			}
		}

		var url = document.getElementById('myForm').action;

		var xmlhttp = new XMLHttpRequest();
	    xmlhttp.open("POST",url,true);
	    xmlhttp.send();
	    xmlhttp.onload = function(data) {
	        var dataArray = JSON.parse(this.responseText);

	        if(dataArray.status == 'success'){
	        	document.getElementById('resultContainer').classList.add('success');
	        	document.getElementById('resultContainer').innerText = 'success';
	        }

	        if(dataArray.status == 'error'){
	        	document.getElementById('resultContainer').classList.add('error');
	        	document.getElementById('resultContainer').innerText = dataArray.reason;
	        }
	       	
	       	if(dataArray.status == 'progress'){
	        	document.getElementById('resultContainer').classList.add('progress');
	        	setTimeout( document.getElementById('myForm').submit() , dataArray.timeout)
	        }
	    }
	    xmlhttp.onerror = function(data) {
	        console.log('Error with status '+this.status);
	    }

		document.getElementById('submitButton').disabled = true;

		return;
	},
}