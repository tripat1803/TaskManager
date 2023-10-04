let data = [];
let categoryArr = ["to do"];

window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("user-profile").innerText = user._delegate.email.charAt(0).toUpperCase();
        } else {
            window.location.href = "./index.html"
        }
    });
    data = JSON.parse(window.localStorage.getItem("data")) || data;
    categoryArr = JSON.parse(window.localStorage.getItem("categoryArr")) || categoryArr;

    categoryArr.forEach(category => {
        document.getElementById("all-tasks").innerHTML += categoryData(category);
    });
    data.forEach(task => {
        document.querySelectorAll(".task-listing").forEach((item) => {
            if (item.querySelector("p").innerText.toLowerCase() === task.category.toLowerCase()) {
                item.querySelector(".category-tasks").appendChild(taskData(data.indexOf(task), task.title, task.description, task.endDate));
            }
        });
    });

    // document.querySelectorAll(".task-item").forEach((item) => {
    //     item.addEventListener("mousedown", (e) => {
    //         console.log(e.clientX, e.clientY);
    //         e.target.style.position = "absolute";
    //     });
    //     document.addEventListener("mouseup", (e) => {
    //         item.style.position = "static";
    //     });
    // });
}

document.getElementById("saveEvent").addEventListener("click", function () {
    createTask();
    closeTaskPopup();
});
document.getElementById("black-screen").addEventListener("click", closeTaskPopup);
document.getElementById("add-stage").addEventListener("click", function () {
    document.getElementById("add-category").classList.remove("hidden");
});
document.getElementById("close-category").addEventListener("click", function () {
    document.getElementById("add-category").classList.add("hidden");
});
document.getElementById("accept-category").addEventListener("click", function () {
    createCategory(document.getElementById("category").value);
    document.getElementById("add-category").classList.add("hidden");
});
document.getElementById("search-bar").addEventListener("change", () => {
    let search = document.getElementById("search-bar").value;
    let filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    });
    document.querySelectorAll(".task-listing").forEach((item) => {
        item.querySelector(".flex-1").innerHTML = "";
        filteredData.forEach((task) => {
            item.querySelector(".category-tasks").appendChild(taskData(data.indexOf(task), task.title, task.description, task.endDate));
        });
    });
});


// Functions
function closeTaskPopup() {
    document.getElementById("add-task-container").classList.add("hidden");
    document.getElementById("black-screen").classList.add("hidden");
}

function createCategory(category) {
    if (categoryArr.includes(category)) {
        alert("Category already exists");
        return;
    }
    categoryArr.push(category);
    window.localStorage.setItem("categoryArr", JSON.stringify(categoryArr));
    document.getElementById("all-tasks").innerHTML += categoryData(category);
}

function createTask(category = "to do") {
    if (!categoryArr.includes(category)) {
        alert("Category does not exist");
        return;
    }

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    let task = {
        title: title,
        description: description,
        startDate: startDate,
        endDate: endDate,
        category: category
    };

    if(data.includes(task)){
        alert("Task already exists");
        return;
    }

    data.push(task);
    window.localStorage.setItem("data", JSON.stringify(data));
    filterData(category);
}

function filterData(category) {
    let filteredData = data.filter((item) => {
        return item.category === category;
    });
    document.querySelectorAll(".task-listing").forEach((item) => {
        if (item.querySelector("p").innerText.toLowerCase() === category.toLowerCase()) {
            item.querySelector(".flex-1").innerHTML = "";
            filteredData.forEach((task, index) => {
                item.querySelector(".category-tasks").appendChild(taskData(data.indexOf(task), task.title, task.description, task.endDate));
            });
        }
    });
}

function categoryData(category) {
    if (category === "to do") {
        return `<div class="task-listing bg-[#F4F5F7] min-w-[280px] max-w-[300px] min-h-[200px] rounded-lg py-2 px-1 flex flex-col">
        <div class="py-3">
            <p class="px-1.5 mx-2 bg-gray-300 text-gray-800 rounded-sm font-medium text-sm w-[max-content] capitalize">
                ${category}
            </p>
        </div>
        <div class="category-tasks flex-1 flex flex-col min-h-[280px] max-h-[50vh] overflow-y-scroll remove-scroll">
        </div>
        <div class="py-3">
            <button onclick="openPopup()" onmousedown="buttonDown(event)"
                class="create-task px-2 py-1 rounded-sm w-full text-md text-left hover:bg-[rgb(66,82,110,0.1)] text-[rgb(66,82,110)]">
                <i class="fa-solid fa-plus mr-1"></i>
                <span>Create</span>
            </button>
        </div>
    </div>`
    } else {
        return `<div class="task-listing bg-[#F4F5F7] min-w-[280px] max-w-[300px] min-h-[200px] rounded-lg py-2 px-1 flex flex-col">
        <div class="py-3">
            <p class="px-1.5 mx-2 bg-gray-300 text-gray-800 rounded-sm font-medium text-sm w-[max-content] capitalize">
                ${category}
            </p>
        </div>
        <div class="flex-1 flex flex-col min-h-[280px] max-h-[50vh] overflow-y-scroll remove-scroll">
        </div>
    </div>`
    }
}
function taskData(index, task, description, date) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item', 'h-[max-content]', 'flex', 'flex-col', 'gap-2', 'bg-white', 'drop-shadow-md', 'rounded-md', 'px-3', 'py-2', 'my-2');

    // Create the description paragraph
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('text-md');
    descriptionParagraph.textContent = `${description}`;
    taskItem.appendChild(descriptionParagraph);

    // Create the flex container for task and date
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex', 'gap-2');
    taskItem.appendChild(flexContainer);

    // Create the task paragraph
    const taskParagraph = document.createElement('p');
    taskParagraph.classList.add('px-1', 'text-[13px]', 'rounded-sm', 'font-bold', 'w-[max-content]', 'bg-[rgb(131,73,245,0.1)]', 'text-[rgb(131,73,245)]');
    taskParagraph.textContent = `${task}`;
    flexContainer.appendChild(taskParagraph);

    // Create the date paragraph
    const dateParagraph = document.createElement('p');
    dateParagraph.classList.add('px-1', 'text-[13px]', 'rounded-sm', 'font-bold', 'w-[max-content]', 'bg-[rgb(222,53,11,0.1)]', 'text-[rgb(222,53,11)]');
    dateParagraph.innerHTML = `<i class="fa-regular fa-clock text-[12px]"></i> ${date}`;
    flexContainer.appendChild(dateParagraph);

    // Create the flex container for icons
    const iconFlexContainer = document.createElement('div');
    iconFlexContainer.classList.add('flex', 'gap-2', 'justify-end');
    taskItem.appendChild(iconFlexContainer);

    // Create the edit icon
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square', 'cursor-pointer', 'text-[blue]', 'text-xs');
    iconFlexContainer.appendChild(editIcon);

    // Create the delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash', 'cursor-pointer', 'text-[red]', 'text-xs');
    iconFlexContainer.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", () => {
        deleteData(index);
    });    

    return taskItem;
}

function deleteData(index){
    data.filter((item, point) => {
        return point !== index;
    });
    console.log(index, data);
    window.localStorage.setItem("data", JSON.stringify(data));
    // window.location.reload();
}