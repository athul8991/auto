var degr
var admManage =true,adManage=true;
var aproove=true;
let getVal;





$(document).ready(()=>{
  rotation('#admManage',90)
  rotation('#adManage',90)
  rotation('#aproove',90)
  openNav();

$('#open').click(()=>{
  openNav();
})
$('#close').click(()=>{
  closeNav();
})

$('#admManage').click(()=>{
  run('#admManage')

  $('#adminmenu').slideToggle("slow");

});

$('#adManage').click(()=>{
  run("#adManage")

  $('#admenu').slideToggle("slow");
});

$('#aproove').click(()=>{
  run('#aproove')

  $('#aproovemenu').slideToggle("slow");
})

})

function run(id){
  

  if(id==='#admManage'){
    if(admManage === false ){    
    rotation(id,90)
    admManage =true
   
    }else{
      rotation(id,-90)
      admManage =false

    }
  }else if(id==='#aproove'){
    if(aproove === false){
    
      rotation(id,90)
      aproove =true
     
      }else{
        rotation(id,-90)
        aproove =false
  
      }

  }else if(id==='#adManage'){
    if(adManage === false){
    
      rotation(id,90)
      adManage =true
     
      }else{
        rotation(id,-90)
        adManage =false
  
      }

  }

  }
  
  function rotation(id,degree){
    $(id).find('.fa-caret-down').animate(
      { deg: degree },
      {
        duration: 900,
        step: function(now) {  
        
          $(this).css({ transform: 'rotate(' + now + 'deg)' } );

  }
      })
  }

  function subRotate(id){
      if(id =='adminmenu'){
            admManage =true;
            run('#admManage');
          }else if(id=='admenu'){
            adManage =true;
            run('#adManage');
            
          }else if(id=='aproovemenu'){
            aproove =true;
            run('##aproove');
            
          }
  }


// if(flag==true){
//   degr =-90;
//   console.log(flag)
// }else{
//   degr =90
//   console.log(flag)
// }


//     if(degr==-90){
//       flag=1;
//     }else{
//       flag=true
//     }  
  
//   }



function openNav() {
$("#mySidenav").animate({'width':'250px'},'slow');

$("#main").animate({'margin-left':'250px'},'slow');
$("#close").css('display','block');
$("#open").css('display','none')

}

function closeNav() {

$('#mySidenav').animate({'width':'0px'},'slow');
$('#main').animate({'margin-left':'0px'},'slow')
$("#open").css('display','block')



}


// var w;
// $(document).ready(function(){
   
// $(window).load(function() {

//  w = $(window).width();
//  checkWidth(w)

// });

// $(window).resize(()=>{
//   w = $(window).width();
//   checkWidth(w)
// })



// })


// function checkWidth(width){
// console.log(width)
// if(width<=767){
//    $('#sidebar').removeClass('show')
//   $('#sideNav').addClass('hidden')
//   $('togleNav').removeClass('hidde')
//   $('#togleNav').addClass('sho')
  

// }else{
//   $('#sideNav').removeClass('hidden')
//   $('#sideNav').addClass('show');
//   $('togleNav').removeClass('sho')
//   $('togleNav').addClass('hidde')
   
// }
// }
// $('#togleNav').click(()=>{
// $('#sideNav').toggle();
// })
        