<!DOCTYPE html>
<html>
    <body>
           <img src="<?php echo base_url('assets/design/images/headOL.png') ?>" style="width: 500px;
                                                                              margin-left:-4em;
                                                                              margin-top:-3.5em;
                                                                            ">
            <h2 style="text-align: center;"><span style="text-decoration: underline;"><strong>TANDA TERIMA PEMINDAHAN JAMINAN</strong></span></h2>
            <table border="0" style="width: 100%;
                                     font-size: 14px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;" cellspacing="-1">
                <tr>
                      <td style="text-align: center;"><span style="text-decoration: underline;"><strong>Nomor : <?php echo $nomor;?></strong></span></td>
                </tr>
            </table>

            <p style="font-size: 12px;">Pemindahan Jaminan Antar Kantor dari: <?php echo $nama_kantor_asal;?> ke <?php echo $nama_kantor_tujuan;?>, dengan perincian sebagai berikut :</p>
            
            <table border="1" style="width: 100%; 
                                     font-size: 11px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     word-break:break-all;
                                     border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th class="th">No.&nbsp;Reff</th>
                                <th class="th">Agunan&nbsp;Id</th>
                                <th class="th">Nama&nbsp;Nasabah</th>
                                <th class="th">Deskripsi&nbsp;Jaminan</th>
                            </tr>
                        </thead>
                        <tbody>
                                 <?php
                                         foreach ($getPemindahanJaminanCetak as $row) :
                                            // $idData = $row['id_data'];
                                            $idx= 0;
                                            echo "<tr>";
                                            echo "<td>".$row['no_reff']."&nbsp;</td>";
                                            echo "<td>".$row['agunan_id']."</td>";
                                            echo "<td>".$row['nama_nasabah']."</td>";     
                                            echo "<td>".$row['deskripsi_ringkas']."</td>";
                                            echo "</tr>";
                                        endforeach;
                                ?>
                        </tbody>
            </table>

            <p style="text-align: right; font-size: 11px; "><?php //echo $kota.', ' . $tgl;?></p>
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




<style>
.tr:nth-child(even){background-color: #f2f2f2}

.th {
  background-color: #fc1919;
  color: white;
}
</style>