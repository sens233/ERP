<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
//	$cont = $_POST['Cont'];
	
	
	$arr = array();
	$tmp = array();
	$arrM = array();
	
//	$ITEM = $cont;
	$ITEM = "ABC";
	$arrM['lvl']  = 0;
	$arrM['Pm']  = "";
	$arrM['Cm']  = $ITEM;
	$arrM['Mb']  = "M";
	$arrM['Um'] = "Set";
	$arrM['qty']  = 1;	 
	
	$Sqicomm1="GetMulNBom $ITEM,1";
	$Sqicomm0="GetMulNBom $ITEM,0";
	$Sqlcommk="select name from SysColumns where id=Object_Id('IT_BOM')";
	$row0 = sqlsrv_fetch_array(sqlsrv_query($conn,$Sqicomm0));
	$lvl = $row0['mid'];
	for($rws=0;$rws<$lvl;$rws++){
		eval("\$arr".($rws+1)." = array();");
	}
	$rsi1 = sqlsrv_query($conn,$Sqicomm1);
//=============从数据库提取完整数据集==========================	
	$sql02 = "select * from it_bom";
	$rs02 = sqlsrv_query($conn,$sql02);
	while($row = sqlsrv_fetch_array($rs02)){
			$tmp['lvl']  = $row['lvl'];
			$tmp['Pm']  = $row['Pm'];
			$tmp['Cm']  = $row['Cm'];
			$tmp['Mb']  = $row['Mb'];
			$tmp['Um']  = $row['Um'];
			$tmp['qty']  = $row['qty'];	
			array_push($arr, $tmp);
	}
	array_splice($tmp, 0, count($tmp));
//=============从完整数据集抽取层级数据集======================
	for($l=0;$l<$lvl;$l++){
		for($i=0;$i<count($arr);$i++){
			if($arr[$i]['lvl']==($lvl-$l)){
				$tmp['lvl']  = $i+1;//$arr[$i]['lvl'];
				$tmp['Pm']   = $arr[$i]['Pm'];
				$tmp['Cm']   = $arr[$i]['Cm'];
				$tmp['Mb']   = $arr[$i]['Mb'];
				$tmp['Um']   = $arr[$i]['Um'];
				$tmp['qty']  = $arr[$i]['qty'];	
				eval("array_push(\$arr".($lvl-$l).",\$tmp);");
			}
		}
		array_splice($tmp, 0, count($tmp));	
	}
//=============从各层数据集装配子集形成完整树状数据集===========
	for($kk=$lvl-1;$kk>0;$kk--){
		$kl=$kk+1;
		$Com = "
		for(\$j = 0; \$j < count(\$arr".$kk.");\$j++){
			if(\$arr".$kk."[\$j]['Mb']=='M'){
				for(\$t=0;\$t < count(\$arr".$kl.");\$t++){
					if(\$arr".$kl."[\$t]['Pm']==\$arr".$kk."[\$j]['Cm']){
						array_push(\$tmp,\$arr".$kl."[\$t]);
					}
				}
				\$arr".$kk."[\$j]['children']=\$tmp;
				array_splice(\$tmp, 0, count(\$tmp));
			}}";
		eval($Com);
	}
	$arrM['children'] = $arr1;
	array_push($tmp,$arrM);
	echo json_encode($tmp);		
?>

