
<div class="book">
   <div class="page" style="font-size: 12px;">

      <p><b><u>No. Ref : <?php echo $nomor_caa ?></u></b></p>
      <p><b>Bekasi , <?php echo date('d-m-Y') ?></b></p>
		<p>Kepada Yth,<br><b>BAPAK <?php echo strtoupper($nama_lengkap) ?> <br><?php echo $alamat_domisili ?></b></p>
      <center><p><b>Perihal : Persetujuan Fasilitas Kredit Angsuran</b></p></center>
      <p>Dengan hormat ,</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sehubungan dengan permohonan fasilitas kredit Bapak / Ibu tertanggal 24 juni 2019 kepada <b>PT. BPR KREDIT MANDIRI INDONESIA</b> , bersama ini kami sampaikan bahwa permohonan Bapak / Ibu secara prinsip telah disetujui dengan ketentukan dan kondisi sebagai berikut :</p><br>
      <table border="0" style="width: 100%;font-size: 12px;" cellspacing="-1">
            <tr style="background-color: #b5b8bd">
               <td><b>A.</b></td>
               <td colspan="2"><b>PERINCIAN FASILITAS KREDIT</b></td>
            </tr>
            <tr>
               <td>1.</td>
               <td >Nama Debitur</td>
               <td>: <?php echo $nama_lengkap ?></td>
            </tr>
            <tr>
               <td>2.</td>
               <td >Produk Kredit</td>
               <td>: <?php echo $produk ?></td>
            </tr>
            <tr>
               <td>3.</td>
               <td >Jenis Pinjaman</td>
               <td>: <?php echo $jenis_pinjaman ?></td>
            </tr>
            <tr>
               <td>4.</td>
               <td >Besar Fasilitas Kredit</td>
               <td>: <?php echo number_format($plafon) ?></td>
            </tr>
            <tr>
               <td>5.</td>
               <td >Jangka waktu fasilitas kredit</td>
               <td>: <?php echo $tenor ?> bulan</td>
            </tr>
            <tr>
               <td>6.</td>
               <td >Suku bunga kredit</td>
               <td>: <?php echo $suku_bunga ?> %</td>
            </tr>
            <tr>
               <td>7.</td>
               <td >Pembayaran angsuran</td>
               <td>: Rp. <?php echo number_format($rekomendasi_angsuran) ?></td>
            </tr>
            <?php
               $no = 1;
               for ($i=0; $i < count($agunan_tanah) ; $i++) { 
                  
                  $jenis = $agunan_tanah[$i]->jenis;
                  $tipe_lokasi = $agunan_tanah[$i]->tipe_lokasi;
                  $luas_tanah = $agunan_tanah[$i]->luas->tanah;
                  $luas_bangunan = $agunan_tanah[$i]->luas->bangunan;
                  $nama_pemilik_sertifikat = $agunan_tanah[$i]->nama_pemilik_sertifikat;
                  $tgl_atau_no_ukur = $agunan_tanah[$i]->tgl_atau_no_ukur; ?>

                  <tr style="background-color: #b5b8bd">
                     <td><b>B.</b></td>
                     <td colspan="2"><b>DATA AGUNAN SERTIFIKAT <?php echo $no++ ?> </b></td>
                  </tr>
                  <tr>
                     <td>1.</td>
                     <td >Jenis</td>
                     <td>: <?php echo $jenis ?></td>
                  </tr>
                  <tr>
                     <td>2.</td>
                     <td >Lokasi</td>
                     <td>: <?php echo $tipe_lokasi ?></td>
                  </tr>
                  <tr>
                     <td>3.</td>
                     <td >Luas tanah / bangunan</td>
                     <td>: <?php echo $luas_tanah." / ".$luas_bangunan ?></td>
                  </tr>
                  <tr>
                     <td>4.</td>
                     <td >No sertifikat</td>
                     <td>: <?php echo $no_sertifikat ?></td>
                  </tr>
                  <tr>
                     <td>5.</td>
                     <td >Pemegang hak sertifikat</td>
                     <td>: <?php echo $nama_pemilik_sertifikat ?></td>
                  </tr>
                  <tr>
                     <td>6.</td>
                     <td >Tgl/ No. Ukur</td>
                     <td>: <?php echo $tgl_atau_no_ukur ?></td>
                  </tr>


            <?php   }
            ?>

            <?php
               $no = 1;
               for ($i=0; $i < count($agunan_kendaraan) ; $i++) { 
                  
                  $jenis = $agunan_kendaraan[$i]->jenis;
                  $tipe_kendaraan = $agunan_kendaraan[$i]->tipe_kendaraan;
                  $merk = $agunan_kendaraan[$i]->merk;
                  $tgl_kadaluarsa_pajak = $agunan_kendaraan[$i]->tgl_kadaluarsa_pajak;
                  $tgl_kadaluarsa_stnk = $agunan_kendaraan[$i]->tgl_kadaluarsa_stnk;
                  $nama_pemilik = $agunan_kendaraan[$i]->nama_pemilik;
                  $no_bpkb = $agunan_kendaraan[$i]->no_bpkb;
                  $no_polisi = $agunan_kendaraan[$i]->no_polisi;
                  $no_stnk = $agunan_kendaraan[$i]->no_stnk; ?>

                  <tr style="background-color: #b5b8bd">
                     <td><b>B.</b></td>
                     <td colspan="2"><b>DATA AGUNAN KENDARAAN <?php echo $no++ ?> </b></td>
                  </tr>
                  <tr>
                     <td>1.</td>
                     <td >Jenis</td>
                     <td>: <?php echo $jenis ?></td>
                  </tr>
                  <tr>
                     <td>2.</td>
                     <td >Tipe kendaraan</td>
                     <td>: <?php echo $tipe_kendaraan ?></td>
                  </tr>
                  <tr>
                     <td>3.</td>
                     <td >Merk</td>
                     <td>: <?php echo $merk ?></td>
                  </tr>
                  <tr>
                     <td>4.</td>
                     <td >Nama Pemilik</td>
                     <td>: <?php echo $nama_pemilik ?></td>
                  </tr>
                  <tr>
                     <td>5.</td>
                     <td >No BPKB</td>
                     <td>: <?php echo $no_bpkb ?></td>
                  </tr>
                  <tr>
                     <td>6.</td>
                     <td >No STNK</td>
                     <td>: <?php echo $no_stnk ?></td>
                  </tr>
                  <tr>
                     <td>7.</td>
                     <td >Tgl Berlaku Pajak</td>
                     <td>: <?php echo $tgl_kadaluarsa_pajak ?></td>
                  </tr>
                  <tr>
                     <td>8.</td>
                     <td >Tgl berlaku STNK</td>
                     <td>: <?php echo $tgl_kadaluarsa_stnk ?></td>
                  </tr>


            <?php   }
            ?>
            
            <tr style="background-color: #b5b8bd">
               <td><b>C.</b></td>
               <td colspan="2"><b>BIAYA - BIAYA</b></td>
            </tr>
            <tr>
               <td>1.</td>
               <td >Biaya provisi</td>
               <td>: <i>Rp. <?php echo number_format($biaya_provisi) ?>,-</i></td>
            </tr>
            <tr>
               <td>2.</td>
               <td >Biaya administrasi</td>
               <td>: <i>Rp. <?php echo number_format($biaya_administrasi) ?>,-</i></td>
            </tr>
            <tr>
               <td>3.</td>
               <td >Premi asuransi jiwa kredit</td>
               <td>: <i>Rp. <?php echo number_format($biaya_asuransi_jiwa) ?>,-</i></td>
            </tr>
            <tr>
               <td>4.</td>
               <td >Premi asuransi kebakaran</td>
               <td>: <i>Rp. <?php echo number_format($biaya_asuransi_kebakaran) ?>,-</i></td>
            </tr>
            <tr>
               <td>5.</td>
               <td >Credit chceking</td>
               <td>: <i>Rp. 44.000,-</i></td>
            </tr>
            <tr>
               <td>6.</td>
               <td >Tabungan</td>
               <td>: <i>Rp. <?php echo number_format($biaya_tabungan) ?>,-</i></td>
            </tr>
            <tr>
               <td>7.</td>
               <td >Pelunasan</td>
               <td>: <i> Rp. <?php echo number_format($pelunasan_nasabah_ro) ?></i></td>
            </tr>
            <tr>
               <td>8.</td>
               <td >Notaris**</td>
               <td>: <i>Rp. <?php echo number_format($biaya_notaris) ?>,-</i></td>
            </tr>
            <tr>
               <td colspan="2" align="right"><b>Total biaya</b></td>
               <td><b>: <i>Rp. <?php echo number_format($total) ?>,-</i></b></td>
            </tr>
            <tr>
               <td colspan="2" align="right"><b>Dana yang diterima</b></td>
               <td><b>: <i>Rp. <?php echo number_format($plafon - $total) ?>,-</i></b></td>
            </tr>
            <tr style="background-color: #b5b8bd">
               <td><b>D.</b></td>
               <td colspan="2"><b>SYARAT - SYARAT</b></td>
            </tr>
            <tr>
               <td colspan="2"><b>Pencairan fasilitas kredit</b></td>
               <td colspan="2"><p>1. Pencairan dana dilakukan setelah penandatanganan perjanjian kredit antara debitur dengan Bank , dan berdasarkan persetujuan dari bank serta melengkapi semua dokumen yang disyaratkakn oleh Bank.</p>
                  <p>2. Telah diserahkan asli sertipikat atas nama <b><?php echo $jenis ?> NO. <?php echo $no_sertifikat ?> A.N <?php echo $nama_pemilik_sertifikat ?></b> serta telah dicek keabsahannya di BPN setempat oleh notaris rekanan PT. BPR KREDIT MANDIRI INDONESIA</p>
                  <p>3. Pada saat akad kredit dan penhgikatan jaminan , calon debitur dan istri wajib hadir serta membawa asli KTP , Kartu keluarga dan Surat nikah dan membawa surat keterangan dari kelurahan apabila terdapat perbedaan di KTP /KK</p>
                  <p>4. Telah dilaksanakan pengikatan kredit dan jaminan dengan baik di PT BPR KREDIT MANDIRI INDONESIA</p>
                  <p>5. Lain -lain sesuai dengan kebijakan yang berlaku di PT. BPR KREDIT MANDIRI INDONESIA</p>
               </td>
            </tr>
            <tr>
               <td colspan="4"><hr></td>
            </tr>
            <tr>
               <td colspan="2"><b>Pelunasan dipercepat</b></td>
               <td colspan="2"><p>1. Pelunasan dapat dilakukan setiap saat dan permohonan pelunasana dipercepat waji diinformasikan kepada pihak Bank minimal 7 (tujuh) hari sebelumnya </p>
                  <p>2. Pelunasan pinjaman sebelum masa jatuh tempo berakhir (dipercepat) dapat dilakukan sesuai dengan kebiajakan yang berlaku di PT. BPR KREDIT MANDIRI INDONESIA</p>
               </td>
            </tr>
            <tr>
               <td colspan="4"><hr></td>
            </tr>
            <tr>
               <td colspan="2"><b>Ganti agunan</b></td>
               <td colspan="2"><p>1. Permohonan ganti agunan waji diinformasikan kepada pihak Bank untuk dianalisa ulang dan Bank berhak menyetujui / menolak permohonan tersebut</p>
               </td>
            </tr>
            <tr>
               <td colspan="4"><hr></td>
            </tr>
            <tr>
               <td colspan="2"><b>Lain - lain</b></td>
               <td colspan="2"><p><p>1. Bank sepenuhnya berhak untuk meninjau dan mengubah besarnya suku bunga atau sistem suku bunga sesuai dengan ketentuan / kebijakan yang berlaku di PT. BPR KREDIT MANDIRI INDONESIA </p>
                  <p>2. Untuk setiap hari keterlambatan pembayaran kewajiban debitur , akan dikenakan denda perhari sebesar 0,5 % dari angsuran perbulan</p>
                  <p>3. Surat persetujuan kredit ini berlaku 7 (tujuh) hari kerja sejak tanggal surat ini</p>
                  <p></p>
               </td>
            </tr>
            <tr>
               <td colspan="4"><hr></td>
            </tr>
         </table><br>
         <p>&nbsp;&nbsp;&nbsp;Surat permohonan persetujuan kredit ini <i><b>bukan</b></i> merupakan perjanjian kredit yang mengikat Bapak / ibu dengan pihak Bank dan olej karenanya apabila ternyata terdapat keliruan surat pemberitahuan persetujuan kredit ini , maka akan diadakan perbaikian seperlunya.</p>
         <p>Demikian pemberitahuan kami, Atas perhatian dan kerjasamanya kami ucapkan terima kasih. </p>
         <br><br>
         <table style="font-size: 12px;">
            <tr>
               <td colspan="2"><b><h3>PT BPR KREDIT MANDIRI INDONESIA,</h3></b></td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td><b>Menyetujui</b></td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td colspan="12">&nbsp;</td>
            </tr>
            <tr>
               <td><b><u></u></b></td>
               <td><b><u></u></b></td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td><b><u></u></b></td>
            </tr>
            <tr>
               <td><b><u>Kepala cabang</u></b></td>
               <td><b><u>Head operasioan</u></b></td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td>&nbsp;</td>
               <td><b><u>Calon debitur</u></b></td>
            </tr>
         </table>
   </div>
</div>
