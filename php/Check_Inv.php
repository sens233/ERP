<?php

	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
	$Tab_Name = $_POST['Tab_Name'];
	$Cont = $_POST['Cont'];
//	echo $Tab_Name;
//	$Sqlcomm = $Cont;
//	echo $Sqlcomm;	

//	$Tab_Name = 'Qry_'.$Tab_Name;
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