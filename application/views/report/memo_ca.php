<style type="text/css">
   pre {
      white-space: pre-wrap;
      word-wrap: break-word;
   }
</style>

<div class="book">
   <div class="page" style="font-size: 10px;">
      <div class="table-responsive">
         <table style="width: 100%;vertical-align: top">
            <tr>
               <td>
                  <table border="1" style="font-size: 10px;width: 100%;vertical-align: top" cellspacing="-1">

                     <tr>
                        <th colspan="10" align="center" style="background-color: red;color: black;font-size: 10px">
                           <center>MEMORANDUM CREDIT ANALIST</center>
                        </th>
                     </tr>
                     <tr>
                        <th colspan="10" align="center" style="background-color: orange;color: black;font-size: 10px">
                           <center>RINGKASAN ANALISA DAN REKOMENDASI</center>
                        </th>
                     </tr>
                     <tr>
                        <th colspan="10" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>ASPEK CREDIT CHECKING</center>
                        </th>
                     </tr>

                     <tr>
                        <td colspan="10">
                           <table style="width: 100%">
                              <?php
                              $jml_plafon = 0;
                              $jml_bakidebet = 0;
                              $jml_angsuran = 0;
                              $jml_collectabilitas = 0;

                              foreach ($aspek_kredit_checking->result_array() as $key) {

                                 $nama_bank = $key['nama_bank'];
                                 $plafon = $key['plafon'];
                                 $jml_plafon += $plafon;
                                 $baki_debet = $key['baki_debet'];
                                 $jml_bakidebet += $baki_debet;
                                 $angsuran = $key['angsuran'];
                                 $jml_angsuran += $angsuran;
                                 $collectabilitas = $key['collectabilitas'];
                                 // $jml_collectabilitas .= $collectabilitas;
                                 $jenis_kredit = $key['jenis_kredit'];
                              ?>

                                 <tr>
                                    <td colspan="10"><b><?php echo $nama_bank . ",Plafond " . number_format($plafon) . ",BD " . number_format($baki_debet) . ",Angsuran " . number_format($angsuran) . ",Coll " . number_format($collectabilitas) . ",Jns krdt " . $jenis_kredit ?></b></td>
                                 </tr>
                              <?php   }
                              ?>
                              <tr>
                                 <td><b>Total plafond : <?php echo number_format($jml_plafon) ?></b></td>
                              </tr>
                              <tr>
                                 <td><b>Total baki debet : <?php echo number_format($jml_bakidebet) ?></b></td>
                              </tr>
                              <tr>
                                 <td><b>Total Angsuran : <?php echo number_format($jml_angsuran) ?></b></td>
                              </tr>
                              <tr>
                                 <td><b>Collectabilitas terendah : <?php echo  $max_coll ?></b></td>
                              </tr>
                           </table>
                        </td>
                     </tr>

                     <tr>
                        <th colspan="10" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>ASPEK KUANTITAIF</center>
                        </th>
                     </tr>
                     <tr>
                        <td colspan="10">
                           <table style="width: 100%;vertical-align: top">
                              <tr>
                                 <td width="100">a. Total Pendapatan / bulan</td>
                                 <td width="2">:</td>
                                 <td><?php echo 'Rp.' . number_format($kuantitatif_ttl_pendapatan) ?></td>
                                 <td width="100">d. Angsuran per bulan</td>
                                 <td width="2">:</td>
                                 <td><?php echo 'Rp.' . number_format($kuantitatif_angsuran) ?></td>
                                 <td width="100">g. DSR (max. 35%)</td>
                                 <td width="2">:</td>
                                 <td><?php echo $kuantitatif_dsr . "%" ?></td>
                              </tr>
                              <tr>
                                 <td>b. Total Pengeluaran</td>
                                 <td>:</td>
                                 <td><?php echo 'Rp.', number_format($kuantitatif_ttl_pengeluaran) ?></td>
                                 <td>e. IDR(max 80%)</td>
                                 <td>:</td>
                                 <td colspan="4"><?php echo $kuantitatif_idir . '%' ?></td>
                              </tr>
                              <tr>
                                 <td>c. Disposible Income</td>
                                 <td>:</td>
                                 <td><?php echo 'Rp.' . number_format($kuantitatif_ttl_pendapatan - $kuantitatif_ttl_pengeluaran - $kuantitatif_angsuran) ?></td>
                                 <td>f. LTV(max 70%)</td>
                                 <td>:</td>
                                 <td><?php echo $kuantitatif_ltv . '%' ?></td>
                                 <td><b>HASIL</b></td>
                                 <td>:</td>
                                 <td><b><?php echo $kuantitatif_hasil ?></b></td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <th colspan="10" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>KAPASITAS DEBITUR (BULANAN)</center>
                        </th>
                     </tr>
                     <tr>
                        <td width="100%" colspan="10">
                           <table style="width: 100%;vertical-align: top" border="0">
                              <tr>
                                 <td colspan="2" width="50"><b>Total pendapatan</b></td>
                                 <td width="10">:</td>
                                 <td><b><?php echo number_format($total_pemasukan) ?></b></td>
                                 <td colspan="3" width="100"><b>Pendapatan usaha</b></td>
                                 <td width="2">:</td>
                                 <td><b><?php echo number_format($total_pemasukan_usaha) ?> </b>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Calon debitur</td>
                                 <td>:</td>
                                 <td><?php echo number_format($pemasukan_cadebt) ?></td>
                                 <td colspan="3">Tunai</td>
                                 <td>:</td>
                                 <td><?php echo number_format($pemasukan_tunai) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">pasangan</td>
                                 <td>:</td>
                                 <td><?php echo number_format($pemasukan_pasangan) ?></td>
                                 <td colspan="3">Kredit (penerimaan piutang)</td>
                                 <td>:</td>
                                 <td><?php echo number_format($pemasukan_kredit) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">penjamin</td>
                                 <td>:</td>
                                 <td><?php echo number_format($pemasukan_penjamin) ?></td>
                                 <td colspan="3"><b>Pengeluaran usaha</b></td>
                                 <td>:</td>
                                 <td><?php echo number_format($total_pengeluaran_usaha) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2"><b>Total pengeluaran</b></td>
                                 <td>:</td>
                                 <td><?php echo number_format($total_pengeluaran) ?></td>
                                 <td colspan="3">Pembelian barang</td>
                                 <td>:</td>
                                 <td><?php number_format($biaya_belanja_brg) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Rumah tangga</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_rumah_tangga) ?></td>
                                 <td colspan="3">Gaji karyawan</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_gaji_pegawai) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Transport</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_transport) ?></td>
                                 <td colspan="3">Telp ,listrik dan Air (Usaha)</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_telp_listr_air_usaha) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Pendidikan</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_pendidikan) ?></td>
                                 <td colspan="3">Sewa tempat usaha</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_sewa) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Telp,listtrik,Air</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_telp_listr_air) ?></td>
                                 <td colspan="3">Biaya kirim barang</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_kirim_barang) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Angsuran lain -lain</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_lain) ?></td>
                                 <td colspan="3">Pembayaran hutang dagang</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_hutang_dagang) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2">Lainnya</td>
                                 <td>:</td>
                                 <td></td>
                                 <td colspan="3">Pembayaran angsuran usaha</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_angsuran_usaha) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2"></td>
                                 <td>:</td>
                                 <td>-</td>
                                 <td colspan="3">Pengeluaran usaha lainnya</td>
                                 <td>:</td>
                                 <td><?php echo number_format($biaya_lain_lain) ?>
                                 <td>
                              </tr>
                              <tr>
                                 <td colspan="2"><b>Disposible Income</b></td>
                                 <td>:</td>
                                 <td><b><?php echo 'Rp.' . number_format($kuantitatif_ttl_pendapatan - $kuantitatif_ttl_pengeluaran - $kuantitatif_angsuran) ?></b></td>
                                 <td colspan="3"><b>Kekuntungan usaha</b></td>
                                 <td>:</td>
                                 <td><b><?php echo number_format($laba_usaha) ?></b>
                                 <td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                     <tr>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>REKENING BANK</center>
                        </th>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>RINGKASAN DATA KEUANGAN</center>
                        </th>
                     </tr>

                     <tr>
                        <td colspan="5">
                           <table border="0" cellspacing="1" style="vertical-align: top;font-size: 8px">
                              <?php
                              $i = 0;
                              foreach ($data_mutasi_bank->result_array() as $key) {
                                 $id = $key['id'];
                                 $urutan_mutasi = $key['urutan_mutasi'];
                                 $nama_bank = $key['nama_bank'];
                                 $no_rekening = $key['no_rekening'];
                                 $nama_pemilik = $key['nama_pemilik'];
                                 $periode = $key['periode'];
                                 $frek_debet = $key['frek_debet'];
                                 $nominal_debet = $key['nominal_debet'];
                                 $frek_kredit = $key['frek_kredit'];
                                 $nominal_kredit = $key['nominal_kredit'];
                                 $saldo = $key['saldo'];

                                 $exp_periode = explode(';', $periode);
                                 $exp_frek_debet = explode(';', $frek_debet);
                                 $exp_nominal_debet = explode(';', $nominal_debet);
                                 $exp_frek_kredit = explode(';', $frek_kredit);
                                 $exp_nominal_kredit = explode(';', $nominal_kredit);
                                 $exp_saldo = explode(';', $saldo);

                              ?>
                                 <tr>
                                    <td><b>Bank</b></td>
                                    <td colspan="3"><b>: <?php echo $nama_bank ?> A/C : <?php echo $no_rekening ?></b></td>
                                    <td><b>Pemilik</b></td>
                                    <td colspan="2"><b>: <?php echo $nama_pemilik ?></b></td>
                                 </tr>
                                 <tr>
                                    <td rowspan="2" width="50"><b>Periode(Bulanan)</b></td>
                                    <td colspan="2">
                                       <center><b>Mutasi debitur</b></center>
                                    </td>
                                    <td colspan="2">
                                       <center><b>Mutasi kredit</b></center>
                                    </td>
                                    <td rowspan="2"><b>Saldo Rp.(000)</b></td>
                                 </tr>
                                 <tr>
                                    <td>
                                       <center><b>Frekuensi</b></center>
                                    </td>
                                    <td>
                                       <center><b>Rp.(000)</b></center>
                                    </td>
                                    <td>
                                       <center><b>Frekuensi</b></center>
                                    </td>
                                    <td>
                                       <center><b>Rp.(000)</b></center>
                                    </td>
                                 </tr>

                                 <?php
                                 for ($i = 0; $i < count($exp_periode); $i++) { ?>
                                    <tr>
                                       <td><?php echo $exp_periode[$i] ?></td>
                                       <td>
                                          <center><?php echo $exp_frek_debet[$i] ?></center>
                                       </td>
                                       <td>
                                          <center><?php echo $exp_nominal_debet[$i] ?></center>
                                       </td>
                                       <td>
                                          <center><?php echo $exp_frek_kredit[$i] ?></center>
                                       </td>
                                       <td>
                                          <center><?php echo $exp_nominal_kredit[$i] ?></center>
                                       </td>
                                       <td>
                                          <center><?php echo $exp_saldo[$i] ?></center>
                                       </td>
                                    </tr>
                                 <?php } ?>

                              <?php  } ?>
                           </table>
                        </td>
                        <td colspan="5">
                           <table style="vertical-align: top">
                              <tr>
                                 <td>Tujuan Pembukaan rekening</td>
                                 <td>: <?php echo $tujuan_pembukaan_rek ?></td>
                              </tr>
                              <tr>
                                 <td>Penghasilan utama pertahun</td>
                                 <td>: <?php echo number_format($penghasilan_per_tahun) ?></td>
                              </tr>
                              <tr>
                                 <td>Sumber penghasilan</td>
                                 <td>: <?php echo $sumber_penghasilan ?></td>
                              </tr>
                              <tr>
                                 <td>Pemasukan perbulan</td>
                                 <td>: <?php if ($pemasukan_per_bulan == "A") {
                                          echo "< RP.1.000.000";
                                       } else if ($pemasukan_per_bulan == "B") {
                                          echo "RP.1.000.000,- s/d RP.2.000.000,-";
                                       } else if ($pemasukan_per_bulan == "C") {
                                          echo "> RP.2.000.000,- s/d RP.5.000.000,-";
                                       } else if ($pemasukan_per_bulan == "D") {
                                          echo "> RP.5.000.000,- s/d RP.10.000.000,-";
                                       } else if ($pemasukan_per_bulan == "E") {
                                          echo "> RP.10.000.000,-";
                                       } ?>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Pengeluaran perbulan</td>
                                 <td>: <?php if ($pengeluaran_per_bulan == "A") {
                                          echo "< RP.1.000.000";
                                       } else if ($pengeluaran_per_bulan == "B") {
                                          echo "RP.1.000.000,- s/d RP.2.000.000,-";
                                       } else if ($pengeluaran_per_bulan == "C") {
                                          echo "> RP.2.000.000,- s/d RP.5.000.000,-";
                                       } else if ($pengeluaran_per_bulan == "D") {
                                          echo "> RP.5.000.000,- s/d RP.10.000.000,-";
                                       } else if ($pengeluaran_per_bulan == "E") {
                                          echo "> RP.10.000.000,-";
                                       } ?>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Frek. Trans Pengeluaran</td>
                                 <td>: <?php if ($frek_trans_pengeluaran == "A") {
                                          echo "0-5 Kali";
                                       } else if ($frek_trans_pengeluaran == "B") {
                                          echo "6-10 Kali";
                                       } else if ($frek_trans_pengeluaran == "C") {
                                          echo "11-15 Kali";
                                       } else if ($frek_trans_pengeluaran == "D") {
                                          echo "> RP.5.000.000,- s/d RP.10.000.000,-";
                                       } ?>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Sumber dana utama setoran</td>
                                 <td>: <?php echo $sumber_dana_setoran ?></td>
                              </tr>
                              <tr>
                                 <td>Tujuan penggunaan dana</td>
                                 <td>: <?php echo $tujuan_pengeluaran_dana ?></td>
                              </tr>
                              <tr>
                                 <td>No Rek Bank</td>
                                 <td>: <?php echo $no_rekening ?></td>
                              </tr>
                           </table>
                        </td>
                     </tr>

                     <tr>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>ASPEK KUALITATIF (VERIFIKASI BY PHONE & DOKUMEN)</center>
                        </th>
                        <th colspan="5" rowspan="2" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>PENYIMPANGAN</center>
                        </th>
                     </tr>
                     <tr>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 7px">
                           <center>Analisa Kualitatif (1P + 5C)</center>
                        </th>
                     </tr>
                     <tr>
                        <td colspan="5">
                           <table>
                              <tr>
                                 <td>
                                    <pre><?php echo $kualitatif_analisa ?></pre>
                                 </td>
                              </tr>
                           </table>
                        </td>
                        <td colspan="5">
                           <table>
                              <tr>
                                 <td>Penyimpangan Struktur Dan Resiko : </td>
                              </tr>
                              <tr>
                                 <td>
                                    <pre><?php echo $penyimpangan_struktur ?> </pre>
                                 </td>
                              </tr>
                              <!-- <tr>
                                 <td>Penyimpangan dokument : </td>
                              </tr> -->
                              <!-- <tr>
                                 <td>
                                    <pre><?php echo $penyimpangan_dokumen ?></pre>
                                 </td>
                              </tr> -->
                           </table>
                        </td>
                     </tr>

                     <tr>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 7px">
                           <center>Analisa SWOT</center>
                        </th>
                        <th colspan="5" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>REKOMENDASI CA</center>
                        </th>
                     </tr>


                     <tr>
                        <td colspan="5">
                           <table>
                              <tr>
                                 <td>Strength</td>
                                 <td>:</td>
                                 <td>
                                    <pre class="form-control" rows="10" cols="100"><?php echo $kualitatif_strenght ?></pre>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Weaknes</td>
                                 <td>:</td>
                                 <td>
                                    <pre class="form-control"><?php echo $kualitatif_weakness ?></pre>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Opportunity</td>
                                 <td>: </td>
                                 <td>
                                    <pre><?php echo $kualitatif_opportunity ?></pre>
                                 </td>
                              </tr>
                              <tr>
                                 <td>Threatnes</td>
                                 <td>:</td>
                                 <td>
                                    <pre><?php echo $kualitatif_threatness ?></pre>
                                 </td>
                              </tr>
                           </table>
                        </td>
                        <td colspan="5">
                           <table>
                              <tr>
                                 <td>Rekomendasi Nilai pinjaman</td>
                                 <td>: <?php echo number_format($recom_nilai_pinjaman) ?></td>
                              </tr>
                              <tr>
                                 <td>Rekomendasi Tenor</td>
                                 <td>: <?php echo number_format($recom_tenor) ?></td>
                              </tr>
                              <tr>
                                 <td>Rekomendasi Angsuran</td>
                                 <td>: <?php echo number_format($recom_angsuran) ?></td>
                              </tr>
                              <tr>
                                 <td>Rekomendasi Produk kredit</td>
                                 <td>: <?php echo $produk_ca ?></td>
                              </tr>
                              <tr>
                                 <td>Bunga pijaman</td>
                                 <td>: <?php echo $suku_bunga_ca . "%" ?></td>
                              </tr>
                              <tr>
                                 <td>Nama credit analist</td>
                                 <td>: <?php echo $nama_ca ?></td>
                              </tr>

                           </table>
                        </td>
                     </tr>
                     <tr>
                        <th colspan="10" align="center" style="background-color: yellow;color: black;font-size: 10px">
                           <center>STRUKTUR PINJAMAN</center>
                        </th>
                     </tr>
                     <tr>
                        <td colspan="5">
                           <table style="width: 100%">
                              <tr>
                                 <td width="150">Produk</td>
                                 <td><?php echo $produk_ca ?></td>
                              </tr>
                              <tr>
                                 <td>Plafon kredit</td>
                                 <td><?php echo number_format($plafon_kredit_ca) ?></td>
                              </tr>
                              <tr>
                                 <td>Jangka waktu</td>
                                 <td><?php echo $jangka_waktu_ca ?></td>
                              </tr>
                              <tr>
                                 <td>suku bunga</td>
                                 <td><?php echo $suku_bunga_ca . "%" ?></td>
                              </tr>
                              <tr>
                                 <td>Pembayaran bunga / Bln</td>
                                 <td><?php echo number_format($pembayaran_bunga_ca) ?></td>
                              </tr>
                              <tr>
                                 <td>Akad kredit</td>
                                 <td><?php echo $akad_kredit_ca ?></td>
                              </tr>
                              <tr>
                                 <td>Ikatan agunan</td>
                                 <td><?php echo $ikatan_agunan_ca ?></td>
                              </tr>
                              <tr>
                                 <td>Biaya provisi</td>
                                 <td><?php echo number_format($biaya_provisi_ca) ?></td>
                              </tr>
                              <tr>
                                 <td>Biaya adminisrasi</td>
                                 <td><?php echo number_format($biaya_administrasi_ca) ?></td>
                              </tr>
                              <tr>
                                 <td>Biaya credit checking</td>
                                 <td><?php echo number_format($biaya_credit_checking_ca) ?></td>
                              </tr>
                              <!--                                 <tr>
                                    <td>Asuransi jiwa</td>
                                    <td><?php echo $biaya_asuransi_jiwa_ca ?></td>
                                 </tr>
                                 <tr>
                                    <td>Asuransi jaminan</td>
                                    <td><?php echo $biaya_asuransi_jaminan_ca ?></td>
                                 </tr> -->
                              <tr>
                                 <td>Notaris</td>
                                 <td><?php echo number_format($notaris_ca) ?></td>
                              </tr>
                              <tr>
                                 <td>Biaya tabungan</td>
                                 <td><?php echo number_format($biaya_tabungan_ca) ?></td>
                              </tr>
                           </table>
                        </td>
                        <td colspan="5">
                           <table style="width: 100%">
                              <tr>
                                 <td width="150"><b>Asuransi jiwa</b></td>
                              </tr>
                              <tr>
                                 <td>Nama asuransi</td>
                                 <td><?php echo $nama_asuransi ?></td>
                              </tr>
                              <tr>
                                 <td>Jangka waktu</td>
                                 <td><?php echo $jangka_waktu_asuransi ?></td>
                              </tr>
                              <tr>
                                 <td>Nilai pertanggungan</td>
                                 <td><?php echo number_format($nilai_pertanggungan) ?></td>
                              </tr>
                              <tr>
                                 <td>Tanggal jth tempo</td>
                                 <td><?php echo $jatuh_tempo ?></td>
                              </tr>
                              <tr>
                                 <td>Berat badan</td>
                                 <td><?php echo $berat_badan_asuransi ?></td>
                              </tr>
                              <tr>
                                 <td>Tinggi badan</td>
                                 <td><?php echo $tinggi_badan_asuransi ?></td>
                              </tr>
                              <tr>
                                 <td>Umur nasabah</td>
                                 <td><?php echo $umur_nasabah ?></td>
                              </tr>

                              <tr>
                                 <td><b>Asuransi jaminan kebakaran</b></td>
                              </tr>
                              <tr>
                                 <td>Nama asuransi</td>
                                 <td><?php echo $nama_asuransi_jaminan_kebakaran ?></td>
                              </tr>
                              <tr>
                                 <td>Jangka waktu</td>
                                 <td><?php echo $jangka_waktu_jaminan_kebakaran ?></td>
                              </tr>
                              <tr>
                                 <td>Nilai pertanggungan</td>
                                 <td><?php echo number_format($nilai_pertanggungan_jaminan_kebakaran) ?></td>
                              </tr>
                              <tr>
                                 <td>Tanggal jth tempo</td>
                                 <td><?php echo $jatuh_tempo_jaminan_kebakaran ?></td>
                              </tr>

                              <tr>
                                 <td><b>Asuransi jaminan kendaraan</b></td>
                              </tr>
                              <tr>
                                 <td>Nama asuransi</td>
                                 <td><?php echo $nama_asuransi_jaminan_kendaraan ?></td>
                              </tr>
                              <tr>
                                 <td>Jangka waktu</td>
                                 <td><?php echo $jangka_waktu_jaminan_kendaraan ?></td>
                              </tr>
                              <tr>
                                 <td>Nilai pertanggungan</td>
                                 <td><?php echo number_format($nilai_pertanggungan_jaminan_kendaraan) ?></td>
                              </tr>
                              <tr>
                                 <td>Tanggal jth tempo</td>
                                 <td><?php echo $jatuh_tempo_jaminan_kendaraan ?></td>
                              </tr>
                           </table>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
      </div>
   </div>
</div>