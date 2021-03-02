<html>
<img src="<?php echo base_url('assets/dist/img/headOL.png') ?>" style="
   width: 500px;
   margin-left:-4em;
   margin-top:-3.5em;
">
<div class="book">
    <div class="page" style="font-size: 10px;">
        <div class="table-responsive">
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top; text-align:center" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <b>
                            <h3>Form Pengajuan LPDK</h3>
                        </b>
                    </td>
                </tr>
            </table>
            <br>
            <table width="100%" style="font-size:13">
                <tr>
                    <td width="170">Kantor Cabang</td>
                    <td width="20">:</td>
                    <td><?php echo $cabang ?></td>
                </tr>
                <tr>
                    <td>Nama SO</td>
                    <td>:</td>
                    <td><?php echo $nama_so ?></td>
                </tr>
                <tr>
                    <td>Asal Data</td>
                    <td>:</td>
                    <td><?php echo $asal_data ?></td>
                </tr>
                <tr>
                    <td>Nama Marketing</td>
                    <td>:</td>
                    <td><?php echo $nama_marketing ?></td>
                </tr>
            </table>
            <h2>Data Cadeb</h2>
            <table width="100%" style="font-size:13">
                <tr>
                    <td width="170">Nama Debeitur</td>
                    <td width="20px">:</td>
                    <td><?php echo $nama_debitur ?></td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>:</td>
                    <td><?php echo $status_nikah ?></td>
                </tr>
                <tr>
                    <td>Nama Pasangan</td>
                    <td>:</td>
                    <td><?php echo $nama_pasangan ?></td>
                </tr>
                <tr>
                    <td>Nama Produk Kredit</td>
                    <td>:</td>
                    <td><?php echo $produk ?></td>
                </tr>
                <tr>
                    <td>Alamat KTP Sama Dengan Penjamin</td>
                    <td>:</td>
                    <td><?php echo $alamat_ktp_vs_jaminan ?></td>
                </tr>
            </table>
            <h2>Data Penjamin</h2>
            <table width="100%" style="font-size:13">
                <?php
                $i = 1;
                foreach ($row->result_array() as $data) {
                    $no = $i++;
                    $nama_penjamin = $data['nama_ktp'];
                    $nama_pasangan = $data['pasangan_penjamin'];

                    echo  '<tr>
                                <th colspan="6" align="left">Penjamin ' . $no . ' </th>
				   			</tr>
                           <tr>
                              <td width="170">Nama</td>
                              <td width="20">:</td>
                              <td>' . $nama_penjamin . '</td>
                           </tr>
                           <tr>
                              <td width="170">Nama Pasangan</td>
                              <td width="20">:</td>
                              <td>' . $nama_pasangan . '</td>
                           </tr>';
                }
                ?>
            </table>
            <h2>Struktur Pembiayaan</h2>
            <table width="100%" style="font-size:13">
                <tr>
                    <td width="170">Plafon</td>
                    <td width="20">:</td>
                    <td>Rp. <?php echo number_format($plafon) ?></td>
                </tr>
                <tr>
                    <td>Tenor</td>
                    <td>:</td>
                    <td><?php echo $tenor ?></td>
                </tr>
            </table>
            <h2>Kronologis</h2>
            <table>
                <?php
                $j = 1;
                foreach ($agunan_tanah->result_array() as $data) {
                    $no = $j++;
                    $jenis_sertifikat = $data['jenis_sertifikat'];
                    $tgl_expired_shgb = $data['tgl_berlaku_shgb'];
                    $no_sertifikat = $data['no_sertifikat'];
                    $nama_sertifikat = $data['nama_pemilik_sertifikat'];
                    $status_sertifikat1 = $data['status_sertifikat'];
                    $nama_pas_sertifikat = $data['nama_pas_sertifikat'];
                    $status_pas_sertifikat = $data['status_pas_sertifikat'];
                    $hub_cadeb = $data['hub_cadeb'];


                    echo '  <tr>
                                <th colspan="6" align="left">Kronologis ' . $no . ' </th>
                            </tr>
                    
                            <tr>
                                <td width="200">Jaminan</td>
                                <td width="20">:</td>
                                <td width="380">' . $jenis_sertifikat . '</td>
                                <td width="100">Tgl Expired</td>
                                <td width="10">:</td>
                                <td >' . $tgl_expired_shgb . '</td>
                            </tr>
                            <tr>
                                <td>No Sertifikat</td>
                                <td>:</td>
                                <td>' . $no_sertifikat . '</td>
                            </tr>
                            <tr>
                                <td>Nama Sertifikat</td>
                                <td>:</td>
                                <td>' . $nama_sertifikat . '</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><input type="radio" checked="checked">' . $status_sertifikat1 . '</td>
                            </tr>
                            <tr>
                                <td>Nama Pasangan Sertifikat</td>
                                <td width="20">:</td>
                                <td>' . $nama_pas_sertifikat . '</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><input type="radio" checked="checked" >' . $status_sertifikat2 . '</td>
                            </tr>
                            <tr>
                                <td>Hubungan Cadeb</td>
                                <td>:</td>
                                <td>' . $hub_cadeb . '</td>
                            </tr>';
                }
                ?>
                <tr>
                    <td>Akta Notaris</td>
                    <td>:</td>
                    <td>
                        <?php
                        $akta  = "$akta_notaris";
                        $akta_explode = explode(",", $akta);
                        foreach ($akta_explode as $res) :
                            echo "<input type='checkbox' id='akta_notaris' name='akta_notaris' checked='checked'> <small>$res</small>";
                        endforeach
                        ?>
                    </td>
                </tr>
            </table>
            <table width="100%" style="font-size:13">
                <tr>
                    <td colspan="12">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $area ?>, <?php echo $created_at ?></td>
                </tr>
                <tr>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;Dibuat Oleh:</td>
                </tr>
                <tr>
                    <td colspan="12">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="12">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="12">&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><u><?php echo $request_by ?></u></b></td>
                </tr>
                <tr>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Admin)</>
                </tr>
            </table>
        </div>
    </div>
</div>

</html>