        function RegisterFormSubmit(event) {
            let name = document.querySelector("#name").value, company = document
                .querySelector("#company").value, email = document
                    .querySelector("#email").value, phone = document
                        .querySelector("#phone").value;
            if (!validateForm(name, company, email, phone))
                return;
            document.querySelector(".spinner").style.display = "inline-block";
            sendAsgard(name, company, email, phone);
        }
        function sendAsgard(name, company, email, phone) {
            let a = new XMLHttpRequest();
            (a.withCredentials = !1),
                a
                    .open("POST",
                        "https://3sksqeptx3.execute-api.us-east-1.amazonaws.com/prod/site/request-demo"),
                a.setRequestHeader("Content-Type", "application/json"),
                (a.onload = function () {
                    if (a.status === 200) {
                        document.querySelector(".spinner").style.display = "none";
                        document.querySelector(".conta-success-container").style.display = "flex";
                        document.querySelector(".conta-register-container").style.display = "none";
                        document.querySelector("#nameRegister").textContent = name
                            .split(' ')[0]
                            + ", verifique sua caixa de entrada no e-mail";
                        document.querySelector("#emailRegister").textContent = email;
                        umami.track('Signup: Criação de conta');
                    } else {
                        document.getElementById("errorModal").style.display = "block";
                        umami.track('Erro ' + a.status
                            + ': Criação de conta', {
                            Event: new Date().toLocaleString('pt-BR', {
                                timeZone: 'America/Sao_Paulo'
                            })
                        });
                    }
                });
            let r = {
                tituloNegocio: company + " - " + name,
                nome: name,
                email: email,
                celular: phone,
                empresa: company,
                responsavelId: 979,
                campanhaId: null,
                origemId: 1,
                etapaId: 17,
            };
            a.send(JSON.stringify(r));
        }
        function validateForm(name, company, email, phone) {
            let isValid = true;
            clearErrors();
            if (name === "") {
                showError("error-name", "Nome: Preenchimento obrigatório");
                isValid = false;
            }
            if (company === "") {
                showError("error-company", "Empresa: Preenchimento obrigatório");
                isValid = false;
            }
            if (email === "") {
                showError("error-email", "E-mail: Preenchimento obrigatório");
                isValid = false;
            } else {
                if (!validateEmail(email)) {
                    showError("error-email", "O e-mail informado não é válido");
                    isValid = false;
                }
            }
            if (phone === "") {
                showError("error-phone", "Telefone: Preenchimento obrigatório");
                isValid = false;
            } else {
                if (!validatePhone(phone)) {
                    showError("error-phone",
                        "O telefone informado não é válido");
                    isValid = false;
                }
            }
            return isValid;
        }
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        function validatePhone(phone) {
            const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
            return regex.test(phone);
        }
        function showError(fieldId, message) {
            const errorDiv = document.getElementById(fieldId);
            errorDiv.textContent = message;
            errorDiv.style.display = "block";
        }
        function applyPhoneMask(element) {
            let value = element.value;
            value = value.replace(/\D/g, "");
            if (value.length <= 10) {
                value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
                value = value.replace(/(\d{4})(\d)/, "$1-$2");
            } else {
                value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
                value = value.replace(/(\d{5})(\d)/, "$1-$2");
            }
            element.value = value;
        }
        function clearErrors() {
            document.querySelectorAll(".login-error-message").forEach(
                function (error) {
                    error.textContent = "";
                    error.style.display = "none";
                });
        }
        document.getElementById("closeModalError").onclick = function () {
            document.getElementById("errorModal").style.display = "none";
        };

        let contentMenu = document.querySelector('.menu-toggle');
        let menu = document.querySelector('.menu');
        
        contentMenu.onclick = function () {
            menu.classList.toggle('active');
        }