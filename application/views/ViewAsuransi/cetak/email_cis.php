<!DOCTYPE html>
<html>
    <body>
        <p>Dear Team Asuransi, 
        Berikut Kami Lampirkan data pengajuan cover asuransi CASH IN SAVE <?php// echo $tgl;?> sbb:</p>
        <table border="1" style="width: 100%; 
                                     font-size: 11px; 
                                     vertical-align:top; 
                                     table-layout:fixed; 
                                     border-collapse: collapse;">
                        <thead>
                            <tr><th>No</th><th>Nama&nbsp;Cabang</th><th>Limit&nbsp;Kas&nbsp;Utama</th><th>Saldo&nbsp;Akhir&nbsp;Kas&nbsp;Utama</th></tr></thead><tbody><?php echo $get_data_send_mail;?> </tbody>
        </table>
        <p>Demikian yang dapat kami sampaikan,terima kasih atas perhatian dan kerjasamanya.
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
