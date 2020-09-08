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
    const $listNameEdit = $(".list-name-edit");

    function deleteElementFromArray(name, flag){
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
    $listNameEdit.hide();


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
            $(this).parent().removeClass("active").remove();
            deleteElementFromArray(name, true);
            $listName.attr("data-name", "");
            $listName.text("");
            $taskContainer.text("");
        })
    })

    $listsContainer.on("mouseout","li", function(){
        $(this).children().hide();
    })

    $listsContainer.on("click","li", function(){
        $listsContainer.children().removeClass("active");
        $(this).addClass("active");
        $listNameEdit.hide();
        $listName.show();
        $listNameEdit.val($(this).attr("data-name"))
        let name = $(this).attr("data-name");
        $listName.attr("data-name", name).text(name);
        $taskContainer.text("");
        let index = findIndex(name);
        for(let i=0; i<setOfLists[index].tasks.length; i++){
            let item = '<li data-task="'+setOfLists[index].tasks[i]+'">'+setOfLists[index].tasks[i]+"</li>";
            $taskContainer.append(item);
        }
        
    })

    $deleteListBtn.on("click", function(){
        let listName = $listName.attr("data-name");
        $listName.attr("data-name", "");
        $listName.text("");
        $taskContainer.text("");
        deleteElementFromArray(listName, true);
        $listsContainer.children("li[data-name=\""+listName+"\"]").removeClass("active").remove();
        
    })

    $addTaskBtn.on("click", function(){
        if($listsContainer.children("li.active").length){
            $addTaskForm.show();
        }else{
            alert("Musisz wybrać listę!");
        }
        
    })
    $addTaskForm.on("submit", function(e){
        e.preventDefault();
        let task = $("input.task-name").val().trim();
        if(task!=""){
            let listName = $listsContainer.children("li.active").attr("data-name");
            let index = findIndex(listName);
            setOfLists[index].tasks.push(task);
            let item = '<li data-task="'+task+'">'+task+'</li>';
            $taskContainer.append(item);
            $addTaskForm.children("input:text").val("");
            $addTaskForm.hide();
        }else{
            alert("Musisz podać nazwę zadania!");
        }
    })

    $listName.on("dblclick", function(){
        $(this).hide();
        $listNameInput.val($(this).attr("data-name"));
        $listNameEdit.show();
       
    })
    $listNameEdit.on("blur", function(){
        let prevName = $listName.text();
        let nextName = $listNameEdit.val();
        $listNameEdit.hide();
        console.log(nextName)
        //zamiana w tablicy
        setOfLists[findIndex(prevName)].name = nextName;
        prevName=nextName;
        
        console.log(setOfLists);
        //zamiana na liście list
        $listsContainer.children("li.active").attr("data-name", nextName).text(nextName);


        $listName.attr("data-name", nextName).text(nextName);
        $listName.show();
    })
})


