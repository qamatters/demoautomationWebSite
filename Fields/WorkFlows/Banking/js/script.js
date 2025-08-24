document.addEventListener("DOMContentLoaded", function() {
    // --- LOGIN PAGE ---
    const loginForm = document.getElementById("loginForm");
    if(loginForm){
        loginForm.addEventListener("submit", function(e){
            e.preventDefault();
            let user = document.getElementById("username").value;
            let pass = document.getElementById("password").value;

            if(user === "testuser" && pass === "password123"){
                localStorage.setItem("user", user);
                if(!localStorage.getItem("balance")) localStorage.setItem("balance", 1000);
                if(!localStorage.getItem("transactions")) localStorage.setItem("transactions", JSON.stringify([]));
                window.location.href = "../Banking/dashboard.html";
            } else {
                document.getElementById("errorMsg").innerText = "Invalid credentials!";
            }
        });
    }

    // --- DASHBOARD PAGE ---
    const userSpan = document.getElementById("user");
    const balanceSpan = document.getElementById("balance");
    if(userSpan && balanceSpan){
        let user = localStorage.getItem("user");
        if(!user){
            window.location.href = "index.html";
        } else {
            userSpan.innerText = user;
            balanceSpan.innerText = localStorage.getItem("balance");
        }
    }

    // --- FUND TRANSFER ---
    const transferForm = document.getElementById("transferForm");
    if(transferForm){
        transferForm.addEventListener("submit", function(e){
            e.preventDefault();
            let dest = document.getElementById("destAcc").value;
            let amount = Number(document.getElementById("amount").value);
            let balance = Number(localStorage.getItem("balance"));

            if(amount > balance){
                document.getElementById("transferMsg").style.color = "red";
                document.getElementById("transferMsg").innerText = "Insufficient Balance!";
                return;
            }

            balance -= amount;
            localStorage.setItem("balance", balance);

            let transactions = JSON.parse(localStorage.getItem("transactions"));
            transactions.push({
                date: new Date().toLocaleString(),
                destAcc: dest,
                amount: amount,
                status: "Success"
            });
            localStorage.setItem("transactions", JSON.stringify(transactions));

            document.getElementById("transferMsg").style.color = "green";
            document.getElementById("transferMsg").innerText = "Transfer Successful!";
            document.getElementById("amount").value = "";
            document.getElementById("destAcc").value = "";
        });
    }

    // --- TRANSACTION HISTORY ---
    const tableBody = document.querySelector("#transactionTable tbody");
    if(tableBody){
        let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
        transactions.forEach(tx => {
            let row = `<tr>
                <td>${tx.date}</td>
                <td>${tx.destAcc}</td>
                <td>${tx.amount}</td>
                <td>${tx.status}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    // --- LOGOUT ---
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", function(){
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });
    }
});
