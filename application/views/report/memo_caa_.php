
<div class="book">
 <div class="page" style="font-size: 10px;">
		<div class="table-responsive">
			<table border="0" style="width: 100%;font-size: 10px;">
				<tr>
					<th colspan="6" align="center" style="background-color: white;color: black;font-size: 12px"><center>KEPUTUSAN KREDIT BERDASARKAN CREDIT AUTORITY APPROVAL</center></th>
				</tr>
         </table>
         <table border="1" style="width: 100%;font-size: 10px;" cellspacing="-1">
            <tr>
               <td width="200">Nama debitur</td>
               <td><?php echo $nama_debitur ?></td>
            </tr>
            <tr>
               <td width="200">Plafon pengajuan</td>
               <td>Rp. <?php echo number_format($plafon_pengajuan) ?></td>
            </tr>
            <tr>
               <td width="200">Tenor</td>
               <td><?php echo $tenor ?> bulan</td>
            </tr>
            <tr>
               <td width="200">Jaminan</td>
               <td><?php echo $jaminan ?></td>
            </tr>
         </table><br>
         <?php
         $a = 0;
            foreach ($list_approver as $key) {
               $jabatan = $key['jabatan'];
               $nama_pic = $key['nama_pic'];
               $plafon = $key['plafon'];
               $tenor_app = $key['tenor'];
               $status_app = $key['status'];
               $rincian = $key['rincian'];

              echo  '<table border="1" style="width: 100%;font-size: 10px; vertical-align:top" cellspacing="-1">
                        <tr>
                           <td width="200">'.$jabatan.' : '.$nama_pic.'</td>
                           <td>Plafond : '.number_format($plafon).' Tenor : '.$tenor_app.' </td>
                           <td width="100"><center>Paraf</center></td>
                        </tr>
                        <tr>
                           <td colspan="2" height="100">'.$rincian.'</td>
                        </tr>
                     </table><br>';

            }
         ?>
      </div>
   </div>
</div>
