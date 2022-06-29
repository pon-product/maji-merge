main();

function main() {
    const isLoggedIn = document.querySelector("body.logged-in");

    if (isLoggedIn) {
        let count = 0;
        let isCachedView = true;

        let intervalId = setInterval(() => {
            count++;
            if (isReady()) {
                if (isNotPermitted() || (isAlreadyBlocked() && !isCachedView) || count > 50) {
                    clearInterval(intervalId)
                    count = 0
                } else if (isCachedView) {
                    if (!isAlreadyBlocked()) {
                        makeBlockMerge()
                        isCachedView = false;
                    }
                }
            }
        }, 500)
    }
}

// 必要な要素が読み込み終わっているかどうか
function isReady() {
    const statusNodeList = document.querySelectorAll(".branch-action-item .status-heading");
    return (statusNodeList != null && statusNodeList.length > 0);
}

// 既に動いているかどうか
function isAlreadyBlocked() {
    return document.querySelector("#majide-merge-suruno") != null;
}

// マージできないPRでないか
function isNotPermitted() {
    const statusNodeList = document.querySelectorAll(".branch-action-item .status-heading");
    return statusNodeList[statusNodeList.length-1].innerHTML !== 'This branch has no conflicts with the base branch when rebasing';
}

function makeBlockMerge() {
    const mergeButtonField = document.querySelector(".merge-message");

    const mergeButton = document.querySelector(".btn-group-merge");
    const squashButton = document.querySelector(".btn-group-squash");
    const rebaseButton = document.querySelector(".btn-group-rebase");

    mergeButton.disabled = true;
    squashButton.disabled = true;
    rebaseButton.disabled = true;

    const baseRef = document.querySelector("span.base-ref");
    const headRef = document.querySelector("span.head-ref");

    let caution = document.createElement("div");
    caution.id = "majide-merge-suruno"
    caution.className = "flash flash-warn my-2";
    caution.innerHTML = "This pull request will be merged from " + headRef.innerHTML + " to " + baseRef.innerHTML

    let enableButtonDiv = document.createElement("div");
    enableButtonDiv.className = "d-flex flex-justify-end";

    let enableButton = document.createElement("button");
    enableButton.id = "majide-merge-suruno-button"
    enableButton.className = "btn";
    enableButton.textContent = "Enable merge button";

    enableButtonDiv.appendChild(enableButton);

    enableButton.onclick = () => {
        mergeButton.disabled = false;
        squashButton.disabled = false;
        rebaseButton.disabled = false;

        enableButton.disabled = true;
        enableButton.textContent = "Enabled!";
    };

    document.querySelector("#majide-merge-suruno")?.remove()
    document.querySelector("#majide-merge-suruno-button")?.remove()
    mergeButtonField.appendChild(caution);
    mergeButtonField.appendChild(enableButtonDiv);
}