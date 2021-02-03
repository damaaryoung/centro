<!DOCTYPE html>
<html>
    <body>
           <img src="<?php echo base_url('assets/design/images/headOL.png') ?>" style="width: 500px;
                                                                              margin-left:-4em;
                                                                              margin-top:-3.5em;
                                                                            ">
            <p style="text-align: center; 
                        font-size: 11px; 
                        padding-top: -25px; 
                        padding-left: -31px;"> <?php echo $alamatHeader ?></p>
            <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>PEMINJAMAN SEMENTARA SERTIFIKAT</strong></span></h2>
            <table border="0" style="width: 100%;
                                     font-size: 14px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;" cellspacing="-1">
                <tr>
                    <td style="text-align: left;"><span style="text-decoration: underline;"><strong>NO. REK : <?php echo $no_rekening;?></strong></span></td>
                    <td style="text-align: right;"> <span style="text-decoration: underline;"><strong>NO : <?php echo $nomor;?> </strong></span></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Telah Dipinjamkan oleh BPR Kredit Mandiri Indonesia <?php echo $nama_kantor;?> , kepada :</p>
            <table border="0" style="width: 100%;
                                     font-size: 12px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                <tr>
                    <td width="115">Nama</td>
                    <td width="20px">:</td>
                    <td><?php echo $nama; ?></td>
                </tr>
                <tr>
                    <td width="115">Alamat</td>
                    <td width="20px">:</td>
                    <td width><?php echo $alamat;?></td>
                </tr>
            </table>
            <p style="font-size: 12px;">Berupa 1 Buah <?php echo $jenis_jaminan?> asli dengan rincian sebagai berikut :</p>
            <table border="0" style="width: 100%;
                                     font-size: 12px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                <tr>
                    <td width="115px">Agunan ID</td>
                    <td width="10px">:</td>
                    <td><?php echo  $agunan_id; ?></td>
                </tr>
                <tr>
                    <td width="115px"><?php if($no_shm != null){ echo 'No SHM ';}else if($no_shgb != null){ echo 'No SHGB ';}else{echo 'No AJB ';} ?> </td>
                    <td width="10px">:</td>
                    <td><?php echo $no_shm; ?> <?php echo $no_shgb; ?> <?php echo $no_ajb; ?> <?php echo ' A/N ' . $nama_pemilik_sertifikat?></td>
                </tr>
                <tr>
                    <td width="115px">No. Surat Ukur</td>
                    <td width="10px">:</td>
                    <td width><?php echo $no_surat_ukur; ?></td>
                </tr>
                <tr>
                    <td width="115px">Nama Pemilik</td>
                    <td width="10px">:</td>
                    <td width><?php echo $nama_pemilik_sertifikat; ?></td>
                </tr>
                <tr>
                    <td width="115px">Tanggal Sertifikat</td>
                    <td width="10px">:</td>
                    <td><?php echo $tgl_sertifikat; ?></td>
                </tr>
                <tr>
                    <td width="115px">Luas Tanah (m2)</td>
                    <td width="10px">:</td>
                    <td><?php echo $luas_tanah; ?></td>
                </tr>
                <tr>
                    <td width="115px">Alamat</td>
                    <td width="10px">:</td>
                    <td><?php echo $alamat_sertifikat; ?></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Dengan Kelengkapan :</p>
            <table border="0" style="width: 100%;
                                     font-size: 12px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                <tr>
                    <td width="50px">AJB</td>
                    <td width="10px">:</td>
                    <td><?php if($ajb == 'Ada'){echo $ajb.', '.$asli_ajb . ' ' . $no_ajb;}else{echo $ajb;}?></td>

                    <td width="50px">IMB</td>
                    <td width="10px">:</td>
                    <td><?php if($imb == 'Ada'){echo $imb.', '.$asli_imb . ' ' . $no_imb;}else{echo $imb;}?></td>

                    <td width="50px">SKMHT</td>
                    <td width="10px">:</td>
                    <td><?php if($skmht == 'Ada'){echo $skmht.', '.$asli_skmht;}else{echo $skmht;}?></td>
                </tr>
                <tr>
                    <td width="50px">SPPT</td>
                    <td width="10px">:</td>
                    <td><?php if($sppt == 'Ada'){echo $sppt.', '.$asli_sppt  . ' ' .$no_sppt;}else{echo $sppt;}?></td> 

                    <td width="50px">SHT</td>
                    <td width="10px">:</td>
                    <td><?php if($sht == 'Ada'){echo $sht.', '.$asli_sht . ' ' . $no_sht;}else{echo $sht;}?></td>

                    <td width="50px">G.Denah</td>
                    <td width="10px">:</td>
                    <td><?php if($gambar_denah == 'Ada'){echo $gambar_denah.', '.$asli_gambar_denah;}else{echo $gambar_denah;}?></td>
                </tr>
                <tr>
                    <td width="50px">STTS</td>
                    <td width="10px">:</td>
                    <td><?php if($stts == 'Ada'){echo $stts.', '.$asli_stts;}else{echo $stts;}?></td>

                    <td width="50px">SSB</td>
                    <td width="10px">:</td>
                    <td><?php if($ssb == 'Ada'){echo $ssb.', '.$asli_ssb;}else{echo $ssb;}?></td>

                    <td width="50px">S. Roya</td>
                    <td width="10px">:</td> 
                    <td><?php if($surat_roya == 'Ada'){echo $surat_roya.', '.$asli_surat_roya;}else{echo $surat_roya;}?></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Jenis Pengurusan : <?php echo $jenis_pengurusan;?> dan akan dikembalikan pada tanggal <?php echo $tgl_rencana_kembali;?></p>
            <p style="font-size: 12px;"><?php echo $ket;?></p>
            <br><br><br><br>
            <p style="text-align: right; font-size: 11px; "><?php echo $kota.', ' . $tgl;?></p>
            <table border="0" style="width: 100%;
                                     font-size: 11px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     text-align: center;" cellspacing="-1">
                <tr>
                    <td width="" >Diserahkan Oleh,</td>
                    <td width="" >Diperiksa Oleh,</td>
                    <td width="" >Diterima Oleh,</td>
                </tr>
                <br><br><br><br><br><br><br>
                <tr>
                    <td width="" >(...........................................)</td>
                    <td width="" >(...........................................)</td>
                    <td width="" >( <?php echo $nama; ?> )</td>
                </tr>
            </table>
    </body>
</html>




