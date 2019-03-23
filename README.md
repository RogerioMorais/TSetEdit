# TSetEdit
Class for in-line editable field configuration in datatables. it serves to be used and has an effect similar to that of the native Extension Editor.



```
$(document).ready(function() {
    var table=$('#dataTable').DataTable({
        ajax:'/Projects/list',
        columns: [
                { "data": "id"},
                {
                  "data": "name",
                   render: function (data, type, row, meta) {
                       return SetEdit.editField(row.id, 1, row.name, 'name', row.id,false);
                    }
                },
                { "data": "defaultCulture" 
                },
                {
                    "data": "stringConnection",
                    render: function (data, type, row, meta) {
                        return SetEdit.editField(row.id, 3, row.stringConnection, 'stringConnection', row.id, false);
                    }
                },
                {
                "data": "pathFileSystem",
                render: function (data, type, row, meta) {
                    return SetEdit.editField(row.id, 4, row.stringConnection, 'pathFileSystem', row.id, false);
                }},
                { "data": "createDate" },
                {
                    "data": "active",
                    render: function (data, type, row, meta) {
                        return SetEdit.CheckField(row.id, 6, row.active, 'active', row.id);
                    }
                }

            ]
    });

  
    var SetEdit = new TSetEdit();
    SetEdit.setTable(table);
    SetEdit.ajax(function (data, pk, collumn, callback) {
        alert(collumn);
        alert(data.name + ' - ' + data.value + ' - ' + pk);
        callback(true);
    });

});
```
