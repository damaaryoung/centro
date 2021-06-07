<!DOCTYPE html>
<html>
    <body>
        <p>Dear Team Asuransi, 
        Berikut Kami Lampirkan data nasabah PT BPR Kredit Mandiri Indonesia yang akan mengajukan proses refund asuransi:</p>
        <table><tr><td width="115">Nama Nasabah</td><td width="20px">:</td> <td><?php echo $nama_nasabah; ?></td> </tr>
            <tr><td width="115">No Polis</td><td width="20px">:</td><td width><?php echo $no_polis;?></td></tr>
            <tr><td width="115">No Rekening</td><td width="20px">:</td><td width><?php echo $rek_update;?></td></tr>
            <tr><td width="115">Tgl Refund</td><td width="20px">:</td><td width><?php echo $tgl_refund;?></td></tr>
        </table>
        <p>File Attachment : </p>
        <?php echo $attach;?>
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
