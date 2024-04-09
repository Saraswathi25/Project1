//Constants

const taskConfig = {
  "IP": {
    "sName": "IP",
    "name": "In Progress",
    "style": "ipTask"
  },
  "NS": {
    "sName": "NS",
    "name": "Not Started",
    "style": "nsTask"
  },
  "OH": {
    "sName": "OH",
    "name": "On Hold",
    "style": "ohTask"
  },
  "C": {
    "sName": "C",
    "name": "Completed",
    "style": "cTask"
  },
  "TR": {
    "sName": "TR",
    "name": "To Review",
    "style": "trTask"
  },
  "1": {
    "sName": "1",
    "name": "High",
    "style": "hPriority"
  },
  "2": {
    "sName": "2",
    "name": "Medium",
    "style": "mPriority"
  },
  "3": {
    "sName": "3",
    "name": "Low",
    "style": "lPriority"
  }
}
const getTaskEl = item =>
  `<div  id="${item.id}" class="taskHeadking taskSec">
          <div class="tab tskNmae">
            <span>${item.name}</span>
          </div>
          <div class="tab tskDesc">
            <span>${item.description}</span>
          </div>
          <div class="tab tskStatus">
            <span class=${item.status.style}>${item.status.name}</span>
          </div>
          <div class="tab tskpriority">
            <span class=${item.priority.style}>${item.priority.name}</span>
          </div>
          <div class="tab tskDeadline">
            <span>${item.deadLine}</span>
          </div>
          <div  id="${item.id}" class="tab tskEdit">
          <span><i class="fa fa-edit"></i></span>
        </div>
        <div  id="${item.id}" class="tab tskDelete">
        <span><i class="fa fa-trash" aria-hidden="true"></i></span>
      </div>
        </div>
            `

// Get references to the button and search bar
const searchButton = document.getElementById('searchButton');
const searchInput = document.querySelector('#searchInput');
const searchBar = document.getElementById('searchBar');
const taskBody = document.querySelector('.taskBody');
const tabItem = document.querySelector('.tabItem');
const closeBtn = document.querySelector('.close-btn');
const backDrop = document.querySelector('.backDrop');
const newTaskBtn = document.querySelector('#newTaskBtn');
const addTaskBtn = document.querySelector('#addTaskBtn');
let taskSec;
let taskData;
let currentTaskId;

searchInput.addEventListener('input', (event) => {
  const resData = taskData.filter((item) => {
    if (item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.priority.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.description.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.status.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.deadLine.toLowerCase().includes(event.target.value.toLowerCase())) {
      taskBody.innerHTML = ''
      return item
    }
  })

  resData.forEach(item => {
    taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
  });
})

tabItem.addEventListener('click', (event) => {
  for (let i = 0; i < tabItem.children.length; i++) {
    tabItem.children[i].classList.remove('selected')
  }

  event.target.classList.add('selected');
  let status = '';
  switch (event.target.classList[0]) {
    case 'allTab':
      status = ''
      break;
    case 'nsTab':
      status = 'NS'
      break;
    case 'ipTab':
      status = 'IP'
      break;
    case 'ohTab':
      status = 'OH'
      break;
    case 'trTab':
      status = 'TR'
      break;
    case 'cTab':
      status = 'C'
      break;
    default:
      break;
  }

  const resData = taskData.filter((item) => {
    return item.status.sName == status;
  })

  taskBody.innerHTML = ''
  if (!status) {
    taskData.forEach(item => {
      taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
    });
  } else {
    resData.forEach(item => {
      taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
    });
  }

})

// Add click event listener to the button
searchButton.addEventListener('click', function () {
  // Toggle the display property of the search bar
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block';
    searchInput.focus();
  } else {
    searchBar.style.display = 'none';
  }
});

const getTask = () => {
  if (localStorage.getItem('task')) {
    taskData = JSON.parse(localStorage.getItem('task'));
    taskData.forEach(item => {
      taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
    });
  } else {
    localStorage.setItem('task', JSON.stringify([]));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getTask()
  taskSec = document.querySelectorAll('.tskEdit');
  tskDelete = document.querySelectorAll('.tskDelete');
  taskSec.forEach((item) => {
    item.addEventListener('click', updateTask);
  })
  tskDelete.forEach((item) => {
    item.addEventListener('click', deleteTask);
  })
});


closeBtn.addEventListener('click', (event) => {
  backDrop.style.display = 'none'
  clearForm()
})

newTaskBtn.addEventListener('click', () => {
  backDrop.style.display = 'block'
  addTaskBtn.innerHTML = 'Add Task'
})

addTaskBtn.addEventListener('click', (event) => {
  const taskName = document.querySelector('.task').value
  const taskDesc = document.querySelector('.taskDescription').value
  const taskStatus = document.querySelector('.taskStatus').value
  const taskPriority = document.querySelector('.taskPriority').value
  const taskDeadLine = document.querySelector('.taskDeadLine').value
  const task = JSON.parse(localStorage.getItem('task'));
  const isUpdate = addTaskBtn.innerHTML.includes('Update');

  if (!(taskName && taskDesc && taskStatus && taskPriority && taskDeadLine)) {
    alert('Please give all the values')
    return
  }

  const currentTask = {
    id: isUpdate ? currentTaskId : new Date(),
    name: taskName,
    description: taskDesc,
    status: taskConfig[taskStatus],
    priority: taskConfig[taskPriority],
    deadLine: taskDeadLine
  }

  if(addTaskBtn.innerHTML.includes('Update')) {
    task.forEach((item, index) => {
      if(item.id == currentTask.id) {
        task[index] = {...currentTask};
      }
    })
  } else {
    task.push(currentTask)
  }
  taskBody.innerHTML = ''
  addTaskBtn.innerHTML = 'Add Task'
  localStorage.setItem('task', JSON.stringify(task))
  task.forEach(item => {
    taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
  });
  taskSec = document.querySelectorAll('.tskEdit');
  tskDelete = document.querySelectorAll('.tskDelete');
  taskSec.forEach((item) => {
    item.addEventListener('click', updateTask);
  })
  tskDelete.forEach((item) => {
    item.addEventListener('click', deleteTask);
  })
  clearForm()
  closeBtn.click()
})

const updateTask = (event) => {
  const taskName = document.querySelector('.task');
  const taskDesc = document.querySelector('.taskDescription');
  const taskStatus = document.querySelector('.taskStatus');
  const taskPriority = document.querySelector('.taskPriority');
  const taskDeadLine = document.querySelector('.taskDeadLine');
  currentTaskId = event.target.id;
  backDrop.style.display = 'block';
  const task = JSON.parse(localStorage.getItem('task'));
  const currentTask = task.filter((item) => item.id == currentTaskId);
  currentTask && currentTask.forEach((item) => {
    taskName.value = item.name;
    taskDesc.value = item.description;
    taskStatus.value = item.status.sName;
    taskPriority.value = item.priority.sName;
    taskDeadLine.value = item.deadLine;
  })
  addTaskBtn.innerHTML = 'Update Task' 
}

const deleteTask = (event) => {
  currentTaskId = event.target.id;
  const task = JSON.parse(localStorage.getItem('task'));
  task.forEach((item, i) => {
    if(item.id == currentTaskId) {
      task.splice(i, 1);
    }
  })
  taskBody.innerHTML = ''
  localStorage.setItem('task', JSON.stringify(task))
  task.forEach(item => {
    taskBody.insertAdjacentHTML('beforeend', getTaskEl(item));
  });
  taskSec = document.querySelectorAll('.tskEdit');
  tskDelete = document.querySelectorAll('.tskDelete');
  taskSec.forEach((item) => {
    item.addEventListener('click', updateTask);
  })
  tskDelete.forEach((item) => {
    item.addEventListener('click', deleteTask);
  })
}

const clearForm = () => {
  const taskName = document.querySelector('.task');
  const taskDesc = document.querySelector('.taskDescription');
  const taskStatus = document.querySelector('.taskStatus');
  const taskPriority = document.querySelector('.taskPriority');
  const taskDeadLine = document.querySelector('.taskDeadLine');

  taskName.value = ''
  taskDesc.value = ''
  taskDeadLine.value = ''

}


