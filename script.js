// ideas for furhter improvement
    // add notifications
    // toggle between notifications and sound alerts
    // every time you pause the timer, it adds 3 minutes of work time as a punishment

// duration of one pomodoro
const pomodoroLengthMins = 50;  
// % percent probability for each minute that a reward is handed
const rewardProbability = 15; 
// used to count down pomodoro length in milliseconds
let remainingPomodoroMilliseconds = pomodoroLengthMins*60*1000; 

const audioTicObj = new Audio('./tic.mp3');
audioTicObj.load();
const audioRewardObj = new Audio('./reward.mp3');
audioRewardObj.load();
let intervalId; // used to start and stop timer
const button = document.querySelector(".button");
const loader = document.querySelector(".loader");
const instructions = document.querySelector(".instructions");

button.addEventListener('click', (e) => {
    if(e.target.innerText === "Start Work") {
        startWork();
    }
    else if(e.target.innerText === "Pause Work") {
        enterPause();
    }
    else if(e.target.innerText === "New Pomodoro") {
        //reset time to initial pomodoro length but in milliseonds
        remainingPomodoroMilliseconds = pomodoroLengthMins*60*1000;
        startWork();
    } 
} );

startWork = () => {
    //used to calculate time passed between two setintervals
    startWorkTime = new Date();
    //used to calculate if a minute has passed for skinner box to be run
    startSkinnerTime = new Date();
    tenthOfMillisecondsPassed = 0;
    loader.style.opacity = 1;
    button.innerText = "Pause Work";
    instructions.innerText = "To succeed, fall in love with one project, immerse yourself in your work and dedicate your life to mastering it. -Jiro Ono";
    document.body.style.backgroundImage = "url('https://www.straitstimes.com/sites/default/files/articles/2019/11/27/nmjiromovie2711.jpg')";    
    intervalId = setInterval( () => {
        //if time is over show reward
        if(remainingPomodoroMilliseconds < 0) {
            showReward();
        }

        //update remaining time        
        newTime = new Date();
        remainingPomodoroMilliseconds -= (newTime - startWorkTime);
        startWorkTime = new Date();

        //skinner box - if an additional minute has passed then roll dice to offer reward
        let timePassed = new Date() - startSkinnerTime;
        if( timePassed > 60*1000 ) {
            console.log(remainingPomodoroMilliseconds/1000/60);
            let randomNumber = Math.random()*100;
            if(randomNumber < rewardProbability) {
                audioTicObj.play();
            }
            startSkinnerTime = new Date();   
        }
    }, 100);
}

enterPause = () => {
    clearInterval(intervalId);
    loader.style.opacity = 0;
    button.innerText = "Start Work";
    instructions.innerText = "Jiro worked relentlessly every day except national holidays and over time his consistency and hard work has paid off.";
    document.body.style.backgroundImage = "url('https://www.wbpstars.com/uploads/6/6/7/8/6678890/6305560_orig.jpg')";    
}

showReward = () => {
    clearInterval(intervalId);
    audioRewardObj.play();
    loader.style.opacity = 0;
    button.innerText = "New Pomodoro";
    instructions.innerText = "Bravo, get your reward now. Continue to work relentlessly every day and hour and you will make it to the top too.";
    document.body.style.backgroundImage = "url('https://www.nomtrips.com/wp-content/uploads/2019/09/Japan-Aug-2019-Sushi-Jiro-e1567976856220.jpg')";
}

enterPause();