<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
//	$Tab_Name = $_POST['Tab_Name'];
//	$Cont = $_POST['Cont'];
//	$Tab_Name = "ORDER_CUSTOMERHEADER";
//	$Cont = "SAA";
//	$arr = array();	
	$Sqicomm = "exec ReCalStk '02/01/2018','02/28/2018',''";
	$rsi = sqlsrv_query($conn,$Sqicomm);
	
//	$rowi = sqlsrv_fetch_array($rsi);
//	$arr['BILL_NO'] = $Cont.$rowi['BILL_NO'];
//	echo json_encode($arr);


?>