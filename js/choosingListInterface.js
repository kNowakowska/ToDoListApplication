$(function(){
    
    let setOfLists = [
        {
            name:"lista1",
            tasks: []
        },
        {
            name: "lista5",
            tasks: []
        },
        {
            name:"moja lista",
            tasks: []
        }
    ]


    const $addListBtn = $('.add-list-btn');
    const $listsContainer = $(".panel ul");
    const $newListForm = $(".new-list-form");
    const $listNameInput = $("input.list-name");
    const $listName = $(".task-list .list-name");
    const $deleteListBtn = $(".task-options .delete-list");

    function deleteElement(name, flag){
        for(let i=0; i<setOfLists.length && flag; i++){
            if(setOfLists[i].name==name){
                setOfLists.splice(i,1);
                flag=false;
            }
        }
    }

    $addListBtn.show();
    $newListForm.hide();

    if(setOfLists.length>0){
        for(let i=0; i<setOfLists.length; i++){
            let item = '<li data-name="'+setOfLists[i].name+'">'+setOfLists[i].name+' <i class="fas fa-times-circle"></i></li>';
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
            setOfLists.push(
                {
                    name: name,
                    tasks: []
                }
            );
            let item = '<li data-name="'+name+'">'+name+' <i class="fas fa-times-circle"></i></li>';
            $listsContainer.append(item);
            $(".fa-times-circle").hide();
            $listNameInput.val("");
        }else{
            alert("Podaj nazwę listy!");
        }
        $newListForm.hide();
    })
    
    $listsContainer.on("mouseover","li", function(){

        $(this).children().show();
        $(this).on("click", "i", function(){
            let name = $(this).parent().text().trim();
            $(this).parent().remove();
           deleteElement(name, true);
        })
    })

    $listsContainer.on("mouseout","li", function(){
        $(this).children().hide();
    })

    $listsContainer.on("click","li", function(){
        $listName.attr("data-name", $(this).attr("data-name"));
        $listName.text($(this).attr("data-name"));
    })

    $deleteListBtn.on("click", function(){
        let listName = $listName.attr("data-name");
        $listName.attr("data-name", "");
        $listName.text("");
        deleteElement(listName, true);
        $listsContainer.children("li[data-name=\""+listName+"\"]").remove();
    })
})


