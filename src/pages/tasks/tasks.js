document.addEventListener("DOMContentLoaded", function() {
    const tasks = [
        // {
        //     buttonId: "telegram-abadoon",
        //     taskId: "telegram-abadoon",
        //     telegramLink: "https://t.me/abadoon_genius",
        //     telegramChanel: "@abadoon_genius"
        // }
    ];

    const botToken = "7283385769:AAGTk0NSKotSzN3G41R_RAB0JtE1bdKuoaM";
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;


    tasks.forEach(task => {
        const taskBtn = document.getElementById(task.buttonId);

        checkTaskStatus(task.taskId, taskBtn);

        taskBtn.addEventListener("click", function() {
            window.Telegram.WebApp.openTelegramLink(task.telegramLink);

            setTimeout(() => checkSubscription(task.taskId, taskBtn), 5000);
        });
    });

    function checkTaskStatus(taskId, taskBtn) {
        let taskStatus = localStorage.getItem(taskId);

        if (taskStatus === "completed") {
            updateButtonStatus(taskBtn, true);
        } else {
            fetch(`https://zircon-flax-garnet.glitch.me/user-data-task/${userId}/${taskId}`)
                .then(response => response.json())
                .then(taskData => {
                    if (taskData.status === "completed") {
                        localStorage.setItem(taskId, "completed");
                        updateButtonStatus(taskBtn, true);
                    } else {
                        localStorage.setItem(taskId, "not_completed");
                        updateButtonStatus(taskBtn, false);
                    }
                })
                .catch(error => {
                    console.error("Error fetching task data from server:", error);
                });
        }
    }

    function checkSubscription(taskId, taskBtn) {
        const task = tasks.find(t => t.taskId === taskId);
        fetch(`https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${task.telegramChanel}&user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                const memberStatus = data.result.status;

                if (memberStatus === "member" || memberStatus === "administrator" || memberStatus === "creator") {
                    updateTaskAndCounters(taskId, taskBtn, true, 100, 100);
                } else {
                    alert("You didn't subscribe, bro!) WHO DO YOU WANT TO DECEIVE? DO YOU THINK I'M THAT DUMB, BRO?");
                }
            })
            .catch(error => {
                console.error("Error checking subscription:", error);
            });
    }

    function updateTaskAndCounters(taskId, taskBtn, isCompleted, counterIncrement, totalIncrement) {
        const status = isCompleted ? "completed" : "not_completed";
        const timestamp = new Date().toISOString();
    
        localStorage.setItem(taskId, status);
    
        fetch('https://zircon-flax-garnet.glitch.me/update-task-and-counters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                taskId: taskId,
                status: status,
                timestamp: timestamp,
                counterIncrement: counterIncrement,
                totalIncrement: totalIncrement
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Task and counters updated successfully') {
                updateButtonStatus(taskBtn, isCompleted);
                console.log("Task status and counters successfully updated.");
            }
        })
        .catch(error => {
            console.error("Error updating task status and counters on server:", error);
        });
    }
    

    function updateButtonStatus(taskBtn, isCompleted) {
        if (isCompleted) {
            taskBtn.innerText = "DONE";
            taskBtn.disabled = true;
        } else {
            taskBtn.innerText = "LET'S GO";
            taskBtn.disabled = false;
        }
    }
});
