let TransparentContainer = function(wid, hei) {
    this._domInstance = document.createElement('div');
    this._domInstance.style.width = wid + 'px';
    this._domInstance.style.height = hei + 'px';
    this._domInstance.className = 'transparentContainer';
    return this._domInstance;
}

TransparentContainer.prototype.append = function(dom) {
    this._domInstance.appendChild(dom);
}

TransparentContainer.prototype.remove = function() {
    this._domInstance.parentNode.removeChild(this._domInstance);
}

TransparentContainer.prototype.addClassName = function(classname) {
    if (this.hasClass(this._domInstance, classname) == true) {
        return;
    } else {
        this._domInstance.className = this._domInstance.className + " " + classname;
    }
}

TransparentContainer.prototype.removeClassName = function(classname) {
    if (this.hasClass(this._domInstance, classname) == true) {
        var reg = new RegExp("(^|\\s)" + classname + "(\\s|$)");
        this._domInstance.className = this._domInstance.className.replace(reg, "");
    } else {
        return;
    }
}

TransparentContainer.prototype.hasClass = function(ele, classname) {
    var reg = new RegExp("(^|\\s)" + classname + "(\\s|$)");
    if (ele.className.match(reg) != null) {
        return true;
    } else {
        return false;
    }
}