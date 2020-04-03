class TopicListItem {
    constructor(url, heading, children) {
        this.url = url;
        this.heading = heading;
        this.children = children;
    }
    render(container) {
        if (this.children && this.children.length > 0) {

        } else {
            var listItem = document.createElement("li");
            listItem.innerHTML = this.heading;
            container.appendChild(listItem);
        }
    }
}
(function () {
    var allTopics = [
        new TopicListItem("dip", "Dependency Inversion Principle")
    ];

    function createTopicList() {
        var pageListContainer = document.querySelector("#topic-list ul");
        allTopics.forEach(topic => topic.render(pageListContainer));
    }
    createTopicList();
})();