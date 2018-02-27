
 //alert($("h3").text());


$(document).ready(function(){ //sayfa yüklendikten sonra

    
    var h3_icerik=$("h3").text();
    //console.log(h3_icerik);
    // alert($("h3").text());
    //  <% %>

    // var slogan= $(".slogan").text();
    // console.log(slogan);

    /*
    var slogan = $("#baslik").text();
    console.log(slogan);
    */
    var h3_elementi=$("#baslik"); //get
    var h3_icerik=h3_elementi.text();
    //$("#icerik").text(h3_icerik); //set 

    // $("#icerik").html("<p>paragraf içeriği</p>");
    
    var input_ilkdeger=$("#arama").val();//get
    //console.log(input_deger);
    // $("#arama").val("Ara..");//set
    // var input_yenideger=$("#arama").val();
    // $("#icerik").append("<h4>"+input_ilkdeger+" </h4>");
    //$("#icerik").append("<h4>"+input_yenideger+" </h4>");

    //$("#icerik").prepend("<h3>"+input_yenideger+"</h3>");

    /*
    var kisi={
        "id":12,
        "isim":"adem",
        "soyisim":"balci" 
    }

    $("#tablo-icerik").html("<tr> <td>"+kisi.id+"</td><td>"+kisi.isim+"</td><td>"+kisi.soyisim+"</td><td>  <button class='btn btn-warning'>Detay</button> <button class='btn btn-danger'>Sil</button>  </td></tr>");
    //kisi.id

   
        // <tag> </tag>
  
   

    $("#tablo-icerik").append("<tr> <td>"+kisi2.id+"</td><td>"+kisi2.isim+"</td><td>"+kisi2.soyisim+"</td><td>  <button class='btn btn-warning'>Detay</button> <button class='btn btn-danger'>Sil</button>  </td></tr>");
*/
    
    

    // var dizi=[ 
    //         kisi3={
    //             "id":12,
    //             "isim":"adem",
    //             "soyisim":"balci" 
    //         },
    //         kisi4={
    //             "id":15,
    //             "isim":"harun",
    //             "soyisim":"ozbek",
    //             "meslekler":{
    //                 "meslek1":"Programci",
    //                 "meslek2":"Yazilimci" 
    //             }
    //         } 
    // ]
    
    //console.log(dizi);

    var liste=[];

    $.ajax({
        url:"https://api.github.com/repositories?since=364",
        type:"get",
        dataType:"json",
        success:function(json_icerikler){
            //console.log(json_icerikler);
            var sayac=1;
             $.each(json_icerikler,function(index,nesne){
                 
                if(sayac<11)
                {
                    var item={
                        "id":null,
                        "isim":null,
                        "url":null
                    };
                    item.id=nesne.id;
                    item.isim=nesne.name;
                    item.url=nesne.url;
                    liste.push(item);
                }
               sayac++; 

             });

             console.log(liste);
             listeBind(liste);
             listeFiltre();
             listeDetay();

        }

    });
     
    var kisi={
        "id":12,
        "isim":"adem",
        "soyisim":"balci" 
    }
    var kisi2={
        "id":15,
        "isim":"harun",
        "soyisim":"ozbek",
        "meslekler":{
               "meslek1":"Programci",
               "meslek2":"Yazilimci" 
        }
    }

    var kisiler=[];
    kisiler.push(kisi);
    kisiler.push(kisi2);
    console.log(kisiler);

    /*
    $.each(kisiler,function(index,nesne){
        //console.log(nesne.isim);
        $("#tablo-icerik").append("<tr> <td>"+nesne.id+"</td><td>"+nesne.isim+"</td><td>"+nesne.soyisim+"</td><td>  <button class='btn btn-warning'>Detay</button> <button class='btn btn-danger'>Sil</button>  </td></tr>");
    });
    */
    
    function listeBind(liste){
      for(var i=0;i<liste.length;i++){
        $("#tablo-icerik").append("<tr> <td>"+liste[i].id+"</td><td>"+liste[i].isim+"</td><td>"+liste[i].url+"</td><td>  <button type='button' class='github_item btn btn-warning' data-id="+liste[i].id+">Detay</button> <button class='btn btn-danger'>Sil</button>  </td></tr>");
      }    
    }

    function listeFiltre(){
        $("#arama").on("keyup",function(){
            var aranan_deger=$(this).val();
            $("#tablo-icerik tr").each(function(){

                if($(this).children("td:nth-of-type(2)").text().toUpperCase().indexOf(aranan_deger.toUpperCase())>-1){
                    $(this).show();
                  } 
                  else{
                      $(this).hide();
                  }

            });

             
        });
    }

    function listeDetay(){
        
        $(".github_item").on("click",function(){
            var tiklanan_id=$(this).data("id");
            console.log(tiklanan_id);
            var nesne=listeAra(tiklanan_id);
            console.log(nesne);
            $("#name").val(nesne.isim);
            $("#url").val(nesne.url);
        });
    }

    function listeAra(aranan_id){
        for(var i=0;i<liste.length;i++){
            if(liste[i].id==aranan_id){ 
               console.log(liste[i]);
               return liste[i];
           }
        }
        
    }



});

// $(function(){

//     alert($("h3").text());


// });