<!DOCTYPE html>
<html>
<head>
	<title>Export Data Ke Excel Dengan PHP - www.malasngoding.com</title>
</head>
<body>
	<style type="text/css">
	body{
		font-family: sans-serif;
	}
	table{
		margin: 20px auto;
		border-collapse: collapse;
	}
	table th,
	table td{
		border: 1px solid #3c3c3c;
		padding: 3px 8px;
 
	}
    .tr:nth-child(even){background-color: #f2f2f2}
	a{
		background: blue;
		color: #fff;
		padding: 8px 10px;
		text-decoration: none;
		border-radius: 2px;
	}
    .tr:nth-child(even){background-color: #f2f2f2}

    .th {
        background-color: #fc1919;
        color: white;
    }
	</style>
 
	<?php
	header("Content-type: application/vnd-ms-excel");
	header('Content-Disposition: attachment; filename=Report_CekSertifikat_'.$sysdate.'.xls');
	?>
 
	<center>
		<h1>Data Report Sertifikat</h1>
	</center>
 
	<table border="1">
		<tr>
			<th>No</th>
			<th>Tanggal Cek Sertifikat</th>
            <th>Nomor SO</th>
            <th>Nama Cabang</th>
            <th>Nama Lengkap</th>
            <th>Plafon</th>
            <th>Status Cek Sertifikat</th>
            <th>Status Approval CAA</th>
		</tr>
        <?php
                            $idx = 1;
                                foreach ($report as $row) :
                                    echo "<tr>";
                                    echo "<td>".$idx."</td>";
                                    echo "<td>".$row['tgl_ukur_sertifikat']."</td>";
                                    echo "<td>".$row['nomor_so']."</td>";     
                                    echo "<td>".$row['nama_cabang']."</td>";
                                    echo "<td>".$row['nama_lengkap']."</td>";
                                    echo "<td>".$row['plafon']."</td>";
                                    echo "<td>".$row['status']."</td>";
                                    echo "<td>".$row['status_caa']."</td>";
                                    echo "</tr>";
                       
                            $idx++;
                            endforeach;
                        ?>
	
	</table>
</body>
</html>
