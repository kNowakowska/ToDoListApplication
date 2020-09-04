$(function(){
    let setOfLists = ["lista1", "lista5", "moja lista"];

    const $addListBtn = $('.add-list-btn');
    const $listsContainer = $(".panel ul");
    const $newListForm = $(".new-list-form");
    const $listNameInput = $(".list-name");

    $addListBtn.show();
    $newListForm.hide();

    if(setOfLists.length>0){
        for(let i=0; i<setOfLists.length; i++){
            let item = '<li>'+setOfLists[i]+' <i class="fas fa-times-circle"></i></li>';
            $(".fa-times-circle").hide();
            $listsContainer.append(item);
        }
    }

    $addListBtn.on("click", function(){
        $newListForm.show();
    })

    $newListForm.on("submit", function(e){
        e.preventDefault();
        let name = $listNameInput.val().trim();
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
    })
    
    function deleteElement(name, flag){
        for(let i=0; i<setOfLists.length && flag; i++){
            if(setOfLists[i]==name){
                setOfLists.splice(i,1);
                flag=false;
            }
        }
    }
    
    $(".panel ul").on("mouseover","li", function(){

        $(this).children().show();
        $(this).on("click", "i", function(){
            let name = $(this).parent().text().trim();
            $(this).parent().remove();
           deleteElement(name, true);
        })
    })

    $(".panel ul").on("mouseout","li", function(){
        $(this).children().hide();
    })
   
   
})


