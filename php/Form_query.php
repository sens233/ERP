<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
	$Tab_Name = $_POST['Tab_name'];
	$cont = $_POST['cont'];
//	$Tab_Name = "ORDER_IINV";
//	$cont = " where product_no like '121%'";
	
	$Tab_Name = "Qry_".	$Tab_Name;
	$Sqicomm = "select * from ".$Tab_Name.$cont;
	$rsi = sqlsrv_query($conn,$Sqicomm);	
	$Sqicomm="Select Name FROM SysColumns Where id=Object_Id('".$Tab_Name."')";

	$arr = array();
	$result = array();
	$i = 0;
	$j = 0;

	while($rowi = sqlsrv_fetch_array($rsi)){
		$rsj = sqlsrv_query($conn,$Sqicomm);	
		while($rowj = sqlsrv_fetch_array($rsj)){
		$arr[$rowj['Name']] = iconv('GBK', 'UTF-8', $rowi[$rowj['Name']]);	
//		$arr[$rowj['Name']] = $rowi[$rowj['Name']];
		}
	}
	echo json_encode($arr);
	
?>
