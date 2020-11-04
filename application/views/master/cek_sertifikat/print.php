<?php foreach ($detail as $key): ?>
<?php
$no_rekening=$key['nomor_so'];
$nama=$key['nama_lengkap'];
$alamat=$key['alamat'];
$no_shm=$key['no_shm'];
$no_surat_ukur=$key['nomor_surat_ukur'];
$tgl_sertifikat=$key['tgl_sertifikat'];
$alamat_sertifikat=$key['alamat'];
($key['asli_ajb']==1) ? $ajb="Asli" :($key['asli_ajb']==2) ? $ajb="Copy" : $ajb="-" ;
($key['asli_imb']==1) ? $imb="Asli" :($key['asli_imb']==2) ? $imb="Copy" : $imb="-" ;
($key['asli_skmht']==1) ? $skmht="Asli" :($key['asli_skmht']==2) ? $skmht="Copy" : $skmht="-" ;
($key['asli_sppt']==1) ? $sppt="Asli" :($key['asli_sppt']==2) ? $sppt="Copy" : $sppt="-" ;
($key['asli_sht']==1) ? $sht="Asli" :($key['asli_sht']==2) ? $sht="Copy" : $sht="-" ;
($key['asli_stts']==1) ? $stts="Asli" :($key['asli_stts']==2) ? $stts="Copy" : $stts="-" ;
($key['asli_ssb']==1) ? $ssb="Asli" :($key['asli_ssb']==2) ? $ssb="Copy" : $ssb="-" ;
($key['gambar_denah']=='Y') ? $gambar_denah="Ya" :($key['gambar_denah']=='N') ? $gambar_denah="Tidak" : $gambar_denah="-" ;
($key['surat_roya']=='Y') ? $surat_roya="Ya" :($key['surat_roya']=='N') ? $surat_roya="Tidak" : $surat_roya="-" ;
$kota=$key['nama_kota'];
$tgl=$key['tgl'];
$nomor=$key['nomor_so'];
?>
<!DOCTYPE html>
 <html>
     <body>
            <img src="<?php echo base_url('assets/dist/img/headOL.png') ?>" style="width: 500px;
                                                                               margin-left:-4em;
                                                                               margin-top:-3.5em;
                                                                             ">
             <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>BUKTI PENERIMAAN SERTIFIKAT</strong></span></h2>
             <table border="0" style="width: 100%;
                                      font-size: 14px;
                                      vertical-align:top;
                                      table-layout:fixed;
                                      word-break:break-all;" cellspacing="-1">
                 <tr>
                       <td style="text-align: right;"> <span style="text-decoration: underline;"><strong>NO : <?php echo $nomor;?> </strong></span></td>
                 </tr>
             </table>

             <p style="font-size: 12px;">Telah Terima Dari :</p>
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
             <p style="font-size: 12px;">Berupa 1 Buah sertifikat asli dengan rincian sebagai berikut :</p>
             <table border="0" style="width: 100%;
                                      font-size: 12px;
                                      vertical-align:top;
                                      table-layout:fixed;
                                      word-break:break-all;
                                      padding-left: 20px;" cellspacing="-1">
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
                 <tr>
                     <td width="115px">Alamat</td>
                     <td width="10px">:</td>
                     <td><?php echo $alamat_sertifikat; ?></td>
                 </tr>
                 <tr>
                     <td width="115px">Agunan ID</td>
                     <td width="10px">:</td>
                     <td><?php echo $no_rekening; ?></td>
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
             <br><br><br><br>
             <p style="text-align: right; font-size: 11px; "><?php echo $kota.', ' . $tgl;?></p>
             <table border="0" style="width: 100%;
                                      font-size: 11px;
                                      vertical-align:top;
                                      table-layout:fixed;
                                      word-break:break-all;
                                      text-align: center;" cellspacing="-1">
                 <tr>
                     <td width="" >Diterima Oleh,</td>
                     <td width="" >Diserahkan Oleh,</td>
                     <td width="" >Diperiksa Oleh,</td>
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
