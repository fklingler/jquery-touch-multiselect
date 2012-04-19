/*
 * jQuery Touch MultiSelect
 *
 */

(function($){
  var TouchMultiSelect = function (element, options) {
    var element = element;

    var defaults = {
      // noneButtonPresent : determines if a 'none' button must be included in the list
      noneButtonPresent: true,
      // noneButtonText : determines the text of the 'none' button if there is one
      noneButtonText: 'None',
      // noneButtonAtBeginning : determines if the 'none' button must be prepended (true)
      // or appended (false) to the list
      noneButtonAtBeginning: true,
      // permitNoSelectedButton : if there is no 'none' button, determines if we can deselect
      // an option if there is no other one selected
      permitNoSelectedButton: false,
    };

    var options = $.extend(defaults, options);

    var _ul, _lis, _noneButton;

    /*
     * Function that returns the currently selected <li>
     */
    var filterSelectedLis = function() {
      return _lis.filter('.selected');
    };

    /*
     * Function that updates the binded <option> to the lis passed in parameters to add or remove
     * the selected attribute. It also triggers the change event on the option.
     */
    var updateSelectOption = function(lis) {
      lis.each(function() {
        li = $(this);
        option = li.data('touchMultiSelect')['bindedOption'];
        if (option) {
          if (li.hasClass('selected')) {
            option.attr('selected', 'selected');
          } else {
            option.removeAttr('selected');
          }
          option.change();
        }
      });
    };

    /*
     * Click handler for the <li> tags, corresponding to the select options
     */
    var liClickHandler = function(event) {
      li = $(this);

      if (li.hasClass('selected')) {
        if (!(filterSelectedLis().length == 1 && !_noneButton && !options['permitNoSelectedButton'])) {
          li.removeClass('selected');
          updateSelectOption(li);

          if (_noneButton && filterSelectedLis().length == 0) {
            _noneButton.addClass('selected');
          }
        }
      } else {
        li.addClass('selected');
        updateSelectOption(li);

        if (_noneButton) {
          _noneButton.removeClass('selected');
        }
      }
      event.stopPropagation();
    };

    /*
     * Click handler for the 'none' button, removing selection on all the options
     */
    var noneButtonClickHandler = function(event) {
      if (!_noneButton.hasClass('selected')) {
        selectedLis = filterSelectedLis();
        selectedLis.removeClass('selected');

        _noneButton.addClass('selected');

        updateSelectOption(selectedLis);
      }
      event.stopPropagation();
    };

    /*
     * <ul> click handler, which manages opening and closing the list
     */
    var ulClickHandler = function(event) {
      _ul.toggleClass('opened');
    };

    /*
     * Plugin initialization
     */
    var init = function() {
      element.hide();

      _ul = $('<ul />').addClass('touchMultiSelect').bind('click.touchMultiSelect', ulClickHandler);


      var li;
      var hasOneSelected = false;
      element.children('option').each(function() {
        li = $('<li />').data('touchMultiSelect', { bindedOption: $(this) })
                        .html($(this).html())
                        .bind('click.touchMultiSelect', liClickHandler)
                        .appendTo(_ul);
        if ($(this).attr('selected') == 'selected') {
          hasOneSelected = true;
          li.addClass('selected');
        }
      });

      if (options['noneButtonPresent']) {
        _noneButton = $('<li />').addClass('noneButton')
                                    .html(options['noneButtonText'])
                                    .bind('click.touchMultiSelect', noneButtonClickHandler);
        if (!hasOneSelected) {
          _noneButton.addClass('selected');
        }

        if (options['noneButtonAtBeginning']) {
          _noneButton.prependTo(_ul);
        } else {
          _noneButton.appendTo(_ul);
        }
      }

      _lis = _ul.children('li').not(_noneButton);
      
      _ul.insertAfter(element);
    };

    init();
  };

  $.fn.touchMultiSelect = function(options) {
    return this.each(function() {
      var element = $(this);
      
      // Return early if this element already has a plugin instance
      if (element.data('touchMultiSelect')) return;

      // pass options to plugin constructor
      var touchMultiSelect = new TouchMultiSelect(element, options);

      // Store plugin object in this element's data
      element.data('touchMultiSelect', touchMultiSelect);
    });
  };
})(jQuery);