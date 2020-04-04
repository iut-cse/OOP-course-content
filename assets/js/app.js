class NavItem {
    constructor(url, heading, level) {
        this.url = url;
        this.heading = heading;
        this.level = level;
    }
    render(container, urlRoot) {
        var appliedUrl = this.url;
        if(appliedUrl[0] !== "#") {
            appliedUrl = urlRoot + appliedUrl;
        }

        var anchor = document.createElement("a");
        anchor.setAttribute("href", appliedUrl);
        anchor.innerHTML = this.heading;

        var listItem = document.createElement("li");
        listItem.classList.add("level-" + this.level);
        listItem.appendChild(anchor);
        container.appendChild(listItem);
    }
}

function createNavList(container, itemList, urlRoot) {
    itemList.forEach(topic => topic.render(container, urlRoot));
}

function buildAllNavs(urlRoot){
    console.log(urlRoot);
    var allTopics = [
        new NavItem("#", "All Topics", 0),
        new NavItem("#", "SOLID", 1),
        //new NavItem("topics/srp", "Single Responsibility Principle", 2),
        new NavItem("topics/ocp", "Open Closed Principle", 2),
        new NavItem("topics/lsp", "Liskov Substitution Principle", 2),
        //new NavItem("topics/isp", "Interface Segragation Principle", 2),
        //new NavItem("topics/dip", "Dependency Inversion Principle", 2),
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

    createNavList(document.querySelector("#topic-list ul"), allTopics, urlRoot);
    createNavList(document.querySelector("#table-of-content ul"), allHeadings, urlRoot);
}
