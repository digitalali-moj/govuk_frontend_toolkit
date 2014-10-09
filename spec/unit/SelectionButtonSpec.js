describe("selection-buttons", function () {
  var $radioButtons,
      $radioLabels,
      $checkboxButtons,
      $checkboxLabels;

  beforeEach(function () {
    $radioLabels = $(
        '<label class="selectable">' +
          'Small' +
          '<input type="radio" name="size" id="small" value="small" />' +
        '</label>' +
        '<label class="selectable">' +
          'Medium' +
          '<input type="radio" name="size" id="medium" value="medium" />' +
        '</label>' +
        '<label class="selectable">' +
          'Large' +
          '<input type="radio" name="size" id="large" value="large" />' +
        '</label>'
    );
    $checkboxLabels = $(
        '<label class="selectable">' +
          'Eggs' +
          '<input id="eggs" name="food" value="eggs" type="checkbox" />' +
        '</label>' +
        '<label class="selectable">' +
          'Bread' +
          '<input id="bread" name="food" value="bread" type="checkbox" />' +
        '</label>' +
        '<label class="selectable">' +
          'Fruit' +
          '<input id="fruit" name="food" value="fruit" type="checkbox" />' +
        '</label>'
    );
    $radioButtons = $radioLabels.find('input');
    $checkboxButtons = $checkboxLabels.find('input');
    $radioForm = $('<form action="" method="post" />');
    $checkboxForm = $('<form action="" method="post" />');
    $content = $('<div id="content" />');
    $radioForm.append($radioLabels);
    $checkboxForm.append($checkboxLabels);
    $content.append($radioForm);
    $content.append($checkboxForm);
    $(document.body).append($content);
  });

  afterEach(function () {
    $content.remove();
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a jQuery object containing radio inputs", function () {
    it("Should do nothing if no radios are checked", function () {
      GOVUK.selectionButtons($radioButtons);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(1).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked radios with the selected class", function () {
      $radioButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons($radioButtons);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark checked radios with the custom selected class if given", function () {
      $radioButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons($radioButtons, { 'selectedClass' : 'selectable-selected' });
      expect($radioLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a jQuery object containing checkbox inputs", function () {
    it("Should do nothing if no checkboxes are checked", function () {
      GOVUK.selectionButtons($checkboxButtons);
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked checkboxes with the selected class", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons($checkboxButtons);
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark multiple checked checkboxes with the selected class", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      $checkboxButtons.eq(1).attr('checked', true);
      GOVUK.selectionButtons($checkboxButtons);
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(true);
    });

    it("Should mark checked checkboxes with the custom selected class if given", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons($checkboxButtons, { 'selectedClass' : 'selectable-selected' });
      expect($checkboxLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a jQuery object containing a mixture of checkbox and radio inputs", function () {
    var $mixedButtons;

    beforeEach(function () {
      $mixedButtons = $checkboxButtons.add($radioButtons);
    });

    it("Should do nothing if no checkboxes or radios are checked", function () {
      GOVUK.selectionButtons($mixedButtons);
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(2).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(1).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked checkboxes or radios with the selected class", function () {
      $mixedButtons.eq(0).attr('checked', true);
      $mixedButtons.eq(3).attr('checked', true);

      GOVUK.selectionButtons($mixedButtons);
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark checked checkboxes or radios with the custom selected class if given", function () {
      $mixedButtons.eq(0).attr('checked', true);
      $mixedButtons.eq(3).attr('checked', true);

      GOVUK.selectionButtons($mixedButtons, { 'selectedClass' : 'selectable-selected' });
      expect($checkboxLabels.eq(0).hasClass('selectable-selected')).toBe(true);
      expect($radioLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a selector that matches radio inputs", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='radio']");
    });

    it("Should do nothing if no radios are checked", function () {
      GOVUK.selectionButtons("label.selectable input[type='radio']");
      expect($radioLabels.eq(0).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(1).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked radios with the selected class", function () {
      $radioButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons("label.selectable input[type='radio']");
      expect($radioLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark checked radios with the custom selected class if given", function () {
      $radioButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons("label.selectable input[type='radio']", { 'selectedClass' : 'selectable-selected' });
      expect($radioLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a selector that matches checkbox inputs", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='checkbox']");
    });

    it("Should do nothing if no checkboxes are checked", function () {
      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked checkboxes with the selected class", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark multiple checked checkboxes with the selected class", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      $checkboxButtons.eq(1).attr('checked', true);
      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(true);
    });

    it("Should mark checked checkboxes with the custom selected class if given", function () {
      $checkboxButtons.eq(0).attr('checked', true);
      GOVUK.selectionButtons("label.selectable input[type='checkbox']", { 'selectedClass' : 'selectable-selected' });
      expect($checkboxLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When the page loads and GOVUK.selectionButtons is called with a selector matching a mixture of checkbox and radio inputs", function () {
    var $mixedButtons;

    beforeEach(function () {
      $mixedButtons = $checkboxButtons.add($radioButtons);
    });

    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input");
    });

    it("Should do nothing if no checkboxes or radios are checked", function () {
      GOVUK.selectionButtons("label.selectable input");
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(1).hasClass('selected')).toBe(false);
      expect($checkboxLabels.eq(2).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(1).hasClass('selected')).toBe(false);
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });

    it("Should mark checked checkboxes or radios with the selected class", function () {
      $mixedButtons.eq(0).attr('checked', true);
      $mixedButtons.eq(3).attr('checked', true);

      GOVUK.selectionButtons("label.selectable input");
      expect($checkboxLabels.eq(0).hasClass('selected')).toBe(true);
      expect($radioLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should mark checked checkboxes or radios with the custom selected class if given", function () {
      $mixedButtons.eq(0).attr('checked', true);
      $mixedButtons.eq(3).attr('checked', true);

      GOVUK.selectionButtons("label.selectable input", { 'selectedClass' : 'selectable-selected' });
      expect($checkboxLabels.eq(0).hasClass('selectable-selected')).toBe(true);
      expect($radioLabels.eq(0).hasClass('selectable-selected')).toBe(true);
    });
  });

  describe("When a radio receives focus", function () {
    it("Should add the focused class to that radio", function () {
      GOVUK.selectionButtons($radioButtons);
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(true);
    });

    it("Should add a custom focused class to that radio if specified as an option", function () {
      GOVUK.selectionButtons($radioButtons, { 'focusedClass' : 'selectable-focused' });
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('selectable-focused')).toBe(true);
    });
  });

  describe("When a radio loses focus", function () {
    it("Should remove the focused class from that radio", function () {
      GOVUK.selectionButtons($radioButtons);
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(true);
      $radioButtons.eq(0).blur();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(false);
    });

    it("Should add a custom focused class to that radio if specified as an option", function () {
      GOVUK.selectionButtons($radioButtons, { 'focusedClass' : 'selectable-focused' });
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('selectable-focused')).toBe(true);
      $radioButtons.eq(0).blur();
      expect($radioLabels.eq(0).hasClass('selectable-focused')).toBe(false);
    });
  });

  describe("When a checkbox receives focus", function () {
    it("Should add the focused class to that checkbox", function () {
      GOVUK.selectionButtons($checkboxButtons);
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(true);
    });

    it("Should add a custom focused class to that checkbox if specified as an option", function () {
      GOVUK.selectionButtons($checkboxButtons, { 'focusedClass' : 'selectable-focused' });
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('selectable-focused')).toBe(true);
    });
  });

  describe("When a checkbox loses focus", function () {
    it("Should add the focused class to that checkbox", function () {
      GOVUK.selectionButtons($checkboxButtons);
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(true);
      $checkboxButtons.eq(0).blur();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(false);
    });

    it("Should add a custom focused class to that checkbox if specified as an option", function () {
      GOVUK.selectionButtons($checkboxButtons, { 'focusedClass' : 'selectable-focused' });
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('selectable-focused')).toBe(true);
      $checkboxButtons.eq(0).blur();
      expect($checkboxLabels.eq(0).hasClass('selectable-focused')).toBe(false);
    });
  });

  describe("When a radio is clicked", function () {
    it("Should mark that radio with the selected class", function () {
      GOVUK.selectionButtons($radioButtons);
      $radioButtons.eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($radioLabels.eq(0).hasClass('selected')).toBe(true);
    });

    it("Should remove the selected class from all other radios", function () {
      GOVUK.selectionButtons($radioButtons);
      $radioLabels.eq(1).addClass('selected');
      $radioButtons.eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });
  });

  describe("When a radio is clicked after the page content has been replaced if GOVUK.selectionButtons was called with a selector", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='radio']");
    });

    it("Should mark that radio with the selected class", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='radio']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $("label.selectable input[type='radio']").eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($("label.selectable input[type='radio']").eq(0).parent('label').hasClass('selected')).toBe(true);
    });

    it("Should remove the selected class from all other radios", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='radio']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $radioButtons = $("label.selectable input[type='radio']");
      $radioLabels = $radioButtons.parent('label');
      $radioLabels.eq(1).addClass('selected');
      $radioButtons.eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($radioLabels.eq(2).hasClass('selected')).toBe(false);
    });
  });

  describe("When a checkbox is clicked after the page content has been replaced if GOVUK.selectionButtons was called with a selector", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='checkbox']");
    });

    it("Should add the selected class to the checkbox", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $("label.selectable input[type='checkbox']").eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($("label.selectable input[type='checkbox']").eq(0).parent('label').hasClass('selected')).toBe(true);
    });

    it("Should remove the selected class from all other checkboxs", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $checkboxButtons = $("label.selectable input[type='checkbox']");
      $checkboxLabels = $checkboxButtons.parent('label');
      $checkboxLabels.eq(1).addClass('selected');
      $checkboxButtons.eq(0)
        .attr('checked', true)
        .trigger('click');
      expect($checkboxLabels.eq(2).hasClass('selected')).toBe(false);
    });
  });

  describe("When a radio is focused after the page content has been replaced if GOVUK.selectionButtons was called with a selector", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='radio']");
    });

    it("Should add the focused class to the radio", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='radio']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $radioButtons = $("label.selectable input[type='radio']");
      $radioLabels = $radioButtons.parent('label');
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(true)
    });

    it("Should add a custom focused class to the radio if sent in as an option", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='radio']", { 'focusedClass' : 'selectable-focused' });
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $radioButtons = $("label.selectable input[type='radio']");
      $radioLabels = $radioButtons.parent('label');
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('selectable-focused')).toBe(true)
    });

    it("Should remove the focused class from a radio when it loses focus", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='radio']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $radioButtons = $("label.selectable input[type='radio']");
      $radioLabels = $radioButtons.parent('label');
      $radioButtons.eq(0).focus();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(true)
      $radioButtons.eq(0).blur();
      expect($radioLabels.eq(0).hasClass('focused')).toBe(false)
    });
  });

  describe("When a checkbox is focused after the page content has been replaced if GOVUK.selectionButtons was called with a selector", function () {
    afterEach(function () {
      GOVUK.selectionButtons.removeEventsFor("label.selectable input[type='checkbox']");
    });

    it("Should add the focused class to the checkbox", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $checkboxButtons = $("label.selectable input[type='checkbox']");
      $checkboxLabels = $checkboxButtons.parent('label');
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(true);
    });

    it("Should add a custom focused class to the checkbox if sent in as an option", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='checkbox']", { 'focusedClass' : 'selectable-focused' });
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $checkboxButtons = $("label.selectable input[type='checkbox']");
      $checkboxLabels = $checkboxButtons.parent('label');
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('selectable-focused')).toBe(true);
    });

    it("Should remove the focused class from the checkbox when it loses focus", function () {
      var contentCache;

      GOVUK.selectionButtons("label.selectable input[type='checkbox']");
      contentCache = $('#content').html();
      $('#content').html('');
      $('#content').html(contentCache);
      $checkboxButtons = $("label.selectable input[type='checkbox']");
      $checkboxLabels = $checkboxButtons.parent('label');
      $checkboxButtons.eq(0).focus();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(true);
      $checkboxButtons.eq(0).blur();
      expect($checkboxLabels.eq(0).hasClass('focused')).toBe(false);
    });
  });
});
