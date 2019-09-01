$.ajaxSetup({ 
  async: false 
  }); 


$(function() {
	$('#select').on('click', select);
			$('#del').on('click',del);
		$('#insert').on('click', insert);
		$('#save').on('click', save);	
			$('#updata').on('click', updata);		
				$('#append').on('click', append);
		$('#go').on('click', go);
		$('#edit-line').on('click',edit);
	$('#ok-line').on('click',accept1);
		$('#delw').on('click',delw);
		
		
	

})


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




function select() {
	var tab_name = 'CHBJ';
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

function Serch_Ord_1(rowIndex, rowData) { //查询菜单单据查询刷新模块
		$('#form_1').form('load',rowData);
		//alert(JSON.stringify(rowData));
	var Tab_Name = "CHBJ";
	var customd = rowData['CHBJ_ID'];
	var Titles = " where CHBJ_ID like '" + customd + "%'";

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






function insert(){
//	reload();
	var data1 = {
		
		
		
		'CGBJ_ID': '',
		'CGBJ_TPDay': '',
		'CGBJ_CheckName': '',
		'CGBJ_States': '未审核',
		'CGBJ_XJName': '',
	  'CGBJ_Xjphone': '',	
		'CGBJ_BJCom': '',
		'CGBJ_GHCom': '',
		'CGBJ_Mail': '',
		
		'CGBJ_WType': '',
		'CGBJ_SouceId': '',
		'CGBJ_SouceName': '',

		'CGBJ_GHAddress': '',
		'CGBJ_SHAddress': '',
		
		'CGSG_ApplyEndDay': '',
	};
	$('#form_1').form('load', data1);
}

//删除
	function del() {
	var Tab_Name = "CHBJ";
	var customd = $("#CGBJ_ID").val();
	var Cont = " where CGBJ_ID = '" + customd + "'";
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


//保存
function save(){
	
	var data = $('#form_1').serializeArray();
//		alert(JSON.stringify(data));
	var len = data.length;
//		alert(len);
	var Tab_Name = 'CHBJ';
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
	
	function updata()
{
 var tab_name='CHBJ';
 var data=$('#form_1').serializeArray();
 var dg_data=[];
 var data_1={};
 for(var i=0;i<data.length;i++)
 {
 data_1[data[i]['name']]=data[i]['value'];
 }
 dg_data.push(data_1);

 var customd = $("#CGBJ_ID").val();

 var cont= "  where CGBJ_ID = '"+ customd+"'";
// alert(JSON.stringify(data[7]));
 $.post("../php/Tab_save.php", {
  'Tab_Name': tab_name,
  'Tab_data':dg_data,
  'Cont':cont
 }, function(data) {
 }, "json");
 
select();
}


//删除物料
function delw()
{
	var data=$('#l_dgwl').datagrid('getSelections');
	for(var i=0;i<data.length;i++)
	{
		var index=$('#l_dgwl').datagrid('getRowIndex',data[i]);
		$('#l_dgwl').datagrid('deleteRow',index);
	}

}




function go() {
//	var data = $("#l_dg1").datagrid('getSelections');
//	//alert(JSON.stringify(data));
//	for(var i = 0; i < data.length; i++) {
//		$('#l_dg_1').datagrid('appendRow', data[i]);
//	}
//	$('#window').window('close');
var data=$('#l_dg1').datagrid('getSelections');
	alert(JSON.stringify(data));
//var bill_no=$('#CGSG_ID').val();
 for(var i=0;i<data.length;i++)
 {
//data[i]['CGSG_ID']=bill_no;
  $('#l_dgwl').datagrid('appendRow',data[i]);
//alert(JSON.stringify(data));
 }
 $('#window').window('close');
// $('#item_tb').datagrid('appendRow');
}



var editorid = 0;
var editIndex = undefined;

function edit() {
	editorid = 1;

}

function accept1() { //订单详细信息表的行编辑结束（确认）
	if(endEditing()) {
		$('#l_dgwl').datagrid('acceptChanges');
		editorid = 0;
		
	}
}

function Serch_Ord_wl(index, field) {
	if(editorid == 0) {
		editIndex = index;
	} else {

		if(editIndex != index) {
			if(endEditing()) {
				$('#l_dgwl').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
				var ed = $('#l_dgwl').datagrid('getEditor', {
					index: index,
					field: field
				});
				if(ed) {
					($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
				}
				editIndex = index;
			} else {
				setTimeout(function() {
					$('#l_dgwl').datagrid('selectRow', editIndex);
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
	if($('#l_dgwl').datagrid('validateRow', editIndex)) {
		$('#l_dgwl').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
