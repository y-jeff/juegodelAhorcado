document.addEventListener("DOMContentLoaded", function() {
    const Hangman = {
      wordList: {
        animales: ["gato", "perro", "elefante", "jirafa", "leon", "tigre", "delfin", "ballena", "zorro", "raton", "mono"],
        desarrollador: ["javascript", "python", "ruby", "html", "css", "php", "java", "csharp", "react", "angular", "node"],
        autos: ["toyota", "chevrolet", "ford", "honda", "bmw", "mercedes", "audi", "nissan", "volkswagen", "kia", "hyundai"]
      },
      
      init: function() {
        this.wrongGuesses = [];
        this.correctGuesses = [];
        this.category = document.getElementById("category").value;
        this.word = this.chooseRandomWord();
        this.displayWord();
        this.updateWrongGuesses();
        this.hideMessage();
      },
      
      chooseRandomWord: function() {
        const words = this.wordList[this.category];
        return words[Math.floor(Math.random() * words.length)];
      },
      
      displayWord: function() {
        const guessContainer = document.querySelector(".guess");
        guessContainer.innerHTML = "";
        [...this.word].forEach(() => {
          const letter = document.createElement("span");
          letter.className = "letter";
          guessContainer.appendChild(letter);
        });
      },
      
      setupEventListeners: function() {
        document.querySelector(".guessButton").addEventListener("click", () => {
          const letterInput = document.querySelector(".guessLetter");
          this.makeGuess(letterInput.value.toLowerCase());
          letterInput.value = "";
        });
        
        document.querySelector(".startButton").addEventListener("click", () => this.init());
        document.querySelector(".restart").addEventListener("click", () => this.init());
      },
      
      makeGuess: function(letter) {
        if (this.wrongGuesses.includes(letter) || this.correctGuesses.includes(letter) || letter === "") return;
  
        if (this.word.includes(letter)) {
          this.correctGuesses.push(letter);
          this.updateCorrectGuesses();
          if (this.isGameWon()) this.showMessage("¡Ganaste!", "¡Felicidades, adivinaste la palabra!");
        } else {
          this.wrongGuesses.push(letter);
          this.updateWrongGuesses();
          if (this.wrongGuesses.length >= 6) this.showMessage("Perdiste...", `La palabra era: ${this.word}`);
        }
      },
      
      updateCorrectGuesses: function() {
        [...document.querySelectorAll(".letter")].forEach((el, i) => {
          if (this.correctGuesses.includes(this.word[i])) {
            el.textContent = this.word[i];
            el.style.color = "#000"; // Aseguramos que el color sea negro
          }
        });
      },
      
      updateWrongGuesses: function() {
        document.querySelector(".wrongLetters").textContent = this.wrongGuesses.join(", ");
      },
      
      isGameWon: function() {
        return [...this.word].every(letter => this.correctGuesses.includes(letter));
      },
      
      showMessage: function(title, text) {
        const messageContainer = document.querySelector(".message");
        messageContainer.style.display = "block";
        messageContainer.querySelector(".title").textContent = title;
        messageContainer.querySelector(".text").textContent = text;
      },
      
      hideMessage: function() {
        document.querySelector(".message").style.display = "none";
      }
    };
  
    Hangman.setupEventListeners();
  });
  