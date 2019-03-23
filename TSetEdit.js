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
            var currentPK = null;
            var currentRow = -1;
            this.editField = function (row, column, value, name, pk,active) {
                var tagfixa = row + '_' + column;
                var tag = 'lbl' + tagfixa;
                setMapColumn(pk, name, value, column, new this.InterfaceText('#txt' + tagfixa), active);
                return '<label id="' + tag + '">' + value + '</label><input  value="' + value + '" name="' + name + '" id="txt' + tagfixa + '" style="width:100%;">';
            };

            this.InterfaceText = function (idElement) {
                var Element = idElement;

                  
                this.blur = function (action) {
                    $(Element).blur(action);
                };

                this.attr = function (attribute) {
                    return $(Element).attr(attribute);
                };

                this.val = function (args) {
                    if (args) {
                         $(Element).val(args);
                    } else {
                        return $(Element).val();  
                    }
                };

                this.hide = function () {
                    $(Element).hide();
                };

                return this;
            };

            this.InterfaceCk = function (idElement) {
                var Element = idElement;

                this.blur = function (action) {
                    $(Element).blur(action);
                };

                this.attr = function (attribute) {
                    return $(Element).attr(attribute);
                };

                this.val = function (args) {
                    if (args) {
                        $(Element).prop("checked", args);
                    } else {
                        return $(Element).prop("checked").toString();
                    }
                };


                this.hide = function () {
                    $(Element).hide();
                };

                return this;
            };

            this.CheckField = function (row, column, value, name, pk, active) {
                var tagfixa = row + '_' + column;
                var tag = 'lbl' + tagfixa;
                setMapColumn(pk, name, value, column, new this.InterfaceCk('#ck' + tagfixa), active);
                return '<label id="' + tag + '">' + value + '</label><input type="checkbox" value="' + pk + '" name="' + name + '" id="ck' + tagfixa + '" ' + (value ? 'checked' : '') + '>';
            };

            this.setTable = function (tab) {
                table = tab;
                setEdit();
                drawtable();
                return this;
            };

            this.ajax = function (prfuncajax) {
                funcajax = prfuncajax;
            };


            function drawtable(){
                table.on( 'draw', function () {
                    columns.forEach(hideInput);
                 }); 

            }

            function hideInput(item) {
                item.Keys.forEach(function (c) {
                    if (!item[c].active) {
                        $('input[name="' + item[c].name + '"]').hide();
                    }
                });
            }

            function setMapColumn(pk, name, value, column, duck, active) {
                if (currentPK !== pk) {
                    currentRow += 1;
                    columns[currentRow] = [];
                    columns[currentRow].Keys = [];
                    columns[currentRow].setKeyColumn = function (key) {
                        this.Keys.push(key);
                    };
                    columns[currentRow].ExistCollumn = function (key) {
                       return !(typeof this[key] === 'undefined' || this[key] === null);
                    }
                    currentPK = pk;
                };

                var colmap=[];
                colmap['name'] = name;
                colmap['value'] = value;
                colmap['column'] = column;
                colmap['primaryKey'] = pk;
                colmap['oldvalue'] = null;
                colmap['active'] = active; 
                colmap['duck'] = duck;
                columns[currentRow]['c' + column] = colmap;
                columns[currentRow].setKeyColumn('c' + column);
            }

            function setEdit(){
              table.on('click', 'tbody td', function () {
                var c = table.cell( this ).index().column;
                var r = table.cell(this).index().row;
               if (columns[r].ExistCollumn('c' + c)){
                  var labelid='#'+$(this).children()[0].id;
                  var txtid='#'+$(this).children()[1].id;
                  $(labelid).hide();
                  $(txtid).attr('par',labelid);
                  $(txtid).val($(labelid).text());
                  $(txtid).show();
                  $(txtid).focus();
                  columns[r]['c' + c].duck.blur(function () {
                  labelid = columns[r]['c' + c].duck.attr('par');
                        if ($(labelid).text() !== columns[r]['c' + c].duck.val() && ready) {
                            columns[r]['c' + c].oldvalue = $(labelid).text();
                            var dados = [];
                            var x = columns[r]['c' + c].name;
                            var valor = columns[r]['c' + c].duck.val();
                            dados['name'] = x;
                            dados['value'] = valor;
                            ready = false;
                            funcajax(dados, columns[r]['c' + c].primaryKey, c, function (result) {
                                if (result) {
                                    $(labelid).text(columns[r]['c' + c].duck.val());
                                } else {
                                    columns[r]['c' + c].duck().val($(labelid).text());
                                }
                                ready = true;
                                columns[r]['c' + c].duck.hide();
                                $(labelid).show();
                            });
                        } else {
                            columns[r]['c' + c].duck.hide();
                            $(labelid).show();
                        }
                    });
                }

            } );
              return this;

            }
 
        }









