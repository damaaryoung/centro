
<div class="book">
    <div class="page" style="font-size: 10px;">
   		<div class="table-responsive">
   			<table border="0" style="width: 100%;font-size: 10px; vertical-align: top">
   				<tr>
   					<th colspan="6" align="center" style="background-color: red;color: white;font-size: 12px"><center>MEMORANDUM ACCOUNT OFFICER</center></th>
   				</tr>
   				<tr>
   					<th colspan="6" align="center" style="background-color: black;color: white;font-size: 10px"></th>
   				</tr>
   				<tbody style="font-size: 8px;">
   					<tr>
   						<td width="120">Nomor Account Officer</td>
   						<td width="2">:</td>
   						<td><?php echo $nomor_ao ?></td>
   					</tr>
   					<tr>
   						<td width="120">Tanggal</td>
   						<td width="2">:</td>
   						<td width="200"><?php echo $tanggal ?></td>
   						<td width="120">Asal Data</td>
   						<td width="2">:</td>
   						<td><?php echo $asal_data ?></td>
   					</tr>
   					<tr>
   						<td>Account Officer</td>
   						<td width="2">:</td>
   						<td><?php echo $nama_ao ?></td>
   						<td>Marketing 1</td>
   						<td width="2">:</td>
   						<td><?php echo $nama_marketing ?></td>
   					</tr>
   					<tr>
   						<td>Plafon pengajuan</td>
   						<td width="2">:</td>
   						<td><?php echo number_format($plafon_kredit) ?></td>
   						<td>Tenor</td>
   						<td width="2">:</td>
   						<td><?php echo $jangka_waktu ?></td>
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
   						<td><?php if($jenis_kelamin == "L"){
                           echo "LAKI-LAKI";
                        }else{
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
                     <td>Tinggi badan</td>
                     <td>:</td>
                     <td><?php echo $tinggi_badan ."cm" ?></td>
                     <td>Berat badan</td>
                     <td>:</td>
                     <td><?php echo $berat_badan ."kg" ?></td>
                  </tr>
                  <?php
                     $anak = explode(",", $nama_anak);
                     $lahir_anak = explode(",", $tgl_lahir_anak);
                     $no_anak = 1;
                     $no_tgl = 1;
                     for ($i=0; $i < count($anak) ; $i++) { 
                        echo '<tr>
                                 <td>Nama anak '.$no_anak++.' </td>
                                 <td>:</td>
                                 <td>'.$anak[$i].'</td>
                                 <td>Tanggal lahir anak '.$no_tgl++.' </td>
                                 <td>:</td>
                                 <td>'.$lahir_anak[$i].'</td>
                              </tr>';
                     }

                  ?>
                  <tr>
                     <td>Pekerjaan</td>
                     <td>:</td>
                     <td><?php echo $pekerjaan ?></td>
                     <td>Nama Perusahaan / Usaha</td>
                     <td>:</td>
                     <td><?php echo $nama_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>Posisi</td>
                     <td>:</td>
                     <td><?php echo $posisi_pekerjaan ?></td>
                     <td>Jenis Pekerjaan / Usaha</td>
                     <td>:</td>
                     <td><?php echo $jenis_pekerjaan ?></td>
                  </tr>
                  <tr>
                     <td>Alamat lengkap usaha / kantor</td>
                     <td>:</td>
                     <td colspan="3"><?php echo $alamat_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>Provinsi</td>
                     <td>:</td>
                     <td><?php echo $provinsi_tempat_kerja ?></td>
                     <td>Kabupaten / Kota</td>
                     <td>:</td>
                     <td><?php echo $kabupaten_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>Kecamatan</td>
                     <td>:</td>
                     <td><?php echo $kecamatan_tempat_kerja ?></td>
                     <td>Desa / Kelurahan</td>
                     <td>:</td>
                     <td><?php echo $kelurahan_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>RT</td>
                     <td>:</td>
                     <td><?php echo $rt_tempat_kerja ?></td>
                     <td>RW</td>
                     <td>:</td>
                     <td><?php echo $rw_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>Masa kerja / Lama usaha</td>
                     <td>:</td>
                     <td><?php echo $tgl_mulai_kerja ?></td>
                     <td>Telp kantor / usaha</td>
                     <td>:</td>
                     <td><?php echo $no_telp_tempat_kerja ?></td>
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
   						<td><?php if($jenis_kelamin_pasangan == "L"){
                           echo "LAKI-LAKI";
                        }else{
                           echo "PEREMPUAN";
                        } ?></td>
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
                  <tr>
                     <td>Pekerjaan</td>
                     <td>:</td>
                     <td><?php echo $pekerjaan ?></td>
                     <td>Nama Perusahaan / Usaha</td>
                     <td>:</td>
                     <td><?php echo $nama_tempat_kerja ?></td>
                  </tr>
                  <tr>
                     <td>Posisi</td>
                     <td>:</td>
                     <td><?php echo $posisi_pekerjaan_pasangan ?></td>
                     <td>Jenis Pekerjaan / Usaha</td>
                     <td>:</td>
                     <td><?php echo $jenis_pekerjaan_pasangan ?></td>
                  </tr>
                  <tr>
                     <td>Alamat lengkap usaha / kantor</td>
                     <td>:</td>
                     <td colspan="3"><?php echo $alamat_tempat_kerja_pasangan ?></td>
                  </tr>
                  <tr>
                     <td>Provinsi</td>
                     <td>:</td>
                     <td><?php echo $provinsi_tempat_kerja_pasangan ?></td>
                     <td>Kabupaten / Kota</td>
                     <td>:</td>
                     <td><?php echo $kabupaten_tempat_kerja_pasangan ?></td>
                  </tr>
                  <tr>
                     <td>Kecamatan</td>
                     <td>:</td>
                     <td><?php echo $kecamatan_tempat_kerja_pasangan ?></td>
                     <td>Desa / Kelurahan</td>
                     <td>:</td>
                     <td><?php echo $kelurahan_tempat_kerja_pasangan ?></td>
                  </tr>
                  <tr>
                     <td>RT</td>
                     <td>:</td>
                     <td><?php echo $rt_tempat_kerja_pasangan ?></td>
                     <td>RW</td>
                     <td>:</td>
                     <td><?php echo $rw_tempat_kerja_pasangan ?></td>
                  </tr>
                  <tr>
                     <td>Masa kerja / Lama usaha</td>
                     <td>:</td>
                     <td><?php echo $tgl_mulai_kerja_pasangan ?></td>
                     <td>Telp kantor / usaha</td>
                     <td>:</td>
                     <td><?php echo $no_telp_tempat_kerja_pasangan ?></td>
                  </tr>
   					<?php
   						$i = 1;
   						foreach ($row->result_array() as $data ) {
                        $no = $i++;

   							$nama_penjamin = $data['nama_ktp'];
                        $jenis_kelamin_penjamin = '';

	   						if($data['jenis_kelamin'] == "L"){
                           $jenis_kelamin_penjamin = "LAKI-LAKI";
                        }else{
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
                        $jenis_penjamin = $data['hubungan_debitur'];
                        $pekerjaan_penjamin = $data['pekerjaan'];
                        $nama_tempat_kerja_penjamin = $data['nama_tempat_kerja'];
                        $posisi_pekerjaan_penjamin = $data['posisi_pekerjaan'];
                        $jenis_pekerjaan_penjamin = $data['jenis_pekerjaan'];
                        $alamat_tempat_kerja_penjamin = $data['alamat_tempat_kerja'];
                        $provinsi_tempat_kerja_penjamin = $data['provinsi_tempat_kerja_penjamin'];
                        $kabupaten_tempat_kerja_penjamin = $data['kabupaten_tempat_kerja_penjamin'];
                        $kecamatan_tempat_kerja_penjamin = $data['kecamatan_tempat_kerja_penjamin'];
                        $kelurahan_tempat_kerja_penjamin = $data['kelurahan_tempat_kerja_penjamin'];
                        $rt_tempat_kerja_penjamin = $data['rt_tempat_kerja'];
                        $rw_tempat_kerja_penjamin = $data['rw_tempat_kerja'];
                        $tgl_mulai_kerja_penjamin = $data['tgl_mulai_kerja'];
                        $no_telp_tempat_kerja_penjamin = $data['no_telp_tempat_kerja'];

	   					echo  '<tr>
				   					<th colspan="6" align="left" style="background-color: yellow;font-size: 10px">DATA PENJAMIN '.$no.'</th>
				   				</tr>
				   				<tr>
			   						<td>Nama lengkap (Sesuai KTP)</td>
			   						<td width="2">:</td>
			   						<td>'.$nama_penjamin.'</td>
			   						<td>Jenis kelamin</td>
			   						<td width="2">:</td>
			   						<td>'.$jenis_kelamin_penjamin.'</td>
			   					</tr>
			   					<tr>
			   						<td>Nama ibu kandung</td>
			   						<td width="2">:</td>
			   						<td>'.$ibu_kandung_penjamin.'</td>
			   						<td></td>
			   					</tr>
			   					<tr>
			   						<td>No KTP</td>
			   						<td width="2">:</td>
			   						<td>'.$no_ktp_penjamin.'</td>
			   						<td>No. NPWP</td>
			   						<td width="2">:</td>
			   						<td>'.$no_npwp_penjamin.'</td>
			   					</tr>

			   					<tr>
			   						<td>Tempat lahir</td>
			   						<td width="2">:</td>
			   						<td>'.$tempat_lahir_penjamin.'</td>
			   						<td>Tanggal lahir</td>
			   						<td width="2">:</td>
			   						<td>'.$tgl_lahir_penjamin.'</td>
			   					</tr>
			   					<tr>
			   						<td>Alamat sesuai KTP</td>
			   						<td width="2">:</td>
			   						<td colspan="3">'.$alamat_penjamin.'</td>
			   					</tr>
			   					<tr>
			   						<td>No Telepon penjamin '.$no.'</td>
			   						<td width="2">:</td>
			   						<td>'.$no_telp_penjamin.'</td>
                              <td>Jenis penjamin </td>
                              <td width="2">:</td>
                              <td>'.$jenis_penjamin.'</td>
			   					</tr>
                           <tr>
                              <td>Pekerjaan</td>
                              <td width="2">:</td>
                              <td>'.$pekerjaan_penjamin.'</td>
                              <td>Nama perusahaan / usaha </td>
                              <td width="2">:</td>
                              <td>'.$nama_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Posisi</td>
                              <td width="2">:</td>
                              <td>'.$posisi_pekerjaan_penjamin.'</td>
                              <td>Jenis Usaha </td>
                              <td width="2">:</td>
                              <td>'.$jenis_pekerjaan_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Alamat lengkap usaha / kantor</td>
                              <td width="2">:</td>
                              <td colspan ="3">'.$alamat_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Provinsi</td>
                              <td width="2">:</td>
                              <td>'.$provinsi_tempat_kerja_penjamin.'</td>
                              <td>Kabupaten / kota </td>
                              <td width="2">:</td>
                              <td>'.$kabupaten_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Kecamatan</td>
                              <td width="2">:</td>
                              <td>'.$kecamatan_tempat_kerja_penjamin.'</td>
                              <td>Desa / kelurahan / kota </td>
                              <td width="2">:</td>
                              <td>'.$kelurahan_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Provinsi</td>
                              <td width="2">:</td>
                              <td>'.$provinsi_tempat_kerja_penjamin.'</td>
                              <td>Kabupaten / kota </td>
                              <td width="2">:</td>
                              <td>'.$kabupaten_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>RT</td>
                              <td width="2">:</td>
                              <td>'.$rt_tempat_kerja_penjamin.'</td>
                              <td>RW </td>
                              <td width="2">:</td>
                              <td>'.$rt_tempat_kerja_penjamin.'</td>
                           </tr>
                           <tr>
                              <td>Masa kerja / lama usaha</td>
                              <td width="2">:</td>
                              <td>'.$tgl_mulai_kerja_penjamin.'</td>
                              <td>Telp Kantor / usaha</td>
                              <td width="2">:</td>
                              <td>'.$no_telp_tempat_kerja_penjamin.'</td>
                           </tr>';
   						}
   					?>

                  <tr>
                     <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">VERIFIKASI</th>
                  </tr>
                  <tr>
                     <td>Verifikasi KTP Debitur</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_ktp_debt ?></td>
                     <td>Verifikasi IMB</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_imb_debt ?></td>
                  </tr>
                  <tr>
                     <td>Verifikasi KTP Pasangan</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_ktp_pasangan ?></td>
                     <td>Verifikasi Slip gaji /SKP/ Pembukuan usaha</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_pembukuan_usaha_debt ?></td>
                  </tr>
                  <tr>
                     <td>Verifikasi KK</td>
                     <td width="2">:</td>
                     <td><?php  echo $ver_kk_debt ?></td>
                     <td>Verifikasi Surat Ket.kerja / usaha</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_sku_debt ?></td>
                  </tr>
                  <tr>
                     <td>Verifikasi Surat akta nikah</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_akta_nikah_pasangan ?></td>
                     <td>Verifikasi Rek. Tabungan</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_rek_tabungan_debt ?></td>
                  </tr>
                  <tr>
                     <td>Verifikasi SPPT PBB</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_sttp_pbb_debt ?></td>
                     <td>Verifikasi Data pejamin</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_data_penjamin ?></td>
                  </tr>
                  <tr>
                     <td>Verifikasi Sertifikat</td>
                     <td width="2">:</td>
                     <td><?php echo $ver_sertifikat_debt ?></td>
                     <td>Catatan & Analisa Sederhana</td>
                     <td width="2">:</td>
                     <td><?php echo $keterangan_verifikasi ?></td>
                  </tr>
                  <tr>
                     <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">VALIDASI</th>
                  </tr>
                  <tr>
                     <td>Validasi Calon Debitur</td>
                     <td width="2">:</td>
                     <td><?php echo $val_data_debt ?></td>
                     <td>Validasi Agunan</td>
                     <td width="2">:</td>
                     <td><?php echo $val_agunan ?></td>
                  </tr>
                  <tr>
                     <td>Validasi Pasangan</td>
                     <td width="2">:</td>
                     <td><?php echo $val_data_pasangan ?></td>
                     <td>Validasi Pekerjaan / Usaha</td>
                     <td width="2">:</td>
                     <td><?php echo $val_pekerjaan_debt ?></td>
                  </tr>
                  <tr>
                     <td>Validasi Penjamin</td>
                     <td width="2">:</td>
                     <td><?php echo $val_data_penjamin ?></td>
                     <td>Validasi Cek Lingkungan</td>
                     <td width="2">:</td>
                     <td><?php  echo $val_lingkungan_debt?></td>
                  </tr>
                  <tr>
                     <td>Validasi Domisili</td>
                     <td width="2">:</td>
                     <td><?php echo $val_domisili_debt ?></td>
                     <td>Catatan & Analisa senderhana</td>
                     <td width="2">:</td>
                     <td><?php echo $keterangan_validasi ?></td>
                  </tr>
                   <?php
                     $j = 1;
                     foreach ($agunan_tanah->result_array() as $data ) {
                        $no = $j++;
                        $id_agunan_tanah = $data['id'];
                        $tipe_lokasi = $data['tipe_lokasi'];
                        $alamat_agunan_tanah = $data['alamat'];
                        $rt_agunan_tanah = $data['rt'];
                        $rw_agunan_tanah = $data['rw'];
                        $luas_tanah = $data['luas_tanah'];
                        $luas_bangunan = $data['luas_bangunan'];
                        $nama_pemilik_sertifikat = $data['nama_pemilik_sertifikat'];
                        $jenis_sertifikat = $data['jenis_sertifikat'];
                        $no_sertifikat = $data['no_sertifikat'];
                        $tgl_ukur_sertifikat = $data['tgl_ukur_sertifikat'];
                        $tgl_berlaku_shgb = $data['tgl_berlaku_shgb'];
                        $no_imb = $data['no_imb'];
                        $njop =  number_format($data['njop']);
                        $nop = $data['nop'];
                        $provinsi_agunan_tanah = $data['provinsi_agunan_tanah'];
                        $kabupaten_agunan_tanah = $data['kabupaten_agunan_tanah'];
                        $kecamatan_agunan_tanah = $data['kecamatan_agunan_tanah'];
                        $kelurahan_agunan_tanah = $data['kelurahan_agunan_tanah'];
                        $kode_pos_agunan_tanah = $data['kode_pos_agunan_tanah'];

                        echo '<tr>
                                 <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">DATA AGUNAN '.$no.' </th>
                              </tr>
                              <tr>
                                 <td>Lokasi agunan</td>
                                 <td width="2">:</td>
                                 <td>'.$tipe_lokasi.'</td>
                                 <td>Luas tanah</td>
                                 <td width="2">:</td>
                                 <td>'.$luas_tanah.'</td>
                              </tr>
                              <tr>
                                 <td>Alamat agunan</td>
                                 <td width="2">:</td>
                                 <td>'.$alamat_agunan_tanah.'</td>
                                 <td>Luas bangunan</td>
                                 <td width="2">:</td>
                                 <td>'.$luas_bangunan.'</td>
                              </tr>
                              <tr>
                                 <td>Provinsi</td>
                                 <td width="2">:</td>
                                 <td>'.$provinsi_agunan_tanah.'</td>
                                 <td>Nama pemilik sertifikat</td>
                                 <td width="2">:</td>
                                 <td>'.$nama_pemilik_sertifikat.'</td>
                              </tr>
                              <tr>
                                 <td>Kabupaten / kota</td>
                                 <td width="2">:</td>
                                 <td>'.$kabupaten_agunan_tanah.'</td>
                                 <td>Jenis sertifikat</td>
                                 <td width="2">:</td>
                                 <td>'.$jenis_sertifikat.'</td>
                              </tr>
                              <tr>
                                 <td>Kecamatan</td>
                                 <td width="2">:</td>
                                 <td>'.$kecamatan_agunan_tanah.'</td>
                                 <td>Nomor sertifikat</td>
                                 <td width="2">:</td>
                                 <td>'.$no_sertifikat.'</td>
                              </tr>
                              <tr>
                                 <td>Kelurahan / desa</td>
                                 <td width="2">:</td>
                                 <td>'.$kelurahan_agunan_tanah.'</td>
                                 <td>Tanggal & No ukur</td>
                                 <td width="2">:</td>
                                 <td>'.$tgl_ukur_sertifikat.'</td>
                              </tr>
                              <tr>
                                 <td>RT</td>
                                 <td width="2">:</td>
                                 <td>'.$rt_agunan_tanah.'</td>
                                 <td>Masa berlaku SHGB</td>
                                 <td width="2">:</td>
                                 <td>'.$tgl_berlaku_shgb.'</td>
                              </tr>
                              <tr>
                                 <td>RW</td>
                                 <td width="2">:</td>
                                 <td>'.$rw_agunan_tanah.'</td>
                                 <td>Nomor IMB (jika ada)</td>
                                 <td width="2">:</td>
                                 <td>'.$no_imb.'</td>
                              </tr>
                              <tr>
                                 <td>Kode pos</td>
                                 <td width="2">:</td>
                                 <td>'.$kode_pos_agunan_tanah.'</td>
                                 <td>NJOP</td>
                                 <td width="2">:</td>
                                 <td>'.$njop.'</td>
                                 <?php echo number_format($plafon_kredit) 

                              </tr>
                              <tr>
                                 <td>NOP</td>
                                 <td width="2">:</td>
                                 <td>'.$nop.'</td>
                              </tr>';

                        $query ="SELECT * from periksa_agunan_tanah WHERE id_agunan_tanah ='$id_agunan_tanah' ";
                        $x = $this->db->query($query);
                        $k = 1;
                        foreach ($x->result_array() as $key) {
                           $nomor = $k++;
                           $nama_penghuni = $key['nama_penghuni'];
                           $status_penghuni = $key['status_penghuni'];
                           $bentuk_bangunan = $key['bentuk_bangunan'];
                           $kondisi_bangunan = $key['kondisi_bangunan'];
                           $fasilitas = $key['fasilitas'];
                           $listrik = $key['listrik'];
                           $nilai_taksasi_agunan = $key['nilai_taksasi_agunan'];
                           $nilai_taksasi_bangunan = $key['nilai_taksasi_bangunan'];
                           $tgl_taksasi = $key['tgl_taksasi'];
                           $nilai_likuidasi = $key['nilai_likuidasi'];

                           echo '<tr>
                                    <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">PEMERIKSAAN AGUNAN SERTIFIKAT '.$nomor.'</th>
                                 </tr>
                                 <tr>
                                    <td>Nama penghuni</td>
                                    <td width="2">:</td>
                                    <td>'.$nama_penghuni.'</td>
                                    <td>Listrik</td>
                                    <td width="2">:</td>
                                    <td>'.$listrik.'</td>
                                 </tr>
                                 <tr>
                                    <td>Status penghuni</td>
                                    <td width="2">:</td>
                                    <td>'.$status_penghuni.'</td>
                                    <td>Nilai transaksi bangunan</td>
                                    <td width="2">:</td>
                                    <td>'.$nilai_taksasi_bangunan.'</td>
                                 </tr>
                                 <tr>
                                    <td>Agunan berupa</td>
                                    <td width="2">:</td>
                                    <td></td>
                                    <td>Nilai taksaksi agunan</td>
                                    <td width="2">:</td>
                                    <td>'.$nilai_taksasi_agunan.'</td>
                                 </tr>
                                 <tr>
                                    <td>Bentuk agunan</td>
                                    <td width="2">:</td>
                                    <td>'.$bentuk_bangunan.'</td>
                                    <td>Tanggal taksasi</td>
                                    <td width="2">:</td>
                                    <td>'.$tgl_taksasi.'</td>
                                 </tr>
                                 <tr>
                                    <td>Kondisi bangunan</td>
                                    <td width="2">:</td>
                                    <td>'.$kondisi_bangunan.'</td>
                                    <td>Nilai likuidasi</td>
                                    <td width="2">:</td>
                                    <td>'.$nilai_likuidasi.'</td>
                                 </tr>
                                 <tr>
                                    <td>Fasilitas</td>
                                    <td width="2">:</td>
                                    <td>'.$fasilitas.'</td>
                                 </tr>';
                        }


                     }
                  ?>
               
                  
                  <tr>
                     <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">KAPASITAS</th>
                  </tr>
                  <tr>
                     <td>Pemasukan calon debitur</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($pemasukan_cadebt) ?></td>
                     <td>Rumah tangga</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_rumah_tangga) ?></td>
                  </tr>
                  <tr>
                     <td>Pemasukan pasangan</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($pemasukan_pasangan) ?></td>
                     <td>Transport</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_transport) ?></td>
                  </tr>
                  <tr>
                     <td>Pemasukan penjamin</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($pemasukan_penjamin) ?></td>
                     <td>Pendidikan</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_pendidikan) ?></td>
                  </tr>
                  <tr>
                     <td>Total Pemasukan</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($total_pemasukan) ?></td>
                     <td>Telp,Listrik dan Air</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_telp_list_air) ?></td>
                  </tr>
                  <tr>
                     <td></td>
                     <td width="2"></td>
                     <td></td>
                     <td>Lain - lain</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_lain) ?></td>
                  </tr>
                  <tr>
                     <td>Penghasil bersih</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($penghasilan_bersih) ?></td>
                     <td>Lainnya</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($biaya_lain) ?></td>
                  </tr>
                  <tr>
                     <td></td>
                     <td width="2"></td>
                     <td></td>
                     <td>Total pengeluaran</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($total_pengeluaran) ?></td>
                  </tr>
                  <tr>
                     <th colspan="6" align="left" style="background-color: yellow;font-size: 10px">REKOMENDASI AO</th>
                  </tr>
                  <tr>
                     <td>Tujuan pinjaman</td>
                     <td width="2">:</td>
                     <td><?php echo $tujuan_pinjaman ?></td>
                     <td>Suku bunga</td>
                     <td width="2">:</td>
                     <td><?php echo $suku_bunga ?></td>
                  </tr>
                  <tr>
                     <td>Jenis pinjaman</td>
                     <td width="2">:</td>
                     <td><?php echo $jenis_pinjaman ?></td>
                     <td>Pby Bunga / bulan</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($pembayaran_bunga) ?></td>
                  </tr>
                  <tr>
                     <td>Produk</td>
                     <td width="2">:</td>
                     <td><?php echo $produk ?></td>
                     <td>Akad kredit</td>
                     <td width="2">:</td>
                     <td><?php echo $akad_kredit ?></td>
                  </tr>
                  <tr>
                     <td>Plafon kredit</td>
                     <td width="2">:</td>
                     <td><?php echo number_format($plafon_kredit_ao) ?></td>
                     <td>Ikatan agunan</td>
                     <td width="2">:</td>
                     <td><?php echo $ikatan_agunan ?></td>
                  </tr>
                  <tr>
                     <td>Jangka waktu</td>
                     <td width="2">:</td>
                     <td><?php echo $jangka_waktu ?></td>
                     <td>Analisa AO</td>
                     <td width="2">:</td>
                     <td><?php echo $analisa_ao ?></td>
                  </tr>
   				</tbody>
   			</table>
   			<br>
   			<table style="font-size: 10px;">
   				<tr>
   					<td><b>Dibuat Oleh;</b></td>
   				</tr>
   				<tr>
   					<td><b><?php echo $nama_marketing ?></b></td>
   				</tr>
   			</table>
   		</div>
    </div>

</div>
