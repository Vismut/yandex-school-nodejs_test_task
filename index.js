var MyForm = {
	validate: function(){
		this.isValid = false;
		this.errorFields = '';

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

		return;
	},
}