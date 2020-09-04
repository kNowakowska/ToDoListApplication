$(function(){
    
    let setOfLists = [
        {
            name:"lista1",
            tasks: ["sleep", "eat","do things"]
        },
        {
            name: "lista5",
            tasks: ["code", "code", "code"]
        },
        {
            name:"moja lista",
            tasks: ["nic"]
        }
    ]


    const $addListBtn = $('.add-list-btn');
    const $listsContainer = $(".panel ul");
    const $newListForm = $(".new-list-form");
    const $listNameInput = $("input.list-name");
    const $listName = $(".task-list .list-name");
    const $deleteListBtn = $(".task-options .delete-list");
    const $addTaskForm = $(".task-list form");
    const $addTaskBtn = $(".task-options .add-task");
    const $taskContainer = $(".task-list ul");

    function deleteElement(name, flag){
        for(let i=0; i<setOfLists.length && flag; i++){
            if(setOfLists[i].name==name){
                setOfLists.splice(i,1);
                flag=false;
            }
        }
    }

    function findIndex(title){
        for(let i=0; i<setOfLists.length; i++){
            if(setOfLists[i].name==title){
                return i;
            }
        }
    }

    $newListForm.hide();
    $addTaskForm.hide();


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
        let name = $(this).attr("data-name");
        $listName.attr("data-name", name);
        $listName.text(name);
        $taskContainer.text("");
        let index = findIndex(name);
        for(let i=0; i<setOfLists[index].tasks.length; i++){
            let item = '<li data-task="'+setOfLists[index].tasks[i]+'">'+setOfLists[index].tasks[i]+"</li>";
            $taskContainer.prepend(item);
        }
        
    })

    $deleteListBtn.on("click", function(){
        let listName = $listName.attr("data-name");
        $listName.attr("data-name", "");
        $listName.text("");
        deleteElement(listName, true);
        $listsContainer.children("li[data-name=\""+listName+"\"]").remove();
    })


})


