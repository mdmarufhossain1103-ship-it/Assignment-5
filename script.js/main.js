let allData=[];

let issueCnt=(count)=>{
  const countElement=document.getElementById("issue-cnt");
  if(countElement){
    countElement.innerText=count;
  }
}

const loadCard=()=>{
    const spnnier=document.getElementById("loading-spinner")
    const nextCard=document.getElementById("load-card");
    spnnier.classList.remove("hidden");
    nextCard.classList.add("hidden");
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(data=>{
      allData=data.data;
      displayCard(allData);
      issueCnt(allData.length);
      spnnier.classList.add("hidden");
      nextCard.classList.remove("hidden");
    });
};

const loadIssueDetail=(id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  .then(res=>res.json())
  .then(data=>diplayLoadIssueDetail(data.data));
}

const diplayLoadIssueDetail=(issues)=>{
  const detailContainer=document.getElementById("detail-container");
  let bgColor=issues.status === "open"?"bg-green-500": "bg-purple-500";
   const lebels=issues.labels.map(label=>`
          <div class="flex items-center gap-1 bg-red-200 text-xs px-1 py-2 rounded-full">${label} </div>
          `).join('');
          let levelColor="";
         if(issues.priority==="high"){
          levelColor="bg-red-500"
         }else if (issues.priority==="medium"){
          levelColor="bg-yellow-500"
         }
         else if (issues.priority==="low"){
          levelColor="bg-purple-500"
         }
  detailContainer.innerHTML=`
      <div>
      <h2 class="text-xl font-bold">${issues.title}</h2>
      <div class="flex gap-1.5 mb-3">
        <p class="${bgColor} rounded-full px-2">${issues.status}</p>
        <p class="text-gray-300">. Opened by ${issues.assignee}</p>
        <p class="text-gray-300">. ${issues.updatedAt}</p>
      </div>
       <div class="flex gap-5 mb-4">
           ${lebels}
          </div>
        <p class="text-[#64748B] mb-3">${issues.description}</p>
        <div class="flex bg-gray-200 justify-around p-5 rounded-2xl">
          <div>
            <p>Assignee:</p>
            <p>${issues.assignee}</p>
          </div>
          <div>
            <p>Priority:</p>
            <p class="${levelColor} rounded-full px-3 text-white">${issues.priority}</p>
          </div>
        </div>
    </div>
  `
  document.getElementById("my_modal_1").showModal();
}

const displayCard=(cards)=>{
    const nextCard=document.getElementById("load-card");
    nextCard.innerHTML="";
    cards.forEach(card => {
        const newCard=document.createElement("div");
        const lebels=card.labels.map(label=>`
          <div class="flex items-center gap-1 bg-red-200 text-xs px-1 py-2 rounded-full">${label} </div>
          `).join('');
         let levelColor="";
         if(card.priority==="high"){
          levelColor="bg-red-200 text-red-500"
         }else if (card.priority==="medium"){
          levelColor="bg-yellow-200 text-yellow-500"
         }
         else if (card.priority==="low"){
          levelColor="bg-purple-200 text-purple-500"
         }

         let topBorder=card.status === "open"?"border-t-green-500": "border-t-purple-500";
         let statusIcon=card.status==="open"?"./assets/Open-Status.png":"./assets/Closed- Status .png";
        newCard.innerHTML=`
         <div class="shadow p-5 rounded-2xl h-full border-t-4 ${topBorder} cursor-pointer" onclick="loadIssueDetail(${card.id})">
          <div class="flex justify-between mb-5">
          <img src="${statusIcon}" alt="${card.status}">
            <p class="font-bold  border rounded-full w-[35%] flex items-center justify-center ${levelColor}">${card.priority}</p>
          </div>
          <div class="my-3">
            <h2 class="text-xl font-bold">${card.title}</h2>
          <p class="text-[#64748B]">${card.description}</p>
          </div>
        <div class="flex gap-5 mb-4">
           ${lebels}
          </div>
          <hr class="border-gray-200 mb-4 ">
          <div class="space-y-2">
            <p>#${card.id} by ${card.author}</p>
            <p>${card.createdAt}</p>
          </div>
        </div>
        `
        nextCard.append(newCard)
    });
};


const filterData=(status,event)=>{
  document.querySelectorAll('.bg-change').forEach(btn=>{
    btn.classList.remove("btn-primary");
  });
  if(event){
    event.target.classList.add("btn-primary");
  }
  const filtered=status==='all'? allData : allData.filter(item=>item.status===status);
  displayCard(filtered);
  issueCnt(filtered.length);
};

document.getElementById("all-btn").addEventListener("click",(e)=>filterData('all',e));
document.getElementById("open-btn").addEventListener("click",(e)=>filterData('open',e));
document.getElementById("close-btn").addEventListener("click",(e)=>filterData('closed',e));

document.getElementById("search-btn").addEventListener("input",(el)=>{
  const searchText=el.target.value.toLowerCase();
  const searchData=allData.filter(item=>item.title.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText));
  displayCard(searchData);
});

loadCard();