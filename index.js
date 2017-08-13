var MyForm = {
	validate: function(){
		this.isValid = false;
		this.errorFields = [];

		if(this.getData().fio == ''){
			this.errorFields.push('fio');
		}

		if(this.getData().phone == ''){
			this.errorFields.push('phone');
		}


		if(this.getData().email == ''){
			this.errorFields.push('email');
		}

		if(this.errorFields.length > 0){
			this.isValid = false;
		}else{
			this.isValid = true;
		}

		console.log(this.isValid);
		console.log(this.errorFields);

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


		return;
	},
}