$.ajaxSetup({ 
  async: false 
  }); 

$(function() {
	$('#select').on('click', select);
	$('#re').on('click', re);
		$('#delc').on('click', delc);
	
	
})


function insert(){
	window.open("CaiGouDanGuanLi.html");
	
}

function edlit(){
	window.open("CaiGouDanGuanLi.html");
	
}


//刷新
function re(){
	$("#l_dg").form('clear');
}


function select() {
	var tab_name = 'CGCG';
	var cont = ' ';
	$.post("../php/Tab_query.php", {
			'Tab_Name': tab_name,
			'Cont': cont
		},
		function(data) {
//		alert(JSON.stringify(data));
			$('#l_dg').datagrid({
				data: data
			});

		}, "json");

}
function Serch_Ord(rowIndex, rowData) { //查询菜单单据查询刷新模块
		$('#form_1').form('load',rowData);
		//alert(JSON.stringify(rowData));
	var Tab_Name = "CGCG";
	var customd = rowData['CGCG_ID'];
	var Titles = " where CGCG_ID like '" + customd + "%'";

	if(customd) {
		$.post("../php/Form_query.php", {
				'Tab_name': Tab_Name,
				'cont': Titles
			},
			function(data) {
				//alert(JSON.stringify(data));
				$('#form_1').form('load', data);
//				$('#Purchase_Name').find("[value:]")

				$('#Purchase_Name option:first').prop("selected",'selected');
			}, "json");
	}
}

//删除
	function delc() {
//		alert(1);
	var Tab_Name = "CGCG";
	var customd = $("#CGCG_ID").val();
	var Cont = " where CGSG_ID = '" + customd + "'";
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
		alert("删除成功")
}