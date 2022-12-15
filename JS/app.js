let capitals=[]
let flags=[]
let questionContainer=document.querySelector(".questionContainer")
fetch("https://restcountries.com/v3.1/all")
.then(res=>res.json())
.then(data=>{
    let randomCountryArr=[]
    data.forEach(element => {
        let randomCountryIndex=Math.floor(Math.random()*data.length)
        let randomCountry=data.slice(randomCountryIndex,randomCountryIndex+1)
      if(randomCountryArr.length<5){
        randomCountryArr.push(randomCountry)
      }
    });
    chooseQuestions(randomCountryArr)
    // console.log(randomCountryArr)
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





function chooseQuestions(randomCountryArr){
    let randomCountryForQuestionIndex=Math.floor(Math.random()*randomCountryArr.length)
    let randomCountryForQuestion=randomCountryArr.slice(randomCountryForQuestionIndex,randomCountryForQuestionIndex+1)
    let randomCapital=randomCountryForQuestion[0][0].capital[0]
    let randomFlag=randomCountryForQuestion[0][0].flags.svg
    let questions=[randomFlag,randomCapital]
    let randomQuestionİndex=Math.floor(Math.random() * 2)
    createQuestion(questions[randomQuestionİndex],randomQuestionİndex)
}



function createQuestion(randomQuestion,randomQuestionİndex){
    let questionText
    let capital=randomQuestion
   if(randomQuestionİndex==1){
    console.log(capital)
    questionText+=`
    <div class="capitalQuestion">
    <p>${randomQuestion} hansı ölkənin paytaxtıdır?</p>
</div>
    `
    questionContainer.innerHTML=questionText
   }else if(randomQuestionİndex==0){
    questionText+=`
    <div class="flagQuestion">
            <img src="${randomQuestion}" alt="">
            <p> Şəkildəki hansı ölkənin bayrağıdır?</p>
        </div>
    `
    questionContainer.innerHTML=questionText
   }
}