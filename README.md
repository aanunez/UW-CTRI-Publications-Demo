
UW Doit will be stripping script tags in 2023, this page will need to be migrated to a Google Tag Manager before then.

##

New searchable publications table for a new publications page. [Demo site here](https://uwctri.github.io/Publications_Page/)

* style.css contains all UW default styling, nothing new
* site.js holds all of the important stuff
* The only new tags in the index are the "New CDNs" section and `<table id="mainDataTable"></table>`
* The `site.less` file can be compiled via `lessc -ru=all site.less -x > site.css`

The [site was taken live](https://ctri.wisc.edu/researchers/uw-ctri-research-papers/) by inserting the below into WiscWeb. Data is pulled as a CSV from a published [google sheet](https://docs.google.com/spreadsheets/d/e/2PACX-1vT6OITFMbQ5y4dDwRdcPZCoMY6Kp2lGyBZb8kS8hKVCyIq6ItYBXQR-rUByrClzUwEFum7FPCd-L0ya/pub?gid=1937609001&single=true&output=csv).

```
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap5.min.js"></script>
<script src="https://uwctri.github.io/Publications_Page/site.js"></script>
<script>
(function(){
    jQuery("main p br").remove();
    var link = document.createElement('link'); 
    link.rel = 'stylesheet'; 
    link.type = 'text/css';
    link.href = 'https://uwctri.github.io/Publications_Page/site.css'; 
    document.getElementsByTagName('HEAD')[0].appendChild(link); 
})();
</script>
<table id="mainDataTable"></table>
```
