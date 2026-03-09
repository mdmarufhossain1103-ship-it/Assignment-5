const nameBtn=document.getElementById("name-btn");
const passwordBtn=document.getElementById("password-btn");
document.getElementById("input-btn").addEventListener("click",()=>{
    if(nameBtn.value==="admin" && passwordBtn.value==="admin123"){
        window.location.href="next.html";
    }
    else{
        nameBtn.value='';
        passwordBtn.value='';
        return;
    }
});