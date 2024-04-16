// Autofill endDate and restricting startdate
function updateEndDate() {
    var startDateInput = document.getElementById('date');
    var endDateInput = document.getElementById('date2');

    var today = new Date(startDateInput.value);
    var monday = new Date(today);
    var diff = today.getDay() - 1;
    if (diff < 0) {
        monday.setDate(today.getDate() + 1);
    } else {
        monday.setDate(today.getDate() - diff);
    }

    startDateInput.valueAsDate = monday;
    var endDate = new Date(startDateInput.value);
    endDate.setDate(monday.getDate() + 6);
    var formattedEndDate = endDate.toISOString().slice(0, 10);

    endDateInput.value = formattedEndDate;
}

// Toggle days field
function toggleField(index){
    var field = document.getElementById('field'+index);
    field.classList.toggle('d-none');
}


function formLog() {
    var form = document.getElementById('schedForm');
    var formData = new FormData(form);
    var jsonData = {};
    
    console.log(jsonData);

    formData.forEach(function(value, key) {
        jsonData[key] = value;
    });

    console.log(jsonData);
}
