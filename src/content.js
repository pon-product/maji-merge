main();

function main() {
    const isLoggedIn = document.querySelector("body.logged-in");

    if (isLoggedIn && isReady() && !isNotPermitted() && !isAlreadyBlocked()) {
        makeBlockMerge()
    }
}

// 必要な要素が読み込み終わっているかどうか
function isReady() {
    const statusNodeList = document.querySelectorAll(".branch-action-item .status-heading");
    return statusNodeList?.length > 0 === true;
}

// 既に動いているかどうか
function isAlreadyBlocked() {
    return document.querySelector("#majide-merge-suruno") != null;
}

// マージできないPRでないか
function isNotPermitted() {
    const status = document.querySelector(".merging-body .status-meta");
    return status?.textContent.trim().endsWith('can be performed automatically.') !== true;
}

function makeBlockMerge() {
    const mergeButtonField = document.querySelector(".merge-message");

    const mergeButton = document.querySelector(".btn-group-merge");
    const squashButton = document.querySelector(".btn-group-squash");
    const rebaseButton = document.querySelector(".btn-group-rebase");

    const baseRef = document.querySelector("span.base-ref");
    const headRef = document.querySelector("span.head-ref");

    if (!mergeButtonField || !mergeButton || !squashButton || !rebaseButton || !baseRef || !headRef) {
        return
    }

    const mergeDisabledAlready = mergeButton.disabled;
    const squashDisabledAlready = squashButton.disabled;
    const rebaseDisabledAlready = rebaseButton.disabled;

    mergeButton.disabled = true;
    squashButton.disabled = true;
    rebaseButton.disabled = true;

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
        if (!mergeDisabledAlready) {
            mergeButton.disabled = false;
        }
        if (!squashDisabledAlready) {
            squashButton.disabled = false;
        }
        if (!rebaseDisabledAlready) {
            rebaseButton.disabled = false;
        }

        enableButton.disabled = true;
        enableButton.textContent = "Enabled!";
    };

    mergeButtonField.appendChild(caution);
    mergeButtonField.appendChild(enableButtonDiv);
}