"use strict";

window.onload = async function() {
    let comps = await fetchComponents();
    let tools = await fetchTools();
    let softws = await fetchSoftwares();

    let compsList = document.getElementById("components-list");
    let toolsList = document.getElementById("tools-list");
    let softwList = document.getElementById("softwares-list");

    for (let i in comps) {
        let hold = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.id = "chbid-" + comps[i]["id"];
        checkbox.type = "checkbox";
        checkbox.value = comps[i]["id"];
        var label = document.createElement('label');
        var tn = document.createTextNode(comps[i]["name"]);
        label.htmlFor="chbid-" + comps[i]["id"];
        label.appendChild(tn);
        hold.appendChild(checkbox);
        hold.appendChild(label);
        compsList.appendChild(hold);
    }

    for (let i in tools) {
        let hold = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.id = "chbid-" + tools[i]["id"];
        checkbox.type = "checkbox";
        checkbox.value = tools[i]["id"];
        var label = document.createElement('label');
        var tn = document.createTextNode(tools[i]["name"]);
        label.htmlFor="chbid-" + tools[i]["id"];
        label.appendChild(tn);
        hold.appendChild(checkbox);
        hold.appendChild(label);
        toolsList.appendChild(hold);
    }

    for (let i in softws) {
        let hold = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.id = "chbid-" + softws[i]["id"];
        checkbox.type = "checkbox";
        checkbox.value = softws[i]["id"];
        var label = document.createElement('label');
        var tn = document.createTextNode(softws[i]["name"]);
        label.htmlFor="chbid-" + softws[i]["id"];
        label.appendChild(tn);
        hold.appendChild(checkbox);
        hold.appendChild(label);
        softwList.appendChild(hold);
    }
}

async function fetchComponents() {
    let response = await fetch("json/components.json");
    let json = await response.json();
    return json;
}

async function fetchTools() {
    let response = await fetch("json/tools.json");
    let json = await response.json();
    return json;
}

async function fetchSoftwares() {
    let response = await fetch("json/softwares.json");
    let json = await response.json();
    return json;
}

function generateWingetCommand() {
    let wgSection = document.getElementById("winget-section");
    wgSection.innerHTML = ""

    let selectedComponents = [...document.getElementById("components-list").querySelectorAll(":checked")].map(e => e.value);
    let selectedTools = [...document.getElementById("tools-list").querySelectorAll(":checked")].map(e => e.value);
    let selectedSoftwares = [...document.getElementById("softwares-list").querySelectorAll(":checked")].map(e => e.value);

    let fullSelectionList = [...selectedComponents, ...selectedTools, ...selectedSoftwares];
    if (fullSelectionList.length == 0) {
        alert("No items selected");
        return;
    }
    let output = "winget install " + fullSelectionList.join(" ");

    let hold = document.createElement('article');
    let div = document.createElement('div');
    var codeBlock = document.createElement('code');
    var commandText = document.createTextNode(output);
    codeBlock.appendChild(commandText);
    div.appendChild(codeBlock);
    let img = document.createElement('img');
    img.src = "img/copy.svg";
    img.onclick = function() {
        navigator.clipboard.writeText(output);
        alert("Copied to clipboard: " + output);
    }
    div.appendChild(img);
    hold.appendChild(div);
    wgSection.appendChild(hold);
}
