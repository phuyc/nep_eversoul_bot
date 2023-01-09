const Database = require("better-sqlite3");
const fetch = require("node-fetch");
const db = new Database("./eversoul.db");

async function autoUpdate() {
    // souls
    let souls = await fetch("https://www.prydwen.gg/page-data/eversoul/characters/page-data.json");
    let json2 = await souls.json();
    json2 = json2.result.data.allCharacters.nodes;

    for (let i = 0; i < json2.length; i++) {
        db.prepare("INSERT OR IGNORE INTO characters (name, slug) VALUES (?, ?);").run(json2[i].name, json2[i].slug);
    }
}

autoUpdate()
module.exports = autoUpdate