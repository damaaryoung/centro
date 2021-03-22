<!DOCTYPE html>
<html>
    <body>
        <p>Dear Team Asuransi, 
        Berikut Kami Lampirkan data pengajuan cover asuransi CASH IN SAVE tanggal <?php echo $tgl;?> sbb:</p>
        <table>
            <tr>
                <td width="115">Nama Nasabah</td>
                <td width="20px">:</td>
                <td><?php echo $nama_nasabah; ?></td>
            </tr>
            <tr>
                <td width="115">No Polis</td>
                <td width="20px">:</td>
                <td width><?php echo $no_polis;?></td>
            </tr>
            <tr>
                <td width="115">Tgl Klaim</td>
                <td width="20px">:</td>
                <td width><?php echo $tgl_klaim;?></td>
            </tr>
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
        </table>
        <p>Terimakasih.
            Regards,
            PIC Asuransi
        </p>

        <address>
            Email Otomatis dari Web Centro
            Link Website:
            <a href="centro.kreditmandiri.co.id">centro.kreditmandiri.co.id</a>
        </address>

    </body>
</html>
