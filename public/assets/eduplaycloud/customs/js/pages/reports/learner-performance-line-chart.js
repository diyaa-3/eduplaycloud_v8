/**
 * Load peity line chart
 */
(function($, document, Math, devicePixelRatio) {
    var canvasSupported = document.createElement("canvas").getContext

    var peity = $.fn.peity = function(type, options) {
        if (canvasSupported) {
            this.each(function() {
                var defaults = peity.defaults[type]
                var data = {}
                var $this = $(this)

                $.each($this.data(), function(name, value) {
                    if (name in defaults) data[name] = value
                })

                var opts = $.extend({}, defaults, data, options)
                var chart = new Peity($this, type, opts)
                chart.draw()

                $this.change(function() {
                    chart.draw()
                })
            });
        }

        return this;
    };

    var Peity = function($elem, type, opts) {
        this.$elem = $elem
        this.type = type
        this.opts = opts
    }

    var PeityPrototype = Peity.prototype

    PeityPrototype.colours = function() {
        var colours = this.opts.colours
        var func = colours

        if (!$.isFunction(func)) {
            func = function(_, i) {
                return colours[i % colours.length]
            }
        }

        return func
    }

    PeityPrototype.draw = function() {
        peity.graphers[this.type].call(this, this.opts)
    }

    PeityPrototype.prepareCanvas = function(width, height) {
        var canvas = this.canvas

        if (canvas) {
            this.context.clearRect(0, 0, canvas.width, canvas.height)
        } else {
            canvas = $("<canvas>").attr({
                height: height * devicePixelRatio,
                width: width * devicePixelRatio
            })

            if (devicePixelRatio != 1) {
                canvas.css({
                    height: height,
                    width: width
                })
            }

            this.canvas = canvas = canvas[0]
            this.context = canvas.getContext("2d")
            this.$elem.hide().before(canvas)
        }

        return canvas
    }

    PeityPrototype.values = function() {
        return $.map(this.$elem.text().split(this.opts.delimiter), function(value) {
            return parseFloat(value)
        })
    }

    peity.defaults = {}
    peity.graphers = {}

    peity.register = function(type, defaults, grapher) {
        this.defaults[type] = defaults
        this.graphers[type] = grapher
    }

    peity.register(
        "line", {
            colour: "#F5F5F5",
            strokeColour: "#388E3C",
            strokeWidth: 2,
            delimiter: ",",
            height: 50,
            max: null,
            min: 0,
            width: 260
        },
        function(opts) {
            var values = this.values()
            if (values.length == 1) values.push(values[0])
            var max = Math.max.apply(Math, values.concat([opts.max]));
            var min = Math.min.apply(Math, values.concat([opts.min]))

            var canvas = this.prepareCanvas(opts.width, opts.height)
            var context = this.context
            var width = canvas.width
            var height = canvas.height
            var xQuotient = width / (values.length - 1)
            var yQuotient = height / (max - min)

            var coords = [];
            var i;

            context.beginPath();
            context.moveTo(0, height + (min * yQuotient))

            for (i = 0; i < values.length; i++) {
                var x = i * xQuotient
                var y = height - (yQuotient * (values[i] - min))

                coords.push({
                    x: x,
                    y: y
                });
                context.lineTo(x, y);
            }

            context.lineTo(width, height + (min * yQuotient))
            context.fillStyle = opts.colour;
            context.fill();

            if (opts.strokeWidth) {
                context.beginPath();
                context.moveTo(0, coords[0].y);
                for (i = 0; i < coords.length; i++) {
                    context.lineTo(coords[i].x, coords[i].y);
                }
                context.lineWidth = opts.strokeWidth * devicePixelRatio;
                context.strokeStyle = opts.strokeColour;
                context.stroke();
            }
        }
    );

})(jQuery, document, Math, window.devicePixelRatio || 1);
$("span.line").peity("line");

/**
 * Load learner performance as per selected class
 */
$('#class-select-picker').on('change', function (e) {
    if (this.value > 0) {
        $.ajax({
            url: site_url + '/reports/?classId=' + this.value,
            type: 'get',
            dataType: 'html',
            beforeSend: function () {
                $.blockUI({ css: { border: 'none', backgroundColor: 'none' }, message: '<img src="' + site_url + '/assets/eduplaycloud/image/loader.gif" alt="Loading" width="100" />' });
            }
        }).done(function (data) {
            $.unblockUI();
            $(".performance_line_chart").empty().html(data);
            $("span.line").peity("line");
        }).fail(function (jqXHR, ajaxOptions, thrownError) {
            $.unblockUI();

            swal('Oops! Something went wrong, Please try again.', {
                closeOnClickOutside: false,
                icon: 'info',
            }).then(function () {

            });
        });
    }
});