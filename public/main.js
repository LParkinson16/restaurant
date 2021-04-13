<script>
    var n = localStorage.getItem('on_load_counter');
    if (n === null) {
        n = 0;
    }
    n++;
    localStorage.setItem("on_load_counter", n);
    document.querySelector('#counter').innerText = `Visits to this page: ${localStorage.getItem('on_load_counter')}`
</script>