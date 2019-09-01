$.ajaxSetup({ 
  async: false 
  }); 


$(function() {
	$('#select').on('click', select);
	$('#append').on('click', append);
	
	//右边
	$('#insert').on('click', insert);
	$('#save').on('click', save);
	$('#del').on('click', delete1);
	$('#check').on('click', check);
	$('#update').on('click', updata);
	$('#re').on('click', re);
	
	//窗体
	$('#go').on('click', go);
	$('#delw').on('click', delw);
$('#edit-line').on('click',edit);
	$('#ok-line').on('click',accept1);
	
})




//弹窗
//function append(){
//	$('#window').window('open');
//	
//	var tab_name = 'tb_Item';
//	var cont = ' ';
//	$.post("../php/Tab_query.php", {
//			'Tab_Name': tab_name,
//			'Cont': cont
//		},
//		function(data1) {
//			$('#l_dg1').datagrid({
//				data: data1
//			});
//		}, "json");
//}

function go() {
//	var data = $("#l_dg1").datagrid('getSelections');
//	//alert(JSON.stringify(data));
//	for(var i = 0; i < data.length; i++) {
//		$('#l_dg_1').datagrid('appendRow', data[i]);
//	}
//	$('#window').window('close');
var data=$('#l_dg1').datagrid('getSelections');

//var bill_no=$('#CGSG_ID').val();
 for(var i=0;i<data.length;i++)
 {
//data[i]['CGSG_ID']=bill_no;
  $('#l_dg2').datagrid('appendRow',data[i]);
//alert(JSON.stringify(data));
 }
 $('#window').window('close');
// $('#item_tb').datagrid('appendRow');
}


//选择
function select() {
	var tab_name = 'CGSG';
	var cont = ' ';
	$.post("../php/Tab_query.php", {
			'Tab_Name': tab_name,
			'Cont': cont
		},
		function(data) {
		alert(JSON.stringify(data));
			$('#l_dg').datagrid({
				data: data
			});

		}, "json");

}
function Serch_Ord(rowIndex, rowData) { //查询菜单单据查询刷新模块
		$('#form_1').form('load',rowData);
		//alert(JSON.stringify(rowData));
	var Tab_Name = "CGSG";
	var customd = rowData['CGSG_ID'];
	var Titles = " where CGSG_ID like '" + customd + "%'";

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
		'CGSG_ID': '',
		'CGSG_Name': '',
		'CGSG_Type': '',
		'CGSG_Department': '',
		'CGSG_Apply': '',
		'CGSG_ApplyDay': '',
		'CGSG_ApplyEndDay': '',
		'CGSG_State': '未审核',
		'CGSG_Te': ''
	};
	$('#form_1').form('load', data1);
}
//保存
function save(){
	var data = $('#form_1').serializeArray();
//		alert(JSON.stringify(data));
	var len = data.length;
	var Tab_Name = 'CGSG';
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
	
	
	
	
	
	
	
	
	
	
	
	
//	var data = $('#form_1').serializeArray();
//	
//	var Tab_Name = 'CGSG';
//	var Bill_No = $('#CGSG_ID').val();
//	
////	var Cont = " where CGSG_ID='" + Bill_No + "'";
////	$.post('../php/Form_delete.php', {
////			'Tab_Name': Tab_Name,
////			'Cont': Cont
////		},
////		function(data) {}, "json");
////		//alert(JSON.stringify(data));
//	var ii = data.length;
//	$.post('../php/Form_save.php', {
//			
//			'atr': data,
//			'Tab_name': Tab_Name,
//			'len': ii
//		},
//		function(data) { }, "json");
		
		
		
		//select();		
}


//删除
	function delete1() {
	var Tab_Name = "CGSG";
	var customd = $("#CGSG_ID").val();
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
	
	//审核
	function check() {
				var tab_name='CGSG';
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
			
			 var customd = $("#CGSG_ID").val();
			
			 var cont= "  where CGSG_ID = '"+ customd+"'";
			 
			 $.post("../php/Tab_save.php", {
			  'Tab_Name': tab_name,
			  'Tab_data':dg_data,
			  'Cont':cont
			 }, function(data) {
			 }, "json");
			 select();
	
}
	
	//修改
	function updata()
{
 var tab_name='CGSG';
 var data=$('#form_1').serializeArray();
 var dg_data=[];
 var data_1={};
 for(var i=0;i<data.length;i++)
 {
 data_1[data[i]['name']]=data[i]['value'];
 }
 dg_data.push(data_1);

 var customd = $("#CGSG_ID").val();

 var cont= "  where CGSG_ID = '"+ customd+"'";
// alert(JSON.stringify(data[7]));
 $.post("../php/Tab_save.php", {
  'Tab_Name': tab_name,
  'Tab_data':dg_data,
  'Cont':cont
 }, function(data) {
 }, "json");
 
 
 
 
 
 
// var tab_name1='tb_Detailed_Quotation';
// var data_dg1=$('#ps_dg_dt').datagrid('getRows');
////alert(JSON.stringify(data_dg1));
// $.post("../php/Tab_save.php", {
//'Tab_Name': tab_name1,
//'Tab_data':data_dg1,
//'Cont':cont
// }, function(data) {
// }, "json");
// 
select();
}
//刷新
function re(){
	$("#form_1").form('clear');
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

//删除物料
function delw()
{
	var data=$('#l_dg2').datagrid('getSelections');
	for(var i=0;i<data.length;i++)
	{
		var index=$('#l_dg2').datagrid('getRowIndex',data[i]);
		$('#l_dg2').datagrid('deleteRow',index);
	}

}










//var editorid = 0;
//var editIndex = undefined;
//
//function edit() {
//	editorid = 1;
//	
//}
//
//function accept1() { //订单详细信息表的行编辑结束（确认）
//	if(endEditing()) {
//		$('#l_dg2').datagrid('acceptChanges');
//		editorid = 0;
//	}
//}
//
//function Serch_Ord_a(index, field) {
//	if(editorid == 0) {
//		editIndex = index;
//	
//	} else {
//
//		if(editIndex != index) {
//			if(endEditing()) {
//				$('#l_dg2').datagrid('selectRow', index)
//					.datagrid('beginEdit', index);
//				var ed = $('#l_dg2').datagrid('getEditor', {
//					index: index,
//					field: field
//				});
//				if(ed) {
//					($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
//				}
//				editIndex = index;
//			} else {
//				setTimeout(function() {
//					$('#l_dg2').datagrid('selectRow', editIndex);
//				}, 0);
//			}
//		}
//	}
//}
//
////===============================  全局调用   ================================
//
//function endEditing() {
//	if(editIndex == undefined) {
//		return true
//	}
//	if($('#l_dg2').datagrid('validateRow', editIndex)) {
//		$('#l_dg2').datagrid('endEdit', editIndex);
//		editIndex = undefined;
//		return true;
//	} else {
//		return false;
//	}
//}
//

var editorid = 0;
var editIndex = undefined;

function edit() {
	editorid = 1;

}

function accept1() { //订单详细信息表的行编辑结束（确认）
	if(endEditing()) {
		$('#l_dg2').datagrid('acceptChanges');
		editorid = 0;
		
	}
}

function Serch_Ord_a(index, field) {
	if(editorid == 0) {
		editIndex = index;
	} else {

		if(editIndex != index) {
			if(endEditing()) {
				$('#l_dg2').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
				var ed = $('#l_dg2').datagrid('getEditor', {
					index: index,
					field: field
				});
				if(ed) {
					($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
				}
				editIndex = index;
			} else {
				setTimeout(function() {
					$('#l_dg2').datagrid('selectRow', editIndex);
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
	if($('#l_dg2').datagrid('validateRow', editIndex)) {
		$('#l_dg2').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}






