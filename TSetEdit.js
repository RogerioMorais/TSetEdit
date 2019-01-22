  /* 
  Autor:Rogério Morais
 Class for in-line editable field configuration in datatables. it serves to be used and has an effect similar to that of the native Extension Editor.
  */
        function TSetEdit(){
            var columns=[];
            var table;
            var url;
            var funcajax;
            var ready=true;

            this.editField=function(row,column,value,name,pk){
             var tagfixa=row+'_'+column;
             var tag = 'lbl' + tagfixa;
             columns.push(
                {key:tag,
                value:{'name':name,'value':value,'column':column,'primaryKey':pk,'oldvalue':null}
                });
             
             
            return'<label id="'+ tag +'">'+value+'</label><input  value="'+value+'" name="'+name+'" id="txt'+ tagfixa+'">';
            };

            this.setTable=function(tab){
              table=tab;
              setEdit();
              drawtable();
              return this;
            };

            this.ajax=function(prfuncajax){
              funcajax=prfuncajax;
            };


            function drawtable(){
                table.on( 'draw', function () {
                    columns.forEach(hideInput);
                 }); 

            };

            function hideInput(item){
                  $('input[name="'+ item.value['name'] +'"]').hide();
            };

            function setEdit(){
              table.on('click', 'tbody td', function () {
                var c = table.cell( this ).index().column;
                var r = table.cell( this ).index().row;
               if(columns[r].value['column']==c){
                  var labelid='#'+$(this).children()[0].id;
                  var txtid='#'+$(this).children()[1].id;
                  $(labelid).hide();
                  $(txtid).attr('par',labelid);
                  $(txtid).val($(labelid).text());
                  $(txtid).show();
                  $(txtid).focus();
                  $(txtid).blur(function(){
                    labelid=$(this).attr('par');
                    if( $(labelid).text()!=$(this).val() && ready){
                        columns[r].value['oldvalue']=$(labelid).text();
                         var dados=[];
                         var x=columns[r].value['name'];
                         var valor=$(this).val();
                         dados.push({
                            name:x,
                            value:valor
                         });
                         ready=false;
                         funcajax(dados,columns[r].value['primaryKey'],function(result){
                              if(result){
                                $(labelid).text($(txtid).val());  
                              }else{
                                $(txtid).val($(labelid).text());
                              }
                              ready=true;
                             $(txtid).hide();
                             $(labelid).show();                         
                         });
                     }else{
                        $(txtid).hide();
                        $(labelid).show();                      
                     }
                  });
                }

            } );
              return this;

            };
 
        }









