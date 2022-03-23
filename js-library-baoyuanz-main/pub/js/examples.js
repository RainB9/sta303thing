// Create a new instance of the navbar class
const ng = new NavGenerator("navbar1", {
    navItems: [
        {
            name: "Home",
            url: "/",
            children: [
                {
                    name: "intro",
                    url: "/intro"
                },
                {
                    name: "buy",
                    url: "/buy"
                },
                {
                    name: "sell",
                    url: "/sell"
                },
                {
                    name: "rent",
                    url: "/rent"
                }
            ]
        },
        {
            name: "About",
            url: "/about",
        },
        {
            name: "Contact",
            url: "/contact",
            children: [
                {
                    name: "email",
                    url: "/email"
                },
                {
                    name: "phone",
                    url: "/phone"
                },
                {
                    name: "address",
                    url: "/address"
                }
            ]
        }
    ],
    title: "Nav Generator",
});

// add a bar to the navbar
ng.addBar("hhhh", "/asd", [{
    name: "asd",
    url: "/asd"
}]);


// set the navbar background color
ng.setBackgroundColor("#ffffee");

// set the menu border radius
ng.setMenuBorderRadius("10px");

// delete a item from the navbar
ng.deleteItem("phone");

// add a menu item to the navbar
ng.addMenuItem("Contact","twitter", "/twitter");

// set the menu title
ng.setTitle("Test Tittle");

// set the menu background color
ng.setMenuBackgroundColor("#feb373");

// set the nav item font color
ng.setNavItemColor("green");

// set the menu item font color
ng.setMenuItemColor("blue");

// set a item font color
ng.setItemColorByName("address", "red");

// remove the item from the navbar
//ng.removeItem("Contact");

// set the navbar vertical
//ng.setVertical();

// set the menu line style
ng.setMenuLineStyle("dashed");


