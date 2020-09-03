let setOfLists = [];

if(setOfLists.length>0){
    for(let i=0; i<setOfLists.length; i++){
        let el = '<li>'+setOfLists[i]+' <i class="fas fa-times-circle"></i></li>';
        $(".fa-times-circle").hide();
        $listsContainer.append(item);
    }
}

$(function(){

    const $addListBtn = $('.add-list-btn');
    const $listsContainer = $(".panel ul");
    const $newListForm = $(".new-list-form");
    const $listNameInput = $(".list-name");


    $addListBtn.show();
    $newListForm.hide();

    $addListBtn.on("click", function(){
        $newListForm.show();
    })

    $newListForm.on("submit", function(e){
        e.preventDefault();
        let name = $listNameInput.val();
        if(name){
            setOfLists.push(name);
            let item = '<li>'+name+' <i class="fas fa-times-circle"></i></li>';
            $listsContainer.append(item);
            $(".fa-times-circle").hide();
            $listNameInput.val("");
        }else{
            alert("Podaj nazwę listy!");
        }
        $newListForm.hide();
        console.log(setOfLists)
    })
    
    function deleteElement(name, flag){
        for(let i=0; i<setOfLists.length && flag; i++){
            if(setOfLists[i].toString()==name.toString()){
                console.log("ZNALEZIONE")
                setOfLists.splice(i,1);
                flag=false;
            }
        }
    }
    
    $(".panel ul").on("mouseover","li", function(){

        $(this).children().show();
        $(this).on("click", "i", function(){
            let name = $(this).parent().text();
            console.log(name);
            $(this).parent().remove();
           deleteElement(name, true);
        })
        console.log(setOfLists)
    })
   
})


//<i class="fas fa-times-circle"></i> // icon to delete list from the panel

