(function() {
    'use strict';

    var MaterialChipInput = function MaterialChipInput(element) {
        this.element_ = element;

        this.init();
    };
    window['MaterialChipInput'] = MaterialChipInput;

    MaterialChipInput.prototype.Constant_ = {};
    MaterialChipInput.prototype.CssClasses_ = {};

    MaterialChipInput.prototype.setProgress = function(p) {

    };

    MaterialChipInput.prototype.addChip_ = function(text) {
        var currentChips = this.getChips();
        if(currentChips.indexOf(text) > -1) {
            // ignore duplicates
            return;
        }
        var chip = document.createElement('span');
        chip.classList = 'mdl-chip mdl-chip--deletable';
        chip.innerHTML =
            '<span class="mdl-chip__text">' + text + '</span>' +
            '<button type="button" class="mdl-chip__action">' +
            '<i class="material-icons">close</i></button>';
        var update = this.updateTarget_.bind(this);
        chip.getElementsByClassName('mdl-chip__action')[0].onclick = function() {
            console.log('removing', text);
            chip.remove();
            update();
        };
        this.element_.insertBefore(chip, this.inputs_);
        this.updateTarget_();
    };

    MaterialChipInput.prototype.getChips = function() {
        var currentChips = [];
        var children = this.element_.children;
        for(var i = children.length; i--;) {
            if(children[i].classList.contains('mdl-chip')) {
                currentChips.unshift(
                    children[i].children[0].textContent ||
                    children[i].children[0].innerText);
            }
        }
        return currentChips;
    };

    MaterialChipInput.prototype.updateTarget_ = function() {
        var currentChips = this.getChips();
        this.target_.value = currentChips.join(this.options_.separator);
        if(currentChips.length >= this.options_.maximum) {
            this.input_.style.display = 'none';
        } else {
            this.input_.style.display = 'block';
        }
    };

    MaterialChipInput.prototype.startSearch_ = function() {
        if(this.results_) {
            var query = this.input_.value;
            if(query && query.length >= 2) {
                var regex = new RegExp('(' + query + ')', 'gi');
                var callback = function(result) {
                    this.results_.innerHTML = result.map(function(res) {
                        return '<li data-value="' + res + '">' +
                            res.replace(regex, '<b>$1</b>') + '</li>';
                    }).join('\n');
                }.bind(this);
                this.options_.search(query, callback);
            } else {
                this.results_.innerHTML = '';
            }
        }
    };

    MaterialChipInput.prototype.clearResults_ = function() {
        if(this.results_) {
            for(var i = this.results_.children.length; i--;) {
                this.results_.children[i].remove();
            }
        }
    };

    MaterialChipInput.prototype.getSelectedResult_ = function() {
        var children = this.results_.children;
        for(var i = children.length; i--;) {
            if(children[i].classList.contains('is-selected')) {
                children[i].classList.remove('is-selected');
                return i;
            }
        }
        return -1;
    };

    MaterialChipInput.prototype.mouseDown_ = function(event) {
        this.input_.focus();
    };

    MaterialChipInput.prototype.keyDown_ = function(event) {
        var code = event.which || event.keyCode;
        if(code === 8 && !this.input_.value) {
            // remove last tag if input is empty
            if(this.element_.children.length > 1) {
                this.element_.children[this.element_.children.length - 2].remove();
            }
        }
        var isEnter = code === 13;
        var isArrow = this.results_ && (code === 40 || code === 38);
        if(isEnter || isArrow) {
            // prevent enter from submitting the form
            event.preventDefault();
        }
    };

    MaterialChipInput.prototype.keyUp_ = function(event) {
        var code = event.which || event.keyCode;
        // TODO use more reasonable logic here
        if([13, 32, 188].indexOf(code) > -1) {
            var content, selected = -1;
            if(this.results_ && code === 13) {
                selected = this.getSelectedResult_();
            }

            if(selected > -1) {
                content = this.results_.children[selected].getAttribute('data-value');
            } else {
                //content = this.input_.value.replace(/[^-0-9a-zäüö]/gi, '');
                content = this.input_.value.replace(' ', '_');
            }
            if(content) {
                this.addChip_(content);

                // delete search results
                this.clearResults_();
            }
            this.input_.value = '';
            this.element_.classList.remove('is-dirty');
        } else if(this.results_ && (code === 38 || code === 40)) {
            var children = this.results_.children;
            var index = this.getSelectedResult_();
            index = index + (code === 40 ? 1 : -1);
            index = Math.min(Math.max(0, index), children.length - 1);
            children[index].classList.add('is-selected');
        } else {
            this.startSearch_();
        }
        event.preventDefault();
    };

    MaterialChipInput.prototype.clickedResult_ = function(event) {
        this.addChip_(event.target.closest('li').getAttribute('data-value'));
        this.clearResults_();
        this.input_.value = '';
    };

    MaterialChipInput.prototype.addSearch = function(search) {
        this.results_ = document.createElement('ul');
        this.results_.classList = 'results mdl-shadow--4dp';
        this.inputs_.insertBefore(this.results_, this.input_.nextSibling);
        this.options_.search = search;

        this.results_.addEventListener('click', this.clickedResult_.bind(this));
    };

    MaterialChipInput.prototype.init = function() {
        if(this.element_) {
            // wrap all content in the .inputs div
            this.element_.innerHTML = '<div class="inputs">' + this.element_.innerHTML + '</div>';
            this.inputs_ = this.element_.children[0];

            this.input_ = this.element_.getElementsByClassName('mdl-textfield__input')[0];
            this.input_.addEventListener('keydown', this.keyDown_.bind(this));
            this.input_.addEventListener('keyup', this.keyUp_.bind(this));
            this.target_ = this.element_.getElementsByClassName('mdl-chipfield__input')[0];

            // let the whole element look like a input field
            this.element_.addEventListener('click', this.mouseDown_.bind(this));

            // set the default options
            this.options_ = {
                maximum: Number.MAX_VALUE,
                separator: ','
            };

            // initialize the chips
            if(this.target_.value) {
                // initialize the chips
                this.target_.value.split(this.options_.separator).forEach(this.addChip_.bind(this));
            }
        }
    }
})();