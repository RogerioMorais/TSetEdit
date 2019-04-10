# TSetEdit
Class for in-line editable field configuration in datatables. it serves to be used and has an effect similar to that of the native Extension Editor.



```
// Call the dataTables jQuery plugin

$(document).ready(function () {

     function getCulture(value) {
        var ops = [{ value: "en-US", label: "en-US", selected: ("en-US" == value) },
        { value: "pt-BR", label: "pt-BR", selected: ("pt-BR" == value) }];
        return ops;
    }

    var table=$('#dataTable').DataTable({
        ajax:'/projects/list',
        columns: [
                { "data": "id"},
                {
                  "data": "name",
                   render: function (data, type, row, meta) {
                       return SetEdit.editField(row.id, 1, row.name, 'name', row.id,false);
                    }
                },
                {
                "data": "defaultCulture",
                    render: function (data, type, row, meta) {
                        return SetEdit.SelectField(row.id, 2, getCulture(row.defaultCulture), 'defaultCulture', row.id, false);
                    }                },
                {
                    "data": "stringConnection",
                    render: function (data, type, row, meta) {
                        return SetEdit.editField(row.id, 3, row.stringConnection, 'stringConnection', row.id, false);
                    }
                },
                {
                "data": "pathFileSystem",
                render: function (data, type, row, meta) {
                    return SetEdit.editField(row.id, 4, row.pathFileSystem, 'pathFileSystem', row.id, false);
                }},
                {
                    "data": "createDate",
                    render: function (data, type, row, meta) {
                        var a = moment(row.createDate,"DD-MM-YYYY");
                        return a.format("L");
                    }
                },
                {
                    "data": "active",
                    render: function (data, type, row, meta) {
                        return SetEdit.CheckField(row.id, 6, row.active, 'active', row.id);
                    }
                }

            ]
    });

    table.on('click', 'tbody tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }


    });

   
    var SetEdit = new TSetEdit();
    SetEdit.setTable(table);
    SetEdit.ajax(function (data, pk, collumn, callback) {
        $.ajax({
            method: "POST",
            url: actionu,
            data: {
                field: data.name,
                value: data.value,
                collumn: collumn,
                index: pk,
                __RequestVerificationToken:$("[name='__RequestVerificationToken']").val()
            }
        }).done(function (result) {
            alert("success");
            callback(true);
            }).fail(function (result) {
              alert("error");
            callback(false);
            });
    });

});


```
