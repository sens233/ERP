<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
	$atr = $_POST['atr'];
	$Tab_Name = $_POST['Tab_name'];
	$ii  = $_POST['len'];
	

	
	$a="insert into ".$Tab_Name."(";
	$Val=" values(";
	$SqlVar = "";
	$SqlValue = "";	
	$b=",";
	$c="',";
	for($i=0;$i<$ii;$i++){
		$name  = $atr[$i]['name'];		//数组下标
		$value = iconv('UTF-8','GBK',(string) $atr[$i]['value']); 	//数组内容
		
		$a .= $name.$b;
		$Val .= "'".$value.$c;
	}
	$SqlVar = substr($a,0,strlen($a)-1).")";
	$SqlValue = substr($Val,0,strlen($Val)-1).")";
	$Sqlcomm = $SqlVar . $SqlValue;
//	echo $Sqlcomm;	
	sqlsrv_query($conn,$Sqlcomm);
//	echo "OK";

?>