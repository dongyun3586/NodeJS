// 학생 개인별 외출 데이터 선택: 체크박스 하나만 선택되게 하는 함수

let seletedId = ''

function chooseOnlyOneCheckBox(selectedCheckBox, id){
    seletedId = id
    if(selectedCheckBox.checked){
        var obj = document.getElementsByName("dramaListCheckbox");
        for(var i=0; i<obj.length; i++){
            if(obj[i] != selectedCheckBox){
                obj[i].checked = false;
            }
        }
        document.querySelector('form').setAttribute('action', `http://localhost:3000/drama/update/${id}`)
        document.getElementById('deleteBtn').setAttribute('href', `http://localhost:3000/drama/delete/${id}`)
        title = document.getElementById(`title${id}`).innerText
        actor = document.getElementById(`actor${id}`).innerText
        document.getElementById('title').setAttribute('value', title)
        document.getElementById('actor').setAttribute('value', actor)
        document.getElementById('submitBtn').setAttribute('value', '수정')
    }else{
        document.querySelector('form').setAttribute('action', `http://localhost:3000/drama`)
        document.getElementById('deleteBtn').setAttribute('href', `#`)
        document.getElementById('title').setAttribute('value', '')
        document.getElementById('actor').setAttribute('value', '')
        document.getElementById('submitBtn').setAttribute('value', '전송')
    }
}