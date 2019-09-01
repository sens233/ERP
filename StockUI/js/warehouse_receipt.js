$(function() {
	$('#select').on('click', select);
	$('#insert').on('click', insert);
	$('#del').on('click', del);
	$('#update').on('click', update);
	$('#save').on('click', save);
	$('#submit').on('click', submit);
	$('#check').on('click', check);

})

function insert() {

}
//删除
function del() {
	var Tab_Name = "tb_PurchaseH";
	var customd = $("#Purchase_No").val();
	var Cont = " where Purchase_No like '" + customd + "%'";
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

//修改
function update() {
	
	
}



function submit() {}

function check() {}

function select() {
	var tab_name = 'tb_PurchaseH';
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
	//		$.post("../php/Tab_query.php", {
	//				'Tab_Name': Tab_Name2,
	//				'Cont': Titles
	//			},
	//			function(data1) {
	//				$('#dg11').datagrid({
	//					data: data1
	//				});
	//			}, "json");
}

function save() {
	var data = $('#form_1').serializeArray();
	//	alert(JSON.stringify(data));
	var ii = data.length;
	var Tab_Name1 = 'tb_PurchaseH';
	$.post('../php/Form_save.php', {
			'atr': data,
			'Tab_name': Tab_Name1,
			'len': ii
		},
		function(data) {

		}, "json");
	//		alert(JSON.stringify(data));
}

function Serch_Ord_1(rowIndex, rowData) { //查询菜单单据查询刷新模块
	var Tab_Name = "tb_PurchaseH";
	var customd = rowData['Purchase_No'];
	var Titles = " where Purchase_No like '" + customd + "%'";

	if(customd) {
		//================================================产品主要信息查询========
		$.post("../php/Form_query.php", {
				'Tab_name': Tab_Name,
				'cont': Titles
			},
			function(data) {
//				alert(JSON.stringify(data));
				$('#form_1').form('load', data);
//				$('#Purchase_Name').find("[value:]")
//				alert(data['Purchase_Name']);
				$('#Purchase_Name option:first').prop("selected",'selected');
			}, "json");
	}
}