//Classes
function MobileNavItem(type) {
  this.type = type;
  this.element;
  this.trigger;
  this.isDisabled = false;
  this.isActive = false;

  MobileNav.items.push(this);
}

MobileNavItem.prototype.disable = function() {
  this.isDisabled = true;
  $(this.trigger).css("opacity",".24");
}

MobileNavItem.prototype.enable = function() {
  this.isDisabled = false;
  $(this.trigger).css("opacity", "1");
}

MobileNavItem.prototype.isTriggerable = function() {
  return !this.isDisabled && !this.isActive
};

MobileNavItem.prototype.toggle = function() {
  if(this.isTriggerable()) {
    this.activate();
  }
  else {
    this.deactivate();
  }
};

MobileNavItem.prototype.activate = function() {
  if(this.type == "search") {
    $(this.element).addClass('active');
    this.isActive = true;
  }
  if(this.type == "sidebar") {
    $(this.element).css("top", GetNavbarHeight() + "px");
    $(this.element).css("height", "calc(100vh - " + GetNavbarHeight() + "px)");
    $(this.element).addClass('active');
    this.isActive = true;
  }
};

MobileNavItem.prototype.deactivate = function() {
    $(this.element).removeClass('active');
    this.isActive = false;
};

//Objects
MobileNav = {
  items : [],
  init : function () {
    this.items.forEach(function(item) {
      //Add Event Listeners
      $(item.trigger).on("click", function() {
        item.toggle();
      })
    });
  },
};

var Search = new MobileNavItem("search");
    Search.trigger = $(".header-search-icon");
    Search.element = $("form.search-form-mobile");

var Menu = new MobileNavItem("sidebar");
    Menu.trigger = $(".header-menu-icon");
    Menu.element = $("nav.sidebar-nav");
    
var Cart = new MobileNavItem("sidebar");
    Cart.trigger = $(".header-cart-icon");
    Cart.element = $("aside.sidebar-cart");

var Overlay = $(".overlay");

//Utilities
function GetNavbarHeight() {
  var height = $("header").height();
  return height;
}

MobileNav.init();