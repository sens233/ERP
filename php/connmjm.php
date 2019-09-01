<?php

header("Content-type: text/html; charset=UTF-8");

$serverName = "172.16.116.55"; //数据库服务器地址
//$serverName = "www.captain-mjm.com";
$uid = "sa1"; //数据库用户名
$pwd = "11599"; //数据库密码
$connectionInfo = array("UID"=>$uid, "PWD"=>$pwd, "Database"=>"CAIGOU");
$conn = sqlsrv_connect($serverName, $connectionInfo);
//if($conn){
//		echo  "1";
//	}
//	else{
//		echo  "0";
//	}

?>
