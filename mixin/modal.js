/**
 * An updated version of modalEffects.js by http://www.codrops.com
 */
var modalCounter = 0;
var RiotModal = {

  ModalUtils: {

    hasClass: function (ele, cls) {
      return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function (ele, cls) {
      if (!hasClass(ele, cls)) {
        ele.className += " " + cls;
      }
    },

    removeClass: function (ele, cls) {
      if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    },

    generateOverlay: function() {
      var ov = document.createElement('DIV');
      ov.className = 'md-overlay';
      console.log(ov);
      document.body.appendChild(ov);
    },

    generateModal: function() {

    }

  },

  init: function(){

    var overlay = document.querySelector( '.md-overlay' );

    if(!overlay) {
      this.ModalUtils.generateOverlay();
    }

    modalCounter++;

    [].slice.call( this.root.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

      var modal = this.root.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
        close = modal.querySelector( '.md-close' );

      function removeModal( hasPerspective ) {
        this.ModalUtils.removeClass( modal, 'md-show' );

        if( hasPerspective ) {
          this.ModalUtils.removeClass( this.root.documentElement, 'md-perspective' );
        }
      }

      function removeModalHandler() {
        removeModal( this.ModalUtils.hasClass( el, 'md-setperspective' ) );
      }

      el.addEventListener( 'click', function( ev ) {
        this.ModalUtils.addClass( modal, 'md-show' );
        overlay.removeEventListener( 'click', removeModalHandler );
        overlay.addEventListener( 'click', removeModalHandler );

        if( this.ModalUtils.hasClass( el, 'md-setperspective' ) ) {
          setTimeout( function() {
            this.ModalUtils.addClass( this.root.documentElement, 'md-perspective' );
          }, 25 );
        }
      });

      close.addEventListener( 'click', function( ev ) {
        ev.stopPropagation();
        removeModalHandler();
      });

    } );

  }

};

riot.mixin('RiotModal', RiotModal);
