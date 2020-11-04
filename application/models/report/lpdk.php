<img src="<?php echo base_url('assets/dist/img/headOL.png') ?>" style="
   width: 500px;
   margin-left:-4em;
   margin-top:-3.5em;
">
<div class="book">
    <div class="page" style="font-size: 10px;">
        <div class="table-responsive">
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top; text-align:center" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <b>
                            <h3>LEMBAR PERSETUJUAN DOKUMEN KREDIT</h3>
                        </b>
                    </td>
                </tr>
            </table>
            <br>
            <table border="0" style="width: 100%;font-size: 12px; vertical-align:top" cellspacing="-1">
                <tr>
                    <td width="115">No</td>
                    <td width="20px">:</td>
                    <td><?php echo $nomor_so ?></td>
                </tr>
                <tr>
                    <td width="115">Nama Debitur</td>
                    <td width="20px">:</td>
                    <td width><?php echo $nama_debitur ?></td>
                </tr>
                <tr>
                    <td width="115">Plafon</td>
                    <td width="20px">:</td>
                    <td>Rp. <?php echo number_format($plafon_kredit) ?></td>
                </tr>
                <tr>
                    <td width="115">Cabang</td>
                    <td width="20px">:</td>
                    <td><?php echo $cabang ?></td>
                </tr>
            </table>
            <br>

            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top;" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td width="305px">
                        <small>
                            Identitas Debitur
                        </small>
                    </td>
                    <td width="15px"><small style="font-size:11px">Ya</small></td>
                    <td width="15px"><small style="font-size:11px">Tdk</small></td>
                    <td width="15px"><small style="font-size:11px">TBO</small></td>
                    <td></td>

                </tr>
            </table>
            <table border=1 style="width: 100%;font-size: 11px; vertical-align:top; " cellspacing="-1">
                <tr>
                    <td width="305">
                        KTP Debitur / Resi KTP
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_deb == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_deb == 'Tidak') {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_deb == 'TBO') {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td rowspan=9>
                        <p>
                            <?php echo $ktp_deb_ket ?><br>
                            <?php echo $ktp_pas_ket ?><br>
                            <?php echo $kk_ket ?><br>
                            <?php echo $akta_nikah_ket ?><br>
                            <?php echo $akta_cerai_ket ?><br>
                            <?php echo $akta_lahir_ket ?><br>
                            <?php echo $surat_kematian_ket ?><br>
                            <?php echo $npwp_ket ?><br>
                            <?php echo $skd_pmi_ket ?><br>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        KTP Pasangan / Resi KTP Pasangan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Kartu Keluarga / Resi KK
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Nikah
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Cerai / Surat Keputusan Pengadilan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_cerai == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_cerai == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_cerai == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte Lahir / Surat Kenal Lahir
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Kematian
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($surat_kematian == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($surat_kematian == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($surat_kematian == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        N P W P
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Keterangan Desa ( PMI )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_pmi == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_pmi == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_pmi == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
            </table>
            <br>
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top;" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <small>
                            Jaminan
                        </small>
                    </td>
                </tr>
            </table>
            <table border=1 style="width: 100%;font-size: 11px; vertical-align:top; " cellspacing="-1">
                <tr>
                    <td width="305">
                        SHM / SHGB ( Tidak Expired )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($shm_shgb == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($shm_shgb == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($shm_shgb == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td rowspan=9>
                        <p>
                            <?php echo $shm_shgb_ket ?><br>
                            <?php echo $imb_ket ?><br>
                            <?php echo $pbb_ket ?><br>
                            <?php echo $sttpbb_ket ?><br>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        IMB / Foto copy IMB
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($imb == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($imb == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($imb == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        PBB asli terakhir
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pbb == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pbb == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pbb == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        STT & PBB 10 tahun terakhir (untuk Peningkatan hak/AJB)
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sttpbb == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sttpbb == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sttpbb == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
            </table>
            <br>
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top;" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <small>
                            Identitas Orang Tua
                        </small>
                    </td>
                </tr>
            </table>
            <table border=1 style="width: 100%;font-size: 11px; vertical-align:top; " cellspacing="-1">
                <tr>
                    <td width="305px">
                        Foto Copy KTP orang tua
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_ktp_ortu == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_ktp_ortu == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_ktp_ortu == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td rowspan=9>
                        <p>
                            <?php echo $fotocopy_ktp_ortu_ket ?><br>
                            <?php echo $fotocopy_kk_ortu_ket ?><br>
                            <?php echo $pg_ortu_ket ?><br>
                            <?php echo $akta_nikah_ortu_ket ?><br>
                            <?php echo $sk_waris_ket ?><br>
                            <?php echo $akta_lahir_waris_ket ?><br>
                            <?php echo $sk_anak_ket ?><br>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        Foto Copy KK orang tua
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_kk_ortu == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_kk_ortu == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($fotocopy_kk_ortu == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        PG ( Ortu & Saudara )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pg_ortu == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pg_ortu == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($pg_ortu == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Nikah Orang tua
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah_ortu == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah_ortu == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_nikah_ortu == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Keterangan Waris ( PM2 )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_waris == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_waris == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_waris == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte Lahir Pewaris
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span><?php if ($akta_lahir_waris == "Ya") {
                                    echo "√";
                                } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir_waris == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir_waris == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Putusan Pengadilan untuk anak dibawah umur
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_anak == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_anak == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($sk_anak == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
            </table>
            <br>
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top;" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <small>
                            Identitas Penjamin
                        </small>
                    </td>
                </tr>
            </table>
            <table border=1 style="width: 100%;font-size: 11px; vertical-align:top; " cellspacing="-1">
                <tr>
                    <td width="305px">
                        KTP Penjamin / Resi KTP Penjamin
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjamin == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjamin == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjamin == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td rowspan=9>
                        <p>
                            <?php echo $ktp_penjamin_ket ?><br>
                            <?php echo $ktp_pasangan_pen_ket ?><br>
                            <?php echo $kk_penjamin_ket ?><br>
                            <?php echo $aktanikah_penj_ket ?><br>
                            <?php echo $aktacerai_penj_ket ?><br>
                            <?php echo $akta_lahir_penj_ket ?><br>
                            <?php echo $skematian_penjamin_ket ?><br>
                            <?php echo $npwp_penjamin_ket ?><br>
                            <?php echo $skd_penjamin_ket ?><br>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        KTP Pasangan / Resi KTP Pasangan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pasangan_pen == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pasangan_pen == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <t width="15px" style="text-align:center;" d>
                        <span>
                            <?php if ($ktp_pasangan_pen == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </t>
                </tr>
                <tr>
                    <td>
                        Kartu Keluarga / Resi KK
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjamin == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjamin == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjamin == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Nikah
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktanikah_penj == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktanikah_penj == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td>
                        <span>
                            <?php if ($aktanikah_penj == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Cerai / Surat Keputusan Pengadilan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penj == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penj == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penj == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte Lahir / Surat Kenal Lahir
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir_penj == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir_penj == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($akta_lahir_penj == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Kematian
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjamin == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjamin == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjamin == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        N P W P
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjamin == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjamin == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjamin == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Keterangan Desa ( PMI )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjamin == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjamin == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjamin == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
            </table>
            <br>
            <table border="0" style="width: 100%;font-size: 15px; vertical-align:top;" cellspacing="-1">
                <tr style="background-color: #b5b8bd">
                    <td>
                        <small>
                            Identitas Penjual
                        </small>
                    </td>
                </tr>
            </table>
            <table border=1 style="width: 100%;font-size: 11px; vertical-align:top; " cellspacing="-1">
                <tr>
                    <td width="305px">
                        KTP Penjual / Resi KTP Penjual
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td rowspan=9>
                        <p>
                            <?php echo $ktp_penjual_ket ?><br>
                            <?php echo $ktp_pas_penjual_ket ?><br>
                            <?php echo $kk_penjual_ket ?><br>
                            <?php echo $aktanikah_penjual_ket ?><br>
                            <?php echo $aktacerai_penjual_ket ?><br>
                            <?php echo $aktalahir_penjual_ket ?><br>
                            <?php echo $skematian_penjual_ket ?><br>
                            <?php echo $npwp_penjual_ket ?><br>
                            <?php echo $skd_penjual_ket ?><br>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        KTP Pasangan / Resi KTP Pasangan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($ktp_pas_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Kartu Keluarga / Resi KK
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($kk_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Nikah
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktanikah_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktanikah_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktanikah_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte / Surat Cerai / Surat Keputusan Pengadilan
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktacerai_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Akte Lahir / Surat Kenal Lahir
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktalahir_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktalahir_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($aktalahir_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Kematian
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skematian_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        N P W P
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($npwp_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>
                        Surat Keterangan Desa ( PMI )
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjual == "Ya") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjual == "Tidak") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                    <td width="15px" style="text-align:center;">
                        <span>
                            <?php if ($skd_penjual == "TBO") {
                                echo "√";
                            } ?>
                        </span>
                    </td>
                </tr>
            </table>
            <table border="1" style="width: 100%;font-size: 11px; vertical-align:top;" cellspacing="-1">
                <tr>
                    <td width="50%">Dengan ini dokumen-dokumen kredit dinyatakan telah diperiksa dan
                        dapat dilakukan Pengikatan Kredit apabila dokumen lengkap</td>
                    <td rowspan="1">( JULIAN FRANDES SAPUTRA )</td>
                </tr>
                <tr>
                    <td width="50%">Tanggal : <?php echo $created_at ?></td>
                    <td rowspan="4"> <b>TT Pimpinan Cabang & Head Operasional</b><br><br><br><b>_______________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______________________</b></td>
                </tr>
                <tr>
                    <td width="50%">Dengan semua dokumen kredit asli sudah diterima dan sesuai dengan
                        ketentuan untuk Pencairan Kredit</td>
                </tr>
                <tr>
                    <td width="50%">Tanggal :</td>
                </tr>
            </table>
        </div>
    </div>
</div>