<!DOCTYPE html>
	<html>
	<head>

	</head>
		<body>
		<table border="2" style="width: 100%; 
										font-size: 11px; 
										vertical-align:top; 
										table-layout:fixed; 
										word-break:break-all;
										border-collapse: collapse;">
							<thead>
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
							</thead>
							<tbody>
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
							</tbody>
				</table>
				<style>
					table, td, th {
					border: 1px solid black;
					}

					table {
					width: 100%;
					border-collapse: collapse;
					}
					.tr:nth-child(even){background-color: #f2f2f2}

					.th {
						background-color: #fc1919;
						color: white;
					}
			</style> 	
			
		</body>
		

	<?php
		header("Content-type: application/vnd-ms-excel");
		header('Content-Disposition: attachment; filename=Report_CekSertifikat_'.$sysdate.'.xlsx');
	?>

	</html>
