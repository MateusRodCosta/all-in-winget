"use strict";

window.onload = async function() {
  let comps = await fetchJson("json/components.json");
  let tools = await fetchJson("json/tools.json");
  let softws = await fetchJson("json/softwares.json");

  let compsList = document.getElementById("components-list");
  let toolsList = document.getElementById("tools-list");
  let softwList = document.getElementById("softwares-list");

  createSelection(compsList, comps);
  createSelection(toolsList, tools);
  createSelection(softwList, softws);
}

function createSelection(destination, list) {
  for (let i in list) {
    let hold = document.createElement("div");
    hold.className = "selection-item"
    let checkbox = document.createElement("input");
    checkbox.id = "chbid-" + list[i]["id"];
    checkbox.type = "checkbox";
    checkbox.value = list[i]["id"];
    let label = document.createElement("label");
    let tn = document.createTextNode(list[i]["name"]);
    label.htmlFor="chbid-" + list[i]["id"];
    label.appendChild(tn);
    hold.appendChild(checkbox);
    hold.appendChild(label);
    destination.appendChild(hold);
  }
}

async function fetchJson(filePath) {
  let response = await fetch(filePath);
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

  let hold = document.createElement("article");
  let div = document.createElement("div");
  let codeBlock = document.createElement("code");
  codeBlock.id = "winget-command";
  let spanBlock = document.createElement("span");
  let commandText = document.createTextNode(output);
  spanBlock.appendChild(commandText);
  let img = document.createElement("img");
  img.src = "img/copy.svg";
  img.onclick = function() {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard: " + output);
  }
  codeBlock.appendChild(spanBlock);
  codeBlock.appendChild(img);
  div.appendChild(codeBlock);
  hold.appendChild(div);
  wgSection.appendChild(hold);
}
