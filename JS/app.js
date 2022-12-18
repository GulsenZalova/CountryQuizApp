let capitals=[]
let flags=[]
let quizQuestion=document.querySelector(".quiz-question")
let quizAnswers=document.querySelector('.quiz-answers')
let resultContainer=document.querySelector(".result-container")
let quizContainer=document.querySelector(".quiz-container")
let score=0
let resultText=document.querySelector(".result-text")
let againBtn=document.querySelector(".again-btn")
function getAll(){
fetch("https://restcountries.com/v3.1/all")
.then(res=>res.json())
.then(data=>{chooseQuestions(data)
})
}
getAll()
function chooseQuestions(data){
    let randomCountryArr=[]
    data.forEach(element => {
        let randomCountryIndex=Math.floor(Math.random()*data.length)
        let randomCountry=data.slice(randomCountryIndex,randomCountryIndex+1)
      if(randomCountryArr.length<4){
        if(!randomCountryArr.includes(randomCountry)){
            randomCountryArr.push(randomCountry)
        }
      }
    });
    let randomCountryForQuestionIndex=Math.floor(Math.random()*randomCountryArr.length)
    let randomCountryForQuestion=randomCountryArr.slice(randomCountryForQuestionIndex,randomCountryForQuestionIndex+1)
    let randomCapital=randomCountryForQuestion[0][0].capital[0]
    let randomFlag=randomCountryForQuestion[0][0].flags.svg
    let questions=[randomFlag,randomCapital]
    let randomQuestionİndex=Math.floor(Math.random() * 2)
    createQuestion(questions[randomQuestionİndex],randomQuestionİndex,randomCountryArr,randomCountryForQuestion)
}

function createQuestion(randomQuestion,randomQuestionİndex,randomCountryArr,randomCountryForQuestion){
    // console.log(randomCountryForQuestion)
    // console.log(randomCountryArr)
    let questionText
   if(randomQuestionİndex==1){
    let capital=randomQuestion
    questionText=`
    <div class="quiz-question">
    <span class="question">${capital}</span>
    <span>is the capital of ?</span>
    </div>
    `
    quizQuestion.innerHTML=questionText
   }else if(randomQuestionİndex==0){
    let flag=randomQuestion
    questionText=`
        <div class="quiz-question">
        <img src="${flag}" class="quiz-img" alt="">
            <p> Witch country does this flag belong to?</p>
        </div>
    `
    quizQuestion.innerHTML=questionText
   }

   
   randomCountryArr.forEach((element,i)=>{
  let answers=`
  <ul class="answers-list">
  <li class="answer"><span class="variant">A</span><span class="variant-text">${randomCountryArr[0][0].name.common}</span></li>
  <li class="answer"><span class="variant">B</span><span class="variant-text">${randomCountryArr[1][0].name.common}</span></li>
  <li class="answer"><span class="variant">C</span><span class="variant-text">${randomCountryArr[2][0].name.common}</span></li>
  <li class="answer"><span class="variant">D</span><span class="variant-text">${randomCountryArr[3][0].name.common}</span></li>
</ul>
  `

   quizAnswers.innerHTML=answers 
   let answersList=document.querySelectorAll(".answer")
   let variantTexts=document.querySelectorAll(".variant-text")
   let trueIcon=document.querySelector(".trueIcon")
   let falseIcon=document.querySelector(".falseIcon")
   let choosenVariant
   answersList.forEach(answer=>{
    answer.addEventListener("click",function(){
        choosenVariant=answer.textContent.slice(1)
        if(randomCountryForQuestion[0][0].name.common==choosenVariant){
            // console.log("duzdu")
            answer.classList.add("correct")
            answer.innerHTML+=`<i class="fa-solid fa-check trueIcon"></i>`
            score+=1
            setTimeout(()=>{
                getAll()
            },1000)
        }else{
            // console.log("sehvdi")
            answer.classList.add("uncorrect")
            answer.innerHTML+=`<i class="fa-solid fa-x falseIcon"></i>`
            variantTexts.forEach(x=>{
                if(x.textContent==randomCountryForQuestion[0][0].name.common){
                   x.parentElement.classList.add("correct")
                   x.parentElement.innerHTML+=`<i class="fa-solid fa-check trueIcon"></i>`
                }
            
            })
            setTimeout(()=>{
                resultContainer.classList.add("show")
                quizContainer.classList.remove("show")
                resultText.innerHTML=score
            },1000)
        }
    })
    })
})

}

againBtn.addEventListener("click",function(){
    score=0
    resultContainer.classList.remove("show")
    quizContainer.classList.add("show")
    getAll()
})
