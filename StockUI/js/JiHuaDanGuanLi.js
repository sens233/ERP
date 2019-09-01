$.ajaxSetup({ 
  async: false 
  }); 

//单击事件
$(function() {
	//左
	$('#select').on('click', select);
	//右
	$('#insert').on('click', insert);
	$('#save').on('click', save);
	$('#delj').on('click', delj);
	$('#check').on('click', check);
	$('#checkNo').on('click', checkNo);
	$('#re').on('click', re);
	$('#update').on('click', updata1);
	//物料
	$('#append').on('click', append);
	//窗体
		$('#go').on('click', go);
	$('#delw').on('click', delw);
$('#edit-line').on('click',edit);
	$('#ok-line').on('click',accept1);
	

})

//左边
//选择
function select() {
	
	var tab_name = 'CGJH';
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
//查询菜单单据查询刷新模块
function Serch_Ord_1(rowIndex, rowData) { 
		$('#form_1').form('load',rowData);
		//alert(JSON.stringify(rowData));
	var Tab_Name = "CGJH";
	var customd = rowData['CGJH_ID'];
	var Titles = " where CGJH_ID like '" + customd + "%'";

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


//右
//新增
function insert(){
//	reload();
	var data1 = {
		'CGJH_ID': '',
		'CGJH_Name': '',
		'CGJH_Rid': '',
		'CGJH_RP': '',
		'CGJH_RD': '',
		'CGJH_CheckName': '',
		'CGJH_CheckState': '未审核',
		'CGJH_SouceID': '',
		'CGJH_SouceName': '',	
		'CGJH_PlayDay': '',
		'CGJH_JHTe': '',
	};
	$('#form_1').form('load', data1);
}

function save(){
	var data = $('#form_1').serializeArray();
//		alert(JSON.stringify(data));
	var len = data.length;
	var Tab_Name = 'CGJH';
//var data =[{'name':'CGCG_ID','value':'123'}];
//var Tab_Name = 'CGCG';
//var len = data.length;
	$.post('../php/Form_save.php', {
			'atr': data,
			'Tab_name': Tab_Name,
			'len': len
		},
		function(data) {

		}, "json");
	
	}


//删除
	function delj() {
	var Tab_Name = "CGJH";
	var customd = $("#CGJH_ID").val();
	var Cont = " where CGJH_ID = '" + customd + "'";
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
	
//审核
	function check() {
				var tab_name='CGJH';
			 var data=$('#form_1').serializeArray();
			 var dg_data=[];
			 var data_1={};
//			 alert(JSON.stringify(data));
			 data[6]['value']="已审核";
			 for(var i=0;i<data.length;i++)
			 {
			 data_1[data[i]['name']]=data[i]['value'];
			 }
			 dg_data.push(data_1);
			
			 var customd = $("#CGJH_ID").val();
			
			 var cont= "  where CGJH_ID = '"+ customd+"'";
			 
			 $.post("../php/Tab_save.php", {
			  'Tab_Name': tab_name,
			  'Tab_data':dg_data,
			  'Cont':cont
			 }, function(data) {
			 }, "json");
			 select();
	
}
	//退回
	function checkNo() {
				var tab_name='CGJH';
			 var data=$('#form_1').serializeArray();
			 var dg_data=[];
			 var data_1={};
//			 alert(JSON.stringify(data));
			 data[6]['value']="退回不通过";
			 for(var i=0;i<data.length;i++)
			 {
			 data_1[data[i]['name']]=data[i]['value'];
			 }
			 dg_data.push(data_1);
			
			 var customd = $("#CGJH_ID").val();
			
			 var cont= "  where CGJH_ID = '"+ customd+"'";
			 
			 $.post("../php/Tab_save.php", {
			  'Tab_Name': tab_name,
			  'Tab_data':dg_data,
			  'Cont':cont
			 }, function(data) {
			 }, "json");
			 select();
	
}
	
//刷新
function re(){
	$("#form_1").form('clear');
}

	//修改
function  updata1()
{
 var tab_name='CGJH';
 var data=$('#form_1').serializeArray();
 var dg_data=[];
 var data_1={};
 for(var i=0;i<data.length;i++)
 {
 data_1[data[i]['name']]=data[i]['value'];
 }
 dg_data.push(data_1);

 var customd = $("#CGJH_ID").val();
//alert(JSON.stringify(dg_data));
 var cont= "  where CGJH_ID = '"+ customd+"'";
// alert(cont);
 $.post("../php/Tab_save.php", {
  'Tab_Name': tab_name,
  'Tab_data':dg_data,
  'Cont':cont
 }, function(data) {
 }, "json");

select();
}

//新增物料
function append(){
	$('#window').window('open'); 
	var tab_name = 'Wl_WlHz';
	var cont = ' ';
	$.post("../php/Tab_query.php", {
			'Tab_Name': tab_name,
			'Cont': cont
		},
		function(data) {
//		alert(JSON.stringify(data));
			$('#l_dg1').datagrid({
				data: data
			});

		}, "json");
	
}
//窗体
function go() {
//	var data = $("#l_dg1").datagrid('getSelections');

//	for(var i = 0; i < data.length; i++) {
//		$('#l_dg_1').datagrid('appendRow', data[i]);
//	}
//	$('#window').window('close');
var data=$('#l_dg1').datagrid('getSelections');
//alert(JSON.stringify(data));
 for(var i=0;i<data.length;i++)
 {
  $('#l_dg6').datagrid('appendRow',data[i]);
 }
 $('#window').window('close');
}

//删除物料
function delw()
{
	var data=$('#l_dg6').datagrid('getSelections');
	for(var i=0;i<data.length;i++)
	{
		var index=$('#l_dg6').datagrid('getRowIndex',data[i]);
		$('#l_dg6').datagrid('deleteRow',index);
	}

}
var editorid = 0;
var editIndex = undefined;

function edit() {
	editorid = 1;

}

function accept1() { //订单详细信息表的行编辑结束（确认）
	if(endEditing()) {
		$('#l_dg6').datagrid('acceptChanges');
		editorid = 0;
		
	}
}

function Serch_Ord_a(index, field) {
	if(editorid == 0) {
		editIndex = index;
	} else {

		if(editIndex != index) {
			if(endEditing()) {
				$('#l_dg6').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
				var ed = $('#l_dg6').datagrid('getEditor', {
					index: index,
					field: field
				});
				if(ed) {
					($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
				}
				editIndex = index;
			} else {
				setTimeout(function() {
					$('#l_dg6').datagrid('selectRow', editIndex);
				}, 0);
			}
		}
	}
}

//===============================  全局调用   ================================

function endEditing() {
	if(editIndex == undefined) {
		return true
	}
	if($('#l_dg6').datagrid('validateRow', editIndex)) {
		$('#l_dg6').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}






