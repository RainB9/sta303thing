"use strict";

(function(global, document, $) { 
const getNav = (url, name, children) => {
    let menuItem = null;
    let downIcon = null;
    if (children?.length) {
        const items = children?.map((item) => {
            const inner = document.createElement("li")
            inner.className = "menuitem"
            inner.id = item.name
            const inn = document.createElement("a")
            inn.target = "_blank"
            inn.href = item.url
            inn.append(item.name)
            inner.appendChild(inn)
            return inner
        })
        const frame = document.createElement("div")
        frame.className = 'menu'
        items.forEach(s => {
            frame.appendChild(s)
        })
        menuItem = frame
    }
    const in_final = document.createElement("a")
    in_final.href = url
    in_final.target = "_blank"
    in_final.className = "navitem"
    const nav = document.createElement("ul")
    nav.id = name

    in_final.append(name)
    nav.append(in_final)
    if(menuItem) {
        nav.append(menuItem)
    }
    if (children?.length) {
        const node_downIcon = document.createElement("span")
        node_downIcon.append("<")
        node_downIcon.className = 'down-icon'
        downIcon = node_downIcon
        in_final.append(downIcon)
    }
    return nav
}

function _toArray(x) {
    for (var i = 0, lst = []; i < x.length; i++)
        lst.push(x[i]);

    return lst
}

const applyEvent = () => {
    const navs = [document.getElementsByClassName("navitem")][0]
    const array_navs = _toArray(navs)
    array_navs.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.parentElement.classList.add("active");
            item.parentElement.parentElement.childNodes.forEach(child => {
                if (child !== item.parentElement) {
                    if (child.childNodes.length > 1) {
                        child.classList.remove("active");
                    }
                }
            });
        });
    });
}

function NavGenerator(id, options = {
    title: "",
    navItems: [],
    style: ""
}) {
    this.id = id;
    this.navItems = options.navItems || [];
    const title = options.title || "";
    const style = options.style || "";
    const navbar = document.getElementById(id);
    navbar.className = "navbar horizontal";
    const container = document.createElement("div");
    container.className = "container";
    const navbarHeader = document.createElement("div");
    navbarHeader.className = "navbar-header";
    if (title) {
        const navbarBrand = document.createElement("a");
        navbarBrand.className = "navbar-brand";
        navbarBrand.href = "#";
        navbarBrand.append(title);
        navbarHeader.append(navbarBrand);
    }
    container.append(navbarHeader);
    const nav = document.createElement("div");
    nav.className = "nav";
    nav.id = "navbar";
    this.navItems.forEach(item => {
        nav.append(getNav(item.url, item.name, item.children));
    });
    container.append(nav);
    navbar.append(container);

    document.documentElement.addEventListener('click', (e) => {
        const navs = [document.getElementsByClassName("navitem")][0]
        const array_navs = _toArray(navs)
        array_navs.forEach(item => {
            item.parentElement.parentElement.childNodes.forEach(child => {
                if (child.childNodes.length > 1) {
                    child.classList.remove("active");
                }
            });
        });
    });
    applyEvent();
    const styleElement = document.createElement("style");
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
}


NavGenerator.prototype = {
    /**
     * set the navbar vertical
     *
     */
    setVertical: function () {
        const navbar = document.getElementById(this.id);
        navbar.className = "navbar vertical";
    },

    /**
     * set the navbar horizontal
     *
     */
    setHorizontal: function () {
        const navbar = document.getElementById(this.id);
        navbar.className = "navbar horizontal";
    },

    /**
     * set the menu line style
     *
     *  @param {string} style example: "solid" or "dotted" or "dashed" or "none"
     */
    setMenuLineStyle: function (style) {
        if (style !== "none" && style !== "solid" && style !== "dotted" && style !== "dashed") {
            document.documentElement.style.setProperty("--menu-line-height", "0");
        } else {
            document.documentElement.style.setProperty("--menu-line-style", style);
            document.documentElement.style.setProperty("--menu-line-height", "1px");
        }
    },

    /**
     * to add new nav item
     *
     * @param name {string} example: "Home"
     * @param url {string} example: https://www.google.com
     * @param children {array} example: [{name: "", url: ""}]
     * @returns {NavGenerator}
     */
    addBar: function (name, url, children) {
        this.navItems.push({
            name,
            url,
            children
        });
        const new_node = getNav(url, name, children)
        document.getElementsByClassName('nav')[0].appendChild(new_node);
        applyEvent();
        return this;
    },

    /**
     * set the navbar background color
     *
     * @param color {string} example: #fff
     * @returns {NavGenerator}
     */
    setBackgroundColor: function (color) {
        document.documentElement.style.setProperty("--background-color", color);
        return this;
    },

    /**
     * set the navbar title
     *
     * @param title {string} example: "Title"
     * @returns {NavGenerator}
     */
    setTitle: function (title) {
        document.getElementsByClassName('navbar-brand')[0].innerHTML = title;
        return this;
    },


    /**
     * delete the item from the navbar
     *
     * @param {string} name
     * @returns {NavGenerator}
     */
    deleteItem: function (name) {
        this.navItems = this.navItems.filter(item => item.name !== name);
        document.getElementById(name).parentElement.removeChild(document.getElementById(name));
        return this;
    },

    /**
     * set the menu background color
     *
     * @param {string} color example: #fff
     * @returns {NavGenerator}
     */
    setMenuBackgroundColor: function (color) {
        document.documentElement.style.setProperty('--menu-background-color', color);
    },

    /**
     * set the menu border radius
     *
     * @param {string} radius  example: "5px"
     * @returns {NavGenerator}
     */
    setMenuBorderRadius: function (radius) {
        document.documentElement.style.setProperty('--menu-border-radius', radius);
    },

    /**
     * get the navbar item list
     *
     * @returns {Array}
     */
    getNavItems: function () {
        return this.navItems
    },

    /**
     * remove the title
     *
     * @returns {NavGenerator}
     */
    removeTitle: function () {
        document.getElementsByClassName('navbar-brand')[0].innerHTML = "";
        return this;
    },

    /**
     * add a new menu item to the navbar item list
     *
     * @param targetName {string}
     * @param name {string}
     * @param url {string}
     * @returns {NavGenerator}
     */
    addMenuItem: function (targetName, name, url) {
        const target = this.navItems.find(item => item.name === targetName);
        target.children.push({
            name,
            url
        });
        const item = document.getElementById(targetName);
        const new_node = document.createElement("li")
        new_node.className = "menuitem"
        new_node.id = name
        const inner_node = document.createElement("a")
        inner_node.target = "_blank"
        inner_node.href = url
        inner_node.append(name)
        new_node.append(inner_node)
        item.childNodes[1].appendChild(new_node);
        applyEvent();
        return this;
    },


    /**
     * set the item color by name
     *
     * @param name {string} example: "Home"
     * @param color {string} example: #fff
     */
    setItemColorByName: function (name, color) {
        document.getElementById(name).childNodes[0]["style"].color = color;

    },

    /**
     * set all the navbar item color
     *
     * @param color {string} example: #fff
     */
    setNavItemColor: function (color) {
        document.documentElement.style.setProperty('--nav-item-color', color);
    },

    /**
     * set all the menu item color
     *
     * @param color {string} example: #fff
     */
    setMenuItemColor: function (color) {
        document.documentElement.style.setProperty('--menu-item-color', color);
    },

    /**
     * remove the item from the navbar item list
     *
     * @param name {string}
     * @returns {NavGenerator}
     */
    removeItem: function (name) {
        const target = this.navItems.find(item => item.name === name);
        if (target?.children) {
            target.children = target.children.filter(item => item.name !== name);
        }
        const item = document.getElementById(name);
        item.parentElement.removeChild(item);
        return this;
    },
}
    global.NavGenerator = global.NavGenerator || NavGenerator
})(window, window.document, $); 