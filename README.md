
New searchable publications table for a new publications page. [Demo site here](https://uwctri.github.io/Publications_Page/)

* style.css contains all UW default styling, nothing new
* site.js holds all of the important stuff
* The only new tags in the index are the "New CDNs" section and `<table id="mainDataTable"></table>`
* The `site.less` file can be compiled via `lessc -ru=all site.less -x > site.css`

## 2023 Version

The [site was taken live](https://ctri.wisc.edu/researchers/uw-ctri-research-papers/) by inserting the below into a new Google Tag Manager tag that triggers on the specific page URL. Data is pulled as a CSV from a published [google sheet](https://docs.google.com/spreadsheets/u/6/d/e/2PACX-1vRfGyGPkZg8sJGuKa3XvAU1Cr7_tf-Wm4JIrKkNsP-tyNa0jowVhayJypx3wYy-ifxQ7CPNjNOKoUPQ/pub?gid=1937609001&single=true). A small snippet of HTML is still needed in WiscWeb to provide an anchor for the table and display a message if the tag can't be loaded (i.e. Ad Blocker). Migration to GTM is due to UW Doit ending support for js in WiscWeb in early 2023.

**GTM**
```
<script>
    console.log("Loading GTM CTRI Table Code");
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap5.min.js"></script>
<script src="https://uwctri.github.io/Publications_Page/site.js"></script>
<link rel="stylesheet" href="https://uwctri.github.io/Publications_Page/site.css">
```

**WiscWeb**
```
<table id="mainDataTable"></table>
<div id="gtmNoLoad"><div class="text-center"><h3>Loading...</h3><span>Not loading? This page uses Google Tag Manager which might be blocked by your Ad Blocker.</span></div></div>
```

## 2022 Version

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
