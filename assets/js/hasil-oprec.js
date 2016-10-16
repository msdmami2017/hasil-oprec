$(function() {
    var division = [
        'Perizinan',
        'Edufair',
        'Workshop and Tour',
        'Tourlab',
        'Paguyuban Membangun',
        'SCUI',
        'Ekstrakampus',
        'Media Partner',
        'Publikasi',
        'Enterpreneurship',
        'Sponsorship',
        'Artistik',
        'Dokumentasi',
        'Materi dan Kajian',
        'Penelitian dan Pengembangan',
        'Akomodasi dan Transporatasi',
        'Logistik',
        'Produksi'
    ];
    var divisionItemTemplate =
        '<div class="col-md-4 col-sm-4 col-xs-6 division-item">'
            + '<div class="panel panel-default">'
                + '<div class="panel-heading"><span></span></div>'
            + '</div>'
        + '</div>';
    var divisionItemPlaceholder =
        '<div class="col-md-4 col-sm-4 col-xs-6 division-item division-item-placeholder">'
            + '<div class="panel panel-default">'
                + '<div class="panel-heading"><span></span></div>'
            + '</div>'
        + '</div>';
    var isShuffled = false;

    function initializePool() {
        var pool = $('.division-pool');
        pool.html('');
        for (i = 0; i < division.length; ++i) {
            var newDivisionItem = $($.parseHTML(divisionItemTemplate));
            newDivisionItem.data('division', division[i]);
            pool.append(newDivisionItem);
        }
        // append clear to make the well works
        pool.append('<div class="clear"></div>');
    }

    initializePool();

    function shuffle(){
        for(i = 1;i <= 100; ++i){
            var x = Math.floor(Math.random() * i) % division.length;
            var y = Math.floor(Math.random() * (i + 1)) % division.length;
            var temp = division[x];
            division[x] = division[y];
            division[y] = temp;
        }
        initializePool();
        reorderDivisionItem();
        isShuffled = true;
    }

    // initially, shuffle the options
    shuffle();
    $('#shuffle').click(shuffle);

    function reorderDivisionItem(ui) {
        // reorder the numbering
        $('.division-item:not(.ui-sortable-helper)').each(function(i, e) {
            // convert into jQuery object
            e = $(e);
            if (e.hasClass('division-item-placeholder')) {
                e = ui.helper;
            }
            var name = e.data('division');
            e.find('span').html('' + (i + 1) + '. ' + name);

            // bold the top three, replace them in text
            e.removeClass('division-item-top');
            if (i < 3) {
                e.addClass('division-item-top');
                $('.division-' + (i + 1)).html(name);
            }
        });
    }
    reorderDivisionItem();

    $('.division-pool').sortable({
        cursor: 'move',
        items: '.division-item',
        opacity: 0.8,
        update: function (event, ui) {
            reorderDivisionItem();
            isShuffled = false;
        },
        sort: function (event, ui) {
            reorderDivisionItem(ui);
        },
        placeholder: {
            element: function(clone, ui) {
                return $(divisionItemPlaceholder);
            },
            update: function() {}
        },
        revert: 300
    });

    $('input[required], textarea[required]').on('focusout change', function() {
        if (!$(this).val()) {
            $(this).addClass('error');
            $(this).closest('.form-group').find('.error-validation').show();
        } else {
            $(this).removeClass('error');
            $(this).closest('.form-group').find('.error-validation').hide();
        }
    });
    function validateInput() {
        var firstError = null;
        $('input[required], textarea[required]').each(function(i, e) {
        if ($(e).attr('type') == 'checkbox') {
            console.log($(e).is(':checked'));
        }
            if (!$(e).val() || ($(e).attr('type') == 'checkbox' && !($(e).is(':checked')))) {
                $(e).addClass('error');
                $(e).closest('.form-group').find('.error-validation').show();
                if (!firstError) {
                    firstError = $(e);
                }
            }
        });
        if (firstError) {
            firstError.focus();
            return false;
        } else {
            return true;
        }
    }

    function fillModal() {
        // nim-nama-telepon
        $('#identitas-review').html($('#nim').val() + " / " + $('#nama').val() + " / " + $('#nohp').val() + " / " +$('#idline').val());
        $('#email-review').html($('#email').val());
        $('#asal-review').html($('#asal').val());
        $('#alamat-review').html($('#alamat').val());
        $('#kendaraan-review').html($('#kendaraan').val());
                // division order
        var order = $('#division-review');
        order.html('<ol></ol>');
        $('.division-item').each(function(i, e) {
            order.find('ol').append('<li>' + $(e).data('division') + '</li>');
        });
        // reasons
        for (i = 1; i <= 3; ++i) {
            $('#reason' + i + '-review').html($('#reason' + i).val());
        }
    }

    $('.submit-button').click(function() {
        // TODO: validate form input
        if (!validateInput()) {
            return false;
        }
        fillModal();
        $('#review-modal').modal('show');
    });

    //////////////////////
    // google form related
    //////////////////////

    // google form key
    var formKey = "1FAIpQLSeJ0FPO3wUHQAQY71dpdyPGc_8uFF3fjyObuI2YJ6d4u1Fk-g";

    // google form entry key
    var formEntries = {
        nim:    "entry.1397779433",
        nama:   "entry.273207346",
        fakultas: "entry.2025349454",
        nohp:"entry.1034463475",
        idline: "entry.1692946345",
        email:"entry.348258832",
        asal:"entry.2141720591",
        alamat:"entry.1810565055",
        kendaraan: "entry.1617731198",

        division: [
            "entry.1961972845",
            "entry.230839591",
            "entry.163291784",
            "entry.1572834896",
            "entry.1637589576",
            "entry.1862256826",
            "entry.1165044075",
            "entry.523546817", //8
            "entry.1096319244",
            "entry.1468642187",
            "entry.1610983255",
            "entry.1251234627", //12
            "entry.706595353",
            "entry.1319771547",
            "entry.857502894",
            "entry.825806807",
            "entry.858898130", //17
            "entry.653942337",
        ],
        reason: [
            "entry.476804404",
            "entry.901127606",
            "entry.1539673561"
        ],
        shuffled:"entry.1038272303"
    };


    $('#real-submit-button').click(function() {
        // generate form link
        var url = "//docs.google.com/forms/d/e/" + formKey + "/formResponse";

        // prepopulate form
        var form = $('#main-form');
        form.attr('action', url);
        form.html('');

        // nim and nama and telepon, dan id line
        form.append('<input type="text" name="' + formEntries.nim + '" value="' + $('#nim').val() + '">');
        form.append('<input type="text" name="' + formEntries.nama + '" value="' + $('#nama').val() + '">');
        form.append('<input type="text" name="' + formEntries.fakultas + '" value="' + $('#fakultas').val() + '">');
        form.append('<input type="text" name="' + formEntries.nohp + '" value="' + $('#nohp').val() + '">');
        form.append('<input type="text" name="' + formEntries.idline + '" value="' + $('#idline').val() + '">');
        form.append('<input type="text" name="' + formEntries.email + '" value="' + $('#email').val() + '">');
        form.append('<input type="text" name="' + formEntries.asal + '" value="' + $('#asal').val() + '">');
        form.append('<input type="text" name="' + formEntries.alamat + '" value="' + $('#alamat').val() + '">');
        form.append('<input type="text" name="' + formEntries.kendaraan + '" value="' + $('#kendaraan').val() + '">');
        // division orders
        $('.division-item').each(function(i, e) {
            form.append('<input type="text" name="' + formEntries.division[i] + '" value="' + $(e).data('division') + '">');
        });

        // reasons
        for (i = 1; i <= 3; ++i) {
            form.append('<input type="text" name="' + formEntries.reason[i-1] + '" value="' + $('#reason' + i).val() + '">');
        }

        // shuffled/not?
        form.append('<input type="text" name="' + formEntries.shuffled + '" value="' + (isShuffled ? "ya" : "tidak") + '">');

        form.submit();
    });
});

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", "data/scuifix.xml", true);
  xmlhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><td>No</td><td>Nama</td><td>NIM</td><td>Fakultas/Jurusan</td></tr>";
  var x = xmlDoc.getElementsByTagName("record");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("no")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("nama")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("nim")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("jurusan")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("data").innerHTML = table;
}