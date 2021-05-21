function chooseOnlyOneCheckBox(selectedCheckBox, id){
    seletedId = id
    if(selectedCheckBox.checked){
        var obj = document.getElementsByName("dramaListCheckbox");
        for(var i=0; i<obj.length; i++){
            if(obj[i] != selectedCheckBox){
                obj[i].checked = false;
            }
        }
        document.querySelector('form').setAttribute('action', `http://localhost:3000/update/${id}`)
        document.getElementById('deleteBtn').setAttribute('href', `http://localhost:3000/delete/${id}`)
        title = document.getElementById(`title${id}`).innerText
        actor = document.getElementById(`actor${id}`).innerText
        document.getElementById('title').setAttribute('value', title)
        document.getElementById('actor').setAttribute('value', actor)
        document.getElementById('submitBtn').setAttribute('value', '수정')
    }else{
        document.querySelector('form').setAttribute('action', `http://localhost:3000`)
        document.getElementById('deleteBtn').setAttribute('href', `#`)
        document.getElementById('title').setAttribute('value', '')
        document.getElementById('actor').setAttribute('value', '')
        document.getElementById('submitBtn').setAttribute('value', '전송')
    }
}