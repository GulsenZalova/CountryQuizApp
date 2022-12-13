let capitals=[]
let flags=[]
let questionContainer=document.querySelector(".questionContainer")
fetch("https://restcountries.com/v3.1/all")
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        capitals.push(element.capital)
        flags.push(element.flags.svg)
    });
    // console.log(capitals)
    // console.log(flags)
    let randomCapitalIndex=Math.floor(Math.random()*capitals.length)
    let randomCapital=capitals.slice(randomCapitalIndex,randomCapitalIndex+1)
    let randomFlagIndex=Math.floor(Math.random()*flags.length)
    let randomFlag=flags.slice(randomFlagIndex,randomFlagIndex+1)
    // console.log(randomCapitalIndex,randomCapital)
    // console.log(randomFlagIndex,randomFlag)
    let questions=[randomFlag,randomCapital]
    let randomQuestionİndex=Math.floor(Math.random() * 2)

    createQuestion(questions[randomQuestionİndex],randomQuestionİndex)

    data.filter((element)=>{
        if(element.capital==randomCapital[0]){
            // console.log(element.name.common)
        }
    })
    data.filter((element)=>{
        if(element.flags.svg==randomFlag[0]){
            // console.log(element.name.common)
        }
    })
})


function createQuestion(randomQuestion,randomQuestionİndex){
    let questionText
   if(randomQuestionİndex==1){
    questionText+=`
    <div class="capitalQuestion">
    <p><span>${randomQuestion[0]}</span> hansı ölkənin paytaxtıdır?</p>
</div>
    `
   }else if(randomQuestionİndex==0){
    questionText+=`
    <div class="flagQuestion">
            <img src="${randomQuestion[0]}" alt="">
            <p> Şəkildəki hansı ölkənin bayrağıdır?</p>
        </div>
    `
   }
   questionContainer.innerHTML=questionText
}