var _APP;
_APP = function()
{
    /**
     * Avoid scope issues in callbacks and anonymous functions by referring to `this` as `base`
     * @type {Object}
     */
    var base = this;

    // --------------------------------------------------------------------------

    /**
     * Construct the class
     * @return {Void}
     */
    base.__construct = function()
    {
        $(".hi").on({
            mouseenter: function () {
                $(".layout_pop-up").addClass("is-active");
                $(".layout_pop-up > span").addClass("is-active");
            },
            mouseleave: function () {
                $(".layout_pop-up").removeClass("is-active");
                $(".layout_pop-up > span").removeClass("is-active");
            }
        });

        $(".rotate").textrotator({
            animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp  flipCube, flipCubeUp and spin.
            separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
            speed: 3000 // How many milliseconds until the next word show.
        });

    };

    // --------------------------------------------------------------------------

    return base.__construct();
}();