document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const submitButton = document.querySelector('input[type="Submit"]');
  submitButton.disabled = true;
  function isNotNull(value) {
    return value.trim() !== '';
  }
  
  function hasMinLength(value, minLength) {
    return value.length >= minLength;
  }
  
  function hasMaxLength(value, maxLength) {
    return value.length <= maxLength;
  }
  
  function isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
  }
  
  function isValidEmail(value) {
      return /^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(value);
  }
  
  function isValidPhoneNumber(value) {
      return /^\d{3}-\d{3}-\d{4}$/.test(value) || /^\d{10}$/.test(value);
  }
  
  function isValidZipCode(value) {
    return /^\d{6}$/.test(value);
  }

  function isValidSelectOption(value) {
      return value !== '';
  }

  function isTitleSelected() {
    const titleRadios = document.querySelectorAll('input[name="title"]');
    for (const radio of titleRadios) {
        if (radio.checked) {
            return true;
        }
    }
    return false;
}
  
  function handleValidation(target, isValid) {
    const errorElement = target.nextElementSibling;
    if (isValid) {
      if (errorElement && errorElement.classList.contains('error')) {
        errorElement.remove();
      }
    } 
    else if(!target.parentNode.querySelector('.error')) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error');
      errorMessage.textContent = 'Invalid input.'
      target.parentNode.appendChild(errorMessage);
    }
  }
  
  form.addEventListener('input', function (e) {
    const target = e.target;
    const value = target.value.trim();
    const name = target.name;

    
    switch (name) {
      case 'firstName':
        handleValidation(target, isNotNull(value) && hasMinLength(value, 2));
        break;
      case 'title':
        handleValidation(target,isTitleSelected);
        break;
      case 'lastName':
        handleValidation(target, isNotNull(value) && hasMinLength(value, 2));
        break;
      case 'emailId':
        handleValidation(target, isValidEmail(value));
        break;
      case 'phoneNumber':
        handleValidation(target, isValidPhoneNumber(value));
        break;
      case 'zipcode':
        handleValidation(target, isValidZipCode(value));
        break;
      case 'Street1':
          handleValidation(target,isNotNull(value));
        break;
      case 'selectOption':
          handleValidation(target,  isValidSelectOption(value));  
        break; 
       case 'comments':
        handleValidation(target, isNotNull(value));  
        break; 
      default:
        break;
    }
    
    const inputElements = form.querySelectorAll('input[type="text"],input[type="radio"]');
    console.log(inputElements);
    const soption = document.getElementById('selectOption')
    const comments = document.getElementById('comments')
    const isValidForm = [...inputElements, soption,comments].every((input) => {
      const inputValue = input.value.trim();
      // console.log(inputValue);
      const inputName = input.name;
      switch (inputName) {
        case 'title':
          return isTitleSelected();
        case 'firstName':
          return isNotNull(inputValue) && hasMinLength(inputValue, 2);
        case 'lastName':
          return isNotNull(inputValue) && hasMinLength(inputValue, 2);
        case 'emailId':
          return isValidEmail(inputValue);
        case 'phoneNumber':
          return isValidPhoneNumber(inputValue);
        case 'zipcode':
          return isValidZipCode(inputValue);
        case 'Street1':
          return isNotNull(inputValue);
        case 'selectOption':
          const checkboxContainer = document.getElementById('checkboxContainer');
          const checkedCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
          if (checkedCheckboxes.length > 0) {
              return true;
          }
          return false;
        case 'comments':
            return isNotNull(inputValue);  
        default:
          return true; // Handle other fields as needed
      }
    });
    
    submitButton.disabled = !isValidForm;
  });
  form.addEventListener('reset', function (e) {
      const checkboxContainer = document.getElementById('checkboxContainer');
      const textFieldContainer = document.getElementById('textFieldContainer');
      submitButton.disabled = true;
      checkboxContainer.innerHTML = '';
      textFieldContainer.innerHTML = '';
  })
  form.addEventListener('submit', function (e) {
    const errorElements = document.querySelectorAll('.error');
    if (errorElements.length > 0) {
      e.preventDefault();
    }else{
      const checkboxContainer = document.getElementById('checkboxContainer');
      const textFieldContainer = document.getElementById('textFieldContainer');
      submitButton.disabled = true;
      checkboxContainer.innerHTML = '';
      textFieldContainer.innerHTML = ''; 
    }
  });
});




 document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const selectOption = document.getElementById('selectOption');
  const checkboxContainer = document.getElementById('checkboxContainer');
  const textFieldContainer = document.getElementById('textFieldContainer');
  function isTitleSelected() {
    const titleRadios = document.querySelectorAll('input[name="title"]');
    for (const radio of titleRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return false;
}

  const checkboxOptions = {
      option1: ['Cat', 'Dog', 'Lion'],
      option2: ['Star 1', 'Star 2', 'Star 3'],
      option3: ['Apple', 'Banana', 'Cherry'],
      option4: ['Red', 'Green', 'Blue'],
      option5: ['Car', 'Bike', 'Bus'],
  };

  function createCheckboxesForOption(selectedOption) {
      checkboxContainer.innerHTML = ''; // Clear existing checkboxes
      textFieldContainer.innerHTML = ''; 

      if (selectedOption in checkboxOptions) {
          const options = checkboxOptions[selectedOption];
          options.forEach(option => {
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.name = 'options[]';
              checkbox.value = option;
              console.log(checkbox.value)

              let inputbox = null;
              checkbox.addEventListener('change', function () {
                  if (checkbox.checked) {
                      inputbox = document.createElement('input');
                      inputbox.type = 'text';
                      inputbox.name = 'textField';
                      inputbox.placeholder = 'Enter text';
                      textFieldContainer.appendChild(inputbox);
                  } else {
                      if (inputbox) {
                          inputbox.remove()
                      }
                  }
              })
              const label = document.createElement('label');
              label.textContent = option;

              checkboxContainer.appendChild(checkbox);
              checkboxContainer.appendChild(label);
          });
      }
  }
selectOption.addEventListener('change', function () {
  createCheckboxesForOption(selectOption.value);
  const checkedCheckboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]:checked');
});

var submitvalue = 0;
const tableBody = document.getElementById('tableBody');
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  submitvalue++;

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  
  const newRow = document.createElement('tr');


  if(submitvalue<2){

    const radioHeaderCell = document.createElement('th');
    radioHeaderCell.textContent = 'Title';
    newRow.appendChild(radioHeaderCell);

  form.querySelectorAll('input[type="text"], textarea, select').forEach(input => {

      
      const headerCell = document.createElement('th');
      headerCell.textContent = input.id || input.name;
      newRow.appendChild(headerCell);
      tableBody.appendChild(newRow);
      
    });

    

  }


  const valuerow = document.createElement('tr');
  const titleValue = isTitleSelected();
      const titleDataCell = document.createElement('td');
      titleDataCell.textContent = titleValue;
      valuerow.appendChild(titleDataCell);

  form.querySelectorAll('input[type="text"], textarea, select').forEach(input => {
    const dataCell = document.createElement('td');
    
    dataCell.textContent = input.value;
    valuerow.appendChild(dataCell);
  });

  tableBody.appendChild(valuerow);

 
  form.reset();
});


});