const button = document.getElementById("raffle-button")
const values = document.querySelectorAll('.input-raffle')
const raffle = document.getElementById('sectionRaffle')
const results = document.getElementById('result-section')
const columns = document.getElementById('column-results')
const checkbox = document.getElementById('togle-number')

const numberSelected = []

values.forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');

  });
});

button.addEventListener('click', () => {
  const allFilled = Array.from(values).every((input) => {
    return input.value.trim() !== '';
  });
    values.forEach((input) => {
       numberSelected.push(input.value)
    })
    const quantity = numberSelected[0]
    const min = numberSelected[1]
    const max = numberSelected[2]

   console.log(numberSelected)

 

  function shuffleNumber(quanity, min, max){
        min = Math.ceil(min)
        max = Math.floor(max)
        let numberResults = []
        if (min > max){
          throw new Error('O numero maximo é menor que o numero minimo')
        }else{
          if(checkbox.checked){
            if(quanity > (max - min + 1)){
                throw new Error('Quantidade maior que o total possível de números no intervalo');
            }else{
              const unique = new Set()
              while(unique.size < quanity){
                unique.add(Math.floor(Math.random() * (max - min + 1)) + min);
              }
                return Array.from(unique);
            }
          }else{
              
            for(let i = 0; i < quanity; i++){
              numberResults.push(Math.floor(Math.random() * (max - min + 1) + min))
            }

            return numberResults
          }
        }
  }
    
  try {
    if (quantity > 1){
       const numbersResults = shuffleNumber(quantity, min, max)
        console.log(columns);
        console.log(numbersResults);
       for(let i = 0; i < quantity; i++){ 
        
        const divItem1 = document.createElement("div")
        divItem1.classList.add("item")

        const divContainer = document.createElement("div")
        divContainer.classList.add("result-container") 
        divContainer.classList.add("first-column-result")

        const divFirstNumber = document.createElement("span")
        divFirstNumber.classList.add("number-result")
        divFirstNumber.classList.add("first-colum-number")
        divFirstNumber.textContent = `${numbersResults[i]}`

        const divItem2 = document.createElement("div")
        divItem2.classList.add("item")

        const divContainer2 = document.createElement("div")
        divContainer2.classList.add("result-container") 
        divContainer2.classList.add("second-colomn-result")

        const divFirstNumber2 = document.createElement("span")
        divFirstNumber2.classList.add("number-result")
        divFirstNumber2.classList.add("second-colomn-number")
        divFirstNumber2.textContent = `${numbersResults[i+1]}`

        i++;



        divItem1.appendChild(divFirstNumber);
        divItem1.appendChild(divContainer);
        columns.appendChild(divItem1);

        divItem2.appendChild(divFirstNumber2);
        divItem2.appendChild(divContainer2);
        columns.appendChild(divItem2);
        }

      
    }else if(quantity == 1){
        const numbersResults = shuffleNumber(quantity, min, max)
        const divItem1 = document.createElement("div")
        divItem1.classList.add("item")

        const divContainer = document.createElement("div")
        divContainer.classList.add("result-container") 
        divContainer.classList.add("first-column-result")

        const divFirstNumber = document.createElement("span")
        divFirstNumber.classList.add("number-result")
        divFirstNumber.classList.add("first-colum-number")
        divFirstNumber.textContent = `${numbersResults[i]}`

        divItem1.appendChild(divFirstNumber);
        divItem1.appendChild(divContainer);
        columns.appendChild(divItem1);
    }else{
      throw new Error('Insira um numero maior que 0');
    }

  } catch (error) {
    alert(error.message);
  }
   if (allFilled && !error) {
        raffle.classList.remove('raffle-section');
        raffle.classList.add('hide')
        results.classList.remove('hide')
        results.classList.add('result-section')
   }
});