<?php foreach ($detail as $key): ?>
<?php
$no_rekening=$key['nomor_so'];
$nama=$key['nama_lengkap'];
$alamat=$key['alamat'];
$no_shm=$key['no_shm'];
$no_surat_ukur=$key['nomor_surat_ukur'];
$tgl_sertifikat=$key['tgl_sertifikat'];
$alamat_sertifikat=$key['alamat'];
/// pembetulan
if($key['asli_ajb']==1){ $ajb="Asli"; } else if ($key['asli_ajb']==2) { $ajb="Copy"; } else{$ajb="-";}
if($key['asli_imb']==1){ $imb="Asli"; } else if ($key['asli_imb']==2) { $imb="Copy"; } else{$imb="-";}
if($key['asli_skmht']==1){ $skmht="Asli"; } else if ($key['asli_skmht']==2) { $skmht="Copy"; } else{$skmht="-";}
if($key['asli_sppt']==1){ $sppt="Asli"; } else if ($key['asli_sppt']==2) { $sppt="Copy"; } else{$sppt="-";}
if($key['asli_sht']==1){ $sht="Asli"; } else if ($key['asli_sht']==2) { $sht="Copy"; } else{$sht="-";}
if($key['asli_stts']==1){ $stts="Asli"; } else if ($key['asli_stts']==2) { $stts="Copy"; } else{$stts="-";}
if($key['asli_ssb']==1){ $ssb="Asli"; } else if ($key['asli_ssb']==2) { $ssb="Copy"; } else{$ssb="-";}
if($key['asli_gambar_denah']==1){ $gambar_denah="Asli"; } else if ($key['asli_gambar_denah']==2) { $gambar_denah="Copy"; } else{$gambar_denah="-";}
if($key['asli_surat_roya']==1){ $surat_roya="Asli"; } else if ($key['asli_surat_roya']==2) { $surat_roya="Copy"; } else{$surat_roya="-";}

$kota=$key['nama_kota'];
$tgl=$key['tgl'];
$nomor=$key['nomor_so'];
?>
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
                    <td style="text-align: right;"> <span style="text-decoration: underline;"><strong>NO : <?php echo $nomor;?> </strong></span></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Telah Dipinjamkan oleh BPR Kredit Mandiri Indonesia<?php //echo $nama_kantor;?> , sertifikat :</p>
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
            <p style="font-size: 12px;">Berupa 1 Buah SERTIFIKAT asli dengan rincian sebagai berikut :</p>
            <table border="0" style="width: 100%;
                                     font-size: 12px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                <!-- <tr>
                    <td width="115px">Agunan ID</td>
                    <td width="10px">:</td>
                    <td><?php// echo  $agunan_id; ?></td>
                </tr> -->
                <tr>
                    <td width="115px">No SHM</td>
                    <td width="10px">:</td>
                    <td><?php echo $no_shm; ?></td>
                </tr>
                <tr>
                    <td width="115px">No. Surat Ukur</td>
                    <td width="10px">:</td>
                    <td width><?php echo $no_surat_ukur; ?></td>
                </tr>
                <tr>
                    <td width="115px">Tanggal Sertifikat</td>
                    <td width="10px">:</td>
                    <td><?php echo $tgl_sertifikat; ?></td>
                </tr>
                <!-- <tr>
                    <td width="115px">Luas Tanah (m2)</td>
                    <td width="10px">:</td>
                    <td><?php// echo $luas_tanah; ?></td>
                </tr> -->
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
                    <td><?php echo $ajb;?></td>

                    <td width="50px">IMB</td>
                    <td width="10px">:</td>
                    <td width><?php echo $imb;?></td>  

                    <td width="50px">SKMHT</td>
                    <td width="10px">:</td>
                    <td width><?php echo $skmht; ?></td>  
                </tr>
                <tr>
                    <td width="50px">SPPT</td>
                    <td width="10px">:</td>
                    <td width><?php echo $sppt; ?></td>

                    <td width="50px">SHT</td>
                    <td width="10px">:</td>
                    <td width><?php echo $sht; ?></td>

                    <td width="50px">G.Denah</td>
                    <td width="10px">:</td>
                    <td width><?php echo $gambar_denah; ?></td>  
                </tr>
                <tr>
                    <td width="50px">STTS</td>
                    <td width="10px">:</td>
                    <td width> <?php echo $stts; ?></td>

                    <td width="50px">SSB</td>
                    <td width="10px">:</td>
                    <td width><?php echo $ssb; ?></td>

                    <td width="50px">S. Roya</td>
                    <td width="10px">:</td>
                    <td width><?php echo $surat_roya; ?></td>  
                </tr>
            </table>

            <p style="font-size: 12px;">Pengambilan Sertifikat tidak Saya kuasakan kepada pihak lain dan atau Siapapun.</p>
            <!-- <p style="font-size: 12px;"> <?php// echo $ket;?> </p> -->
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
                    <td width="" >(...........................................)</td>
                </tr>
            </table>
    </body>
</html>
<?php endforeach; ?>



