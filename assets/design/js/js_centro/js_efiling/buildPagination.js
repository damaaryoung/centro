const buildPagination = (JSONResponseFromServer) => {
  const json = JSONResponseFromServer
  let links = "";
  const paginate = $("ul.pagination");
  const nextPageURL = json.next_page_url;
  const prevPageURL = json.prev_page_url;
  const lastPageURL = json.last_page_url;
if (null === prevPageURL) {
    links += `
          <li class="paginate_button page-item disabled" id="tb_detail_first">
              <a href="JavaScript:void(0);" aria-controls="tb_detail" data-dt-idx="0" tabindex="0" class="page-link">First</a>
          </li>
          <li class="paginate_button page-item disabled" id="tb_detail_previous">
          <a href="JavaScript:void(0);" aria-controls="tb_detail" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
          </li>
          `;
}
if (null !== prevPageURL) {
    links += `
          <li class="paginate_button page-item first" id="tb_detail_previous">
            <a href="JavaScript:void(0);" data-dt-href="${json.first_page_url}" aria-controls="tb_detail" data-dt-idx="${
            json.first_page_url}" tabindex="0" class="page-link">First</a>
          </li>
          <li class="paginate_button page-item previous" id="tb_detail_previous">
            <a href="JavaScript:void(0);" data-dt-href="${json.prev_page_url}" aria-controls="tb_detail" data-dt-idx="${
              json.current_page - 1}" tabindex="0" class="page-link">Previous</a>
          </li>`;
}
if (null !== lastPageURL) {
    links += `
          <li class="paginate_button page-item disabled" id="tb_detail_ellipsis">
            <a href="#" aria-controls="tb_detail" data-dt-idx="1" tabindex="0" class="page-link">Page ${json.current_page} of ${json.last_page}</a>
          </li>`;
}
if (null === nextPageURL) {
    links += `
          <li class="paginate_button page-item  disabled" id="tb_detail_next">
            <a href="JavaScript:void(0);" aria-controls="tb_detail" data-dt-idx="0" tabindex="0" class="page-link">Next</a>
          </li>
          <li class="paginate_button page-item  disabled" id="tb_detail_last">
            <a href="JavaScript:void(0);" aria-controls="tb_detail" data-dt-idx="0" tabindex="0" class="page-link">Last</a>
          </li>`;
}
if (null !== nextPageURL) {
    links += `
          <li class="paginate_button page-item next" id="tb_detail_next">
            <a href="JavaScript:void(0);" data-dt-href="${json.next_page_url}" aria-controls="tb_detail" data-dt-idx="${json.current_page + 1}" tabindex="0" class="page-link">Next</a>
          </li>
          <li class="paginate_button page-item last" id="tb_detail_last">
            <a href="JavaScript:void(0);" data-dt-href="${json.last_page_url}" aria-controls="tb_detail" data-dt-idx="${json.last_page}" tabindex="0" class="page-link">Last</a>
          </li>`;
}

paginate.html("").append(links);
};