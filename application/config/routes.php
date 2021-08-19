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
$route['pengajuan_refund_asuransi_jaminan'] = 'Asuransi/Pengajuan_refund_asuransi_controller/menu_refund_jaminan';
$route['pengajuan_refund_asuransi_jiwa'] = 'Asuransi/Pengajuan_refund_asuransi_controller/menu_refund_jiwa';
$route['proses_refund_jiwa'] = 'Asuransi/Proses_refund_asuransi_controller/proses_refund_jiwa';
$route['proses_refund_jaminan'] = 'Asuransi/Proses_refund_asuransi_controller/proses_refund_jaminan';
$route['pengajuan_klaim_asuransi_jaminan'] = 'Asuransi/Pengajuan_klaim_asuransi_controller/menu_klaim_jaminan';
$route['pengajuan_klaim_asuransi_jiwa'] = 'Asuransi/Pengajuan_klaim_asuransi_controller/menu_klaim_jiwa';
$route['proses_klaim_jiwa'] = 'Asuransi/Proses_klaim_jiwa_controller/index';
$route['proses_klaim_jaminan'] = 'Asuransi/Proses_klaim_jaminan_controller/index';
$route['pengajuan_cis'] = 'Asuransi/Cash_in_save_controller/index';
$route['pengcoveran_cis'] = 'Asuransi/Cash_in_save_controller/index_cover';
$route['pengcoveran_cit'] = 'Asuransi/Cash_in_transit_controller/index';
$route['laporan_asuransi'] = 'Asuransi/Laporan_asuransi_controller/index';

//accounting
$route['rencana_realisasi'] = 'Accounting/Rencana_realisasi_controller/index';
$route['rencana_realisasi_master'] = 'Accounting/Rencana_realisasi_master_controller/index';
$route['dashboard_finance'] = 'Accounting/Dashboard_finance_controller/index';
$route['rasio_setting'] = 'Accounting/Rasio_setting_controller/rasio_setting';
$route['rasio_master'] = 'Accounting/Rasio_setting_controller/rasio_master';
$route['dashboard_ratio'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_capital';
$route['dashboard_asset'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_asset';
$route['dashboard_earning'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_earning';
$route['dashboard_liquidity'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_liquidity';
$route['dashboard_ratio_roe'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_tambahan_roe';
$route['dashboard_ratio_npl_gross'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_tambahan_npl_gross';
$route['dashboard_ratio_npl_net'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_tambahan_npl_net';
$route['dashboard_ratio_nim'] = 'Accounting/Dashboard_ratio_controller/rasio_dashboard_tambahan_nim';