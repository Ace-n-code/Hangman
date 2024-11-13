import {words2guess} from './words.js';   //importing an object containing all the words and hints

//variable declaration
let count=1;  //error counter
let x;        
let ans;      
let answer;
let blank; 
let level=1;  //level counter
let enabled;  //flag to indicate whether game has stopped or not
const letters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    //bg music
let aud1=document.getElementById("creepy");
let aud2= document.getElementById("stab");
let aud3= document.getElementById("upbeat");
    //DOM elements
const lettersContainer = document.querySelector('.letters');
const wordContainer= document.querySelector('.word');
const answerContainer = document.querySelector('.answer');
const photoContainer = document.querySelector('.hangman');
const messageContainer = document.querySelector('.message');
const tryAgain = document.querySelector('.try_again');
const hintContainer= document.querySelector('.hint');
const name= Object.keys(words2guess);

// function to initialize the game
function hangman()
{
    //clearing out all the elements
    document.body.style.backgroundColor= 'white';
    answerContainer.innerText = '';
    messageContainer.innerText = '';
    while (tryAgain.firstChild)
        tryAgain.removeChild(tryAgain.firstChild);

    document.getElementById("level").innerHTML=`Level ${level}`; //printing the level
    //audio setup
    aud3.pause();
    aud1.currentTime=0;  //restarting audio
    aud1.play();
    aud1.volume=0.5;

    //variable initialization
    x= Math.floor(Math.random()*(name.length));  //random number
    ans= name[x];   //random string from the array of words
    answer= ans.split("");  //string to array
    blank=[];
    count=1;
    enabled=true;

    //making an array containing only '_' and ' ' based on the random word
    for (let i=0; i<answer.length; i++)
    {
        if (answer[i] == " ")
            blank.push(" ");
        else 
            blank.push("_");
    }

    wordContainer.innerHTML= blank.join(" ");  //printing the blank array
    hintContainer.innerHTML= words2guess[ans].toUpperCase(); //printing the hint
    image_update(count);   //updating the image

    //creating buttons for each alphabet
    for (let j in letters)
    {

        const button= document.createElement("button");
        button.innerText= letters[j];
        button.style.background = '#BFDFFB';    //color to light blue
        button.id= letters[j];
        button.addEventListener("click", function(){guess(letters[j])}); //onclick pass to function guess
        lettersContainer.appendChild(button);
    }
}

//function to check whether the guess from the user is true or not
function guess(inp)
{
    if (enabled==true)
    {
        let flag=0;    //declaring a flag to check whether the guess was true
        for (let i = 0; i < blank.length; i++) 
        {

            if (answer[i].toUpperCase() == inp.toUpperCase())  //comparing the letter guessed with all the letters of the word
            {
                blank[i]= inp;  //if guessed right, replace '_' with the letter
                wordContainer.innerHTML= blank.join(" ");
                win_lose();    //checking if the game is over or not
                document.getElementById(inp).style.background="#1fd655";  //color to green
                document.getElementById(inp).disabled = true;   //disabling the button
                flag=1;
            } 
        }
        if (flag==0)
        {
            count++;  //error counter+1
            document.body.classList.add('flash-red'); //css class to make the screen flash red for a moment
            aud2.play();
            aud2.volume=0.8;
            enabled= false;   //disabling the game for a short moment to avoid multiple clicks
            setTimeout(function() {
                image_update(count);   //updating the image
                enabled=true;
                win_lose();     //checking if the game is over or not
                document.body.classList.remove('flash-red');
            }, 1000); //1000 miliseconds
            
            document.getElementById(inp).style.background="red"; //color to red
            document.getElementById(inp).disabled= true;  //disable button
        }
   }
}

//function to update images
function image_update(count)
{

    photoContainer.innerHTML = `<img src = "images/hangman${count}.png" alt= "Hangman0">`;
}

//function to check if the game is won or lost
function win_lose()
{
    if (blank.join('').toUpperCase() == answer.join('').toUpperCase()) //comparing guessed string to the word
    {
        messageContainer.innerHTML= "YOU WON!";  //printing victory message
        document.body.style.backgroundColor= '#5ced73'; // bg color to green
        count=9;   //changing count to update image
        aud1.pause(); //pause creepy music
        aud3.play();  //play cheery music
        image_update(count);   //update image
        while (lettersContainer.firstChild) {
            lettersContainer.removeChild(lettersContainer.firstChild);
          }  //removing the letter buttons
        level_up(); //passing to the function to level up
    }
    if (count==8) //on 7th wrong guess
    {
        while (lettersContainer.firstChild) {
            lettersContainer.removeChild(lettersContainer.firstChild);
          }
        messageContainer.innerHTML= "YOU LOST! "; //print losing message
        document.body.style.backgroundColor= 'rgb(211, 1, 43)'; //bg color to red
        count=0;  //changing error counter to update image
        setTimeout(function() {
            image_update(count);
        }, 1000);   //update image a moment later
        answerContainer.innerHTML="The correct answer was: " + ans.toUpperCase();  //prinitng the correct answer
        end_game(); //passing to function to end game
    }
}

//function to proceed with the next level
function level_up()
{
    enabled=false; //disable game
    level+=1;    //level incrementation
    const button3= document.createElement("button");
    button3.innerText= "Next Level";  //create next level button
    button3.style.background = '#ADD8E6';  //color to blue
    button3.id= "Next Level";
    tryAgain.appendChild(button3);
    button3.addEventListener("click", function(){hangman()}); //call hangman function again
}

//function to reset level and start again
function end_game()
{
    enabled=false;  //disable the game
    level=1;  //set level back to 1
    const button2= document.createElement("button");
    button2.innerText= "Try Again?";  //create try again button
    button2.style.background = '#ADD8E6'; //bg to blue
    button2.id= "Try Again?";
    tryAgain.appendChild(button2);
    button2.addEventListener("click", function(){hangman()}); //call hangman function
}

window.onload= hangman();   //calling the main funtion when page loads