class NavItem {
    constructor(url, heading, level) {
        this.url = url;
        this.heading = heading;
        this.level = level;
    }
    render(container) {
        var anchor = document.createElement("a");
        anchor.setAttribute("href", this.url);
        anchor.innerHTML = this.heading;

        var listItem = document.createElement("li");
        listItem.classList.add("level-" + this.level);
        listItem.appendChild(anchor);
        container.appendChild(listItem);
    }
}

function createNavList(container, itemList) {
    itemList.forEach(topic => topic.render(container));
}

(function () {
    var allTopics = [
        new NavItem("#", "All Topics", 0),
        new NavItem("#", "SOLID", 1),
        new NavItem("srp", "Single Responsibility Principle", 2),
        new NavItem("ocp", "Open Closed Principle", 2),
        new NavItem("lsp", "Liskov Substitution Principle", 2),
        new NavItem("isp", "Interface Segragation Principle", 2),
        new NavItem("dip", "Dependency Inversion Principle", 2),
    ];

    var allHeadings = [
        new NavItem("#", "In this page", 0)
    ];
    document.querySelector(".main-content").querySelectorAll("h1,h2,h3").forEach(head => {
        var url = "#" + head.id;
        var heading = head.innerHTML;
        var level = parseInt(head.tagName.substring(1));
        allHeadings.push(new NavItem(url, heading, level));
    });

    createNavList(document.querySelector("#topic-list ul"), allTopics);
    createNavList(document.querySelector("#table-of-content ul"), allHeadings);
})();