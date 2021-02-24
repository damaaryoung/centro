<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'LoginController';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['dashboard'] = 'DashboardController/index';
$route['bss'] = 'BSSController/index';
$route['entry_asset_document'] = 'AsetDokumenEntryController/index';
$route['verifikasi_aset_dokumen'] = 'AsetDokumenVerifikasiController/index';
$route['pemindahan_jaminan'] = 'PemindahanJaminanMainController/index';
$route['verifikasi_pemindahan_jaminan'] = 'PemindahanVerifikasiController/index';
$route['user_access']= 'UserAccessController/index';
$route['user_access_group']= 'UserAccessController/groupAccessIndex';
$route['request_jaminan_centro']= 'Request_Jaminan_Centro_Controller/index';
$route['request_jaminan_verifikasi']= 'Request_Jaminan_Verifikasi_Controller/index';
$route['update_kirim_jaminan']= 'Update_Kirim_Jaminan_Controller/index';
$route['update_kirim_jaminan_verifikasi']= 'Update_Kirim_Jaminan_Verifikasi_Controller/index';
$route['e_filing'] = 'E_FilingController/index';
$route['rekap_titipan_asuransi_jaminan'] = 'Asuransi/Rekap_titipan_asuransi_controller/view_rekap_jaminan';
$route['rekap_titipan_asuransi_jiwa'] = 'Asuransi/Rekap_titipan_asuransi_controller/view_rekap_jiwa';
$route['cover_asuransi_jaminan'] = 'Asuransi/Cover_asuransi_controller/view_cover_jaminan';
$route['cover_asuransi_jiwa'] = 'Asuransi/Cover_asuransi_controller/view_cover_jiwa';
$route['polis_asuransi_jaminan'] = 'Asuransi/Polis_asuransi_jaminan_controller/main_view_polis_asuransi_jaminan';
$route['polis_asuransi_jiwa'] = 'Asuransi/Polis_asuransi_jiwa_controller/main_view_polis_asuransi_jiwa';
$route['pengajuan_klaim_asuransi_jaminan'] = 'Asuransi/Pengajuan_klaim_asuransi_controller/menu_klaim_jaminan';
$route['pengajuan_klaim_asuransi_jiwa'] = 'Asuransi/Pengajuan_klaim_asuransi_controller/menu_klaim_jiwa';
$route['proses_klaim_asuransi'] = 'Asuransi/Proses_klaim_asuransi_controller/index';
$route['laporan_asuransi'] = 'Asuransi/Laporan_asuransi_controller/index';