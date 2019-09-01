<?php
	header("Content-type: text/html; charset=utf-8");
	include 'connmjm.php';
	
	$Tab_Name = $_POST['Tab_Name'];
	$Tab_data = $_POST['Tab_data'];
	$Cont = iconv('UTF-8','GBK',$_POST['Cont']);

	$ii=count($Tab_data);
	$SqlVar = "";
	$SqlValue = "";	
	$QTab_Name = 'Qry_'.$Tab_Name;
	$QSqicomm="Select Name FROM SysColumns Where id=Object_Id('".$QTab_Name."')";
	
	$Sqicomm = "delete from ".$Tab_Name.$Cont;
	$rs = sqlsrv_query($conn,$Sqicomm);

//=================================================== make Sql Command =======
	$rsj = sqlsrv_query($conn,$QSqicomm);	
	for($i=0;$i<$ii;$i++){
		$rsj = sqlsrv_query($conn,$QSqicomm);	
		while($rowj = sqlsrv_fetch_array($rsj)){
			$SqlVar .= $rowj['Name'].","; 			
			$SqlValue .= "'".iconv('UTF-8','GBK',  $Tab_data[$i][$rowj['Name']])."',";
		
		}
		$SqlVar = substr($SqlVar,0,strlen($SqlVar)-1);	
		$Sqicomm = "insert into ".$Tab_Name."(".$SqlVar.")";
		$SqlValue = "values(".substr($SqlValue,0,strlen($SqlValue)-1).")";
		
		$Sqlstrings = $Sqicomm.$SqlValue;
//		echo $Sqlstrings;
		sqlsrv_query($conn,$Sqlstrings);
		$SqlVar = "";
		$SqlValue = "";
	}
//===========================================================================	
	
	
	
?>