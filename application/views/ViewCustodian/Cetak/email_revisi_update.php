<!DOCTYPE html>
<html>
    <body>

        <h3>Selamat Pagi</h3>

        <p>Dear All, <br>
        Berikut Revisi / Update Permintaan Asset Jaminan Cabang <?php echo $kode_kantor_tujuan . ' / ' . $kode_custodian;?></p>
      
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
                                <th class="th">Jenis</th>
                                <th class="th">Deskripsi&nbsp;Jaminan</th>
                            </tr>
                        </thead>
                        <tbody>
                                 <?php
                                         for($i = 0; $i < $lengthParsed; $i++){
                                            echo $parsedDataDetailArr[$i][2];
                                         }
                                ?>
                        </tbody>
            </table>
            <br>

            <p>Terimakasih.</p><br>

        <address>
            Email Otomatis dari Web Centro
            Link Website:<br>
            <a href="centro.kreditmandiri.co.id">centro.kreditmandiri.co.id</a>
            <br>
        </address>

    </body>
</html>
