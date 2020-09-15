$(function(){
    
    let setOfLists = [
        {
            name:"list 1",
            tasks: ["sleep", "eat","do things"]
        },
        {
            name: "list 2",
            tasks: ["code", "code", "code"]
        },
        {
            name:"my list",
            tasks: ["nothing"]
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
    const $deleteTasksBtn = $(".task-options .delete-selected");
    const $taskContainer = $(".task-list ol");
    const $listNameEdit = $(".list-name-edit");

    //Function deleting list from the array setOfLists if it is deleted from the list container
    function deleteElementFromArray(name, flag){
        for(let i=0; i<setOfLists.length && flag; i++){
            if(setOfLists[i].name==name){
                setOfLists.splice(i,1);
                flag=false;
            }
        }
    }

    //Function finding index of the list in the array setOfLists basing on its title
    function findIndex(title){
        for(let i=0; i<setOfLists.length; i++){
            if(setOfLists[i].name==title){
                return i;
            }
        }
    }

    //Function deciding if list with given title exists
    function isExist(title){
        for(let i=0; i<setOfLists.length; i++){
            if(setOfLists[i].name.toUpperCase()==title.toUpperCase()){
                return true;
            }
        }
        return false;
    }
    
    //Function updating value attribute of task lits items after deleting some of them
    function updateListItemsValues(){
        let i=0;
        $taskContainer.children("li").each(function(){
            $(this).attr("value", i);
            i++;
        })
    }

    $newListForm.hide();
    $addTaskForm.hide();
    $listNameEdit.hide();

    //filling list container with saved lists from the array
    if(setOfLists.length>0){
        for(let i=0; i<setOfLists.length; i++){
            let item = '<li data-name="'+setOfLists[i].name+'">'+setOfLists[i].name+' <i class="fas fa-times-circle"></i></li>';
            $(".fa-times-circle").hide();
            $listsContainer.append(item);
            
        }
    }

    //showing the form of adding new list
    $addListBtn.on("click", function(){
        $newListForm.show();
    })

    //adding list to the container and the array by the form
    $newListForm.on("submit", function(e){
        e.preventDefault();
        let name = $listNameInput.val().trim();
        if(name && !(isExist(name))){
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
            alert("Podaj unikanlną nazwę listy!");
        }
        $newListForm.hide();
    })
    
    //showing the X-icon and deleting list from the container by clicking the icon
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

    //hiding the X-icon when the mouse is out of the element
    $listsContainer.on("mouseout","li", function(){
        $(this).children().hide();
    })

    //showing tasks on the list after clicking the list name
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
            let item = '<li data-task="'+setOfLists[index].tasks[i]+'" value="'+i+'">'+'<i class="far fa-square"></i>'+setOfLists[index].tasks[i]+"</li>";
            $taskContainer.append(item);
        }
        
    })

    //deleting list when its active by the trash-icon
    $deleteListBtn.on("click", function(){
        let listName = $listName.attr("data-name");
        $listName.attr("data-name", "");
        $listName.text("");
        $taskContainer.text("");
        deleteElementFromArray(listName, true);
        $listsContainer.children("li[data-name=\""+listName+"\"]").removeClass("active").remove();
        
    })

    //showing form to add new task to the list by clicking the plus-icon
    $addTaskBtn.on("click", function(){
        if($listsContainer.children("li.active").length){
            $addTaskForm.show();
        }else{
            alert("Musisz wybrać listę!");
        }
        
    })

    //adding task to the active list
    $addTaskForm.on("submit", function(e){
        e.preventDefault();
        let task = $("input.task-name").val().trim();
        if(task!=""){
            let listName = $listsContainer.children("li.active").attr("data-name");
            let index = findIndex(listName);
            setOfLists[index].tasks.push(task);
            let item = '<li data-task="'+task+'" value="'+(setOfLists[index].tasks.length-1)+'" >'+'<i class="far fa-square"></i>'+task+'</li>';
            $taskContainer.append(item);
            $addTaskForm.children("input:text").val("");
            $addTaskForm.hide();
        }else{
            alert("Musisz podać nazwę zadania!");
        }
    })

    //showing form to edit list name by double clicking on it
    $listName.on("dblclick", function(){
        $(this).hide();
        $listNameInput.val($(this).attr("data-name"));
        $listNameEdit.show();
       
    })
    
    //exact editing the name list in the list container and array
    $listNameEdit.on("blur", function(){
        let prevName = $listName.text();
        let nextName = $listNameEdit.val();
        $listNameEdit.hide();
        setOfLists[findIndex(prevName)].name = nextName;
        prevName=nextName;
        $listsContainer.children("li.active").attr("data-name", nextName).text(nextName);
        $listName.attr("data-name", nextName).text(nextName);
        $listName.show();
    })

    let $currentTask;
    let task;
    let taskNumber;
    let $inputEl;

    //showing form to edit task name after double clicking on it
    $taskContainer.on("dblclick", "li", function(){
        $inputEl= $('<input type="text">');
        $currentTask = $(this);
        task = $(this).text();
        taskNumber = $(this).attr("value");
        $inputEl.val(task);
        $(this).hide();
        $(this).after($inputEl)
    })

    //exact editing task name in the task container and an object in the list array
    $taskContainer.on("blur", "input",function(){
        let editTask = $(this).val();
        $currentTask.attr("data-task", editTask).text(editTask);
        $(this).remove();
        $currentTask.show();
        const index = findIndex($listName.attr("data-name"));
        setOfLists[index].tasks[taskNumber]=editTask;
    })

    //selecting tasks in the task container
    $taskContainer.on("click", "li", function(){
        let $task = $(this);
        let $icon;
        if(!($task.hasClass("selected"))){
            $icon=$('<i class="far fa-check-square"></i>');
            $(this).children("i").replaceWith($icon);
            $task.addClass("selected");
        }else{
            $icon=$('<i class="far fa-square"></i>');
            $(this).children("i").replaceWith($icon);
            $task.removeClass("selected");
        }
    })

    //deleting selected tasks from the list and array
    $deleteTasksBtn.on("click", function()  {
        let indexOfTask=[];
        $taskContainer.children("li.selected").each(function(){
            indexOfTask.push($(this).attr("value"));
            $(this).remove();
        })
        for(let i=indexOfTask.length-1; i>=0; i--){
            setOfLists[findIndex($listName.attr("data-name"))].tasks.splice(indexOfTask[i],1);
        }
        updateListItemsValues();
        
    })

})


