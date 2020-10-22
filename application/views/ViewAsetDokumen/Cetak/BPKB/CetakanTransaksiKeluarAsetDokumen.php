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
            <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>BUKTI PENYERAHAN BPKB</strong></span></h2>
            <table border="0" style="width: 100%;
                                     font-size: 14px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;" cellspacing="-1">
                <tr>
                    <td style="text-align: left;"><span style="text-decoration: underline;"><strong>NO. REK : <?php echo $no_rekening;?></strong></span></td>
                    <td style="text-align: right;"> <span style="text-decoration: underline;"><strong>NO :  <?php echo $nomor;?></strong></span></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Telah Dipinjamkan oleh <?php echo $nama_kantor;?>, kepada :</p>
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
            <p style="font-size: 12px;">Berupa 1 Buah BPKB asli dengan rincian sebagai berikut :</p>
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
                    <td width="115px">No BPKB</td>
                    <td width="10px">:</td>
                    <td><?php echo $nomor_bpkb; ?></td>
                </tr>
                <tr>
                    <td width="115px">Nama Pemilik</td>
                    <td width="10px">:</td>
                    <td width><?php echo $nama_bpkb ?></td>
                </tr>
                <tr>
                    <td width="115px">Merk / Jenis</td>
                    <td width="10px">:</td>
                    <td><?php echo $nama_merk .' ' . $nama_type . ' / ' . $nama_jenis; ?></td>
                </tr>
                <tr>
                    <td width="115px">No. Rangka</td>
                    <td width="10px">:</td>
                    <td><?php echo $no_rangka; ?></td>
                </tr>
                <tr>
                    <td width="115px">No. Mesin</td>
                    <td width="10px">:</td>
                    <td><?php echo $no_mesin; ?></td>
                </tr>
                <tr>
                    <td width="115px">Warna / Tahun</td>
                    <td width="10px">:</td>
                    <td><?php echo $warna. ' / ' . $tahun; ?></td>
                </tr>
                <tr>
                    <td width="115px">Tgl. EXP. STNK</td>
                    <td width="10px">:</td>
                    <td><?php echo $tgl_expired_stnk; ?></td>
                </tr>
                <tr>
                    <td width="115px">No. Polisi</td>
                    <td width="10px">:</td>
                    <td><?php echo $no_polisi; ?></td>
                </tr>
                <tr>
                    <td width="125">Tgl. Exp. Pajak STNK</td>
                    <td width="10px">:</td>
                    <td><?php echo $tgl_expired_pajak; ?></td>
                </tr>
                <tr>
                    <td width="125">Alamat</td>
                    <td width="10px">:</td>
                    <td><?php echo $alamat_bpkb; ?></td>
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
                    <td width="70px">Kwitansi Blanko</td>
                    <td width="10px">:</td>
                    <td><?php echo $blanko;?></td>

                    <td width="115px">Faktur Pemilik</td>
                    <td width="10px">:</td>
                    <td><?php echo $faktur_pemilik; ?></td>  

                </tr>
                <tr>
                    <td width="100px">Kwitansi Jual Beli</td>
                    <td width="10px">:</td>
                    <td><?php echo $kwitansi_jb; ?></td>
                </tr>
            </table>
            
            <p style="font-size: 12px;">Jenis Pengurusan : <?php echo $jenis_pengurusan;?> dan akan dikembalikan pada tanggal <?php echo $tgl_rencana_kembali;?></p>
            <p style="font-size: 12px;"><?php echo $ket;?></p>
            
            <p style="text-align: right; font-size: 11px; "><?php echo $kota. ', ' . $sysdate; ?></p>
            <table style="width: 100%;
                                     font-size: 11px; 
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
                    <td width="" >( <?php echo $nama; ?> )</td>
                </tr>
            </table>
          
    </body>
</html>




