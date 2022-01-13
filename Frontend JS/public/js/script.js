(function (){
    
    function is_palindrome(word) {
        let left = 0;
        word = word.replace(/\W/g, '');
        word = word.toLowerCase().split('');
        let right = word.length -1;
        console.log(word);
        while (left < right) {
            if (word[left] != word[right]) {
                console.log('count');
                return false;
            } else {
                left += 1;
                right -=1;
            }
        return true;
        }
}

let form = document.getElementById('form');
let textInput = document.getElementById('phrase');
let errorDiv = document.getElementById('error');
let attempts = document.getElementById('attempts');
let formLabel = document.getElementById('formLabel');

if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(textInput);

      if (textInput.value.trim()) {
        //textInput = textInput;
        console.log(textInput);
        //textInput = textInput.replace(/\W/g, '');
        textInput.classList.remove('inputClass');
        errorDiv.hidden = true;
        formLabel.classList.remove('error');
        let li = document.createElement('li');
        li.innerHTML = textInput.value;
        if (is_palindrome(li.innerHTML)) {
            li.className = 'is-palindrome';
        } else {
            li.className = 'not-palindrome';
        }
        
        attempts.appendChild(li);
        form.reset();
        textInput.focus();
      } else {
        textInput.value = '';
        errorDiv.hidden = false;
        error.innerHTML = 'You must enter a phrase';
        formLabel.className = 'error';
        textInput.focus();
        textInput.className = 'inputClass';
    }
    });
}
})();