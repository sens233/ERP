<?php
//	此模块为自动识别查询模块只需给出表名及查询条件作为传递参数
//	表名前面+ Qry_为查询视图名，这样可以在视图中选定该查询界面
//	对应的字段以避免多余字段的传输。
//	$Tab_Name = "MJM_product_agentype";
//	$Cont = " where agency_no like '%'";

	header("Content-type: text/html; charset=utf-8");
//连接数据库，数据库服务器地址用户名密码；
	include 'connmjm.php';

//Tab_Name和cont是页面
	$Tab_Name = $_POST['Tab_Name'];
	$Cont = $_POST['Cont'];
//	$Tab_Name = "CGSG";
//	$Cont = " ";
	$Tab_Name = 'Qry_'.$Tab_Name;
	$Sqicomm="Select * FROM ".$Tab_Name.$Cont;
	$rsi = sqlsrv_query($conn,$Sqicomm);


	
	$Sqicomm="Select Name FROM SysColumns Where id=Object_Id('".$Tab_Name."')";
	
	$arr = array();
	$result = array();
	$i = 0;
	$j = 0;


	while($rowi = sqlsrv_fetch_array($rsi)){
		$rsj = sqlsrv_query($conn,$Sqicomm);	
		while($rowj = sqlsrv_fetch_array($rsj)){
//		echo $rowj['Name']."--";
//		echo $rowi[$rowj['Name']]."</br>";
		$arr[$rowj['Name']]  = iconv('GBK', 'UTF-8', $rowi[$rowj['Name']]);
		}
		array_push($result, $arr);			
	}
		echo json_encode($result);

?>