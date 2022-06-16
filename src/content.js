let count = 0;
main();

function main() {
    if (!makeBlockMerge() && count < 50) {
        count++;
        setTimeout(main, 500);
    }
}

function makeBlockMerge() {
    // PRがdraftの場合 or 既に動いている場合
    if (document.querySelector(".branch-action-btn") || document.querySelector("#majide-merge-suruno")) {
        return true;
    }

    const mergeButtonField = document.querySelector(".merge-message");

    const mergeButton = document.querySelector(".btn-group-merge");
    const squashButton = document.querySelector(".btn-group-squash");
    const rebaseButton = document.querySelector(".btn-group-rebase");
    
    if (!mergeButtonField || !mergeButton || !squashButton || !rebaseButton) {
        return false;
    }

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

    mergeButtonField.appendChild(caution);
    mergeButtonField.appendChild(enableButtonDiv);

    return true;
}