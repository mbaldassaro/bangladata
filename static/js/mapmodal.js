//bootstrap modal
  L.Control.BootstrapModal = L.Control.extend({
      options: {
          // position         a Leaflet position, e.g. topleft. Optional; defaults to topright
          // modalId          the DOM ID of the Bootstrap modal, without the # sign. Example: **help**, would connect to the modal with **id="help"**
          // tooltip          the tooltip text for the control
          // glyph            the name of a Bootstrap glyphicon, minus the glyphicon- prefix. Example: **flag**  For more info and full list, http://getbootstrap.com/components/#glyphicons
          position: 'topright',
          modalId: null,
          tooltip: "",
          glyph: 'info-sign'
      },
      initialize: function(options) {
          L.setOptions(this, options);
          if (! options.modalId) throw "L.Control.BootstrapModal: modalId is required";

          // make sure that the stated modal (by DOM ID) is really real and really a Bootstrap modal
          // keep a reference to it for later
          this.modal = $('#' + this.options.modalId );
          if ( ! this.modal.length )                 throw "L.Control.BootstrapModal: could not find #" + this.options.modalId + "in the DOM";
          if ( this.modal.attr('role') !== 'dialog') throw "L.Control.BootstrapModal: #" + this.options.modalId + " does not have role=\"dialog\"   Are you sure it's a dialog?";
          if (! this.modal.hasClass('modal') )       throw "L.Control.BootstrapModal: #" + this.options.modalId + " does not have class=\"modal\"   Are you sure it's a dialog?";
      },
      onAdd: function(map) {
          // add a linkage to the map, since we'll be managing map layers
          this.map = map;
          this.active = false;

          // create our button: uses FontAwesome cuz that font is... awesome
          // assign this here control as a property of the visible DIV, so we can be more terse when writing click-handlers on that visible DIV
          this.controlDiv           = L.DomUtil.create('div', 'leaflet-control-bootstrapmodal leaflet-bar');
          this.controlDiv.control   = this;
          this.controlDiv.title     = this.options.tooltip;
          this.controlDiv.innerHTML = '<a href="#"><i class="fa fa-' + this.options.glyph + '"></i></a>';
          L.DomEvent
              .addListener(this.controlDiv, 'mousedown', L.DomEvent.stopPropagation)
              .addListener(this.controlDiv, 'click', L.DomEvent.stopPropagation)
              .addListener(this.controlDiv, 'click', L.DomEvent.preventDefault)
              .addListener(this.controlDiv, 'click', function () {
                  this.control.handleClick();
              });

          // done!
          return this.controlDiv;
      },

      handleClick: function () {
          $(this.modal).modal('show');
      }
  });

  new L.Control.BootstrapModal({
        modalId: 'modal_about',
        tooltip: "About the Map",
        glyph: 'info-circle'
  }).addTo(map);

  new L.Control.BootstrapModal({
        modalId: 'modal_help',
        tooltip: "About the Data",
        glyph: 'database'
  }).addTo(map);


/*    The MIT License (MIT)

    Copyright (c) 2016 Greg Allensworth

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
