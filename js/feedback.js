document.addEventListener("DOMContentLoaded", function () {
    let ratesContainer = document.getElementById("ratesContainer");
    let resultContainer = document.getElementById("resultContainer");

    document.getElementById("addCriteriaButton").addEventListener("click", function () {
        let selectedCheckboxes = Array.from(document.querySelectorAll('.criteria-checkbox:checked'));
        ratesContainer.innerHTML = '';

        selectedCheckboxes.forEach(checkbox => {
            let rateWrapper = document.createElement('div');
            rateWrapper.classList.add('rate-wrapper');

            let criterion = checkbox.value;
            let label = document.createElement('label');
            label.textContent = `"${criterion}":`;

            let rateInput = document.createElement('textarea');
            rateInput.classList.add('rate-input');
            rateInput.rows = 4;
            rateInput.placeholder = "Напишите отзыв...";

            rateWrapper.appendChild(label);
            rateWrapper.appendChild(rateInput);
            ratesContainer.appendChild(rateWrapper);
        });
    });

    function saveParams() {
        let currentParams = JSON.parse(localStorage.getItem("feedbackParams")) || [];
        
        let criteria = Array.from(document.querySelectorAll('.criteria-checkbox:checked'))
            .map(crit => crit.value);
        let rates = Array.from(document.querySelectorAll('.rate-input'))
            .map(input => input.value);
        console.log(criteria)
        console.log(rates);
        let newParams = {
            criteria,
            rates,
        };

        localStorage.setItem("feedbackParams", JSON.stringify(newParams));
    }


    document.getElementById("saveButton").addEventListener("click", saveParams);

    document.getElementById("loadButton").addEventListener("click", function () {
        let savedParams = JSON.parse(localStorage.getItem("feedbackParams"));

        document.querySelectorAll('.criteria-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        if (savedParams) {
            savedParams.criteria.forEach(c => {
                let checkbox = document.querySelector(`.criteria-checkbox[value="${c}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        } else {
            alert("Нет сохранённых параметров");
        }
    });

    document.getElementById("generateTableButton").addEventListener("click", function () {
        let selectedCheckboxes = Array.from(document.querySelectorAll('.criteria-checkbox:checked'));
        let newRates = Array.from(document.querySelectorAll('.rate-input')).map(input => input.value);

        if (selectedCheckboxes.length === 0 || newRates.length === 0) {
            return;
        }

        for (let i = 0; i < newRates.length; i++) {
            if (newRates[i] === "") {
                alert("Нельзя оставить пустой отзыв")
                return;
            }
        }

        resultContainer.innerHTML = "";

        let table = document.createElement("table");
        table.classList.add("generated-table");

        let headerRow = table.insertRow();
        selectedCheckboxes.forEach(c => {
            let headerCell = document.createElement("th");
            headerCell.textContent = c.value.charAt(0).toUpperCase() + c.value.slice(1);
            headerRow.appendChild(headerCell);
        });

        let newRow = table.insertRow();
        newRates.forEach((rate) => {
            let cell = newRow.insertCell();
            cell.textContent = rate;
        });

        let savedParams = JSON.parse(localStorage.getItem("feedbackParams"));
        if (savedParams && savedParams.length > 0) {
            let selectedCriteria = Array.from(document.querySelectorAll('.criteria-checkbox:checked'))
                .map(checkbox => checkbox.value);

            savedParams.forEach(param => {
                let { criteria, rates } = param;
                if (criteria && rates && selectedCriteria.length) {
                    let row = table.insertRow();
                    selectedCriteria.forEach(criterion => {
                        let cell = row.insertCell();
                        let criterionIndex = criteria.indexOf(criterion);
                        cell.textContent = criterionIndex !== -1 && criterionIndex < rates.length ? rates[criterionIndex] : "";
                    });
                }
            });
        }
        resultContainer.appendChild(table);

        saveParams()
    });

    document.getElementById("deleteTableButton").addEventListener("click", function () {
        ratesContainer.innerHTML = '';
        document.querySelectorAll('.criteria-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        localStorage.removeItem("feedbackParams");

        resultContainer.innerHTML = "";
        let table = document.createElement("table");
        table.classList.add("generated-table");

        resultContainer.appendChild(table);
    });
});

