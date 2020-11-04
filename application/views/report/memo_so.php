<div class="book">
	<div class="page" style="font-size: 10px;">
		<div class="table-responsive">
			<table border="0" style="width: 100%;font-size: 10px;">
				<tr>
					<th colspan="6" align="center" style="background-color: red;color: white;font-size: 12px">
						<center>FORM PENGAJUAN KREDIT CHECKING</center>
					</th>
				</tr>
				<tr>
					<th colspan="6" align="center" style="background-color: black;color: white;font-size: 10px"></th>
				</tr>
				<tbody style="font-size: 8px;">
					<tr>
						<td width="120">Nomor Apl ID</td>
						<td width="2">:</td>
						<td><?php echo $nomor_so ?></td>
					</tr>
					<tr>
						<td width="120">Tanggal</td>
						<td width="2">:</td>
						<td><?php echo $tanggal ?></td>
						<td>Asal Data</td>
						<td width="2">:</td>
						<td><?php echo $asal_data ?></td>
					</tr>
					<tr>
						<td>Sales Officer</td>
						<td width="2">:</td>
						<td><?php echo $nama_so ?></td>
						<td>Marketing 1</td>
						<td width="2">:</td>
						<td><?php echo $nama_marketing ?></td>
					</tr>
					<tr>
						<td>Plafon pengajuan</td>
						<td width="2">:</td>
						<td><?php echo number_format($plafon_pinjaman) ?></td>
						<td>Tenor</td>
						<td width="2">:</td>
						<td><?php echo $tenor ?></td>
					</tr>
					<tr>
						<td>Jenis Pinjaman</td>
						<td width="2">:</td>
						<td><?php echo $jenis_pinjaman ?></td>
						<td>Tujuan pinjaman</td>
						<td width="2">:</td>
						<td><?php echo $tujuan_pinjaman ?></td>
					</tr>
					<tr>
						<th colspan="6" align="left" style="background-color: yellow;font-size: 10px">DATA CALON DEBITUR</th>
					</tr>
					<tr>
						<td>Nama calon debitur (<i>Sesuai KTP</i>)</td>
						<td width="2">:</td>
						<td><?php echo $nama_lengkap ?></td>
						<td>Jenis kelamin</td>
						<td width="2">:</td>
						<td><?php if ($jenis_kelamin == "L") {
								echo "LAKI-LAKI";
							} else {
								echo "PEREMPUAN";
							} ?>
						</td>
					</tr>
					<tr>
						<td>Gelar keagamaan</td>
						<td width="2">:</td>
						<td><?php echo $gelar_keagamaan ?></td>
						<td>Status pernikahan</td>
						<td width="2">:</td>
						<td><?php echo $status_nikah ?></td>
					</tr>
					<tr>
						<td>Gelar pendidikan</td>
						<td width="2">:</td>
						<td><?php echo $gelar_pendidikan ?></td>
						<td>Nama ibu kandung</td>
						<td width="2">:</td>
						<td><?php echo $ibu_kandung ?></td>
					</tr>
					<tr>
						<td>No. KTP</td>
						<td width="2">:</td>
						<td><?php echo $no_ktp ?></td>
						<td>No. Kartu keluarga</td>
						<td width="2">:</td>
						<td><?php echo $no_kk ?></td>
					</tr>
					<tr>
						<td>Nik KTP di KK</td>
						<td width="2">:</td>
						<td><?php echo $no_ktp_kk ?></td>
						<td>No. NPWP</td>
						<td width="2">:</td>
						<td><?php echo $no_npwp ?></td>
					</tr>
					<tr>
						<td>Tempat lahir</td>
						<td width="2">:</td>
						<td><?php echo $tempat_lahir ?></td>
						<td>Agama</td>
						<td width="2">:</td>
						<td><?php echo $agama ?></td>
					</tr>
					<tr>
						<td>Tanggal lahir</td>
						<td width="2">:</td>
						<td><?php echo $tgl_lahir ?></td>
						<td>Pendidikan terakhir</td>
						<td width="2">:</td>
						<td><?php echo $pendidikan_terakhir ?></td>
					</tr>
					<tr>
						<td>Alamat lengkap (<i>Sesuai KTP</i>)</td>
						<td width="2">:</td>
						<td><?php echo $alamat_ktp ?></td>
						<td>Kecamatan</td>
						<td width="2">:</td>
						<td><?php echo $kecamatan_ktp ?></td>
					</tr>
					<tr>
						<td>Provinsi</td>
						<td width="2">:</td>
						<td><?php echo $provinsi_ktp ?></td>
						<td>Kelurahan / Desa</td>
						<td width="2">:</td>
						<td><?php echo $kelurahan_ktp ?></td>
					</tr>
					<tr>
						<td>Kabupaten / Kota</td>
						<td width="2">:</td>
						<td><?php echo $kabupaten_ktp ?></td>
						<td>RT</td>
						<td width="2">:</td>
						<td><?php echo $rt_ktp ?></td>
					</tr>
					<tr>
						<td>RW</td>
						<td width="2">:</td>
						<td><?php echo $rw_ktp ?></td>
						<td>Kode Pos</td>
						<td width="2">:</td>
						<td><?php echo $kode_pos_ktp ?></td>
					</tr>
					<tr>
						<td>Alamat Domisili (<i>Sesuai KTP</i>)</td>
						<td width="2">:</td>
						<td><?php echo $alamat_domisili ?></td>
						<td>Kecamatan</td>
						<td width="2">:</td>
						<td><?php echo $kecamatan_domisili ?></td>
					</tr>
					<tr>
						<td>Provinsi</td>
						<td width="2">:</td>
						<td><?php echo $provinsi_ktp ?></td>
						<td>Kelurahan / Desa</td>
						<td width="2">:</td>
						<td><?php echo $kelurahan_domisili ?></td>
					</tr>
					<tr>
						<td>Kabupaten / Kota</td>
						<td width="2">:</td>
						<td><?php echo $kabupaten_domisili ?></td>
						<td>RT</td>
						<td width="2">:</td>
						<td><?php echo $rt_domisili ?></td>
					</tr>
					<tr>
						<td>RW</td>
						<td width="2">:</td>
						<td><?php echo $rw_domisili ?></td>
						<td>Kode Pos</td>
						<td width="2">:</td>
						<td><?php echo $kode_pos_domisili ?></td>
					</tr>
					<tr>
						<td>Jumlah tanggungan</td>
						<td width="2">:</td>
						<td><?php echo $jumlah_tanggungan ?></td>
						<td>Alamat korespondensi</td>
						<td width="2">:</td>
						<td><?php echo $alamat_domisili ?></td>
					</tr>
					<tr>
						<td>No. Telepon 1</td>
						<td width="2">:</td>
						<td><?php echo $no_hp ?></td>
						<td>No. Telepon 2</td>
						<td width="2">:</td>
						<td><?php echo $no_telp ?></td>
					</tr>
					<tr>
						<th colspan="6" align="left" style="background-color: yellow;font-size: 10px">DATA PASANGAN</th>
					</tr>
					<tr>
						<td>Nama lengkap (Sesuai KTP)</td>
						<td width="2">:</td>
						<td><?php echo $nama_lengkap_pasangan ?></td>
						<td>Jenis kelamin</td>
						<td width="2">:</td>
						<td><?php if ($jenis_kelamin_pasangan == "L") {
								echo "LAKI-LAKI";
							} else {
								echo "PEREMPUAN";
							} ?>
						</td>
					</tr>
					<tr>
						<td>Nama ibu kandung</td>
						<td width="2">:</td>
						<td><?php echo $ibu_kandung_pasangan ?></td>
						<td>No. kartu keluarga</td>
						<td width="2">:</td>
						<td><?php echo $no_kk_pasangan ?></td>
					</tr>
					<tr>
						<td>No KTP</td>
						<td width="2">:</td>
						<td><?php echo $no_ktp_pasangan ?></td>
						<td>No. NPWP</td>
						<td width="2">:</td>
						<td><?php echo $no_npwp_pasangan ?></td>
					</tr>
					<tr>
						<td>Nik KTP di KK</td>
						<td width="2">:</td>
						<td><?php echo $no_ktp_kk_pasangan ?></td>
					</tr>
					<tr>
						<td>Tempat lahir</td>
						<td width="2">:</td>
						<td><?php echo $tempat_lahir_pasangan ?></td>
						<td>Tanggal lahir</td>
						<td width="2">:</td>
						<td><?php echo $tgl_lahir_pasangan ?></td>
					</tr>
					<tr>
						<td>Alamat sesuai KTP</td>
						<td width="2">:</td>
						<td colspan="3"><?php echo $alamat_pasangan ?></td>
					</tr>
					<tr>
						<td>No Telepon pasangan</td>
						<td width="2">:</td>
						<td><?php echo $no_telp_pasangan ?></td>
					</tr>
					<?php

					if ($row !== 0) {

						$i = 1;
						$j = 1;
						foreach ($row->result_array() as $data) {
							$nama_penjamin = $data['nama_ktp'];
							$jenis_kelamin_penjamin = '';

							if ($data['jenis_kelamin'] == "L") {
								$jenis_kelamin_penjamin = "LAKI-LAKI";
							} else {
								$jenis_kelamin_penjamin = "PEREMPUAN";
							};
							$ibu_kandung_penjamin = $data['nama_ibu_kandung'];
							$no_kk_penjamin = "";
							$no_ktp_penjamin = $data['no_ktp'];
							$no_npwp_penjamin = $data['no_npwp'];
							$tempat_lahir_penjamin = $data['tempat_lahir'];
							$tgl_lahir_penjamin = $data['tgl_lahir'];
							$alamat_penjamin = $data['alamat_ktp'];
							$no_telp_penjamin = $data['no_telp'];

							echo    '<tr>
                                 <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">DATA PENJAMIN ' . $i++ . '</th>
                              </tr>
                              <tr>
                                 <td>Nama lengkap (Sesuai KTP)</td>
                                 <td width="2">:</td>
                                 <td>' . $nama_penjamin . '</td>
                                 <td>Jenis kelamin</td>
                                 <td width="2">:</td>
                                 <td>' . $jenis_kelamin_penjamin . '</td>
                              </tr>
                              <tr>
                                 <td>Nama ibu kandung</td>
                                 <td width="2">:</td>
                                 <td>' . $ibu_kandung_penjamin . '</td>
                              </tr>
                              <tr>
                                 <td>No KTP</td>
                                 <td width="2">:</td>
                                 <td>' . $no_ktp_penjamin . '</td>
                                 <td>No. NPWP</td>
                                 <td width="2">:</td>
                                 <td>' . $no_npwp_penjamin . '</td>
                              </tr>
                              <tr>
                                 <td>Tempat lahir</td>
                                 <td width="2">:</td>
                                 <td>' . $tempat_lahir_penjamin . '</td>
                                 <td>Tanggal lahir</td>
                                 <td width="2">:</td>
                                 <td>' . $tgl_lahir_penjamin . '</td>
                              </tr>
                              <tr>
                                 <td>Alamat sesuai KTP</td>
                                 <td width="2">:</td>
                                 <td colspan="3">' . $alamat_penjamin . '</td>
                              </tr>
                              <tr>
                                 <td>No Telepon penjamin ' . $j++ . '</td>
                                 <td width="2">:</td>
                                 <td>' . $no_telp_penjamin . '</td>
                              </tr>';
						}
					}

					?>
				</tbody>
			</table>
			<br>
			<table style="font-size: 10px;">
				<tr>
					<td><b>Dibuat Oleh;</b></td>
				</tr>
				<tr>
					<td><b><?php echo $nama_so ?></b></td>
				</tr>
			</table>
		</div>
	</div>

</div>