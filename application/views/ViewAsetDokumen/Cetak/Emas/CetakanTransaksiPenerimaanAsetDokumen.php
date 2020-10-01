<!DOCTYPE html>
<html>
    <body>
           <img src="<?php echo base_url('assets/design/images/headOL.png') ?>" style="width: 500px;
                                                                              margin-left:-4em;
                                                                              margin-top:-3.5em;
                                                                            ">
            <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>BUKTI PENERIMAAN EMAS</strong></span></h2>
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
            <p style="font-size: 12px;">Berupa 1 Buah <?php echo $jenis_jaminan;?> asli dengan rincian sebagai berikut :</p>
            <table border="0" style="width: 100%;
                                     font-size: 12px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     padding-left: 20px;" cellspacing="-1">
                <tr>
                    <td width="115px">No. Seri</td>
                    <td width="10px">:</td>
                    <td><?php echo  $no_seri; ?></td>
                </tr>
                <tr>
                    <td width="115px">Jenis Emas</td>
                    <td width="10px">:</td>
                    <td><?php echo $jenis_emas; ?></td>
                </tr>
                <tr>
                    <td width="115px">Jumlah Karat</td>
                    <td width="10px">:</td>
                    <td width><?php echo $karat; ?></td>
                </tr>
                <tr>
                    <td width="115px">Jumlah Berat</td>
                    <td width="10px">:</td>
                    <td><?php echo $berat; ?></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Pengambilan EMAS tidak Saya kuasakan kepada pihak lain dan atau Siapapun.</p>
            <br><br><br><br>
            <p style="text-align: right; font-size: 11px; "><?php echo $kota.', ' . $tgl;?></p>
            <table border="0" style="width: 100%;
                                     font-size: 11px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     text-align: center;" cellspacing="-1">
                <tr>
                    <td width="" >Dibuat Oleh,</td>
                    <td width="" >Yang Menyerahkan,</td>
                    <td width="" >Diperiksa Oleh,</td>
                </tr>
                <br><br><br><br><br><br><br>
                <tr>
                    <td width="" >( <?php echo strtoupper($usernameEmas);?> )</td>
                    <td width="" >( <?php echo $nama ?> )</td>
                    <td width="" >( ........................................ )</td>
                </tr>
            </table>
    
    </body>
</html>




