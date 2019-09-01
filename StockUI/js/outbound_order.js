$(function() {
	$('#select').on('click', select);
	$('#del').on('click', del);
	$('#save').on('click', save);
})

function select() {
	var tab_name = 'tb_OnventoryH';
	var cont = '';
	$.post("../php/Tab_query.php", {
			'Tab_Name': tab_name,
			'Cont': cont
		},
		function(data) {
			//				alert(JSON.stringify(data));
			$('#l_dg').datagrid({
				data: data
			});

		}, "json");

}
function del() {

	var Tab_Name = "tb_OnventoryH";
	var customd = $("#Bill_No").val();
	var Cont = " where Bill_No like '" + customd + "%'";
	if(customd == "") {
		return;
	}
	$.post('../php/Form_dele.php', {
			'Tab_Name': Tab_Name,
			'Cont': Cont
		},
		function(data) {
			$('#msg').html(data);
		}, "json");
}

function save(){
	
	var data = $('#form_1').serializeArray();
	//	alert(JSON.stringify(data));
	var len = data.length;
	var Tab_Name = 'tb_OnventoryH';
	$.post('../php/Form_save.php', {
			'atr': data,
			'Tab_name': Tab_Name,
			'len': len
		},
		function(data) {

		}, "json");
}



function Serch_Ord_1(rowIndex, rowData){
	
	var Tab_Name = "tb_OnventoryH";
	var customd = rowData['Bill_No'];
	var Titles = " where Bill_No like '" + customd + "%'";

	if(customd) {
		//================================================产品主要信息查询========
		$.post("../php/Form_query.php", {
				'Tab_name': Tab_Name,
				'cont': Titles
			},
			function(data) {
				
				
				$('#form_1').form('load', data);
				
			}, "json");
	}
}
