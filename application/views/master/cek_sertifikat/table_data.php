<table class="table table-sm table-hover table-bordered">
  <thead>
      <tr>
          <th>no</th>
          <th>nomor so</th>
          <th>nama cabang</th>
          <th>nama lengkap</th>
          <th>plafon</th>
          <th>status</th>
          <th width="10">ACT</th>
      </tr>
  </thead>
  <tbody style="font-size: 13px !important;">
    <?php
    $limit = 10;
    $limit_start = ($page - 1) * $limit;
    $no = $limit_start + 1;
     ?>
    <?php foreach ($data as $key): ?>
      <tr>
        <td><?= $no; ?></td>
        <td>
          <button type="button" class="btn btn-block btn-default btn-xs">
            <?= $key['nomor_so']; ?>
          </button>
        </td>
        <td><?= $key['nama_cabang']; ?></td>
        <td><?= $key['nama_lengkap']; ?></td>
        <td>Rp. <?= number_format($key['plafon']); ?></td>
        <td>
          <button type="button" class="btn btn-block btn-outline-<?php if($key['status_sertifikat'] == 'MASUK'){echo 'success';}else if($key['status_sertifikat'] == 'PINJAM'){echo 'warning';} else{echo 'danger';}?> btn-xs">
            <?= $key['status_sertifikat'] ?>
          </button>
        </td>
        <td>
          <div class="btn-group">
              <button type="button" class="btn btn-primary btn-sm" onclick="view('<?= $key['id']; ?>');" data-toggle="tooltip" data-placement="left" title="Check Data"><i class="fas fa-search"></i></button>
              <a href="<?= base_url().'index.php/report/Cek_sertifikat_report/index/'.$key["id"]; ?>" target="_blank" class="btn btn-warning btn-sm" data-toggle="tooltip" data-placement="right" title="Generate PDF"><i class="fas fa-download"></i></a>
            </div>
        </td>
      </tr>
    <?php $no++; endforeach; ?>
  </tbody>
  <tfoot>
    <tr>
      <th>no</th>
      <th>nomor so</th>
      <th>nama cabang</th>
      <th>nama lengkap</th>
      <th>plafon</th>
      <th>status</th>
      <th width="10">ACT</th>
    </tr>
  </tfoot>
</table>
<div class="text-center">
  <ul class="pagination">
    <?php
    $jumlah_page = $pagination;

    $jumlah_number = 3 ; //jumlah halaman ke kanan dan kiri dari halaman yang aktif
    $start_number = ($page > $jumlah_number)? $page - $jumlah_number : 1;
    $end_number = ($page < ($jumlah_page - $jumlah_number))? $page + $jumlah_number : $jumlah_page;

    if($page == 1){
      echo '<li class="page-item disabled" onclick="pagination(1);"><a class="page-link" href="#">First</a></li>';
      echo '<li class="page-item disabled" onclick="pagination(1);"><a class="page-link" href="#"><span aria-hidden="true">&laquo;</span></a></li>';
    } else {
      $link_prev = ($page > 1)? $page - 1 : 1;
      echo '<li class="page-item halaman" onclick="pagination(1);"><a class="page-link" href="#">First</a></li>';
      echo '<li class="page-item halaman" onclick="pagination('.$link_prev.');"><a class="page-link" href="#"><span aria-hidden="true">&laquo;</span></a></li>';
    }

    for($i = $start_number; $i <= $end_number; $i++){
      $link_active = ($page == $i)? ' active' : '';
      echo '<li class="page-item halaman '.$link_active.'" onclick="pagination('.$i.');"><a class="page-link" href="#">'.$i.'</a></li>';
    }

    if($page == $jumlah_page){
      echo '<li class="page-item disabled"><a class="page-link" href="#"><span aria-hidden="true">&raquo;</span></a></li>';
      echo '<li class="page-item disabled"><a class="page-link" href="#">Last</a></li>';
    } else {
      $link_next = ($page < $jumlah_page)? $page + 1 : $jumlah_page;
      echo '<li class="page-item halaman" id="'.$link_next.'"><a class="page-link" href="#"><span aria-hidden="true">&raquo;</span></a></li>';
      echo '<li class="page-item halaman" id="'.$jumlah_page.'"><a class="page-link" href="#">Last</a></li>';
    }
    ?>
  </ul>
</div>
