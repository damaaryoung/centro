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
            <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>BUKTI PENYERAHAN SERTIFIKAT</strong></span></h2>
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

            <p style="font-size: 10px;">Telah Dipinjamkan oleh BPR Kredit Mandiri Indonesia<?php echo $nama_kantor;?> , kepada :</p>
            <table border="0" style="width: 100%;
                                     font-size: 10px; 
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

            <p style="font-size: 10px;">Berupa 1 Buah <?php echo $jenis_jaminan?> asli dengan rincian sebagai berikut :</p>
            <table border="0" style="width: 100%;
                                     font-size: 10px; 
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

            <p style="font-size: 10px;">Dengan Kelengkapan :</p>
            <table border="0" style="width: 100%;
                                     font-size: 10px; 
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

            <p style="font-size: 10px;">Jenis Pengurusan : <?php echo $jenis_pengurusan;?> dan akan dikembalikan pada tanggal <?php echo $tgl_rencana_kembali;?></p>
            <p style="font-size: 10px;"><?php $ket;?></p>
            
            <p style="text-align: right; font-size: 10px; "><?php echo $kota.', ' . $sysdate;?></p>
            <table style="width: 100%;
                                     font-size: 10px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     text-align: center;
                                     border: 0px solid black;
                                     border-collapse: collapse;" cellspacing="-1">
                <tr>
                    <td width="" >Diserahkan Oleh,</td>
                    <td width="" >Diperiksa Oleh,</td>
                    <td width="" >Disetujui Oleh,</td>
                    <td width="" >Diterima Oleh,</td>
                </tr>
                <br><br><br><br><br><br><br>
                <tr>
                    <td width="" >(...........................................)</td>
                    <td width="" >(...........................................)</td>
                    <td width="" >(...........................................)</td>
                    <td width="" >( <?php echo $nama; ?>  )</td>
                </tr>
            </table>
           
            <br>
            <div style="border: 1px solid black; border-collapse: collapse;">
                <table style="width: 80%;
                                        font-size: 10px; 
                                        vertical-align:top; 
                                        table-layout:fixed; 
                                        word-break:break-all;
                                        padding: 10px;" cellspacing="-1">
                    <tr>
                        <td width="500px">Dengan berakhirnya masa kredit dan telah diterima kembali berupa jaminan sertifikatnya, maka dengan ini Rekening Tabungan : </td>
                        <td width=""></td>
                    </tr>                
                </table>

                <table style="width: 100%;
                                     font-size: 14px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                    <tr>
                        <td width="300px"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><label for="vehicle1"> &nbsp; <strong>Penutupan Rekening Tabungan <strong></label><br></td>
                    </tr>
                </table>
                <div style="padding-left: 30px;">
                    <p style="font-size: 10px; padding-left: 20px;">Alasan :</p>
                    <textarea name="w3review" rows="4" cols="50">
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </textarea>

                    <p style="font-size: 10px; padding-left: 20px;">Persyaratan :</p>

                    <table style="width: 100%;
                                     font-size: 10px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                        <tr>
                            <td width="300px"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><label for="vehicle1"> &nbsp; Form Penutupan Rekening Tabungan</label><br></td>
                        </tr>
                        <tr>
                            <td width="300px"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><label for="vehicle1"> &nbsp; Buku Tabungan Asli</label><br></td>
                        </tr>
                        <tr>
                            <td width="300px"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><label for="vehicle1"> &nbsp; Foto Copy KTP</label><br></td>
                        </tr>
                        <tr>
                            <td width="300px"> <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"><label for="vehicle1"> &nbsp; Melanjutkan Rekening Tabungan</label><br></td>
                        </tr>
                    </table>
                    <br><br>
                    <table style="width: 100%;
                                     font-size: 10px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     text-align: center;
                                     border: 0px solid black;
                                     border-collapse: collapse;" cellspacing="-1">
                        <tr>
                            <td width="" > Mengetahui,</td>
                        </tr>
                        <br><br><br><br><br><br><br>
                        <tr>
                            <td width="" >( <?php echo $nama; ?>  )</td>
                        </tr>
                    </table>
                
                </div>

            </div>
            


          
    </body>
</html>




