$("#Pnum").keyup(function(data){
    let value = $('#Pnum').val();


    if(checknumeric(value)){
      
      if(checkLength(value.length)){
        $('#Pnum').removeClass('inputsuccess');
       
        
        $(this).css({'color':'red','border-bottom':'2px solid red'})
        $('#err').addClass('error');

        $('#err').text('Invalid phone number');
        
      }else{
        $('#err').removeClass('error');
        $(this).css({'color':'green','border-bottom':'2px solid green'})

         $('#Pnum').addClass('inputSuccess');
         
         $('#err').text('');
      }
    }else{
      $('#Pnum').removeClass('inputsuccess'); 

      $('#err').addClass('error');
      $(this).css({'color':'red','border-bottom':'2px solid red'})
  
      
      $('#err').text('Invalid phone number');
        }
  

  });

  function checknumeric(CheckItem){
    if($.isNumeric(CheckItem)){
      return true;
    }else{
      return false;
    }
  }
  

  function checkLength(checkItem){
    if(checkItem <10 || checkItem >10){
      return true;
    }else{
      return false;
    }
  }

  // email check

  $('#email').keyup((data)=>{
    let email=$('#email').val();
    if(validateEmail(email)){
      if(email.length>0){
        $('#email').css({'color':'green','border-bottom':'2px solid green'})
        $('#emailerr').text('');
        $('#emailerr').removeClass('error');

      }else{
        $('#email').css({'color':'red','border-bottom':'2px solid red'})
        $('#emailerr').addClass('error');
        $('#emailerr').text('Invalid email')

      }
      
    }else{
       $('#email').css({'color':'red','border-bottom':'2px solid red'})
       $('#emailerr').addClass('error');
       $('#emailerr').text('Invalid email');
    }
  })




  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }

