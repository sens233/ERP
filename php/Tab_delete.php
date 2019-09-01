<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
	$Tab_Name = $_POST['Tab_Name'];
	$Cont = $_POST['Cont'];	
	
	$Sqicomm = "delete from ".$Tab_Name.$Cont;
//	echo $Sqicomm;
	sqlsrv_query($conn,$Sqicomm);
//	echo "OK!";
	
?>