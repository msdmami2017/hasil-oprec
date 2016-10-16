function loadXMLDoc(xmlfile) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      keluarkan(this);
    }
  };
  xmlhttp.open("GET", "data/"+xmlfile, true);
  xmlhttp.send();
}

function keluarkan(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>No</th><th>Nama</th><th>NIM</th><th>Fakultas/Jurusan</th></tr>";
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

  var divisi = xmlDoc.getElementsByTagName("divisi")[0];
  var nama = divisi.getElementsByTagName("nama")[0].childNodes[0].nodeValue;
  var ketua = divisi.getElementsByTagName("ketua")[0].childNodes[0].nodeValue;

  document.getElementById("namadivisi").innerHTML = nama;
  document.getElementById("kadiv").innerHTML = "Ketua Divisi: "+ketua;
}